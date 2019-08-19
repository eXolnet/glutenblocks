import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock example
 */

import { Component } from '@wordpress/element';

class GlutenblocksExampleSave extends Component {
    render() {
        const { className } = this.props;
        return (
            <div className={ className } >
                Hello Glutenblocks!
            </div>
        );
    }
}

GlutenblocksExampleSave.propTypes = {
    className: PropTypes.string
};

export default GlutenblocksExampleSave;
