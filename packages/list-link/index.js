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

export const name = 'glutenblocks/listlink';

export const settings = {
    title: __('List Link', 'glutenblocks'),
    description: __('A Glutenblock listlink'),
    icon: icons.listlink,
    category: 'glutenblocks',
    attributes: attributes,
    edit,
    save,
    deprecated,
};
