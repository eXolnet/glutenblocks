/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export const name = 'glutenblocks/example';

const blockAttributes = {};

export const settings = {
    title: __('Example', 'glutenblocks'),
    description: __('A Glutenblock example'),
    icon: 'slides',
    category: 'glutenblocks',
    attributes: blockAttributes,
    edit,
    save() {
        return (
            <div className="glutenblocks-example">
                Hello Glutenblocks!
            </div>
        );
    },
    deprecated,
};
