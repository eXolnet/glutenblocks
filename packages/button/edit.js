import PropTypes from 'prop-types';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import utils from '../globals/utils';
import classnames from 'classnames';
import GenIcon from '../globals/genicon';
import Ico from '../globals/svgicons';
import FaIco from '../globals/faicons';
import IcoNames from '../globals/svgiconsnames';

const { __ } = wp.i18n;
const { IconButton, PanelBody, SelectControl, ToggleControl } = wp.components;
const { Component, Fragment } = wp.element;
const { RichText, URLInput, InspectorControls } = wp.editor;


class GlutenblocksButtonEdit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            btnFocused: 'false',
        };
    }
    componentDidUpdate(prevProps) {
        if (! this.props.isSelected && prevProps.isSelected && this.state.btnFocused) {
            this.setState({
                btnFocused: 'false',
            });
        }
    }

    render() {

        const { attributes: { theme, text, link, target, noFollow, icon, iconSide }, className, setAttributes, isSelected } = this.props;

        const renderSVG = svg => (
            <GenIcon name={ svg } icon={ ('fa' === svg.substring(0, 2) ? FaIco[ svg ] : Ico[ svg ]) } />
        );

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={ __('Theme') }
                        initialOpen={ false }
                        className={'gb-hero__panel-body'}
                    >
                        <SelectControl
                            label={ __('Button Theme') }
                            value={ theme }
                            options={ utils.themeStyles() }
                            onChange={ value => {
                                setAttributes({ theme: value });
                            } }
                        />
                    </PanelBody>
                    <PanelBody
                        title={ __('Icon') }
                        initialOpen={ false }
                        className={'gb-hero__panel-body'}
                    >
                        <FontIconPicker
                            icons={ IcoNames }
                            value={ icon }
                            onChange={ value => {
                                setAttributes({ icon: value });
                            } }
                            appendTo="body"
                            renderFunc={ renderSVG }
                            theme="default"
                            isMulti={ false }
                        />
                        <SelectControl
                            label={ __('Icon Location') }
                            value={ iconSide }
                            options={ [
                                { value: 'right', label: __('Right') },
                                { value: 'left', label: __('Left') },
                            ] }
                            onChange={ value => {
                                setAttributes({ iconSide: value });
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
                        <span className={`gb-button__btn gb-button__btn--${theme}`}>
                            { icon && 'left' === iconSide && (
                                <GenIcon className={ `gb-button__svg-icon gb-button__svg-icon--${ icon } gb-button__svg-icon--${ iconSide }` } name={ icon } icon={ ('fa' === icon.substring(0, 2) ? FaIco[ icon ] : Ico[ icon ]) } />
                            ) }
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
                            { icon && 'left' !== iconSide && (
                                <GenIcon className={ `gb-button__svg-icon gb-button__svg-icon--${ icon } gb-button__svg-icon--${ iconSide }` } name={ icon } icon={ ('fa' === icon.substring(0, 2) ? FaIco[ icon ] : Ico[ icon ]) } />
                            ) }
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
