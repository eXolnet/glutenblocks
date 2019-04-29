import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
const { IconButton, Toolbar } = wp.components;
const {
    BlockControls,
    BlockIcon,
    MediaPlaceholder,
    MediaUpload,
} = wp.editor;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import icons from '../globals/icons';

/**
 * Constants
 */
const ALLOWED_MEDIA_TYPES = ['image', 'video'];

class MediaContainer extends Component {
    renderToolbarEditButton() {
        const {  mediaId, onSelectMedia } = this.props;
        return (
            <BlockControls>
                <Toolbar>
                    <MediaUpload
                        onSelect={ onSelectMedia }
                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                        value={ mediaId }
                        render={ ({ open }) => (
                            <IconButton
                                className="components-toolbar__control"
                                label={ __('Edit media') }
                                icon="edit"
                                onClick={ open }
                            />
                        ) }
                    />
                </Toolbar>
            </BlockControls>
        );
    }

    renderImage() {
        const { mediaAlt, width, height, mediaUrl, className } = this.props;
        return (
            <Fragment>
                { this.renderToolbarEditButton() }
                <figure className={ className }>
                    <img src={ mediaUrl } alt={ mediaAlt } width={width} height={height} />
                </figure>
            </Fragment>
        );
    }

    renderVideo() {
        const { mediaUrl, className } = this.props;
        return (
            <Fragment>
                { this.renderToolbarEditButton() }
                <figure className={ className }>
                    <video controls src={ mediaUrl } />
                </figure>
            </Fragment>
        );
    }

    renderPlaceholder() {
        const { onSelectMedia, className } = this.props;
        return (
            <MediaPlaceholder
                icon={ <BlockIcon icon={ icons.mediaContainer } /> }
                labels={ {
                    title: __('Media area'),
                } }
                className={ className }
                onSelect={ onSelectMedia }
                accept="image/*,video/*"
                allowedTypes={ ALLOWED_MEDIA_TYPES }
            />
        );
    }

    render() {
        const {  mediaUrl, mediaType } = this.props;
        if (mediaType && mediaUrl) {

            let mediaElement = null;
            switch (mediaType) {
                case 'image':
                    mediaElement = this.renderImage();
                    break;
                case 'video':
                    mediaElement = this.renderVideo();
                    break;
            }
            return (
                mediaElement
            );
        }
        return this.renderPlaceholder();
    }
}

MediaContainer.propTypes = {
    attributes: PropTypes.object,
    clientId: PropTypes.string,
    className: PropTypes.string,
    mediaPosition: PropTypes.string,
    mediaId: PropTypes.number,
    mediaUrl: PropTypes.string,
    mediaWidth: PropTypes.number,
    mediaHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    mediaType: PropTypes.string,
    mediaAlt: PropTypes.string,
    setAttributes: PropTypes.func,
    onSelectMedia: PropTypes.func,
    onWidthChange: PropTypes.func,
    commitWidthChange: PropTypes.func,
};

export default MediaContainer;
