/**
 * BLOCK: Glutenblock Button Attributes
 */

import utils from '../globals/utils';

const colorOptions = utils.buttonColors();
const shapeOptions = utils.buttonShapes();

const attributes = {
    color: {
        type: 'String',
        default: colorOptions.length > 0 ? colorOptions[0].value : '',
    },
    colorInverse: {
        type: 'Boolean',
        default: false,
    },
    shape: {
        type: 'String',
        default: shapeOptions.length > 0 ? shapeOptions[0].value : '',
    },
    size: {
        type: 'String',
        default: '',
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
    type : {
        type: 'String',
        default: 'visit',
    },
    customPostType : {
        type: 'String',
        default: '',
    },
    customPostObjectID : {
        type: 'String',
        default: '',
    },
    customPostAttribute : {
        type: 'String',
        default: '',
    }
};

export default attributes;
