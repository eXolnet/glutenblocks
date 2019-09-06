import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * BLOCK: Glutenblock card
 */

import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';

class GlutenblocksCardSave extends Component {
    render() {
        const { attributes : { posts, target, noFollow }, className } = this.props;

        let relAttr = 'noopener noreferrer';
        if (noFollow) {
            relAttr = relAttr + ' nofollow';
        }

        const classname = classnames(className, 'gb-card');
        return (
            <Fragment>
                { posts.length > 0 && (
                    <a href={posts[0].url} target={ (target ? target : undefined) } className={classname} rel={ relAttr }>
                        { (posts[0].featured_media !== null && posts[0].featured_media !== 0) && (
                            <div className='gb-card__media-container'>
                                <img src={posts[0].featured_media.source_url} className="gb-card__media" alt={posts[0].alt_text ? posts[0].alt_text : ''}/>
                            </div>
                        )}
                        <div className="gb-card__body">
                            <h5 className="gb-card__title">{posts[0].title}</h5>
                            <div dangerouslySetInnerHTML={{ __html: posts[0].excerpt }} />
                            <span className="gb-card__action">{__('Read More')}</span>
                        </div>
                    </a>
                )}
            </Fragment>
        );
    }
}

GlutenblocksCardSave.propTypes = {
    attributes: PropTypes.object,
    className: PropTypes.string
};

export default GlutenblocksCardSave;
