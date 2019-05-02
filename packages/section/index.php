<?php
/**
 * Server-side rendering of the `glutenblocks/section` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/section` block on server.
 */
function register_block_glutenblocks_section() {
    register_block_type(
        'glutenblocks/theme',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_theme' );
