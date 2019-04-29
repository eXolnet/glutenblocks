/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import attributes from './attributes';
import icons from '../globals/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export const name = 'glutenblocks/hero';

export const settings = {
    title: __('Hero', 'glutenblocks'),
    description: __('A Hero Block'),
    icon: icons.hero,
    category: 'glutenblocks',
    attributes: attributes,
    supports: {
        align: ['full', 'wide'],
        html: false,
    },
    edit,
    save,
};
