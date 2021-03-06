import PropTypes from 'prop-types';
import memoize from 'memize';
import map from 'lodash/map';
import icons from '../globals/icons';
import utils from '../globals/utils';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { Button, ButtonGroup, Dashicon, PanelBody, RangeControl, Tooltip, TabPanel, SelectControl, Toolbar } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, InnerBlocks, MediaUpload, ColorPalette, BlockControls } from '@wordpress/block-editor';

const overlayOpacityOutput = memoize((opacity) => {
    if (opacity < 10) {
        return '0.0' + opacity;
    } else if (opacity >= 100) {
        return '1';
    }
    return '0.' + opacity;
});

class GlutenblocksHeroEdit extends Component {
    getInnerBlocksTemplate() {
        return [
            ['core/paragraph'],
        ];
    }

    getHeroClassName() {
        const { attributes: { colorTheme }, className } = this.props;

        return classnames(className, `gb-hero gb-hero--theme-${colorTheme}`);
    }

    render() {
        return (
            <Fragment>
                <BlockControls>
                    {this.renderBlockControls()}
                </BlockControls>

                <InspectorControls>
                    {this.renderInspectorControls()}
                </InspectorControls>

                {this.renderHero()}
            </Fragment>
        );
    }

    renderBlockControls() {
        const { attributes: { verticalAlignment }, setAttributes } = this.props;

        return (
            <Fragment>
                <Toolbar>
                    <Tooltip text={__('Vertical Align Top')}>
                        <Button
                            className={classnames(
                                'components-icon-button',
                                'components-toolbar__control',
                                { 'is-active': verticalAlignment === 'top' },
                            )}
                            onClick={ () => setAttributes({ verticalAlignment:'top' })}
                        >
                            {icons.aligntop}
                        </Button>
                    </Tooltip>
                </Toolbar>
                <Toolbar>
                    <Tooltip text={__('Vertical Align Middle')}>
                        <Button
                            className={classnames(
                                'components-icon-button',
                                'components-toolbar__control',
                                { 'is-active': verticalAlignment === 'middle' },
                            )}
                            onClick={ () => setAttributes({ verticalAlignment:'middle' })}
                        >
                            {icons.alignmiddle}
                        </Button>
                    </Tooltip>
                </Toolbar>
                <Toolbar>
                    <Tooltip text={__('Vertical Align Bottom')}>
                        <Button
                            className={classnames(
                                'components-icon-button',
                                'components-toolbar__control',
                                { 'is-active': verticalAlignment === 'bottom' },
                            )}
                            onClick={ () => setAttributes({ verticalAlignment:'bottom' })}
                        >
                            {icons.alignbottom}
                        </Button>
                    </Tooltip>
                </Toolbar>
            </Fragment>
        );
    }

    renderPanelBodyAppearance() {
        const { attributes: { colorTheme }, setAttributes } = this.props;

        return (
            <PanelBody
                title={ __('Appearance') }
                initialOpen={ false }
                className={'gb-hero__panel-body gb-hero__color-theme'}
            >
                <SelectControl
                    label={ __('Color Theme') }
                    value={ colorTheme }
                    options={ [
                        { value: 'dark', label: __('Dark') },
                        { value: 'light', label: __('Light') },
                    ] }
                    onChange={ value => setAttributes({ colorTheme: value }) }
                />
            </PanelBody>
        );
    }

    renderPanelBodyBackground() {
        const { attributes: { bgColor, bgImg, bgImgId }, setAttributes } = this.props;

        const onSelectImage = img => {
            setAttributes({
                bgImgId: img.id,
                bgImg: img.url,
                bgImgAlt: img.alt,
                bgImgWidth: img.width,
                bgImgHeight: img.height,
            });
        };

        const onRemoveImage = () => {
            setAttributes({
                bgImgId: null,
                bgImg: null,
                bgImgAlt: null,
                bgImgWidth: null,
                bgImgHeight: null,
            });
        };

        return (
            <PanelBody
                title={ __('Background') }
                initialOpen={ false }
                className={'gb-hero__panel-body'}
            >
                <p>{ __('Background Color') }</p>
                <ColorPalette
                    colors={ utils.themeColors() }
                    value={ bgColor }
                    onChange={ value => setAttributes({ bgColor: value }) }
                />
                <p>{ __('Background Image') }</p>
                <MediaUpload
                    onSelect={ onSelectImage }
                    type="image"
                    value={ bgImgId }
                    render={ ({ open }) => (
                        <Button
                            className={ 'components-button components-icon-button gb-hero__cta-upload-btn' }
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
                            className={ 'components-button components-icon-button gb-hero__remove-img gb-hero__cta-upload-btn' }
                            onClick={ onRemoveImage }
                        >
                            <Dashicon icon="no-alt" />
                        </Button>
                    </Tooltip>
                ) }
                {this.renderBackgroundImageSize()}
            </PanelBody>
        );
    }

