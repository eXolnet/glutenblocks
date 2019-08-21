import PropTypes from 'prop-types';

import { Component } from '@wordpress/element';

class GlutenblocksExampleEdit extends Component {
    render() {
        const {
            className,
        } = this.props;

        return (
            <div className={ className } >
                Hello Glutenblocks!
            </div>
        );
    }
}

GlutenblocksExampleEdit.propTypes = {
    className: PropTypes.string
};

export default (
    GlutenblocksExampleEdit
);
