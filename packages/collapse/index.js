/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import attributes from './attributes';
import deprecated from './deprecated';

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
    attributes,
    deprecated,
    edit,
    save,
};
