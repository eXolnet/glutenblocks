import PropTypes from 'prop-types';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import utils from '../globals/utils';
import classnames from 'classnames';
import GenIcon from '../globals/genicon';
import Ico from '../globals/svgicons';
import FaIco from '../globals/faicons';
import IcoNames from '../globals/svgiconsnames';

const { apiFetch } = wp;
const { addQueryArgs } = wp.url;
const { __ } = wp.i18n;
const { IconButton, PanelBody, SelectControl, ToggleControl } = wp.components;
const { Component, Fragment } = wp.element;
const { RichText, URLInput, InspectorControls } = wp.editor;


class GlutenblocksButtonExtraEdit extends Component {
    typeOptions = [
        { value: 'normal', label: __('Normal') },
    ];
    mediaObjects = [];
    postFiles = [];
    postAttibutes = [{ value: '', label: __('Select Post Attribute') }];

    constructor() {
        super(...arguments);
        this.state = {
            btnFocused: 'false',
        };
        this.postTypes = null;
    }

    acfPluginCheck() {
        const {
            attributes: { hasACFPlugin },
            setAttributes
        } = this.props;
        var options = [
            { value: 'visit', label: __('Visit') },
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

    componentDidUpdate(prevProps) {
        if (! this.props.isSelected && prevProps.isSelected && this.state.btnFocused) {
            this.setState({
                btnFocused: 'false',
            });
        }
    }

    render() {
        const { attributes: { color, colorInverse, shape, size, text, link, target, noFollow, type, customPostType, customPostObjectID, customPostAttribute }, className, setAttributes, isSelected } = this.props;

        this.acfPluginCheck();
        this.getPostTypes();
        if (customPostType) {
            this.getCustomPostObjects(customPostType);
        }
        if (customPostObjectID) {
            this.getCustomPostAttributes(customPostObjectID);
        }

        const colorOptions = utils.buttonColors();
        const shapeOptions = utils.buttonShapes();

        const buttonClass = classnames('gb-button', {
            [ `gb-button--${ color }` ]: color,
            [ 'gb-button--inverse' ]: colorInverse,
            [ `gb-button--${ shape }` ]: shape,
            [ `gb-button--${ size }` ]: size,
        });

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
                    </PanelBody>
                    <PanelBody
                        title={ __('Appearance') }
                        initialOpen={ true }
                        className={'gb-hero__panel-body'}
                    >
                        {colorOptions && (
                            <SelectControl
                                label={ __('Color') }
                                value={ color }
                                options={ colorOptions }
                                onChange={ value => {
                                    setAttributes({ color: value });
                                } }
                            />
                        )}

                        <ToggleControl
                            label={ __('Inverse') }
                            checked={ colorInverse || false }
                            onChange={ (value) => setAttributes({ colorInverse: value }) }
                        />

                        {shapeOptions && (
                            <SelectControl
                                label={ __('Shape') }
                                value={ shape }
                                options={ shapeOptions }
                                onChange={ value => {
                                    setAttributes({ shape: value });
                                } }
                            />
                        )}

                        <SelectControl
                            label={ __('Size') }
                            value={ size }
                            options={ [
                                { value: 'small', label: __('Small') },
                                { value: '', label: __('Normal') },
                                { value: 'large', label: __('Large') },
                            ] }
                            onChange={ value => {
                                setAttributes({ size: value });
                            } }
                        />
                    </PanelBody>
                    <PanelBody title={ __('Settings') }
                        initialOpen={ false }
                        className={'gb-hero__panel-body'}>
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
                <div className={ classnames(className, 'gb-button__area-wrap') } >
                    <span className={'gb-button__wrap'}>
                        <span className={buttonClass}>
                            <RichText
                                tagName="div"
                                placeholder={ __('Button...') }
                                value={ text }
                                onChange={ value => {
                                    setAttributes({ text: value });
                                } }
                                formattingControls={ ['bold', 'italic', 'strikethrough'] }
                                className={ 'gb-button__text' }
                                keepPlaceholderOnFocus
                            />
                        </span>
                    </span>
                    { isSelected && (
                        <form
                            key={ 'form-link' }
                            onSubmit={ (event) => event.preventDefault() }
                            className="blocks-button__inline-link">
                            <URLInput
                                value={ link }
                                onChange={ value => {
                                    setAttributes({ link: value });
                                } }
                            />
                            <IconButton
                                icon={ 'editor-break' }
                                label={ __('Apply') }
                                type={ 'submit' }
                            />
                        </form>
                    ) }
                </div>
            </Fragment>
        );
    }
}

GlutenblocksButtonExtraEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string,
    isSelected: PropTypes.bool
};

export default (
    GlutenblocksButtonExtraEdit
);
