/**
 * BLOCK: Glutenblock media Attributes
 */
const attributes = {
    align: {
        'type': 'string',
        'default': 'wide'
    },
    mediaAlt: {
        'type': 'string',
        'source': 'attribute',
        'selector': 'figure img',
        'attribute': 'alt',
        'default': ''
    },
    mediaPosition: {
        'type': 'string',
        'default': 'left'
    },
    mediaId: {
        'type': 'number'
    },
    mediaUrl: {
        'type': 'string',
        'source': 'attribute',
        'selector': 'figure video,figure img',
        'attribute': 'src'
    },
    mediaType: {
        'type': 'string'
    },
    mediaWidth: {
        'type': 'number',
        'default': 50
    },
    mediaHeight: {
        'type': 'number',
        'default': 50
    },
    width: {
        'type': 'number',
        'default': 50
    },
    height: {
        'type': 'number',
        'default': 50
    },
    isStackedOnMobile: {
        'type': 'boolean',
        'default': false
    },
    verticalAlignment: {
        'type': 'string',
        default: 'middle',
    },
    imageFill: {
        'type': 'boolean'
    },
    focalPoint: {
        'type': 'object'
    }
};
export default attributes;
