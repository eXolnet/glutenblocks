<?php
/**
 * Block registration functions.
 *
 * @package glutenblocks
 */

/**
 * @return void
 */
function glutenblocks_register_blocks()
{
    $file = dirname(__FILE__) . '/../build/glutenblocks_registers.php';
    if (!file_exists($file)) {
        return;
    }
    include_once $file;
}

add_action('plugins_loaded', 'glutenblocks_register_blocks');

/**
 * @return void
 */
function glutenblocks_register_assets()
{
    $style = '../build/glutenblocks.style.css';

    wp_enqueue_style(
        'glutenblocks-style',
        plugins_url($style, __FILE__),
        [],
        filemtime(plugin_dir_path(__FILE__) . $style)
    );
}

add_action('init', 'glutenblocks_register_assets');

/**
 * @return void
 */
function glutenblocks_enqueue_block_editor_assets()
{
    $script = '../build/glutenblocks.bundle.js';
    $editorStyle = '../build/glutenblocks.editor.css';

    wp_enqueue_script(
        'glutenblocks',
        plugins_url($script, __FILE__),
        [
            'wp-blocks',
            'wp-components',
            'wp-compose',
            'wp-data',
            'wp-editor',
            'wp-element',
            'wp-i18n',
        ],
        filemtime(plugin_dir_path(__FILE__) . $script)
    );

    $phpVars = [];
    $themeColorsOption = get_theme_support('glutenblocks-colors');
    if ($themeColorsOption && $themeColorsOption !== '') {
        $phpVars['themeColors'] = $themeColorsOption[0];
    }
    wp_localize_script('glutenblocks', 'php_vars', $phpVars);

    wp_enqueue_style(
        'glutenblocks-editor',
        plugins_url($editorStyle, __FILE__),
        [
            'wp-edit-blocks'
        ],
        filemtime(plugin_dir_path(__FILE__) . $editorStyle)
    );
}

add_action('enqueue_block_editor_assets', 'glutenblocks_enqueue_block_editor_assets');

function glutenblocks_block_category($categories)
{
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'glutenblocks',
                'title' => __('Glutenblocks', 'glutenblocks'),
            ],
        ]
    );
}

add_filter('block_categories', 'glutenblocks_block_category', 10, 2);
