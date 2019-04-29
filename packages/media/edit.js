/**
 * External dependencies
 */
import classnames from 'classnames';
import get from 'lodash/get';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { BlockControls,
    InnerBlocks,
    InspectorControls } = wp.editor;

const { Component, Fragment } = wp.element;
const {
    PanelBody,
    TextareaControl,
    ToggleControl,
    Toolbar,
    ExternalLink,
    Button,
    ButtonGroup,
    TextControl,
    Tooltip
} = wp.components;
/**
 * Internal dependencies
 */
import MediaContainer from './media-container';
import PropTypes from 'prop-types';
import icons from '../globals/icons';

/**
 * Constants
 */
const ALLOWED_BLOCKS = ['core/button', 'core/paragraph', 'core/heading', 'core/list'];
const TEMPLATE = [
    ['core/paragraph', { fontSize: 'large', placeholder: _x('Content…', 'content placeholder') }],
];

class MediaEdit extends Component {
    constructor() {
        super(...arguments);

        this.onSelectMedia = this.onSelectMedia.bind(this);
        this.onWidthChange = this.onWidthChange.bind(this);
        this.commitWidthChange = this.commitWidthChange.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.updateHeight = this.updateHeight.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.state = {
            mediaWidth: null,
        };
    }

    onSelectMedia(media) {
        const { setAttributes } = this.props;

        let mediaType;
        let src;
        // for media selections originated from a file upload.
        if (media.media_type) {
            if (media.media_type === 'image') {
                mediaType = 'image';
            } else {
                // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
                // video contain the media type of 'file' in the object returned from the rest api.
                mediaType = 'video';
            }
        } else { // for media selections originated from existing files in the media library.
            mediaType = media.type;
        }

        if (mediaType === 'image') {
            // Try the "large" size URL, falling back to the "full" size URL below.
            src = get(media, ['sizes', 'large', 'url']) || get(media, ['media_details', 'sizes', 'large', 'source_url']);
        }

        setAttributes({
            mediaAlt: media.alt,
            mediaId: media.id,
            mediaWidth: media.width,
            width: media.width,
            height: media.height,
            mediaHeight: media.height,
            mediaType,
            mediaUrl: src || media.url,
            imageFill: undefined,
            focalPoint: undefined,
        });
    }

    onWidthChange(width) {
        this.setState({
            mediaWidth: width,
        });
    }

    commitWidthChange(width) {
        const { setAttributes } = this.props;

        setAttributes({
            mediaWidth: width,
        });
        this.setState({
            mediaWidth: null,
        });
    }

    renderMediaArea() {
        const { attributes } = this.props;
        const { mediaAlt, mediaId, mediaPosition, mediaType, mediaUrl, mediaWidth, width, height } = attributes;

        return (
            <MediaContainer
                className="block-library-media-text__media-container"
                onSelectMedia={ this.onSelectMedia }
                onWidthChange={ this.onWidthChange }
                commitWidthChange={ this.commitWidthChange }
                { ...{ mediaAlt, mediaId, mediaType, mediaUrl, mediaPosition, mediaWidth, width, height } }
            />
        );
    }

    updateWidth(width) {
        this.props.setAttributes({ width: parseInt(width, 10) });
    }

    updateHeight(height) {
        this.props.setAttributes({ height: parseInt(height, 10) });
    }

    updateDimensions(width = this.props.attributes.mediaWidth, height = this.props.attributes.mediaHeight) {
        return () => {
            this.props.setAttributes({ width: width, height: height });
        };
    }

