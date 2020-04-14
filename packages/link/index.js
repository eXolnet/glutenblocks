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
import { __ } from '@wordpress/i18n';

export const name = 'glutenblocks/link';

export const settings = {
    title: __('Link', 'glutenblocks'),
    parent: ['glutenblocks/listLink'],
    description: __('A Glutenblock link'),
    icon: icons.link,
    category: 'glutenblocks',
    attributes: attributes,
    supports: {
        html: false,
    },
    edit,
    save({ attributes, className }) {
        return null;
    },
    deprecated,
};
