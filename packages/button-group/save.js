import classnames from 'classnames';

import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

import PropTypes from 'prop-types';

class GlutenblocksButtonGroupSave extends Component {
    render() {
        const { className } = this.props;

        return (
            <div className={ classnames(className, 'gb-button-group') }>
                <InnerBlocks.Content/>
            </div>
        );
    }
}

GlutenblocksButtonGroupSave.propTypes = {
    attributes: PropTypes.object,
    className: PropTypes.string,
};

export default GlutenblocksButtonGroupSave;
