import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock Column
 */

import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

class GlutenblocksColumnSave extends Component {
    render() {
        const { attributes: { uniqueID, verticalAlignment, colClasses, tabletColClasses, mobileColClasses, override } } = this.props;

        const baseClasses = {
            [ `valign-${ verticalAlignment }` ]: verticalAlignment,
        };

        if (! override) {
            baseClasses[`${colClasses}`] = colClasses;
            baseClasses[`${tabletColClasses}`] = tabletColClasses;
            baseClasses[`${mobileColClasses}`] = mobileColClasses;
        }

        const classes = classnames(baseClasses);

        return (
            <div id={ `glutenblocks-column${ uniqueID }` }  className={ classes }>
                <InnerBlocks.Content />
            </div>
        );
    }
}

GlutenblocksColumnSave.propTypes = {
    attributes: PropTypes.object,
};

export default GlutenblocksColumnSave;
