const CopyWebpackPlugin = require('copy-webpack-plugin');
const mix = require('laravel-mix');
const MergeIntoSingle = require('webpack-merge-and-include-globally');

const externals = require('./config/externals');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('../glutenblocks');

mix.options({
    processCssUrls: false,
    lang: 'sass'
})
    .webpackConfig({
        devtool: '#source-map',
        externals,
        output: {
            chunkFilename: 'build/[name].[chunkhash].js'
        },
        plugins: [
            new MergeIntoSingle({
                files: {
                    './build/glutenblocks_registers.php': [
                        './packages/**/index.php'
                    ]
                },
                transform: {
                    './build/glutenblocks_registers.php': code =>
                        code
                            .match(/^function [^(]+/gm)
                            .reduce((result, functionName) => {
                                // Trim leading "function " prefix from match.
                                functionName = functionName.slice(9);

                                // Prepend the Gutenberg prefix, substituting any
                                // other core prefix (e.g. "wp_").
                                return result.replace(
                                    new RegExp(functionName, 'g'),
                                    match =>
                                        'glutenblocks' +
                                        match.replace(/^wp_/, '')
                                );
                            }, code)
                            .replace(
                                /(add_action\(\s*'init',\s*'glutenblocks_register_block_[^']+'(?!,))/,
                                '$1, 20'
                            )
                            .replace(/(?!^)<\?php/g, '')
                }
            }),
            new CopyWebpackPlugin([
                {
                    from:
                        'node_modules/@fonticonpicker/react-fonticonpicker/dist/assets',
                    to: 'build/assets'
                }
            ])
        ]
    })
    .js('packages/index.js', 'build/glutenblocks.bundle.js')
    .sass('packages/style.scss', 'build/glutenblocks.style.css')
    .sass('packages/editor.scss', 'build/glutenblocks.editor.css')
    .version();

if (process.env.ENABLE_BUNDLE_ANALYZER) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin;

    mix.webpackConfig({
        plugins: [new BundleAnalyzerPlugin()]
    });
}
