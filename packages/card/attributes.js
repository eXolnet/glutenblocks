/**
 * BLOCK: Glutenblock Card Attributes
 */
const attributes = {
    posts: {
        type: 'array',
        default: []
    },
    target: {
        type: 'String',
        default: '_self',
    },
    noFollow: {
        type: 'Boolean',
        default: false,
    },
};
export default attributes;
