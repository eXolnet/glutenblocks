/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import icons from '../globals/icons';
import attributes from './attributes';
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'glutenblocks/responsive-image';

export const settings = {
    title: __('Responsive Image', 'glutenblocks'),
    description: __('An Image Formatter'),
    icon: icons.responsiveImage ,
    category: 'glutenblocks',
    attributes: attributes,
    edit,
    save,
    deprecated
};
