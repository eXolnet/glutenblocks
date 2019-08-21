<?php
/**
 * Server-side rendering of the `glutenblocks/collapse` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/collapse` block on server.
 */
function register_block_glutenblocks_collapse() {
   register_block_type(
       'glutenblocks/collapse',
       [
           'style' => 'glutenblocks-style',
           'editor_script' => 'glutenblocks',
           'editor_style'  => 'glutenblocks-editor',
       ]
   );
}
add_action( 'init', 'register_block_glutenblocks_collapse' );
