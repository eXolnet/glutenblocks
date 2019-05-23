/**
 * BLOCK: Glutenblock Youtube Embed Attributes
 */
const attributes = {
    playBgColor: {
        type: 'string',
        default: '',
    },
    playIconColor: {
        type: 'string',
        default: '',
    },
    url: {
        type: 'string',
        default: ''
    },
    poster: {
        type: 'object',
        default: null
    },
    enableCaption: {
        type: 'boolean',
        default: false
    },
    ccLang: {
        type: 'string',
        default: ''
    },
    start: {
        type: 'string',
        default: null
    },
    end: {
        type: 'string',
        default: null
    }
};

export default attributes;
