/**
 * Internal dependencies
 */

// Import blocks here

/**
 * WordPress dependencies
 */

const {
    registerBlockType,
    unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} = wp.blocks;

/**
 * Function to register core blocks provided by the block editor.
 */

(function registerGlutenblocks() {
    [
        // Empty for now since there is no blocks in the package
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
