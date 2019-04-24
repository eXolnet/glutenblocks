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
import memoize from 'memize';

const overlayOpacityOutput = memoize((opacity) => {
    if (opacity < 10) {
        return '0.0' + opacity;
    } else if (opacity >= 100) {
        return '1';
    }
    return '0.' + opacity;
});

class GlutenblocksHeroSave extends Component {
    render() {
        const { attributes: { bgColor, bgImg, bgImgId, bgImgAlt, bgImgWidth,bgImgHeight, bgImgSize, overlay, overlayBgImg, currentOverlayTab, overlayBgImgSize, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgAttachment, overlayBlendMode, overlayOpacity, overlayGradType, overlayGradAngle, overlayGradLoc, overlaySecond, overlayGradLocSecond } } = this.props;

        const hasBG = (bgColor || bgImg || overlay || overlayBgImg ? 'gb-hero-has-bg' : '');
        const overlayType = (!currentOverlayTab || 'grad' !== currentOverlayTab ? 'normal' : 'gradient');

        const classes = classnames(`gb-hero ${hasBG}`);

        return (
            <div className={classes}>
                {(hasBG !== '') && (
                    <figure className={'gb-hero-background'}>
                        <img
                            src={ bgImg }
                            alt={ bgImgAlt }
                            width={ bgImgWidth }
                            height={ bgImgHeight }
                            style={{
                                objectFit: bgImgSize,
                            }}
                            className={`wp-image-${bgImgId}`}
                        />
                    </figure>
                )}
                {((overlay || overlayBgImg) && overlayType === 'normal') && (
                    <div className={`gb-hero-overlay gb-hero-overlay-${overlayType}`} style={{
                        backgroundColor: (overlay ? overlay : undefined),
                        backgroundImage: (overlayBgImg ? `url(${overlayBgImg})` : undefined),
                        backgroundSize: overlayBgImgSize,
                        backgroundPosition: overlayBgImgPosition,
                        backgroundRepeat: overlayBgImgRepeat,
                        backgroundAttachment: overlayBgImgAttachment,
                        mixBlendMode: overlayBlendMode,
                        opacity: overlayOpacityOutput(overlayOpacity),
                    }}/>
                )}
                {((overlay || overlayBgImg) && overlayType !== 'normal') && (
                    <div className={`gb-hero-overlay gb-hero-overlay-${overlayType}`} style={{
                        backgroundImage: ('radial' === overlayGradType ? `radial-gradient(at ${overlayBgImgPosition}, ${overlay} ${overlayGradLoc}%, ${overlaySecond} ${overlayGradLocSecond}%)` : `linear-gradient(${overlayGradAngle}deg, ${overlay} ${overlayGradLoc}%, ${overlaySecond} ${overlayGradLocSecond}%)`),
                        mixBlendMode: overlayBlendMode,
                        opacity: overlayOpacityOutput(overlayOpacity),
                    }}/>
                )}
                <div className={'gb-hero-content'}>
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    }
}

GlutenblocksHeroSave.propTypes = {
    attributes: PropTypes.object
};

export default GlutenblocksHeroSave;
