<?php
/**
 * Server-side rendering of the `glutenblocks/jumbotron` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/jumbotron` block on server.
 */
function glutenblocksregister_block_glutenblocks_jumbotron() {
    register_block_type(
        'glutenblocks/jumbotron',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocksregister_block_glutenblocks_jumbotron' );
