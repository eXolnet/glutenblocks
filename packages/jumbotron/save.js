import classnames from 'classnames';

/**
 * BLOCK: Glutenblock Jumbotron
 */

const {
    Component
} = wp.element;
const {
    InnerBlocks,
} = wp.editor;

import PropTypes from 'prop-types';
import Button from '../button/save';


class GlutenblocksJumbotronSave extends Component {
    render() {
        const {
            attributes: {
                scrollTo,
                scrollToAnchor,
                scrollToColor,
                scrollToText,
                scrollToTheme,
                callToAction,
                theme, text, link, target, noFollow, icon, iconSide
            },
        } = this.props;
        const classes = classnames('gb-jumbotron');
        return (
            <div className={classes}>
                <InnerBlocks.Content/>
                {scrollTo && (
                    <a className={`gb-button gb-button--${scrollToTheme} gb-jumbotron__scroll-to`} href={scrollToAnchor} style={{ color : scrollToColor ? scrollToColor : undefined }}>{ scrollToText }</a>
                )}
                {callToAction && (
                    <Button className={'is-style-squared gb-jumbotron__call-to-action'} { ...{ attributes:{ theme, text, link, target, noFollow, icon, iconSide } } }/>
                )}
            </div>
        );
    }
}

GlutenblocksJumbotronSave.propTypes = {
    attributes: PropTypes.object
};

export default GlutenblocksJumbotronSave;
