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
const { __ } = wp.i18n;

export const name = 'glutenblocks/youtube-embed';

export const settings = {
    title: __('Youtube Embed', 'glutenblocks'),
    description: __('A Glutenblock link'),
    icon: icons.youtube,
    category: 'glutenblocks',
    supports: {
        align: ['left', 'center', 'right', 'full', 'wide'],
        html: false,
    },
    attributes,
    edit,
    save,
    deprecated,
};
