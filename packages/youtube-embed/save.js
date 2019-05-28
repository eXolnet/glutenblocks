import PropTypes from 'prop-types';
import { parseUrl } from './util';

const { Component } = wp.element;

class GlutenblocksYoutubeEmbedSave extends Component {
    render() {
        const { className, attributes: { playBgColor, playIconColor, poster } } = this.props;

        const posterContainer = () => {
            if (playBgColor || playIconColor || poster) {
                return (
                    <div className="wp-block-embed__poster">
                        { (playBgColor && playIconColor) &&
                            <div className="wp-block-embed__poster_play" style={ { color: playIconColor, backgroundColor: playBgColor } }>
                                <i className="fas fa-play"/>
                            </div>
                        }
                        { !!poster &&
                            <img className="wp-block-embed__poster_image" src={ poster.url } alt={ poster.alt }/>
                        }
                    </div>
                );
            }

            return null;
        };
        return (
            <div className={ className } >
                <div className="wp-embed-responsive">
                    <figure className="wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio wp-block-embed is-type-video">
                        <div className="wp-block-embed__wrapper">
                            { posterContainer() }

                            <iframe src={ parseUrl(this.props.attributes) }
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </figure>
                </div>
            </div>
        );
    }
}

GlutenblocksYoutubeEmbedSave.propTypes = {
    className: PropTypes.string,
    attributes: PropTypes.object
};

export default GlutenblocksYoutubeEmbedSave;
