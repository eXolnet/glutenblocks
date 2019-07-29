import PropTypes from 'prop-types';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import utils from '../globals/utils';
import classnames from 'classnames';
import LinkSelect from '../components/link-select/link-select';
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


class GlutenblocksButtonEdit extends Component {
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

        this.onLinkTypeChange = this.onLinkTypeChange.bind(this);
        this.onTargetChange = this.onTargetChange.bind(this);
        this.onNoFollowChange = this.onNoFollowChange.bind(this);
        this.onCustomPostTypeChange = this.onCustomPostTypeChange.bind(this);
        this.onCustomPostIdChange = this.onCustomPostIdChange.bind(this);
        this.onCustomPostAttributeChange = this.onCustomPostAttributeChange.bind(this);
    }

    onLinkTypeChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ type: value });
    }

    onTargetChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ target: value });
    }

    onNoFollowChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ noFollow: value });
    }

    onCustomPostTypeChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ customPostType: value });
    }

    onCustomPostIdChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ customPostObjectID: value });
    }

    onCustomPostAttributeChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ customPostAttribute: value });
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
                        <LinkSelect
                            onLinkTypeChange={ this.onLinkTypeChange }
                            onTargetChange={ this.onTargetChange}
                            onNoFollowChange={ this.onNoFollowChange }
                            onCustomPostTypeChange={this.onCustomPostTypeChange}
                            onCustomPostIdChange={this.onCustomPostIdChange}
                            onCustomPostAttributeChange={this.onCustomPostAttributeChange}
                            { ...{ type, target, customPostType, customPostObjectID, customPostAttribute } }
                        >
                        </LinkSelect>

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

GlutenblocksButtonEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string,
    isSelected: PropTypes.bool
};

export default (
    GlutenblocksButtonEdit
);
