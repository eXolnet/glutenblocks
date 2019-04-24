/**
 * Internal dependencies
 */

// Import blocks here
const row = require('./row');
const column = require('./column');
const hero = require('./hero');

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
        row,
        column,
        hero,
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
