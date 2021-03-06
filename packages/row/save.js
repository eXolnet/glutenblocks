/**
 * BLOCK: Glutenblock Row
 */

import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

import classnames from 'classnames';
import PropTypes from 'prop-types';

class GlutenblocksRowSave extends Component {
    render() {
        const { attributes: { uniqueID, columns, colLayout, mobileLayout, tabletLayout, verticalAlignment } } = this.props;

        const layoutClass = (!colLayout ? 'equal' : colLayout);
        const tabLayoutClass = (!tabletLayout ? 'inherit' : tabletLayout);
        const mobileLayoutClass = (!mobileLayout ? 'inherit' : mobileLayout);
        const classId = (!uniqueID ? 'notset' : uniqueID);
        const classes = classnames(`gb-row gb-layout-id${classId} gb-row-has-${columns}-columns gb-row-valign-${verticalAlignment} gb-row-${layoutClass} gb-row-tablet-layout-${tabLayoutClass} gb-row-mobile-layout-${mobileLayoutClass}`);

        return (
            <div className={classes} id={`gb-layout-id${uniqueID}`}>
                <InnerBlocks.Content/>
            </div>
        );
    }
}

GlutenblocksRowSave.propTypes = {
    attributes: PropTypes.object
};

export default GlutenblocksRowSave;
