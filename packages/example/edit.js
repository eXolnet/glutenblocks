import PropTypes from 'prop-types';

const { Component } = wp.element;

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
