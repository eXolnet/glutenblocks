<?php
/**
 * Server-side rendering of the `glutenblocks/jumbotron` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/jumbotron-carousel` block on server.
 */
function register_block_glutenblocks_jumbotron_carousel() {
    register_block_type(
        'glutenblocks/jumbotron-carousel',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_jumbotron_carousel' );

function add_jumbotron_carousel_frontend_assets() {
    if (has_block('glutenblocks/jumbotron-carousel')) {
        wp_enqueue_script(
            'glutenblocks-jumbotron-carousel',
            plugins_url() . '/glutenblocks/packages/jumbotron-carousel/carouselTimer.js'
        );
    }
}

add_action('wp_enqueue_scripts', 'add_jumbotron_carousel_frontend_assets');
