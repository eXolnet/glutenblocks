<?php
/**
 * Server-side rendering of the `glutenblocks/row` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/row` block on server.
 */
function register_block_glutenblocks_row()
{
    register_block_type(
        'glutenblocks/row',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style' => 'glutenblocks-editor',
        ]
    );
}

add_action('init', 'register_block_glutenblocks_row');
