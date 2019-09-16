<?php
/**
 * Server-side rendering of the `glutenblocks/button` block.
 * phpcs:disable
 */

function glutenblocks_button_render_callback( $attributes, $content ) {

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
function register_block_glutenblocks_button() {
    register_block_type(
        'glutenblocks/button',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
            'render_callback' => 'glutenblocks_button_render_callback'
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_button' );
