/**
 * BLOCK: Glutenblock responsive-image Attributes
 */

import radiusUnit from './radiusUnit';

const sizeObject = {
    url: {
        type: 'string',
        default: ''
    },
    alt: {
        type: 'string',
        default: ''
    },
    width: {
        type: 'number',
        default: 0
    },
    height: {
        type: 'number',
        default: 0
    },
    radius: {
        type: 'number',
        default: 0
    },
    radiusUnit: {
        type: 'string',
        default: 'px',
        enum: radiusUnit
    }
};

// Create an object with the default of each property.
// { url: '', alt: '', width: 0, ... }
const defaultSizeObject = Object.assign(...Object.entries(sizeObject).map(([k, v]) => ({ [k]: v.default })));

const attributes = {
    desktop: {
        type: 'object',
        properties: sizeObject,
        default: defaultSizeObject
    },
    tablet: {
        type: 'object',
        properties: sizeObject,
        default: defaultSizeObject
    },
    mobile: {
        type: 'object',
        properties: sizeObject,
        default: defaultSizeObject
    },
};

export default attributes;
