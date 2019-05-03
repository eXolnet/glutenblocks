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

class GlutenblocksJumbotronSave extends Component {
    render() {
        const {
            attributes: {
                jumbotronTheme,
                scrollTo,
                scrollToAnchor,
                scrollToText,
                scrollToTheme,
                callToAction,
                theme, text, link, target, noFollow,
                supportButton,
                supportTheme, supportText, supportLink, supportTarget, supportNoFollow
            },
        } = this.props;
        const classes = classnames('gb-jumbotron', `gb-jumbotron--${jumbotronTheme}`);

        let relAttr = 'noopener noreferrer';
        let relAttrSupport = relAttr;

        if (supportNoFollow) {
            relAttrSupport = relAttrSupport + ' nofollow';
        }

        if (noFollow) {
            relAttr = relAttr + ' nofollow';
        }

        let scrollToHref = scrollToAnchor || '#gb-jumbotron-end';


        return (
            <div className={classes}>
                <InnerBlocks.Content/>
                {(scrollTo || callToAction || supportButton) && (
                    <footer className={'gb-jumbotron__footer'}>
                        {scrollTo && (
                            <a className={`gb-button gb-button--${scrollToTheme} gb-jumbotron__scroll-to`} href={scrollToHref}>{ scrollToText }</a>
                        )}
                        <div className={'gb-button-wrapper'}>
                            {supportButton && (
                                <div className={'wp-block-glutenblocks-button gb-button-wrapper'}>
                                    <a href={ (supportLink ? supportLink : '#') } target={ (supportTarget ? supportTarget : undefined) } className={`gb-button gb-button--inverse is-style-squared gb-button--${ supportTheme }`} rel={ relAttrSupport }>
                                        { supportText }
                                    </a>
                                </div>
                            )}
                            {callToAction && (
                                <div className={'wp-block-glutenblocks-button gb-button-wrapper'}>
                                    <a href={ (link ? link : '#') } target={ (target ? target : undefined) } className={`gb-button is-style-squared gb-jumbotron__call-to-action gb-button--${ theme }`} rel={ relAttr }>
                                        { text }
                                    </a>
                                </div>
                            )}
                        </div>
                    </footer>
                )}
                {scrollTo && (
                    <a href={'#gb-jumbotron-end'} id={'gb-jumbotron-end'} aria-hidden={'true'} className={'gb-jumbotron__anchor'}/>
                )}
            </div>
        );
    }
}

GlutenblocksJumbotronSave.propTypes = {
    attributes: PropTypes.object
};

export default GlutenblocksJumbotronSave;
