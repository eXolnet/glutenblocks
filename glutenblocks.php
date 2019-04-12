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
    printf(__('Glutenblocks requires WordPress %s or later to function properly. Please upgrade WordPress before activating Glutenblocks.', 'glutenblocks'), '5.0.0');
    echo '</p></div>';
}

/**
 * Verify that we can initialize the Glutenblocks, then load it.
 *
 * @since 1.0.0
 */
function glutenblocks_pre_init()
{
    // Get unmodified $wp_version.
    include ABSPATH . WPINC . '/version.php';
    // Strip '-src' from the version string. Messes up version_compare().
    $version = str_replace('-src', '', $wp_version);
    if (version_compare($version, '5.0.0', '<')) {
        add_action('admin_notices', 'gutenberg_wordpress_version_notice');
        return;
    }


    require_once dirname(__FILE__) .'/lib/load.php';
}
