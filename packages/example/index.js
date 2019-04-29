/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import save from './save';
import attributes from './attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export const name = 'glutenblocks/example';

export const settings = {
    title: __('Example', 'glutenblocks'),
    description: __('A Glutenblock example'),
    icon: 'slides',
    category: 'glutenblocks',
    attributes: attributes,
    edit,
    save,
    deprecated,
};