    renderBackgroundImageSize() {
        const { attributes: { bgImgSize }, setAttributes } = this.props;

        return (
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
        );
    }

    renderPanelBodyBackgroundOverlay() {
        const { attributes: { overlayOpacity, overlayBgImg, overlayBgImgAttachment, overlayBgImgID, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgSize, currentOverlayTab, overlayBlendMode, overlayGradAngle, overlayGradLoc, overlayGradLocSecond, overlayGradType, overlay, overlaySecond }, setAttributes } = this.props;

        const onOverlayTabSelect = (tabName) => {
            setAttributes({ currentOverlayTab: tabName });
        };

        const onSelectOverlayImage = img => {
            setAttributes({
                overlayBgImgID: img.id,
                overlayBgImg: img.url,
            });
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
                    colors={ utils.themeColors() }
                    value={ overlay }
                    onChange={ value => setAttributes({ overlay: value }) }
                />
                <MediaUpload
                    onSelect={ onSelectOverlayImage }
                    type="image"
                    value={ overlayBgImgID }
                    render={ ({ open }) => (
                        <Button
                            className={ 'components-button components-icon-button gb-hero__cta-upload-btn' }
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
                            className={ 'components-button components-icon-button gb-hero__remove-img gb-hero__cta-upload-btn' }
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
                    colors={ utils.themeColors() }
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
                    colors={ utils.themeColors() }
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
            <PanelBody
                title={ __('Background Overlay') }
                initialOpen={ false }
                className={'gb-hero__panel-body'}
            >
                <TabPanel className="gb-hero__inspect-tabs gb-hero__gradient-tabs"
                    activeClass="active-tab"
                    initialTabName={ currentOverlayTab }
                    onSelect={ onOverlayTabSelect }
                    tabs={ [
                        {
                            name: 'normal',
                            title: __('Normal'),
                            className: 'gb-hero__overlay--normal',
                        },
                        {
                            name: 'grad',
                            title: __('Gradient'),
                            className: 'gb-hero__overlay--grad',
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
        );
    }

    renderPanelBodySizing() {
        const { attributes: { paddingUnit, paddingTop, paddingRight, paddingBottom, paddingLeft, marginUnit, marginTop, marginBottom, minHeightUnit, minHeight, heroHeightUnit, heroHeight, maxWidthUnit, maxWidth }, setAttributes } = this.props;

        const marginUnits = [
            { key: 'px', name: __('px') },
            { key: 'em', name: __('em') },
            { key: '%', name: __('%') },
            { key: 'vh', name: __('vh') },
        ];

        const paddingUnits = marginUnits;
        const maxWidthUnits = marginUnits;
        const minHeightUnits = marginUnits;
        const heroHeightUnits = marginUnits;

        return (
            <PanelBody
                title={ __('Sizing') }
                initialOpen={ false }
                className={'gb-hero__panel-body gb-hero__sizing'}
            >
                <h2>{ __('Padding') }</h2>
                <ButtonGroup aria-label={ __('Padding Unit') }>
                    { map(paddingUnits, ({ name, key }) => (
                        <Button
                            key={ key }
                            isSmall
                            isPrimary={ paddingUnit === key }
                            aria-pressed={ paddingUnit === key }
                            onClick={ () => setAttributes({ paddingUnit: key }) }
                        >
                            { name }
                        </Button>
                    )) }
                </ButtonGroup>
                <RangeControl
                    label={ icons.spacingTop }
                    value={ paddingTop }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            paddingTop: value,
                        });
                    } }
                    min={ 0 }
                    max={ 750 }
                />
                <RangeControl
                    label={ icons.spacingRight }
                    value={ paddingRight }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            paddingRight: value,
                        });
                    } }
                    min={ 0 }
                    max={ 750 }
                />
                <RangeControl
                    label={ icons.spacingBottom }
                    value={ paddingBottom }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            paddingBottom: value,
                        });
                    } }
                    min={ 0 }
                    max={ 750 }
                />
                <RangeControl
                    label={ icons.spacingLeft }
                    value={ paddingLeft }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            paddingLeft: value,
                        });
                    } }
                    min={ 0 }
                    max={ 750 }
                />
                <h2>{ __('Margin') }</h2>
                <ButtonGroup aria-label={ __('Margin Unit') }>
                    { map(marginUnits, ({ name, key }) => (
                        <Button
                            key={ key }
                            isSmall
                            isPrimary={ marginUnit === key }
                            aria-pressed={ marginUnit === key }
                            onClick={ () => setAttributes({ marginUnit: key }) }
                        >
                            { name }
                        </Button>
                    )) }
                </ButtonGroup>
                <RangeControl
                    label={ icons.spacingTop }
                    value={ marginTop }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            marginTop: value,
                        });
                    } }
                    min={ -750 }
                    max={ 750 }
                />
                <RangeControl
                    label={ icons.spacingBottom }
                    value={ marginBottom }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            marginBottom: value,
                        });
                    } }
                    min={ -750 }
                    max={ 750 }
                />
                <h2>{ __('Minimium Height') }</h2>
                <ButtonGroup aria-label={ __('Minimium Height Unit') }>
                    { map(minHeightUnits, ({ name, key }) => (
                        <Button
                            key={ key }
                            isSmall
                            isPrimary={ minHeightUnit === key }
                            aria-pressed={ minHeightUnit === key }
                            onClick={ () => setAttributes({ minHeightUnit: key }) }
                        >
                            { name }
                        </Button>
                    )) }
                </ButtonGroup>
                <RangeControl
                    value={ minHeight }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            minHeight: value,
                        });
                    } }
                    min={ 0 }
                    max={ 750 }
                />
                <h2>{ __('Height') }</h2>
                <ButtonGroup aria-label={ __('Height Unit') }>
                    { map(heroHeightUnits, ({ name, key }) => (
                        <Button
                            key={ key }
                            isSmall
                            isPrimary={ heroHeightUnit === key }
                            aria-pressed={ heroHeightUnit === key }
                            onClick={ () => setAttributes({ heroHeightUnit: key }) }
                        >
                            { name }
                        </Button>
                    )) }
                </ButtonGroup>
                <RangeControl
                    value={ heroHeight }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            heroHeight: value,
                        });
                    } }
                    min={ 0 }
                    max={ 750 }
                />
                <h2>{ __('Content Max Width') }</h2>
                <ButtonGroup aria-label={ __('Content Max Width Unit') }>
                    { map(maxWidthUnits, ({ name, key }) => (
                        <Button
                            key={ key }
                            isSmall
                            isPrimary={ maxWidthUnit === key }
                            aria-pressed={ maxWidthUnit === key }
                            onClick={ () => setAttributes({ maxWidthUnit: key }) }
                        >
                            { name }
                        </Button>
                    )) }
                </ButtonGroup>
                <RangeControl
                    value={ maxWidth }
                    className={'gb-hero__spacing-range-control'}
                    onChange={ (value) => {
                        setAttributes({
                            maxWidth: value,
                        });
                    } }
                    min={ 0 }
                    max={ 750 }
                />
            </PanelBody>
        );
    }

    renderInspectorControls(isCarousel = false) {
        return (
            <Fragment>
                {this.renderPanelBodyAppearance()}
                {!isCarousel && this.renderPanelBodyBackground()}
                {!isCarousel && this.renderPanelBodyBackgroundOverlay()}
                {this.renderPanelBodySizing()}
            </Fragment>
        );
    }

    renderHero() {
        const { attributes: { paddingUnit, paddingTop, paddingRight, paddingBottom, paddingLeft, marginUnit, marginTop, marginBottom } } = this.props;

        return (
            <div className={ this.getHeroClassName() } style={{
                paddingTop: (paddingTop ? paddingTop + paddingUnit : undefined),
                paddingRight: (paddingRight ? paddingRight + paddingUnit : undefined),
                paddingBottom: (paddingBottom ? paddingBottom + paddingUnit : undefined),
                paddingLeft: (paddingLeft ? paddingLeft + paddingUnit : undefined),
                marginTop: (marginTop && marginTop > 0 ? marginTop + marginUnit : undefined),
                marginBottom: (marginBottom && marginTop > 0 ? marginBottom + marginUnit : undefined),
            }} >
                {this.renderHeroBefore()}
                {this.renderHeroBackground()}
                {this.renderHeroContent()}
                {this.renderHeroAfter()}
            </div>
        );
    }

    renderHeroBefore() {
        return null;
    }

    renderHeroBackground() {
        const { attributes: { bgColor, bgImg, bgImgSize, overlayOpacity, overlayBgImg, overlayBgImgAttachment, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgSize, currentOverlayTab, overlayBlendMode, overlayGradAngle, overlayGradLoc, overlayGradLocSecond, overlayGradType, overlay, overlaySecond } } = this.props;

        const overlayType = (!currentOverlayTab || 'grad' !== currentOverlayTab ? 'normal' : 'gradient');

        return (
            <Fragment>
                <div
                    className={'gb-hero__background'}
                    style={{
                        backgroundColor: (bgColor ? bgColor : undefined),
                        backgroundImage: (bgImg ? `url(${bgImg})` : undefined),
                        backgroundSize: bgImgSize,
                    }}/>
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
            </Fragment>
        );
    }

    renderHeroContent() {
        const { attributes: { maxWidthUnit, maxWidth, verticalAlignment } } = this.props;

        return (
            <div className={`gb-hero__content gb-hero__content--valign-${verticalAlignment}`} style={{
                maxWidth: (maxWidth ? maxWidth + maxWidthUnit : undefined),
            }}>
                <InnerBlocks templateLock={ false } template={ this.getInnerBlocksTemplate() } />
            </div>
        );
    }

    renderHeroAfter() {
        return null;
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
