/**
 * BLOCK: Glutenblock Jumbotron Attributes
 */
const attributes = {
    align: {
        type: 'String',
        default: 'full',
    },
    scrollTo: {
        type: 'Boolean',
        default: true
    },
    scrollToAnchor: {
        type: 'String',
        default: '#main',
    },
    scrollToColor: {
        type: 'String',
        default: '',
    },
    scrollToText: {
        type: 'String',
        default: '',
    },
    scrollToTheme: {
        type: 'String',
        default: 'link',
    },
    callToAction: {
        type: 'Boolean',
        default: true
    },
    theme: {
        type: 'String',
        default: 'primary',
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
    },
    supportButton: {
        type: 'Boolean',
        default: false
    },
    supportTheme: {
        type: 'String',
        default: 'light',
    },
    supportText: {
        type: 'String',
        default: '',
    },
    supportLink: {
        type: 'String',
        default: '',
    },
    supportTarget: {
        type: 'String',
        default: '_self',
    },
    supportNoFollow: {
        type: 'Boolean',
        default: false,
    },

};
export default attributes;
