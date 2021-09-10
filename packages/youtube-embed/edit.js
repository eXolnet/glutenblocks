import PropTypes from 'prop-types';
import utils from '../globals/utils';
import icons from '../globals/icons';
import { parseUrl } from './util';

import { __, _x, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Button, IconButton, PanelBody, Placeholder, SelectControl, TextControl, ToggleControl, Toolbar } from '@wordpress/components';
import { InspectorControls, MediaUpload, MediaUploadCheck, ColorPalette, BlockIcon, BlockControls } from '@wordpress/block-editor';
import { withInstanceId } from '@wordpress/compose';

class GlutenblocksYoutubeEmbedEdit extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            editingURL: false,
            url: this.props.attributes.url
        };

        this.formSubmit = this.formSubmit.bind(this);
    }

    render() {
        const { className } = this.props;

        return (
            <Fragment>
                <InspectorControls>
                    { this.renderInspectorControls() }
                </InspectorControls>

                <div className={ className } >
                    { this.renderContent() }
                </div>
            </Fragment>
        );
    }

    renderInspectorControls() {
        return (
            <Fragment>
                { this.renderPlayButtonPanel() }
                { this.renderVideoSettingsPanel() }
            </Fragment>
        );
    }

    renderContent() {
        const label = 'YouTube URL';

        const { attributes: { url } } = this.props;
        const { editingURL } = this.state;

        if (editingURL || !url) {
            return (
                <Placeholder icon={<BlockIcon icon={icons.youtube}/>} label={label} className="wp-block-embed">
                    {/* eslint-disable-next-line no-console */}
                    <form onSubmit={ this.formSubmit }>
                        <input
                            type="url"
                            value={this.state.url || ''}
                            className="components-placeholder__input"
                            aria-label={label}
                            placeholder={__('Enter URL to embed here…')}
                            onChange={event => this.setState({ url: event.target.value })}
                        />
                        <Button
                            isLarge
                            type="submit">
                            {_x('Embed', 'button label')}
                        </Button>
                    </form>
                </Placeholder>
            );
        }

        return (
            <Fragment>
                <BlockControls>
                    <Toolbar>
                        <IconButton
                            className="components-toolbar__control"
                            label={ __('Edit URL') }
                            icon="edit"
                            onClick={ () => this.setState({ editingURL: true }) }
                        />
                    </Toolbar>
                </BlockControls>
                <div className="wp-embed-responsive">
                    <figure className="wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio wp-block-embed is-type-video">
                        <div className="wp-block-embed__wrapper">
                            <iframe src={ parseUrl(this.props.attributes) }
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </figure>
                </div>
            </Fragment>
        );
    }

    renderPlayButtonPanel() {
        const { attributes: { playBgColor, playIconColor }, setAttributes } = this.props;

        return (
            <PanelBody
                title={ __('Play Button', 'glutenblocks') }
                initialOpen={ false }
                className={'gb-hero__panel-body'}
            >
                <p>{ __('Icon Color', 'glutenblocks') }</p>
                <ColorPalette
                    colors={ utils.themeColors() }
                    value={ playIconColor }
                    onChange={ playIconColor => setAttributes({ playIconColor }) }
                />
                <p>{ __('Background Color') }</p>
                <ColorPalette
                    colors={ utils.themeColors() }
                    value={ playBgColor }
                    onChange={ playBgColor => setAttributes({ playBgColor }) }
                />
            </PanelBody>
        );
    }

    renderVideoSettingsPanel() {
        const { attributes: { poster, ccLang, enableCaption, start, end }, setAttributes, instanceId } = this.props;
        const videoPosterDescription = `video-block__poster-image-description-${ instanceId }`;

        return (
            <PanelBody
                title={ __('Video Settings', 'glutenblocks') }
            >
                <p>{ __('Poster image', 'glutenblocks') }</p>
                <MediaUploadCheck>
                    <MediaUpload
                        title={ __('Select Poster Image') }
                        onSelect={ poster => setAttributes({ poster }) }
                        allowedTypes={ ['image'] }
                        render={ ({ open }) => (
                            <Fragment>
                                { !! poster?.url &&
                                    <img src={ poster?.url } alt={ poster?.alt }/>
                                }
                                <Button
                                    isDefault
                                    onClick={ open }
                                    aria-describedby={ videoPosterDescription }
                                >
                                    { ! poster?.url ? __('Select Poster Image') : __('Replace image') }
                                </Button>
                            </Fragment>
                        ) }
                    />
                    <p
                        id={ videoPosterDescription }
                        hidden
                    >
                        { poster?.url ?
                            sprintf(__('The current poster image url is %s'), poster.url) :
                            __('There is no poster image currently selected')
                        }
                    </p>
                    { !! poster?.url &&
                        <p>
                            <Button onClick={ () => setAttributes({ poster: null }) } isLink isDestructive>
                                { __('Remove Poster Image') }
                            </Button>
                        </p>
                    }
                </MediaUploadCheck>
                <TextControl
                    label={ __('Video start time') }
                    value={ start }
                    onChange={ start => setAttributes({ start })}
                    type="Number"
                />
                <TextControl
                    label={ __('Video end time') }
                    value={ end }
                    onChange={ end => setAttributes({ end })}
                    type="Number"
                />
                <ToggleControl
                    label={ __('Closed Captions') }
                    checked={ enableCaption }
                    onChange={ enableCaption => setAttributes({ enableCaption }) }
                />
                { enableCaption &&
                    <SelectControl
                        label={ __('Default Lang') }
                        value={ ccLang }
                        options={ [
                            { label: __('English'), value: 'en' },
                            { label: __('French'), value: 'fr' }
                        ] }
                        onChange={ ccLang => setAttributes({ ccLang }) }
                    />
                }
            </PanelBody>
        );
    }

    formSubmit(event) {
        if (event) {
            event.preventDefault();
        }

        const { url } = this.state;
        const { setAttributes } = this.props;
        this.setState({ editingURL: false });
        setAttributes({ url });
    }
}

GlutenblocksYoutubeEmbedEdit.propTypes = {
    className: PropTypes.string,
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    instanceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default (
    withInstanceId(GlutenblocksYoutubeEmbedEdit)
);
