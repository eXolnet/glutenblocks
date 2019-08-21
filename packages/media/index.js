/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import icons from '../globals/icons';
import attributes from './attributes';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'glutenblocks/media';

export const settings = {
    title: __('Media Text', 'glutenblocks'),
    description: __('A Glutenblock media'),
    icon: icons.media,
    category: 'glutenblocks',
    attributes: attributes,
    supports: {
        align: ['full', 'wide'],
        html: false,
    },
    edit,
    save,
};
