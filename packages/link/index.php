<?php
/**
 * Server-side rendering of the `glutenblocks/link` block.
 * phpcs:disable
 */

function glutenblocks_register_link_render_callback( $attributes, $content ) {
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
function register_block_glutenblocks_link() {
    register_block_type(
        'glutenblocks/link',
        [
            'style' => 'glutenblocks-style',
            'editor_script' => 'glutenblocks',
            'editor_style'  => 'glutenblocks-editor',
            'render_callback' => 'glutenblocks_register_link_render_callback'
        ]
    );
}
add_action( 'init', 'register_block_glutenblocks_link' );
