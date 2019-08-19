/**
 * External dependencies
 */
import classnames from 'classnames';
import noop from 'lodash/noop';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import PropTypes from 'prop-types';

class GlutenblocksMediaSave extends Component {
    render() {
        const { attributes : { isStackedOnMobile, mediaAlt, mediaPosition, mediaType, mediaUrl, width, height, mediaId, verticalAlignment } } = this.props;
        const mediaTypeRenders = {
            image: () => <img src={ mediaUrl } alt={ mediaAlt } width={width} height={height} className={ (mediaId && mediaType === 'image') ? `gb-media__image wp-image-${ mediaId }` : null } />,
            video: () => <video controls src={ mediaUrl } />,
        };

        const className = classnames('gb-media', {
            'gb-media--stacked-on-mobile': isStackedOnMobile,
            [ `gb-media--${mediaPosition}` ]: mediaPosition,
            [ `gb-media--aligned-${ verticalAlignment }` ]: verticalAlignment,
        });

        return (
            <div className={ className }>
                <div className="gb-media__figure">
                    <figure className="wp-block-image">
                        { (mediaTypeRenders[ mediaType ] || noop)() }
                    </figure>
                </div>
                <div className="gb-media__content">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    }
}

GlutenblocksMediaSave.propTypes = {
    attributes: PropTypes.object
};

export default GlutenblocksMediaSave;

