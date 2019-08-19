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
import upperFirst from 'lodash/upperFirst';

class GlutenblocksResponsiveImageEdit extends Component {
    constructor() {
        super(...arguments);

        this.onTabSelect = this.onTabSelect.bind(this);
    }

    imageControls(size, attributes, isQuickView) {
        const { setAttributes } = this.props;
        const updateAttribute = attribute => value => {
            setAttributes({ [size]: { ...attributes, [attribute]: value } });
        };

        const onSelectImage = ({ url, height, width, alt }) => {
            setAttributes({ [size]: {
                ...attributes,
                url,
                height: parseInt(height),
                width: parseInt(width),
                alt
            } });
        };

        const removeImage = () => {
            const data = { url: '', height: 0, width: 0, alt: '' };
            onSelectImage(data);
        };

        return (
            <div className={isQuickView ? 'edit-bg' : ''}>
                {isQuickView && !attributes.url && <h3>Add {size} Image</h3>}
                <img src={attributes.url} />
                <MediaUpload
                    onSelect={onSelectImage}
                    type="image"
                    render={({ open }) => (
                        <Button
                            className={
                                'components-button components-icon-button gb-hero__cta-upload-btn'
                            }
                            onClick={open}
                        >
                            <Dashicon icon="format-image" />
                            {__(`Select ${size} Image`)}
                        </Button>
                    )}
                />
                {attributes.url && (
                    <Button
                        className={
                            'components-button components-icon-button gb-hero__cta-upload-btn'
                        }
                        onClick={removeImage}
                    >
                        <Dashicon icon="no" />
                        Remove Image
                    </Button>
                )}
                {!isQuickView && (
                    <div>
                        <TextareaControl
                            label={__('Alt Text (Alternative Text)')}
                            value={attributes.alt}
                            onChange={updateAttribute('alt')}
                            help={
                                <Fragment>
                                    <ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
                                        {__(
                                            'Describe the purpose of the image'
                                        )}
                                    </ExternalLink>
                                    {__(
                                        'Leave empty if the image is purely decorative.'
                                    )}
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
                                    value={attributes.width}
                                    min={1}
                                    onChange={updateAttribute('width')}
                                />
                                <TextControl
                                    type="number"
                                    className="block-library-image__dimensions__height"
                                    label={__('Height')}
                                    value={attributes.height}
                                    min={1}
                                    onChange={updateAttribute('height')}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    onTabSelect(tabName) {
        this.props.setAttributes({ currentTab: tabName });
    }

    render() {
        const {
            attributes,
            className,
        } = this.props;

        const tabControls = (
            <TabPanel
                className="gb-inspect-tabs"
                activeClass="active-tab"
                initialTabName={attributes.currentTab}
                onSelect={this.onTabSelect}
                tabs={[
                    {
                        name: 'desktop',
                        title: <Dashicon icon="desktop" />,
                        className: 'gb-desk-tab'
                    },
                    {
                        name: 'tablet',
                        title: <Dashicon icon="tablet" />,
                        className: 'gb-tablet-tab'
                    },
                    {
                        name: 'mobile',
                        title: <Dashicon icon="smartphone" />,
                        className: 'gb-mobile-tab'
                    }
                ]}
            >
                {tab => {
                    return (<div>
                        <Fragment>
                            <PanelBody>
                                <p>{__(`${upperFirst(tab.name)} Image`)}</p>
                                {this.imageControls(tab.name, attributes[tab.name], false)}
                            </PanelBody>
                        </Fragment>
                    </div>);
                }}
            </TabPanel>
        );

        const display = (size, att) => {
            if (att.url) {
                return (
                    <img
                        src={att.url}
                        height={att.height}
                        width={att.width}
                        alt={att.alt}
                    />
                );
            }
            return this.imageControls(size, att, true);
        };

        return (
            <Fragment>
                <div className={className}>
                    {['mobile', 'tablet', 'desktop'].map(size =>
                        // eslint-disable-next-line react/jsx-key
                        <div className={`gb-responsive-image gb-responsive-image--${size}`}>
                            {display(size, attributes[size])}
                        </div>
                    )}
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
    setAttributes: PropTypes.func
};

export default GlutenblocksResponsiveImageEdit;
