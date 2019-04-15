/**
 * BLOCK: Glutenblock Column Attributes
 */
const attributes = {
    id: {
        type: 'number',
        default: 1,
    },

    uniqueID: {
        type: 'string',
        default: '',
    },

    verticalAlignment: {
        type: 'string',
        default: '',
    },

    colClasses: {
        type: 'string',
        default: 'col-lg-6',
    },
    tabletColClasses: {
        type: 'string',
        default: 'col-md-6',
    },
    mobileColClasses: {
        type: 'string',
        default: 'col-sm-12',
    },
};
export default attributes;
