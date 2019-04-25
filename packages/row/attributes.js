/**
 * BLOCK: Glutenblock Row Attributes
 */
const attributes = {
    uniqueID: {
        type: 'string',
        default: '',
    },
    columns: {
        type: 'number',
        default: 2,
    },
    colLayout: {
        type: 'string',
        default: '6-6',
    },
    mobileLayout: {
        type: 'string',
        default: '12-12',
    },
    tabletLayout: {
        type: 'string',
        default: '6-6',
    },
    blockAlignment: {
        type: 'string',
        default: 'none',
    },
    verticalAlignment: {
        type: 'string',
        default: 'top',
    },
    currentTab: {
        type: 'string',
        default: 'desk',
    },
};
export default attributes;
