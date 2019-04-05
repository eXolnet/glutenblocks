<?php
/**
 * Plugin Name: Glutenblocks
 * Plugin URI: https://github.com/eXolnet/glutenblocks
 * Description: Collection of Wordpress blocks for the Gutenberg editor.
 * Version: 1.0.0
 * Author: eXolnet
 * Text Domain: glutenblocks
 *
 * @package glutenblocks
 */

glutenblocks_pre_init();

/**
 * Display a version notice and deactivate the Gutenberg plugin.
 *
 * @since 0.1.0
 */
function glutenblocks_wordpress_version_notice()
{
    echo '<div class="error"><p>';
    /* translators: %s: Minimum required version */
    printf(__( 'Glutenblocks required plugin Gutenberg to be enabled.', 'glutenblocks'));
    echo '</p></div>';

    deactivate_plugins(['glutenblocks/glutenblocks.php']);
}

/**
 * Verify that we can initialize the Glutenblocks, then load it.
 *
 * @since 1.0.0
 */
function glutenblocks_pre_init()
{
    if (! is_plugin_active( 'gutenberg/gutenberg.php' ) ) {
        add_action('admin_notices', 'glutenblocks_wordpress_version_notice');
        return;
    }

    require_once dirname(__FILE__) .'/lib/load.php';
}