    render() {
        const {
            attributes : { isStackedOnMobile, mediaAlt, mediaPosition, mediaType, mediaWidth, mediaHeight, width, height, verticalAlignment }, className, isSelected, setAttributes } = this.props;
        const classNames = classnames(className, {
            'has-media-on-the-right': 'right' === mediaPosition,
            'is-selected': isSelected,
            'is-stacked-on-mobile': isStackedOnMobile,
            [ `gb-media--aligned-${ verticalAlignment }` ]: verticalAlignment,
        });
        const style = {
            gridTemplateColumns: 'right' === mediaPosition ? 'auto 50%' : '50%  auto',
        };
        const toolbarControls = [{
            icon: 'align-pull-left',
            title: __('Show media on left'),
            isActive: mediaPosition === 'left',
            onClick: () => setAttributes({ mediaPosition: 'left' }),
        }, {
            icon: 'align-pull-right',
            title: __('Show media on right'),
            isActive: mediaPosition === 'right',
            onClick: () => setAttributes({ mediaPosition: 'right' }),
        }];
        const onMediaAltChange = (newMediaAlt) => {
            setAttributes({ mediaAlt: newMediaAlt });
        };
        const mediaTextGeneralSettings = (
            <PanelBody title={ __('Media & Text Settings') }>
                <ToggleControl
                    label={ __('Stack on mobile') }
                    checked={ isStackedOnMobile }
                    onChange={ () => setAttributes({
                        isStackedOnMobile: ! isStackedOnMobile,
                    }) }
                />
                { mediaType === 'image' && (
                    <TextareaControl
                        label={ __('Alt Text (Alternative Text)') }
                        value={ mediaAlt }
                        onChange={ onMediaAltChange }
                        help={
                            <Fragment>
                                <ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
                                    { __('Describe the purpose of the image') }
                                </ExternalLink>
                                { __('Leave empty if the image is purely decorative.') }
                            </Fragment>
                        }
                    />
                ) }
                { mediaType === 'image' && (
                    <div className="block-library-image__dimensions">
                        <p className="block-library-image__dimensions__row">
                            { __('Image Dimensions') }
                        </p>
                        <div className="block-library-image__dimensions__row">
                            <TextControl
                                type="number"
                                className="block-library-image__dimensions__width"
                                label={ __('Width') }
                                value={ width }
                                min={ 1 }
                                onChange={ this.updateWidth }
                            />
                            <TextControl
                                type="number"
                                className="block-library-image__dimensions__height"
                                label={ __('Height') }
                                value={ height }
                                min={ 1 }
                                onChange={ this.updateHeight }
                            />
                        </div>
                        <div className="block-library-image__dimensions__row">
                            <ButtonGroup aria-label={ __('Image Size') }>
                                { [25, 50, 75, 100].map((scale) => {
                                    const scaledWidth = Math.round(mediaWidth * (scale / 100));
                                    const scaledHeight = Math.round(mediaHeight * (scale / 100));

                                    const isCurrent = width === scaledWidth && height === scaledHeight;

                                    return (
                                        <Button
                                            key={ scale }
                                            isSmall
                                            isPrimary={ isCurrent }
                                            aria-pressed={ isCurrent }
                                            onClick={ this.updateDimensions(scaledWidth, scaledHeight) }
                                        >
                                            { scale }%
                                        </Button>
                                    );
                                }) }
                            </ButtonGroup>
                            <Button
                                isSmall
                                onClick={ this.updateDimensions() }
                            >
                                { __('Reset') }
                            </Button>
                        </div>
                    </div>
                ) }
            </PanelBody>
        );
        return (
            <Fragment>
                <BlockControls>
                    <Toolbar>
                        <Tooltip text={__('Vertical Align Top')}>
                            <Button
                                className={classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': verticalAlignment === 'top' },
                                )}
                                onClick={() => setAttributes({ verticalAlignment : 'top' })}
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
                                onClick={() => setAttributes({ verticalAlignment : 'middle' })}
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
                                onClick={() => setAttributes({ verticalAlignment : 'bottom' })}
                            >
                                {icons.alignbottom}
                            </Button>
                        </Tooltip>
                    </Toolbar>
                </BlockControls>
                <InspectorControls>
                    { mediaTextGeneralSettings }
                </InspectorControls>
                <BlockControls>
                    <Toolbar
                        controls={ toolbarControls }
                    />
                </BlockControls>
                <div className={ classNames } style={ style } >
                    { this.renderMediaArea() }
                    <InnerBlocks
                        allowedBlocks={ ALLOWED_BLOCKS }
                        template={ TEMPLATE }
                        templateInsertUpdatesSelection={ false }
                    />
                </div>
            </Fragment>
        );
    }
}

MediaEdit.propTypes = {
    attributes: PropTypes.object,
    clientId: PropTypes.string,
    className: PropTypes.string,
    setAttributes: PropTypes.func,
    isSelected: PropTypes.bool,
};

export default MediaEdit;
