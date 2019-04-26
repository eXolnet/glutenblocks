/**
 * BLOCK: Glutenblock Button Attributes
 */
const attributes = {
    theme: {
        type: 'String',
        default: 'dark',
    },
    text: {
        type: 'String',
        default: '',
    },
    link: {
        type: 'String',
        default: '',
    },
    target: {
        type: 'String',
        default: '_self',
    },
    noFollow: {
        type: 'Boolean',
        default: false,
    },
    icon: {
        type: 'String',
        default: '',
    },
    iconSide: {
        type: 'String',
        default: 'right',
    }
};
export default attributes;
