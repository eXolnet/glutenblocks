import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock Column
 */

const {
    Component,
} = wp.element;
const {
    InnerBlocks,
} = wp.editor;

class GlutenblocksColumnSave extends Component {
    render() {
        const { attributes: { uniqueID, verticalAlignment, colClasses, tabletColClasses, mobileColClasses } } = this.props;

        const classes = classnames({
            [ `valign-${ verticalAlignment }` ]: verticalAlignment,
            [`${colClasses}`]: colClasses,
            [`${tabletColClasses}`]: tabletColClasses,
            [`${mobileColClasses}`]: mobileColClasses,
        });

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
