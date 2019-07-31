import PropTypes from 'prop-types';
const { apiFetch } = wp;
const { addQueryArgs } = wp.url;
const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;
const { SelectControl, ToggleControl } = wp.components;

class LinkSelect extends Component {
    typeOptions = [
        { value: 'visit', label: __('Visit') },
        { value: 'download', label: __('Download') }
    ];
    mediaObjects = [];
    postFiles = [];
    postAttibutes = [{ value: '', label: __('Select Post Attribute') }];
    loaded = false;

    type = 'custom';
    target = '_self';
    noFollow;
    customPostType = '';
    customPostObjectID = '';
    customPostAttribute = '';

    constructor(props) {
        super(props);
    }

    acfPluginCheck() {
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

            this.loaded = true;
            this.forceUpdate();
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
            this.forceUpdate();
        });
    }

    getCustomPostObjects(postType) {
        const { onCustomPostTypeChange } = this.props;

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
                this.customPostType = postType;
                onCustomPostTypeChange(postType);
                this.forceUpdate();
            })
            .catch(err => {
                this.customPostType = '';
                this.forceUpdate();
            });
    }

    getCustomPostAttributes(postId) {
        const { onCustomPostIdChange } = this.props;
        apiFetch({
            path: addQueryArgs(
                '/glutenblocks/v1/gb_get_post_attributes/id=' + postId
            )
        })
            .then(objects => {
                var options = [
                    { value: '', label: __('Select Post Attribute') }
                ];
                Object.keys(objects[this.customPostType]).forEach(key => {
                    options.push({ value: key, label: __(key) });
                });
                this.postAttibutes = options;
                this.customPostObjectID = postId;
                onCustomPostIdChange(postId);
                this.forceUpdate();
            })
            .catch(err => {
                this.customPostObjectID = '';
                this.forceUpdate();
            });
    }

    handleTypeChange(value) {
        const { onLinkTypeChange } = this.props;

        this.type = value;
        onLinkTypeChange(value);
        this.forceUpdate();
    }

    handleTargetChange(value) {
        const { onTargetChange } = this.props;

        this.target = value;
        onTargetChange(value);
        this.forceUpdate();
    }

    handleNoFollow(value) {
        const { onNoFollowChange } = this.props;

        this.noFollow = value;
        onNoFollowChange(value);
        this.forceUpdate();
    }

    handleCustomAttributeChange(value) {
        const { onCustomPostAttributeChange } = this.props;

        this.customPostAttribute = value;
        onCustomPostAttributeChange(value);
        this.forceUpdate();
    }

    areVariablesSet = false;

    render() {
        const {
            target,
            type,
            noFollow,
            customPostType,
            customPostObjectID,
            customPostAttribute
        } = this.props;

        if (!this.areVariablesSet) {
            this.areVariablesSet = true;
            this.postTypes = null;

            this.type = type ? type : 'visit';
            this.target = target ? target : '_self';
            this.noFollow = noFollow ? noFollow : null;
            this.customPostType = customPostType ? customPostType : '';
            this.customPostObjectID = customPostObjectID
                ? customPostObjectID
                : '';
            this.customPostAttribute = customPostAttribute
                ? customPostAttribute
                : '';

            this.acfPluginCheck();
            this.getPostTypes();
            if (this.customPostType) {
                this.getCustomPostObjects(this.customPostType);
            }
            if (this.customPostObjectID) {
                this.getCustomPostAttributes(this.customPostObjectID);
            }
        }

        return (
            <Fragment>
                {!this.loaded && <div className='loader' />}
                {this.loaded && (
                    <Fragment>
                        <SelectControl
                            label={__('Type')}
                            value={this.type}
                            options={this.typeOptions}
                            onChange={value => {
                                this.handleTypeChange(value);
                            }}
                        />

                        <SelectControl
                            label={__('Link Target')}
                            value={this.target}
                            options={[
                                { value: '_self', label: __('Same Window') },
                                { value: '_blank', label: __('New Window') }
                            ]}
                            onChange={value => {
                                this.handleTargetChange(value);
                            }}
                        />

                        {this.type === 'custom' && (
                            <SelectControl
                                label={__('Post Type')}
                                value={this.customPostType}
                                options={this.postTypes}
                                onChange={value =>
                                    this.getCustomPostObjects(value)
                                }
                            />
                        )}

                        {this.type === 'custom' && this.customPostType && (
                            <SelectControl
                                label={__('Object')}
                                value={this.customPostObjectID}
                                options={this.postFiles}
                                onChange={value =>
                                    this.getCustomPostAttributes(value)
                                }
                            />
                        )}

                        {this.type === 'custom' &&
                            this.customPostType &&
                            this.customPostObjectID && (
                            <SelectControl
                                label={__('Attribute')}
                                value={this.customPostAttribute}
                                options={this.postAttibutes}
                                onChange={value => {
                                    this.handleCustomAttributeChange(value);
                                }}
                            />
                        )}
                        <ToggleControl
                            label={__('Set link to nofollow?')}
                            checked={undefined !== this.noFollow ? this.noFollow : false}
                            onChange={value => { 
                                this.handleNoFollow(value); 
                            }}
                        />
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

LinkSelect.propTypes = {
    attributes: PropTypes.object,
    type: PropTypes.string,
    target: PropTypes.string,
    noFollow: PropTypes.string,
    customPostType: PropTypes.string,
    customPostObjectID: PropTypes.string,
    customPostAttribute: PropTypes.string,
    onLinkTypeChange: PropTypes.func,
    onTargetChange: PropTypes.func,
    onNoFollowChange: PropTypes.func,
    onCustomPostTypeChange: PropTypes.func,
    onCustomPostIdChange: PropTypes.func,
    onCustomPostAttributeChange: PropTypes.func
};

export default LinkSelect;
