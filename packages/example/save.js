import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock example
 */

const {
    Component
} = wp.element;

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
