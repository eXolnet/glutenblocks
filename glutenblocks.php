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

function gb_get_post_types() {
     $post_types = get_post_types( ['glutenblock_rest' => true, 'public' => true], 'names', 'or');
     return array_keys($post_types);
}

function gb_get_field_types($data){
    $args = array(
        'post_type'=> $data['field'],
        'posts_per_page'=> -1,
        'numberposts'=> -1
    );
    $posts = get_posts($args);
    return $posts;
}

function gb_get_post_attributes($data){
    return get_fields($data['id']);
}

function gb_is_acf_plugin_active(){
    return is_plugin_active( 'acf-to-rest-api/class-acf-to-rest-api.php' );
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'glutenblocks/v1', '/wp_get_post_types', array(
      'methods' => 'GET',
      'callback' => 'gb_get_post_types',
    ) );

    register_rest_route( 'glutenblocks/v1', '/gb_get_field_types/field=(?P<field>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'gb_get_field_types',
    ) );

    register_rest_route( 'glutenblocks/v1', '/gb_get_post_attributes/id=(?P<id>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'gb_get_post_attributes',
    ) );

    register_rest_route( 'glutenblocks/v1', '/gb_is_acf_plugin_active', array(
        'methods' => 'GET',
        'callback' => 'gb_is_acf_plugin_active',
    ) );
});

