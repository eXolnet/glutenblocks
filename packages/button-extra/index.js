/**
 * Internal dependencies
 */
import edit from './edit';
import attributes from './attributes';
import icons from '../globals/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export const name = 'glutenblocks/button-extra';

export const settings = {
    title: __('Button Extra', 'glutenblocks'),
    description: __('A Button Block that contain the possibility to link custom post type'),
    icon: icons.button,
    category: 'glutenblocks',
    attributes: attributes,
    supports: {
        align: ['left', 'right', 'center'],
        html: false,
    },
    edit,
    save({ attributes, className }) {
        return null;
    },
};
