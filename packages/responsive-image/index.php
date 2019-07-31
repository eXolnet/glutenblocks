<?php
/**
 * Server-side rendering of the `glutenblocks/responsive-image` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/example` block on server.
 */
function register_block_glutenblocks_responsive_image()
{
    register_block_type(
        'glutenblocks/responsive-image',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style' => 'glutenblocks-editor',
        ]
    );
}

add_action('init', 'register_block_glutenblocks_responsive_image');
