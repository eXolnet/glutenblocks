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
        defaults: '',
    },
    url: {
        type: 'string',
        defaults: ''
    },
    poster: {
        type: 'object',
        defaults: null
    },
    enableCaption: {
        type: 'boolean',
        defaults: false
    },
    ccLang: {
        type: 'string',
        defaults: ''
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
