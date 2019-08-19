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
import { __ } from '@wordpress/i18n';

export const name = 'glutenblocks/section';

export const settings = {
    title: __('Section', 'glutenblocks'),
    description: __('A Section Block'),
    icon: icons.section,
    category: 'glutenblocks',
    attributes: attributes,
    supports: {
        align: ['full', 'wide'],
        html: false,
    },
    edit,
    save,
};
