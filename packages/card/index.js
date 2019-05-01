/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import save from './save';
import attributes from './attributes';
import icons from '../globals/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export const name = 'glutenblocks/card';

export const settings = {
    title: __('Card', 'glutenblocks'),
    description: __('A Glutenblock card'),
    icon: icons.card,
    category: 'glutenblocks',
    attributes: attributes,
    edit,
    save,
    deprecated,
};
