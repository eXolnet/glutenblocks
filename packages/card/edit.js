import PropTypes from 'prop-types';
import PostSelector from '../globals/PostSelector';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';

class GlutenblocksCardEdit extends Component {
    render() {
        const {
            attributes: { posts, target, noFollow },
            className,
            setAttributes,
        } = this.props;

        const classname = classnames(className, 'gb-card');

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Posts Selector">
                        <PostSelector
                            onPostSelect={post => {
                                posts.push(post);
                                setAttributes({ posts: [...posts] });
                            }}
                            posts={posts}
                            onChange={newValue => {
                                setAttributes({ posts: [...newValue] });
                            }}
                            postType={'any'}
                            limit={1}
                        />
                    </PanelBody>
                    <PanelBody title={ __('Settings') }
                        initialOpen={ false }
                        className={'gb-card__panel-body'}>
                        <SelectControl
                            label={ __('Link Target') }
                            value={ target }
                            options={ [
                                { value: '_self', label: __('Same Window') },
                                { value: '_blank', label: __('New Window') },
                            ] }
                            onChange={ value => {
                                setAttributes({ target: value });
                            } }
                        />
                        <ToggleControl
                            label={ __('Set link to nofollow?') }
                            checked={ (undefined !== noFollow ? noFollow : false) }
                            onChange={ (value) => setAttributes({ noFollow: value }) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div href="#" className={ classname }>
                    { posts.length === 0 && (
                        <Fragment>
                            <div className="skeleton-image skeleton-image--large"/>
                            <div className="skeleton-body">
                                <div className="skeleton-body__line"></div>
                                <div className="skeleton-body__line"></div>
                                <div className="skeleton-body__line"></div>
                            </div>
                        </Fragment>
                    )}
                    { posts.length > 0 && (
                        <Fragment>
                            { (posts[0].featured_media !== null && posts[0].featured_media !== 0) && (
                                <div className='gb-card__media-container'>
                                    <img src={posts[0].featured_media.source_url} className="gb-card__media" alt={posts[0].alt_text ? posts[0].alt_text : ''}/>
                                </div>
                            )}
                            <div className="gb-card__body">
                                <h5 className="gb-card__title">{posts[0].title}</h5>
                                <div dangerouslySetInnerHTML={{ __html: posts[0].excerpt }} />
                            </div>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        );
    }
}

GlutenblocksCardEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string,

};

export default (
    GlutenblocksCardEdit
);
