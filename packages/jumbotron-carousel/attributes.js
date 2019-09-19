import jumbotronAttributes from '../jumbotron/attributes';

const attributes = {
    ...jumbotronAttributes,

    uniqueId: {
        type: 'string',
        default: null,
    },
    numberOfSlides: {
        type: 'number',
        default: 3,
    },
    autoplayDelay: {
        type: 'number',
        default: 5,
    }
};

export default attributes;
