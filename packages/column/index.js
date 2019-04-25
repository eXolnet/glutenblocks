/**
 * Internal dependencies
 */
import attributes from './attributes';
import edit from './edit';
import save from './save';
import icons from '../globals/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;


export const name = 'glutenblocks/column';

export const settings = {
    title: __('Column'),

    parent: ['glutenblocks/row'],

    icon: icons.blockColumn,

    description: __('A single column within a row block.'),

    category: 'glutenblocks',

    supports: {
        inserter: false,
        reusable: false,
        html: false,
    },

    attributes : attributes,

    edit,

    save,
};
