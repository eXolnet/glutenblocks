<?php
/**
 * Server-side rendering of the `glutenblocks/listlink` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/listlink` block on server.
 */
function register_block_glutenblocks_listlink() {
    register_block_type(
        'glutenblocks/listlink',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_listlink' );
