/**
 * Internal dependencies
 */

// Import blocks here
const button = require('./button');
const buttonGroup = require('./button-group');
const responsiveImage = require('./responsive-image');
const card = require('./card');
const carouselBlock = require('./carousel-block');
const column = require('./column');
const collapse = require('./collapse');
const hero = require('./hero');
const jumbotron = require('./jumbotron');
const jumbotronCarousel = require('./jumbotron-carousel');
const link = require('./link');
const listLink = require('./list-link');
const media = require('./media');
const row = require('./row');
const section = require('./section');
const youtubeEmbed = require('./youtube-embed');

/**
 * WordPress dependencies
 */

import {
    registerBlockType,
    unregisterBlockType,
    unstable__bootstrapServerSideBlockDefinitions // eslint-disable-line camelcase
} from '@wordpress/blocks';

/**
 * This array define the list of blocks to unregister.
 */
const BLOCKS_TO_UNREGISTER = [
    // 'core/column',
    // 'core/columns',
];

/**
 * Function to register core blocks provided by the block editor.
 */

(function registerGlutenblocks() {
    [
        button,
        buttonGroup,
        responsiveImage,
        jumbotron,
        jumbotronCarousel,
        card,
        carouselBlock,
        column,
        collapse,
        hero,
        link,
        listLink,
        media,
        row,
        section,
        youtubeEmbed
    ].forEach(block => {
        if (!block) {
            return;
        }
        const { metadata, settings, name } = block;
        if (metadata) {
            unstable__bootstrapServerSideBlockDefinitions({ [name]: metadata }); // eslint-disable-line camelcase
        }
        registerBlockType(name, settings);
    });
})();

/**
 * Unregister core blocks.
 */

window.addEventListener('load', function unregisterBlocks() {
    BLOCKS_TO_UNREGISTER.forEach(unregisterBlockType);
});
