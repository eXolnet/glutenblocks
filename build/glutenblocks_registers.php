<?php
/**
 * Server-side rendering of the `glutenblocks/hero` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/hero` block on server.
 */
function glutenblocksregister_block_glutenblocks_hero() {
    register_block_type(
        'glutenblocks/hero',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocksregister_block_glutenblocks_hero' );
