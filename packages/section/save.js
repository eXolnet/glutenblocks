/**
 * BLOCK: Glutenblock Hero
 */

const {
    Component
} = wp.element;
const {
    InnerBlocks,
} = wp.editor;

import classnames from 'classnames';
import PropTypes from 'prop-types';

class GlutenblocksHeroSave extends Component {
    render() {
        const { attributes: { theme, sectionId } } = this.props;

        const classes = classnames(`gb-section gb-section--theme-${theme}`);

        return (
            <section className={classes} id={sectionId ? sectionId : undefined}>
                <div className="gb-section__content">
                    <InnerBlocks.Content/>
                </div>
            </section>
        );
    }
}

GlutenblocksHeroSave.propTypes = {
    attributes: PropTypes.object
};

export default GlutenblocksHeroSave;
