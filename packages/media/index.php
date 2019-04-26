<?php
/**
 * Server-side rendering of the `glutenblocks/media` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/media` block on server.
 */
function register_block_glutenblocks_media() {
    register_block_type(
        'glutenblocks/media',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_media' );
