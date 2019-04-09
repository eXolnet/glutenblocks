const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const mix = require('laravel-mix');
const postcss = require('postcss');
const {get, escapeRegExp} = require('lodash');
const {basename, sep} = require('path');
/**
 * Internal dependencies
 */
const {dependencies} = require('./package');

const WORDPRESS_NAMESPACE = '@gutenblocks/';

const gutenbergPackages = Object.keys(dependencies)
    .filter((packageName) => packageName.startsWith(WORDPRESS_NAMESPACE))
    .map((packageName) => packageName.replace(WORDPRESS_NAMESPACE, ''));

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

mix
    .options({
        processCssUrls: false,
        lang: 'sass',
    })
    .webpackConfig({
        devtool: '#source-map',
        output: {
            chunkFilename: 'build/[name].js?id=[chunkhash]',
            publicPath: "/app/plugins/glutenblocks/",
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    'build/*',
                ],
            }),
            new CopyWebpackPlugin([
                {
                    from: './packages/src/**/index.php',
                    test: new RegExp(`([\\w-]+)${escapeRegExp(sep)}index\\.php$`),
                    to: './build/glutenblocks_registers.php',
                    ignore: ['**/example/index.php'],
                    transform(content) {
                        content = content.toString();

                        // Within content, search for any function definitions. For
                        // each, replace every other reference to it in the file.
                        return content
                            .match(/^function [^\(]+/gm)
                            .reduce((result, functionName) => {
                                // Trim leading "function " prefix from match.
                                functionName = functionName.slice(9);

                                // Prepend the Gutenberg prefix, substituting any
                                // other core prefix (e.g. "wp_").
                                return result.replace(
                                    new RegExp(functionName, 'g'),
                                    (match) => 'glutenblocks' + match.replace(/^wp_/, '')
                                );
                            }, content)
                            // The core blocks override procedure takes place in
                            // the init action default priority to ensure that core
                            // blocks would have been registered already. Since the
                            // blocks implementations occur at the default priority
                            // and due to WordPress hooks behavior not considering
                            // mutations to the same priority during another's
                            // callback, the Gutenberg build blocks are modified
                            // to occur at a later priority.
                            .replace(/(add_action\(\s*'init',\s*'glutenblocks_register_block_[^']+'(?!,))/, '$1, 20');
                    },
                },
            ]),
        ],
    })
    .js('packages/src/index.js', 'build/glutenblocks.bundle.js')
    .sass('packages/src/style.scss', 'build/glutenblocks.style.css')
    .sass('packages/src/editor.scss', 'build/glutenblocks.editor.css')
    .version();

if (process.env.ENABLE_BUNDLE_ANALYZER) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    mix.webpackConfig({
        plugins: [new BundleAnalyzerPlugin()],
    });
}