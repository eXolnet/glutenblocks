<?php
/**
 * Server-side rendering of the `glutenblocks/button-group` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/button-group` block on server.
 */
function register_block_glutenblocks_button_group() {
    register_block_type(
        'glutenblocks/button-group',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_button_group' );
