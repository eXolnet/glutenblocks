/**
 * Internal dependencies
 */

// Import blocks here
const button = require('./button');
const button_extra = require('./button-extra');
const buttonGroup = require('./button-group');
const responsiveImage = require('./responsive-image');
const card = require('./card');
const column = require('./column');
const hero = require('./hero');
const jumbotron = require('./jumbotron');
const link = require('./link');
const listLink = require('./list-link');
const media = require('./media');
const row = require('./row');
const section = require('./section');
const youtubeEmbed = require('./youtube-embed');

/**
 * WordPress dependencies
 */

const {
    registerBlockType,
    unregisterBlockType,
    unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} = wp.blocks;

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
        button_extra,
        buttonGroup,
        responsiveImage,
        jumbotron,
        card,
        column,
        hero,
        link,
        listLink,
        media,
        row,
        section,
        youtubeEmbed
    ].forEach((block) => {
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
