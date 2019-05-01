/**
 * BLOCK: Glutenblock Link Attributes
 */
const attributes = {
    link: {
        type: 'String',
        default: '',
    },
    text : {
        type: 'String',
        default: '',
    },
    type : {
        type: 'String',
        default: 'visit',
    },
    actionText : {
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
};
export default attributes;
