import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * BLOCK: Glutenblock listlink
 */

import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

class GlutenblocksListLinkSave extends Component {
    render() {
        const { className } = this.props;
        const classname = classnames(className, 'gb-list-links');
        return (
            <div className={classname}>
                <InnerBlocks.Content/>
            </div>
        );
    }
}

GlutenblocksListLinkSave.propTypes = {
    attributes: PropTypes.object,
    className: PropTypes.string
};

export default GlutenblocksListLinkSave;
