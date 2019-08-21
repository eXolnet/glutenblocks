/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import attributes from './attributes';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'glutenblocks/collapse';

export const settings = {
    title: __('Collapse', 'glutenblocks'),
    description: __('Glutenblocks collapse component'),
    icon: 'slides',
    category: 'glutenblocks',
    attributes: attributes,
    edit,
    save,
};
