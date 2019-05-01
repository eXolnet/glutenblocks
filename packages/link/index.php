<?php
/**
 * Server-side rendering of the `glutenblocks/link` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/link` block on server.
 */
function register_block_glutenblocks_link() {
    register_block_type(
        'glutenblocks/link',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_link' );
