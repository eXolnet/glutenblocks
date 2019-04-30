<?php
/**
 * Server-side rendering of the `glutenblocks/card` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/card` block on server.
 */
function register_block_glutenblocks_card() {
    register_block_type(
        'glutenblocks/card',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_card' );
