import heroAttributes from '../hero/attributes';

const attributes = {
    ...heroAttributes,

    /**
     * Scroll To
     */
    scrollTo: {
        type: 'Boolean',
        default: true
    },

    scrollToAnchor: {
        type: 'String',
        default: '',
    },

    scrollToText: {
        type: 'String',
        default: '',
    },
};

export default attributes;
