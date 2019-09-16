/**
 * Internal dependencies
 */
import attributes from './attributes';
import edit from './edit';
import save from './save';
import icons from '../globals/icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';


export const name = 'glutenblocks/carousel-block';

export const settings = {
    title: __('Carousel Block'),
    parent: ['glutenblocks/jumbotron-carousel'],
    icon: icons.blockColumn,
    description: __('A single carousel block.'),
    category: 'glutenblocks',

    supports: {
        inserter: false,
        reusable: false,
        html: false,
    },

    attributes : attributes,
    edit,
    save,
};
