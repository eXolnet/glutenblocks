/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import save from './save';
import attributes from './attributes';
import icons from '../globals/icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { settings as jumbotronSettings } from '../jumbotron';

export const name = 'glutenblocks/jumbotron-carousel';

export const settings = {
    ...jumbotronSettings,

    title: __('Jumbotron Carousel', 'glutenblocks'),
    description: __('A Glutenblock jumbotron carousel'),
    icon: icons.jumbotron,
    attributes,
    edit,
    save,
    deprecated,
};
