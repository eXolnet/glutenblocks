<?php
/**
 * Server-side rendering of the `glutenblocks/button-group` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/button-group` block on server.
 */
function glutenblocks_glutenblocks_register_block_glutenblocks_button_group() {
    register_block_type(
        'glutenblocks/button-group',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_glutenblocks_register_block_glutenblocks_button_group' );


/**
 * Server-side rendering of the `glutenblocks/button` block.
 * phpcs:disable
 */

function glutenblocks_glutenblocks_button_render_callback( $attributes, $content ) {

    $type = isset($attributes['type']) ? $attributes['type'] : 'visit' ;
    $text = isset($attributes['text']) ? $attributes['text'] : '';
    $target = isset($attributes['target']) ? $attributes['target'] : null;
    $actionText = isset($attributes['actionText']) ? $attributes['actionText'] : '';

    $color = $attributes['color'] ?? 'default';
    $colorInverse = $attributes['colorInverse'] ?? false;
    $shape = $attributes['shape'] ?? '';
    $size = $attributes['size'] ?? 'normal';
    $align = $attributes['align'] ?? '';
    $text = $attributes['text'] ?? '';
    $icon = $attributes['icon'] ?? '';
    $iconSide = $attributes['iconSide'] ?? '';


    if($type == 'custom' && isset($attributes['customPostObjectID']) && isset($attributes['customPostType']) && isset($attributes['customPostAttribute']) ){
        $post_id = $attributes['customPostObjectID'];
        $post_type = $attributes['customPostType'];
        $post_attribute = $attributes['customPostAttribute'];
        $custom_file_url = get_fields($post_id)[$post_type][$post_attribute];
    }

    $relAttr = 'noopener noreferrer';

    if (isset($attributes['noFollow']) && $attributes['noFollow']) {
        $relAttr = $relAttr . ' nofollow';
    }

    if(isset($attributes['link']) || isset($custom_file_url)){
        $displayLink = ($type == 'custom' ? $custom_file_url : $attributes['link'] );
    }else{
        $displayLink = '#';
    }

    $classes = [
        'gb-button',
        'gb-button--' . $color,
        'gb-button--' . $size,
    ];

    if ($shape !== '') {
        $classes[] = 'gb-button--' . $shape;
    }

    if ($colorInverse) {
        $classes[] = 'gb-button--inverse';
    }

    $alignClass = '';
    if ($align !== '') {
        $alignClass = 'gb-button--align-' . $align;
    }

    $classString = implode(' ', $classes);

    if (isset($attributes['className'])) {
        $classString .= ' ' . $attributes['className'];
    }

    return <<<HTML
    <div class='wp-block-glutenblocks-button gb-button-wrapper {$alignClass}'>
                <a href="{$displayLink}" target="{$target}" rel="{$relAttr}" class="{$classString}">
                    {$text}
                </a>
            </div>
HTML;
}

/**
 * Registers the `glutenblocks/button` block on server.
 */
function glutenblocks_register_block_glutenblocks_button() {
    register_block_type(
        'glutenblocks/button',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
            'render_callback' => 'glutenblocks_glutenblocks_button_render_callback'
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_button', 20 );


/**
 * Server-side rendering of the `glutenblocks/card` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/card` block on server.
 */
function glutenblocks_register_block_glutenblocks_card() {
    register_block_type(
        'glutenblocks/card',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_card' );


/**
 * Server-side rendering of the `glutenblocks/collapse` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/collapse` block on server.
 */
function glutenblocks_register_block_glutenblocks_collapse() {
   register_block_type(
       'glutenblocks/collapse',
       [
           'style' => 'glutenblocks-style',
           'editor_script' => 'glutenblocks',
           'editor_style'  => 'glutenblocks-editor',
       ]
   );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_collapse' );


/**
 * Server-side rendering of the `glutenblocks/example` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/example` block on server.
 */
//function register_block_glutenblocks_example() {
//    register_block_type(
//        'glutenblocks/example',
//        [
//            'style' => 'glutenblocks-style',
//            'editor_script' => 'glutenblocks',
//            'editor_style'  => 'glutenblocks-editor',
//        ]
//    );
//}
//add_action( 'init', 'register_block_glutenblocks_example' );


/**
 * Server-side rendering of the `glutenblocks/hero` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/hero` block on server.
 */
function glutenblocks_register_block_glutenblocks_hero() {
    register_block_type(
        'glutenblocks/hero',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_hero' );


/**
 * Server-side rendering of the `glutenblocks/jumbotron` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/jumbotron-carousel` block on server.
 */
function glutenblocks_glutenblocks_register_block_glutenblocks_jumbotron_carousel() {
    register_block_type(
        'glutenblocks/jumbotron-carousel',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_glutenblocks_register_block_glutenblocks_jumbotron_carousel' );

function glutenblocks_add_jumbotron_carousel_frontend_assets() {
    if (has_block('glutenblocks/jumbotron-carousel')) {
        wp_enqueue_script(
            'glutenblocks-jumbotron-carousel',
            plugins_url() . '/glutenblocks/packages/jumbotron-carousel/carouselTimer.js'
        );
    }
}

add_action('wp_enqueue_scripts', 'glutenblocks_add_jumbotron_carousel_frontend_assets');


/**
 * Server-side rendering of the `glutenblocks/jumbotron` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/jumbotron` block on server.
 */
function glutenblocks_register_block_glutenblocks_jumbotron() {
    register_block_type(
        'glutenblocks/jumbotron',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_jumbotron' );


/**
 * Server-side rendering of the `glutenblocks/link` block.
 * phpcs:disable
 */

function glutenblocks_glutenblocks_register_link_render_callback( $attributes, $content ) {
    $type = isset($attributes['type']) ? $attributes['type'] : 'visit' ;
    $text = isset($attributes['text']) ? $attributes['text'] : '';
    $target = isset($attributes['target']) ? $attributes['target'] : null;
    $actionText = isset($attributes['actionText']) ? $attributes['actionText'] : '';

    if($type == 'custom' && isset($attributes['customPostObjectID']) && isset($attributes['customPostType']) && isset($attributes['customPostAttribute']) ){
        $post_id = $attributes['customPostObjectID'];
        $post_type = $attributes['customPostType'];
        $post_attribute = $attributes['customPostAttribute'];
        $custom_file_url = get_fields($post_id)[$post_type][$post_attribute];
    }

    $relAttr = 'noopener noreferrer';

    if (isset($attributes['noFollow']) && $attributes['noFollow']) {
        $relAttr = $relAttr . ' nofollow';
    }

    if(isset($attributes['link']) || isset($custom_file_url)){
        $displayLink = ($type == 'custom' ? $custom_file_url : $attributes['link'] );
    }else{
        $displayLink = '#';
    }

    $text = str_replace(['&lt;', '&rt;'], ['<', '>'], $text);

    return <<<HTML
    <a href="{$displayLink}" target="{$target}" rel="{$relAttr}">
        <span class='gb-list-links__text'>{$text}</span>
        <span class='gb-list-links__action gb-list-links--{$type}'>{$actionText}</span>
    </a>  
HTML;
}


/**
 * Registers the `glutenblocks/link` block on server.
 */
function glutenblocks_register_block_glutenblocks_link() {
    register_block_type(
        'glutenblocks/link',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
            'render_callback' => 'glutenblocks_glutenblocks_register_link_render_callback'
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_link' );


/**
 * Server-side rendering of the `glutenblocks/listlink` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/listlink` block on server.
 */
function glutenblocks_register_block_glutenblocks_listlink() {
    register_block_type(
        'glutenblocks/listlink',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_listlink' );


/**
 * Server-side rendering of the `glutenblocks/media` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/media` block on server.
 */
function glutenblocks_register_block_glutenblocks_media() {
    register_block_type(
        'glutenblocks/media',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_media' );


/**
 * Server-side rendering of the `glutenblocks/responsive-image` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/example` block on server.
 */
function glutenblocks_register_block_glutenblocks_responsive_image()
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

add_action('init', 'glutenblocks_register_block_glutenblocks_responsive_image');


/**
 * Server-side rendering of the `glutenblocks/row` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/row` block on server.
 */
function glutenblocks_register_block_glutenblocks_row()
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

add_action('init', 'glutenblocks_register_block_glutenblocks_row');


/**
 * Server-side rendering of the `glutenblocks/section` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/section` block on server.
 */
function glutenblocks_register_block_glutenblocks_section() {
    register_block_type(
        'glutenblocks/section',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_section' );


/**
 * Server-side rendering of the `glutenblocks/youtube-embed` block.
 * phpcs:disable
 */

/**
 * Registers the `glutenblocks/example` block on server.
 */
function glutenblocks_register_block_glutenblocks_youtube_embed() {
    register_block_type(
        'glutenblocks/youtube-embed',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
        ]
    );
}
add_action( 'init', 'glutenblocks_register_block_glutenblocks_youtube_embed' );

function glutenblocks_add_frontend_assets() {
    if (has_block('glutenblocks/youtube-embed')) {
        wp_enqueue_script(
            'glutenblocks-youtube-embed',
            plugins_url() . '/glutenblocks/packages/youtube-embed/customButton.js'
        );
    }
}

add_action('wp_enqueue_scripts', 'glutenblocks_add_frontend_assets');
