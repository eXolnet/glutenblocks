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
const { __ } = wp.i18n;

export const name = 'glutenblocks/button';

export const settings = {
    title: __('Button', 'glutenblocks'),
    description: __('A Button Block'),
    icon: icons.button,
    category: 'glutenblocks',
    attributes: attributes,
    supports: {
        align: ['left', 'right', 'center'],
        html: false,
    },
    edit,
    save,
};
