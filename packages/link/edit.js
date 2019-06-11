import PropTypes from 'prop-types';
import classnames from 'classnames';
const { apiFetch } = wp;
const { addQueryArgs } = wp.url;
const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;
const { SelectControl, IconButton, PanelBody, ToggleControl } = wp.components;
const { InspectorControls, URLInput, RichText } = wp.editor;

class GlutenblocksLinkEdit extends Component {
    typeOptions = [
        { value: 'visit', label: __('Visit') },
        { value: 'download', label: __('Download') }
    ];
    mediaObjects = [];
    postFiles = [];
    postAttibutes = [{ value: '', label: __('Select Post Attribute') }];

    constructor() {
        super(...arguments);

        this.postTypes = null;
    }

    acfPluginCheck() {
        const {
            attributes: { hasACFPlugin },
            setAttributes
        } = this.props;
        var options = [
            { value: 'visit', label: __('Visit') },
            { value: 'download', label: __('Download') }
        ];
        apiFetch({
            path: addQueryArgs('/glutenblocks/v1/gb_is_acf_plugin_active')
        }).then(answer => {
            if (answer) {
                options.push({
                    value: 'custom',
                    label: __('Link to Custom Post Type')
                });
            }
            this.typeOptions = options;
            setAttributes({ hasACFPlugin: answer }); //needed to update dom of typeOptions
        });
    }

    getPostTypes() {
        apiFetch({
            path: addQueryArgs('/glutenblocks/v1/wp_get_post_types')
        }).then(post_types => {
            var postFormatter = [{ value: '', label: __('Select Post Type') }];
            post_types.forEach(post_type => {
                postFormatter.push({ value: post_type, label: __(post_type) });
            });
            this.postTypes = postFormatter;
        });
    }

    getCustomPostObjects(postType) {
        const { setAttributes } = this.props;
        apiFetch({
            path: addQueryArgs(
                '/glutenblocks/v1/gb_get_field_types/field=' + postType
            )
        })
            .then(objects => {
                var options = [{ value: '', label: __('Select Post Object') }];
                objects.forEach(obj => {
                    options.push({ value: obj.ID, label: __(obj.post_title) });
                });
                this.postFiles = options;
                setAttributes({ customPostType: postType });
            })
            .catch(err => {
                setAttributes({ customPostType: '' });
            });
    }

    getCustomPostAttributes(postId) {
        const {
            attributes: { customPostType },
            setAttributes
        } = this.props;
        apiFetch({
            path: addQueryArgs(
                '/glutenblocks/v1/gb_get_post_attributes/id=' + postId
            )
        })
            .then(objects => {
                var options = [
                    { value: '', label: __('Select Post Attribute') }
                ];
                Object.keys(objects[customPostType]).forEach(key => {
                    options.push({ value: key, label: __(key) });
                });
                this.postAttibutes = options;
                setAttributes({ customPostObjectID: postId });
            })
            .catch(err => {
                setAttributes({ customPostObjectID: '' });
            });
    }

    render() {
        const {
            attributes: {
                link,
                text,
                type,
                actionText,
                target,
                noFollow,
                customPostType,
                customPostObjectID,
                customPostAttribute
            },
            className,
            setAttributes,
            isSelected
        } = this.props;
        this.acfPluginCheck();
        this.getPostTypes();
        if (customPostType) {
            this.getCustomPostObjects(customPostType);
        }
        if (customPostObjectID) {
            this.getCustomPostAttributes(customPostObjectID);
        }

        const classname = classnames(className);
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={__('Settings')}
                        initialOpen={true}
                        className={'gb-link__panel-body'}
                    >
                        <SelectControl
                            label={__('Type')}
                            value={type}
                            options={this.typeOptions}
                            onChange={value => setAttributes({ type: value })}
                        />
                        <SelectControl
                            label={__('Link Target')}
                            value={target}
                            options={[
                                { value: '_self', label: __('Same Window') },
                                { value: '_blank', label: __('New Window') }
                            ]}
                            onChange={value => {
                                setAttributes({ target: value });
                            }}
                        />

                        {type === 'custom' && (
                            <SelectControl
                                label={__('Post Type')}
                                value={customPostType}
                                options={this.postTypes}
                                onChange={value =>
                                    this.getCustomPostObjects(value)
                                }
                            />
                        )}

                        {type === 'custom' && customPostType && (
                            <SelectControl
                                label={__('Object')}
                                value={customPostObjectID}
                                options={this.postFiles}
                                onChange={value =>
                                    this.getCustomPostAttributes(value)
                                }
                            />
                        )}

                        {type === 'custom' &&
                            customPostType &&
                            customPostObjectID && (
                            <SelectControl
                                label={__('Attribute')}
                                value={customPostAttribute}
                                options={this.postAttibutes}
                                onChange={value =>
                                    setAttributes({
                                        customPostAttribute: value
                                    })
                                }
                            />
                        )}

                        <ToggleControl
                            label={__('Set link to nofollow?')}
                            checked={undefined !== noFollow ? noFollow : false}
                            onChange={value =>
                                setAttributes({ noFollow: value })
                            }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={classname}>
                    <div className={'gb-list-links__text'}>
                        <RichText
                            tagName='span'
                            placeholder={__('Text...')}
                            value={text}
                            onChange={value => {
                                setAttributes({ text: value });
                            }}
                            formattingControls={[
                                'bold',
                                'italic',
                                'strikethrough'
                            ]}
                            keepPlaceholderOnFocus
                        />
                    </div>
                    <div
                        className={`gb-list-links__action gb-list-links--${type}`}
                    >
                        <RichText
                            tagName='span'
                            placeholder={__('Action...')}
                            value={actionText}
                            onChange={value => {
                                setAttributes({ actionText: value });
                            }}
                            formattingControls={[
                                'bold',
                                'italic',
                                'strikethrough'
                            ]}
                            keepPlaceholderOnFocus
                        />
                    </div>
                    {isSelected && (
                        <form
                            key={'form-link'}
                            onSubmit={event => event.preventDefault()}
                            className='blocks-button__inline-link'
                        >
                            <URLInput
                                value={link}
                                onChange={value => {
                                    setAttributes({ link: value });
                                }}
                            />
                            <IconButton
                                icon={'editor-break'}
                                label={__('Apply')}
                                type={'submit'}
                            />
                        </form>
                    )}
                </div>
            </Fragment>
        );
    }
}

GlutenblocksLinkEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    isSelected: PropTypes.bool,
    className: PropTypes.string
};

export default GlutenblocksLinkEdit;
