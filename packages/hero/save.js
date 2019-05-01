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
        const { attributes: { bgColor, bgImg, bgImgId, bgImgAlt, bgImgWidth,bgImgHeight, bgImgSize, overlay, overlayBgImg, currentOverlayTab, overlayBgImgSize, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgAttachment, overlayBlendMode, overlayOpacity, overlayGradType, overlayGradAngle, overlayGradLoc, overlaySecond, overlayGradLocSecond, paddingUnit, paddingTop, paddingRight, paddingBottom, paddingLeft, marginUnit, marginTop, marginBottom, minHeightUnit, minHeight, maxWidthUnit, maxWidth, colorTheme, verticalAlignment } } = this.props;

        const hasBG = (bgColor || bgImg || overlay || overlayBgImg ? 'gb-hero--has-bg' : '');
        const overlayType = (!currentOverlayTab || 'grad' !== currentOverlayTab ? 'normal' : 'gradient');

        const classes = classnames(`gb-hero ${hasBG} gb-hero--theme-${colorTheme}`);

        return (
            <div className={classes} style={{
                paddingTop: (paddingTop ? paddingTop + paddingUnit : undefined),
                paddingRight: (paddingRight ? paddingRight + paddingUnit : undefined),
                paddingBottom: (paddingBottom ? paddingBottom + paddingUnit : undefined),
                paddingLeft: (paddingLeft ? paddingLeft + paddingUnit : undefined),
                marginTop: (marginTop ? marginTop + marginUnit : undefined),
                marginBottom: (marginBottom ? marginBottom + marginUnit : undefined),
                minHeight: (minHeight ? minHeight + minHeightUnit : undefined),
                backgroundColor: (bgColor ? bgColor : undefined),
            }}>
                {(bgImg !== '') && (
                    <figure className={'gb-hero__background'}>
                        <img
                            src={ bgImg }
                            alt={ bgImgAlt }
                            width={ bgImgWidth }
                            height={ bgImgHeight }
                            style={{
                                objectFit: bgImgSize,
                            }}
                            className={`gb-hero__background-image wp-image-${bgImgId}`}
                        />
                    </figure>
                )}
                {((overlay || overlayBgImg) && overlayType === 'normal') && (
                    <div className={`gb-hero__overlay gb-hero__overlay--${overlayType}`} style={{
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
                    <div className={`gb-hero__overlay gb-hero__overlay--${overlayType}`} style={{
                        backgroundImage: ('radial' === overlayGradType ? `radial-gradient(at ${overlayBgImgPosition}, ${overlay} ${overlayGradLoc}%, ${overlaySecond} ${overlayGradLocSecond}%)` : `linear-gradient(${overlayGradAngle}deg, ${overlay} ${overlayGradLoc}%, ${overlaySecond} ${overlayGradLocSecond}%)`),
                        mixBlendMode: overlayBlendMode,
                        opacity: overlayOpacityOutput(overlayOpacity),
                    }}/>
                )}
                <div className={`gb-hero__content gb-hero__content--valign-${verticalAlignment}`} style={{
                    maxWidth: (maxWidth ? maxWidth + maxWidthUnit : undefined),
                }}>
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
