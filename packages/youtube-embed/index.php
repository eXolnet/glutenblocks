<?php
/**
 * Server-side rendering of the `glutenblocks/youtube-embed` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/example` block on server.
 */
function register_block_glutenblocks_youtube_embed() {
    register_block_type(
        'glutenblocks/youtube-embed',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_youtube_embed' );

function add_frontend_assets() {
    if (has_block('glutenblocks/youtube-embed')) {
        wp_enqueue_script(
            'glutenblocks-youtube-embed',
            plugins_url() . '/glutenblocks/packages/youtube-embed/customButton.js'
        );
    }
}

add_action('wp_enqueue_scripts', 'add_frontend_assets');
