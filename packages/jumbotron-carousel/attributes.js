import jumbotronAttributes from '../jumbotron/attributes';

const imagesProperties = {
    key: {
        type: 'String',
        default: ''
    },
    url: {
        type: 'number',
        default: ''
    }
};

const attributes = {
    ...jumbotronAttributes,

    carouselImages: {
        type: 'array',
        items: {
            type: 'object',
            properties: imagesProperties,
        },
        default: [],
    },
    uniqueId: {
        type: 'string',
        default: null,
    },
    numberOfSlides: {
        type: 'number',
        default: 2,
    }
};

export default attributes;
