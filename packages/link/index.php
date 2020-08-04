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

    $gated_download = false;
    $gated_download_data = [];

    if($type == 'custom' && isset($attributes['customPostObjectID']) && isset($attributes['customPostType']) && isset($attributes['customPostAttribute']) ){
        $post_id = $attributes['customPostObjectID'];
        $post_type = $attributes['customPostType'];
        $post_attribute = $attributes['customPostAttribute'];

        $custom_fields = get_fields($post_id);
        $custom_field = $custom_fields[$post_type];
        $custom_field_attribute = $custom_field[$post_attribute];

        $gated_download = $custom_fields['gated_download'] ?? false;
        $gated_download_data = [
            'fileId' => $post_id,
        ];
    }

    $relAttr = 'noopener noreferrer';

    if (isset($attributes['noFollow']) && $attributes['noFollow']) {
        $relAttr = $relAttr . ' nofollow';
    }

    if(isset($attributes['link']) || isset($custom_field_attribute)){
        $displayLink = ($type == 'custom' ? $custom_field_attribute : $attributes['link'] );
    }else{
        $displayLink = '#';
    }

    $text = str_replace(['&lt;', '&rt;'], ['<', '>'], $text);

    $linkTag = '<a href="' . $displayLink . '" target="' . $target . '" rel="' . $relAttr . '">';

    if ($gated_download) {
        $linkTag = "<a href='#' v-gated-download='" . json_encode($gated_download_data) . "'>";
    }

    return <<<HTML
    {$linkTag}
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
