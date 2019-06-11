/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import attributes from './attributes';
import icons from '../globals/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export const name = 'glutenblocks/link';

export const settings = {
    title: __('Link', 'glutenblocks'),
    parent: ['glutenblocks/listLink'],
    description: __('A Glutenblock link'),
    icon: icons.link,
    category: 'glutenblocks',
    attributes: attributes,
    edit,
    save({ attributes, className }) {
        return null;
    },
    deprecated,
};
