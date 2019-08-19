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
import { settings as heroSettings } from '../hero';

export const name = 'glutenblocks/jumbotron';

export const settings = {
    ...heroSettings,

    title: __('Jumbotron', 'glutenblocks'),
    description: __('A Glutenblock jumbotron'),
    icon: icons.jumbotron,
    attributes,
    edit,
    save,
    deprecated,
};
