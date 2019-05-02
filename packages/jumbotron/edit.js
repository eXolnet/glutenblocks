import PropTypes from 'prop-types';
import utils from '../globals/utils';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks, InspectorControls, RichText, ColorPalette, URLInput } = wp.editor;
const { IconButton, PanelBody, ToggleControl, TextControl, SelectControl } = wp.components;

const TEMPLATE = [
    ['glutenblocks/hero', { align:'full' }, [
        ['glutenblocks/row', { columns:1, colLayout:'12', tabletLayout:'12',mobileLayout:'12' },[
            ['glutenblocks/column', { colClasses:'col-lg-12', tabletColClasses:'col-md-12', mobileColClasses:'col-sm-12' }, [
                ['core/paragraph']
            ]],
        ]]
    ]],
];

class JumbotronEdit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            btnFocused: 'false',
        };
    }
    render() {
        const {
            attributes: {
                scrollTo,
                scrollToAnchor,
                scrollToText,
                scrollToColor,
                scrollToTheme,
                callToAction,
                theme, text, link, target, noFollow,
                supportButton,
                supportTheme, supportText, supportLink, supportTarget, supportNoFollow

            },
            setAttributes,
            className,
            isSelected
        } = this.props;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __('Scroll To') } initialOpen={ true }>
                        <ToggleControl
                            label={ __('Add Scroll To button') }
                            checked={ scrollTo }
                            onChange={ () => setAttributes({
                                scrollTo: ! scrollTo,
                            }) }
                        />
                        {scrollTo && (
                            <Fragment>
                                <TextControl
                                    type="text"
                                    label={ __('Anchor') }
                                    value={ scrollToAnchor }
                                    onChange={ value => setAttributes({ scrollToAnchor: value }) }
                                />
                                <p>{__('Color')}</p>
                                <ColorPalette
                                    colors={ utils.themeColors() }
                                    value={ scrollToColor }
                                    onChange={ value => setAttributes({ scrollToColor: value }) }
                                />
                                <SelectControl
                                    label={ __('Button Theme') }
                                    value={ scrollToTheme }
                                    options={ utils.themeStyles() }
                                    onChange={ value => {
                                        setAttributes({ scrollToTheme: value });
                                    } }
                                />
                            </Fragment>
                        )}
                    </PanelBody>
                    <PanelBody title={ __('Support Button') } initialOpen={ true }>
                        <Fragment>
                            <ToggleControl
                                label={ __('Add a Support Button') }
                                checked={ supportButton }
                                onChange={ () => setAttributes({
                                    supportButton: ! supportButton,
                                }) }
                            />
                            {supportButton && (
                                <Fragment>
                                    <SelectControl
                                        label={ __('Button Theme') }
                                        value={ supportTheme }
                                        options={ utils.themeStyles() }
                                        onChange={ value => {
                                            setAttributes({ supportTheme: value });
                                        } }
                                    />
                                    <SelectControl
                                        label={ __('Link Target') }
                                        value={ supportTarget }
                                        options={ [
                                            { value: '_self', label: __('Same Window') },
                                            { value: '_blank', label: __('New Window') },
                                        ] }
                                        onChange={ value => {
                                            setAttributes({ supportTarget: value });
                                        } }
                                    />
                                    <ToggleControl
                                        label={ __('Set link to nofollow?') }
                                        checked={ (undefined !== supportNoFollow ? supportNoFollow : false) }
                                        onChange={ (value) => setAttributes({ supportNoFollow: value }) }
                                    />
                                </Fragment>
                            )}
                        </Fragment>
                    </PanelBody>
                    <PanelBody title={ __('Call To Action') } initialOpen={ true }>
                        <ToggleControl
                            label={ __('Add Call To Action button') }
                            checked={ callToAction }
                            onChange={ () => setAttributes({
                                callToAction: ! callToAction,
                            }) }
                        />
                        {supportButton && (
                            <Fragment>
                                <SelectControl
                                    label={ __('Button Theme') }
                                    value={ theme }
                                    options={ utils.themeStyles() }
                                    onChange={ value => {
                                        setAttributes({ theme: value });
                                    } }
                                />
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
                            </Fragment>
                        )}
                    </PanelBody>
                </InspectorControls>
                <div className={ className } >
                    <InnerBlocks
                        template={TEMPLATE} />
                    {scrollTo && (
                        <RichText
                            tagName="div"
                            placeholder={ __('Scroll To Text...') }
                            value={ scrollToText }
                            onChange={ value => {
                                setAttributes({ scrollToText: value });
                            } }
                            style={{ color : scrollToColor ? scrollToColor : undefined }}
                            formattingControls={ ['bold', 'italic', 'strikethrough'] }
                            className={ `gb-button gb-button--${scrollToTheme} gb-jumbotron__scroll-to` }
                            keepPlaceholderOnFocus
                        />
                    )}
                    <div className="gb-buttons-wrapper">
                        {supportButton && (
                            <div className={ 'gb-button__area-wrap' } >
                                <span className={'gb-button__wrap'}>
                                    <span className={`gb-button gb-button--inverse is-style-squared gb-button--${supportTheme}`}>
                                        <RichText
                                            tagName="div"
                                            placeholder={ __('Support Button...') }
                                            value={ supportText }
                                            onChange={ value => {
                                                setAttributes({ supportText: value });
                                            } }
                                            formattingControls={ [] }
                                            className={ 'gb-button__text' }
                                            unstableOnFocus={ () => {
                                                if ('supportButton' !== this.state.btnFocused) {
                                                    this.setState({
                                                        btnFocused: 'supportButton',
                                                    });
                                                }
                                            } }
                                            keepPlaceholderOnFocus
                                        />
                                    </span>
                                </span>
                                { isSelected && (this.state.btnFocused === 'supportButton') && (
                                    <form
                                        key={ 'form-link' }
                                        onSubmit={ (event) => event.preventDefault() }
                                        className="blocks-button__inline-link">
                                        <URLInput
                                            value={ supportLink }
                                            onChange={ value => {
                                                setAttributes({ supportLink: value });
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
                        )}
                        {callToAction && (
                            <div className={ 'gb-button__area-wrap' } >
                                <span className={'gb-button__wrap'}>
                                    <span className={`gb-button is-style-squared gb-jumbotron__call-to-action gb-button--${theme}`}>
                                        <RichText
                                            tagName="div"
                                            placeholder={ __('Call to Action...') }
                                            value={ text }
                                            onChange={ value => {
                                                setAttributes({ text: value });
                                            } }
                                            formattingControls={ [] }
                                            className={ 'gb-button__text' }
                                            unstableOnFocus={ () => {
                                                if ('callToAction' !== this.state.btnFocused) {
                                                    this.setState({
                                                        btnFocused: 'callToAction',
                                                    });
                                                }
                                            } }
                                            keepPlaceholderOnFocus
                                        />
                                    </span>
                                </span>
                                { isSelected && (this.state.btnFocused === 'callToAction') && (
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
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}

JumbotronEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string,
    isSelected: PropTypes.bool,
};

export default (
    JumbotronEdit
);
