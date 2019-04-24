import PropTypes from 'prop-types';
import memoize from 'memize';

const { __ } = wp.i18n;
const { Button, Dashicon, PanelBody, RangeControl, Tooltip, TabPanel, SelectControl } = wp.components;
const { Component, Fragment } = wp.element;
const { InspectorControls, InnerBlocks, MediaUpload, ColorPalette } = wp.editor;

const overlayOpacityOutput = memoize((opacity) => {
    if (opacity < 10) {
        return '0.0' + opacity;
    } else if (opacity >= 100) {
        return '1';
    }
    return '0.' + opacity;
});

class GlutenblocksHeroEdit extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const { attributes: { bgColor, bgImg, bgImgID, bgImgSize, overlayOpacity, overlayBgImg, overlayBgImgAttachment, overlayBgImgID, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgSize, currentOverlayTab, overlayBlendMode, overlayGradAngle, overlayGradLoc, overlayGradLocSecond, overlayGradType, overlay, overlaySecond }, className, setAttributes } = this.props;

        const overlayType = (!currentOverlayTab || 'grad' !== currentOverlayTab ? 'normal' : 'gradient');

        const onSelectImage = img => {
            setAttributes({
                bgImgID: img.id,
                bgImg: img.url,
                bgImgAlt: img.alt,
                bgImgWidth: img.width,
                bgImgHeight: img.height,
            });
        };
        const onSelectOverlayImage = img => {
            setAttributes({
                overlayBgImgID: img.id,
                overlayBgImg: img.url,
            });
        };

        const onRemoveImage = () => {
            setAttributes({
                bgImgID: null,
                bgImg: null,
                bgImgAlt: null,
                bgImgWidth: null,
                bgImgHeight: null,
            });
        };

        const onOverlayTabSelect = (tabName) => {
            setAttributes({ currentOverlayTab: tabName });
        };
        const onRemoveOverlayImage = () => {
            setAttributes({
                overlayBgImgID: null,
                overlayBgImg: null,
            });
        };

        const overControls = (
            <Fragment>
                <RangeControl
                    label={ __('Overlay Opacity') }
                    value={ overlayOpacity }
                    onChange={ (value) => {
                        setAttributes({
                            overlayOpacity: value,
                        });
                    } }
                    min={ 0 }
                    max={ 100 }
                />
                <p>{ __('Overlay Color') }</p>
                <ColorPalette
                    value={ overlay }
                    onChange={ value => setAttributes({ overlay: value }) }
                />
                <MediaUpload
                    onSelect={ onSelectOverlayImage }
                    type="image"
                    value={ overlayBgImgID }
                    render={ ({ open }) => (
                        <Button
                            className={ 'components-button components-icon-button gb-hero-cta-upload-btn' }
                            onClick={ open }
                        >
                            <Dashicon icon="format-image" />
                            { __('Select Image') }
                        </Button>
                    ) }
                />
                { overlayBgImg && (
                    <Tooltip text={ __('Remove Image') }>
                        <Button
                            className={ 'components-button components-icon-button gb-hero-remove-img gb-hero-cta-upload-btn' }
                            onClick={ onRemoveOverlayImage }
                        >
                            <Dashicon icon="no-alt" />
                        </Button>
                    </Tooltip>
                ) }
                <SelectControl
                    label={ __('Background Image Size') }
                    value={ overlayBgImgSize }
                    options={ [
                        { value: 'cover', label: __('Cover') },
                        { value: 'contain', label: __('Contain') },
                        { value: 'auto', label: __('Auto') },
                    ] }
                    onChange={ value => setAttributes({ overlayBgImgSize: value }) }
                />
                <SelectControl
                    label={ __('Background Image Position') }
                    value={ overlayBgImgPosition }
                    options={ [
                        { value: 'center top', label: __('Center Top') },
                        { value: 'center center', label: __('Center Center') },
                        { value: 'center bottom', label: __('Center Bottom') },
                        { value: 'left top', label: __('Left Top') },
                        { value: 'left center', label: __('Left Center') },
                        { value: 'left bottom', label: __('Left Bottom') },
                        { value: 'right top', label: __('Right Top') },
                        { value: 'right center', label: __('Right Center') },
                        { value: 'right bottom', label: __('Right Bottom') },
                    ] }
                    onChange={ value => setAttributes({ overlayBgImgPosition: value }) }
                />
                <SelectControl
                    label={ __('Background Image Repeat') }
                    value={ overlayBgImgRepeat }
                    options={ [
                        { value: 'no-repeat', label: __('No Repeat') },
                        { value: 'repeat', label: __('Repeat') },
                        { value: 'repeat-x', label: __('Repeat-x') },
                        { value: 'repeat-y', label: __('Repeat-y') },
                    ] }
                    onChange={ value => setAttributes({ overlayBgImgRepeat: value }) }
                />
                <SelectControl
                    label={ __('Background Image Attachment') }
                    value={ overlayBgImgAttachment }
                    options={ [
                        { value: 'scroll', label: __('Scroll') },
                        { value: 'fixed', label: __('Fixed') },
                    ] }
                    onChange={ value => setAttributes({ overlayBgImgAttachment: value }) }
                />
                <SelectControl
                    label={ __('Blend Mode') }
                    value={ overlayBlendMode }
                    options={ [
                        { value: 'normal', label: __('Normal') },
                        { value: 'multiply', label: __('Multiply') },
                        { value: 'screen', label: __('Screen') },
                        { value: 'overlay', label: __('Overlay') },
                        { value: 'darken', label: __('Darken') },
                        { value: 'lighten', label: __('Lighten') },
                        { value: 'color-dodge', label: __('Color Dodge') },
                        { value: 'color-burn', label: __('Color Burn') },
                        { value: 'difference', label: __('Difference') },
                        { value: 'exclusion', label: __('Exclusion') },
                        { value: 'hue', label: __('Hue') },
                        { value: 'saturation', label: __('Saturation') },
                        { value: 'color', label: __('Color') },
                        { value: 'luminosity', label: __('Luminosity') },

                    ] }
                    onChange={ value => setAttributes({ overlayBlendMode: value }) }
                />
                <p>{ __('Notice: Blend Mode not supported in all browsers') }</p>
            </Fragment>
        );
        const overGradControls = (
            <div>
                <RangeControl
                    label={ __('Overlay Opacity') }
                    value={ overlayOpacity }
                    onChange={ (value) => {
                        setAttributes({
                            overlayOpacity: value,
                        });
                    } }
                    min={ 0 }
                    max={ 100 }
                />
                <p>{ __('Color') }</p>
                <ColorPalette
                    value={ overlay }
                    onChange={ value => setAttributes({ overlay: value }) }
                />
                <RangeControl
                    label={ __('Location') }
                    value={ overlayGradLoc }
                    onChange={ (value) => {
                        setAttributes({
                            overlayGradLoc: value,
                        });
                    } }
                    min={ 0 }
                    max={ 100 }
                />
                <p>{ __('Second Color') }</p>
                <ColorPalette
                    value={ overlaySecond }
                    onChange={ value => setAttributes({ overlaySecond: value }) }
                />
                <RangeControl
                    label={ __('Location') }
                    value={ overlayGradLocSecond }
                    onChange={ (value) => {
                        setAttributes({
                            overlayGradLocSecond: value,
                        });
                    } }
                    min={ 0 }
                    max={ 100 }
                />
                <SelectControl
                    label={ __('Gradient Type') }
                    value={ overlayGradType }
                    options={ [
                        { value: 'linear', label: __('Linear') },
                        { value: 'radial', label: __('Radial') },
                    ] }
                    onChange={ value => setAttributes({ overlayGradType: value }) }
                />
                { overlayGradType && 'linear' === overlayGradType && (
                    <RangeControl
                        label={ __('Gradient Angle') }
                        value={ overlayGradAngle }
                        onChange={ (value) => {
                            setAttributes({
                                overlayGradAngle: value,
                            });
                        } }
                        min={ 0 }
                        max={ 360 }
                    />
                ) }
                { overlayGradType && 'radial' === overlayGradType && (
                    <SelectControl
                        label={ __('Gradient Position') }
                        value={ overlayBgImgPosition }
                        options={ [
                            { value: 'center top', label: __('Center Top') },
                            { value: 'center center', label: __('Center Center') },
                            { value: 'center bottom', label: __('Center Bottom') },
                            { value: 'left top', label: __('Left Top') },
                            { value: 'left center', label: __('Left Center') },
                            { value: 'left bottom', label: __('Left Bottom') },
                            { value: 'right top', label: __('Right Top') },
                            { value: 'right center', label: __('Right Center') },
                            { value: 'right bottom', label: __('Right Bottom') },
                        ] }
                        onChange={ value => setAttributes({ overlayBgImgPosition: value }) }
                    />
                ) }
                <SelectControl
                    label={ __('Blend Mode') }
                    value={ overlayBlendMode }
                    options={ [
                        { value: 'normal', label: __('Normal') },
                        { value: 'multiply', label: __('Multiply') },
                        { value: 'screen', label: __('Screen') },
                        { value: 'overlay', label: __('Overlay') },
                        { value: 'darken', label: __('Darken') },
                        { value: 'lighten', label: __('Lighten') },
                        { value: 'color-dodge', label: __('Color Dodge') },
                        { value: 'color-burn', label: __('Color Burn') },
                        { value: 'difference', label: __('Difference') },
                        { value: 'exclusion', label: __('Exclusion') },
                        { value: 'hue', label: __('Hue') },
                        { value: 'saturation', label: __('Saturation') },
                        { value: 'color', label: __('Color') },
                        { value: 'luminosity', label: __('Luminosity') },

                    ] }
                    onChange={ value => setAttributes({ overlayBlendMode: value }) }
                />
                <p>{ __('Notice: Blend Mode not supported in all browsers') }</p>
            </div>
        );

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={ __('Background Settings') }
                        initialOpen={ false }
                    >
                        <p>{ __('Background Color') }</p>
                        <ColorPalette
                            value={ bgColor }
                            onChange={ value => setAttributes({ bgColor: value }) }
                        />
                        <p>{ __('Background Image') }</p>
                        <MediaUpload
                            onSelect={ onSelectImage }
                            type="image"
                            value={ bgImgID }
                            render={ ({ open }) => (
                                <Button
                                    className={ 'components-button components-icon-button gb-hero-cta-upload-btn' }
                                    onClick={ open }
                                >
                                    <Dashicon icon="format-image" />
                                    { __('Select Image') }
                                </Button>
                            ) }
                        />
                        { bgImg && (
                            <Tooltip text={ __('Remove Image') }>
                                <Button
                                    className={ 'components-button components-icon-button gb-hero-remove-img gb-hero-cta-upload-btn' }
                                    onClick={ onRemoveImage }
                                >
                                    <Dashicon icon="no-alt" />
                                </Button>
                            </Tooltip>
                        ) }
                        <SelectControl
                            label={ __('Background Image Size') }
                            value={ bgImgSize }
                            options={ [
                                { value: 'cover', label: __('Cover') },
                                { value: 'contain', label: __('Contain') },
                                { value: 'auto', label: __('Auto') },
                            ] }
                            onChange={ value => setAttributes({ bgImgSize: value }) }
                        />
                    </PanelBody>
                    <PanelBody
                        title={ __('Background Overlay Settings') }
                        initialOpen={ false }
                    >
                        <TabPanel className="gb-hero-inspect-tabs gb-hero-gradient-tabs"
                            activeClass="active-tab"
                            initialTabName={ currentOverlayTab }
                            onSelect={ onOverlayTabSelect }
                            tabs={ [
                                {
                                    name: 'normal',
                                    title: __('Normal'),
                                    className: 'gb-hero-over-normal',
                                },
                                {
                                    name: 'grad',
                                    title: __('Gradient'),
                                    className: 'gb-hero-over-grad',
                                },
                            ] }>
                            {
                                (tab) => {
                                    let tabout;
                                    if (tab.name) {
                                        if ('grad' === tab.name) {
                                            tabout = overGradControls;
                                        } else {
                                            tabout = overControls;
                                        }
                                    }
                                    return <div>{ tabout }</div>;
                                }
                            }
                        </TabPanel>
                    </PanelBody>
                </InspectorControls>
                <div className={ className } >
                    <div
                        className={'gb-hero-background'}
                        style={{
                            backgroundColor: (bgColor ? bgColor : undefined),
                            backgroundImage: (bgImg ? `url(${bgImg})` : undefined),
                            backgroundSize: bgImgSize,
                        }}/>
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
                    <InnerBlocks templateLock={ false } />
                </div>
            </Fragment>
        );
    }
}

GlutenblocksHeroEdit.propTypes = {
    clientId: PropTypes.string,
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string
};

export default (
    GlutenblocksHeroEdit
);
