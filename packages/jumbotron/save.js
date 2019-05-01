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
                theme, text, link, target, noFollow, icon, iconSide,
                supportButton,
                supportTheme, supportText, supportLink, supportTarget, supportNoFollow
            },
        } = this.props;
        const classes = classnames('gb-jumbotron');

        let relAttr = 'noopener noreferrer';

        if (supportNoFollow) {
            relAttr = relAttr + ' nofollow';
        }

        return (
            <div className={classes}>
                <InnerBlocks.Content/>
                {(scrollTo || callToAction) && (
                    <footer className={'gb-jumbotron__footer'}>
                        {scrollTo && (
                            <a className={`gb-button gb-button--${scrollToTheme} gb-jumbotron__scroll-to`} href={scrollToAnchor} style={{ color : scrollToColor ? scrollToColor : undefined }}>{ scrollToText }</a>
                        )}
                        <div className={'gb-button-wrapper'}>
                            {supportButton && (
                                <div className={'wp-block-glutenblocks-button gb-button-wrapper'}>
                                    <a href={ (supportLink ? supportLink : '#') } target={ (supportTarget ? supportTarget : undefined) } className={`gb-button gb-button--inverse is-style-squared gb-button--${ supportTheme }`} rel={ relAttr }>
                                        { supportText }
                                    </a>
                                </div>
                            )}
                            {callToAction && (
                                <Button className={'is-style-squared gb-jumbotron__call-to-action'} { ...{ attributes:{ theme, text, link, target, noFollow, icon, iconSide } } }/>
                            )}
                        </div>
                    </footer>
                )}
            </div>
        );
    }
}

GlutenblocksJumbotronSave.propTypes = {
    attributes: PropTypes.object
};

export default GlutenblocksJumbotronSave;
