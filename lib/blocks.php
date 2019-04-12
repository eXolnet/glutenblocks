<?php
/**
 * Block registration functions.
 *
 * @package glutenblocks
 */

function glutenblocks_register_blocks () {
    include_once dirname(__FILE__) . '/../build/glutenblocks_registers.php';
}

add_action('plugins_loaded', 'glutenblocks_register_blocks');

function glutenblocks_register_block_assets()
{
    $script = '../build/glutenblocks.bundle.js';
    $style = '../build/glutenblocks.style.css';
    $editorStyle = '../build/glutenblocks.editor.css';

    wp_register_script(
        'glutenblocks',
        plugins_url($script, __FILE__),
        [
            'wp-blocks',
            'wp-editor',
            'wp-i18n',
            'wp-element',
            'wp-components',
        ],
        filemtime( plugin_dir_path( __FILE__ ) . $script )
    );

    wp_enqueue_style(
        'glutenblocks-editor',
        plugins_url($editorStyle, __FILE__),
        [
            'wp-edit-blocks'
        ],
        filemtime( plugin_dir_path( __FILE__ ) . $editorStyle )
    );

    wp_enqueue_style(
        'glutenblocks-style',
        plugins_url($style, __FILE__),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . $style )
    );
}

add_action('init', 'glutenblocks_register_block_assets');
