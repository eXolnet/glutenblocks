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

export const name = 'glutenblocks/button-group';

export const settings = {
    title: __('Button Group', 'glutenblocks'),
    description: __('List multiple buttons side by side.'),
    icon: icons.buttonGroup,
    category: 'glutenblocks',
    attributes: attributes,
    supports: {
        align: ['left', 'right', 'center'],
        html: false,
    },
    edit,
    save,
};
