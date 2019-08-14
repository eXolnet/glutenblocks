import PropTypes from 'prop-types';

import { __ } from '@wordpress/i18n';
import {
    Button,
    Dashicon,
    PanelBody,
    TabPanel,
    TextareaControl,
    ExternalLink,
    TextControl
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor';

class GlutenblocksResponsiveImageEdit extends Component {

    constructor() {
        super(...arguments);
    }

    imageControls(imageType, isQuickView) {
        const { attributes: {
            desktopImgURL, desktopImgHeight, desktopImgWidth, desktopImgAlt,
            tabletImgURL, tabletImgHeight, tabletImgWidth, tabletImgAlt,
            mobileImgURL, mobileImgHeight, mobileImgWidth, mobileImgAlt,
        }, setAttributes } = this.props;

        const onSelectImage = img => {
            switch (imageType) {
                case 'desktop': setAttributes({ desktopImgURL: img.url }); break;
                case 'tablet': setAttributes({ tabletImgURL: img.url }); break;
                case 'mobile': setAttributes({ mobileImgURL: img.url }); break;
            }
            updateHeight(img.height);
            updateWidth(img.width);
            updateAlt(img.alt);
        };

        const updateHeight = height => {
            var formattedHeight = parseInt(height);
            if (formattedHeight) {
                switch (imageType) {
                    case 'desktop': setAttributes({ desktopImgHeight: formattedHeight }); break;
                    case 'tablet': setAttributes({ tabletImgHeight: formattedHeight }); break;
                    case 'mobile': setAttributes({ mobileImgHeight: formattedHeight }); break;
                }
            }
        };

        const updateWidth = width => {
            var formattedWidth = parseInt(width);
            if (formattedWidth) {
                switch (imageType) {
                    case 'desktop': setAttributes({ desktopImgWidth: formattedWidth }); break;
                    case 'tablet': setAttributes({ tabletImgWidth: formattedWidth }); break;
                    case 'mobile': setAttributes({ mobileImgWidth: formattedWidth }); break;
                }
            }
        };

        const updateAlt = alt => {
            switch (imageType) {
                case 'desktop': setAttributes({ desktopImgAlt: alt }); break;
                case 'tablet': setAttributes({ tabletImgAlt: alt }); break;
                case 'mobile': setAttributes({ mobileImgAlt: alt }); break;
            }
        };

        const getImgAlt = _ => {
            switch (imageType) {
                case 'desktop': return desktopImgAlt;
                case 'tablet': return tabletImgAlt;
                case 'mobile': return mobileImgAlt;
                default: '';
            }
        };

        const getImgURL = _ => {
            switch (imageType) {
                case 'desktop': return desktopImgURL;
                case 'tablet': return tabletImgURL;
                case 'mobile': return mobileImgURL;
                default: '';
            }
        };

        const getImgWidth = _ => {
            switch (imageType) {
                case 'desktop': return desktopImgWidth;
                case 'tablet': return tabletImgWidth;
                case 'mobile': return mobileImgWidth;
                default: '';
            }
        };

        const getImgHeight = _ => {
            switch (imageType) {
                case 'desktop': return desktopImgHeight;
                case 'tablet': return tabletImgHeight;
                case 'mobile': return mobileImgHeight;
                default: '';
            }
        };

        const removeImage = _ => {
            var data = { url: '', height: 0, width: 0, alt: '' };
            onSelectImage(data);
        };


        return (
            <div className={isQuickView ? 'edit-bg' : ''}>
                {(isQuickView && !getImgURL()) && <h3>Add {imageType} Image</h3>}
                <img src={getImgURL()}></img>
                <MediaUpload
                    onSelect={onSelectImage}
                    type='image'
                    render={({ open }) => (
                        <Button
                            className={'components-button components-icon-button gb-hero__cta-upload-btn'}
                            onClick={open}
                        >
                            <Dashicon icon='format-image' />
                            {__('Select ' + imageType + ' Image')}
                        </Button>
                    )}
                />
                {getImgURL() && (
                    <Button
                        className={'components-button components-icon-button gb-hero__cta-upload-btn'}
                        onClick={removeImage}>
                        <Dashicon icon='no' />
                        Remove Image
                    </Button>)}
                {
                    !isQuickView && (
                        <div>
                            <TextareaControl
                                label={__('Alt Text (Alternative Text)')}
                                value={getImgAlt()}
                                onChange={updateAlt}
                                help={
                                    <Fragment>
                                        <ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
                                            {__('Describe the purpose of the image')}
                                        </ExternalLink>
                                        {__('Leave empty if the image is purely decorative.')}
                                    </Fragment>
                                }
                            />
                            <div className="block-library-image__dimensions">
                                <p className="block-library-image__dimensions__row">
                                    {__('Image Dimensions')}
                                </p>
                                <div className="block-library-image__dimensions__row">
                                    <TextControl
                                        type="number"
                                        className="block-library-image__dimensions__width"
                                        label={__('Width')}
                                        value={getImgWidth()}
                                        min={1}
                                        onChange={updateWidth}
                                    />
                                    <TextControl
                                        type="number"
                                        className="block-library-image__dimensions__height"
                                        label={__('Height')}
                                        value={getImgHeight()}
                                        min={1}
                                        onChange={updateHeight}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

    render() {
        const {
            attributes: {
                desktopImgURL, desktopImgHeight, desktopImgWidth, desktopImgAlt,
                tabletImgURL, tabletImgHeight, tabletImgWidth, tabletImgAlt,
                mobileImgURL, mobileImgHeight, mobileImgWidth, mobileImgAlt,
                currentTab
            },
            className,
            setAttributes,
        } = this.props;

        const onTabSelect = (tabName) => {
            setAttributes({ currentTab: tabName });
        };

        const tabControls = (
            <TabPanel className="gb-inspect-tabs"
                activeClass="active-tab"
                initialTabName={currentTab}
                onSelect={onTabSelect}
                tabs={[
                    {
                        name: 'desk',
                        title: <Dashicon icon="desktop" />,
                        className: 'gb-desk-tab',
                    },
                    {
                        name: 'tablet',
                        title: <Dashicon icon="tablet" />,
                        className: 'gb-tablet-tab',
                    },
                    {
                        name: 'mobile',
                        title: <Dashicon icon="smartphone" />,
                        className: 'gb-mobile-tab',
                    },
                ]}>
                {
                    (tab) => {
                        let tabOut;
                        if (tab.name) {
                            if ('mobile' === tab.name) {
                                tabOut = mobileControls;
                            } else if ('tablet' === tab.name) {
                                tabOut = tabletControls;
                            } else {
                                tabOut = deskControls;
                            }
                        }
                        return <div>{tabOut}</div>;
                    }
                }
            </TabPanel>
        );
        const mobileControls = (
            <Fragment>
                <PanelBody>
                    <p>{__('Mobile Image')}</p>
                    {this.imageControls('mobile', false)}
                </PanelBody>
            </Fragment>
        );
        const tabletControls = (
            <Fragment>
                <PanelBody>
                    <p>{__('Tablet Image')}</p>
                    {this.imageControls('tablet', false)}
                </PanelBody>
            </Fragment>
        );
        const deskControls = (
            <Fragment>
                <PanelBody>
                    <p>{__('Desktop Image')}</p>
                    {this.imageControls('desktop', false)}
                </PanelBody>
            </Fragment>
        );

        const mobileDisplay = _ => {
            if (mobileImgURL) {
                return (<img src={mobileImgURL} height={mobileImgHeight} width={mobileImgWidth} alt={mobileImgAlt}></img>);
            }
            return this.imageControls('mobile', true);
        };

        const tabletDisplay = _ => {
            if (tabletImgURL) {
                return (<img src={tabletImgURL} height={tabletImgHeight} width={tabletImgWidth} alt={tabletImgAlt}></img>);
            }
            return this.imageControls('tablet', true);
        };

        const desktopDisplay = _ => {
            if (desktopImgURL) {
                return (<img src={desktopImgURL} height={desktopImgHeight} width={desktopImgWidth} alt={desktopImgAlt}></img>);
            }
            return this.imageControls('desktop', true);
        };

        return (
            <Fragment>
                <div className={className} >
                    <div className="gb-responsive-image gb-responsive-image--mobile">
                        {mobileDisplay()}
                    </div>
                    <div className="gb-responsive-image gb-responsive-image--tablet">
                        {tabletDisplay()}
                    </div>
                    <div className="gb-responsive-image gb-responsive-image--desktop">
                        {desktopDisplay()}
                    </div>
                </div>

                <InspectorControls>
                    <div className="screen-select">Screen Size</div>
                    {tabControls}
                </InspectorControls>
            </Fragment>
        );
    }
}

GlutenblocksResponsiveImageEdit.propTypes = {
    className: PropTypes.string,
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
};

export default (
    GlutenblocksResponsiveImageEdit
);
