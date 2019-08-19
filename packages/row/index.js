/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import attributes from './attributes';
import edit from './edit';
import save from './save';
import icons from '../globals/icons';

export const name = 'glutenblocks/row';

export const settings = {
    title: __('Row', 'glutenblocks'),

    icon: icons.row,

    category: 'glutenblocks',

    attributes: attributes,

    description: __('Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'),

    supports: {
        align: ['full'],
        html: false,
    },

    edit,

    save,
};
