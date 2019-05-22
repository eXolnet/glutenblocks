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
