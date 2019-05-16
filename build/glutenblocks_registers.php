<?php
/**
 * Server-side rendering of the `glutenblocks/button` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/button` block on server.
 */
function glutenblocksregister_block_glutenblocks_button() {
    register_block_type(
        'glutenblocks/button',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocksregister_block_glutenblocks_button' );
