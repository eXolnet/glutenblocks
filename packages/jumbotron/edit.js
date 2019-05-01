import PropTypes from 'prop-types';
import utils from '../globals/utils';
import Button from '../button/edit';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks, InspectorControls, RichText, ColorPalette, URLInput } = wp.editor;
const { IconButton, PanelBody, ToggleControl, TextControl, SelectControl } = wp.components;

const TEMPLATE = [
    ['glutenblocks/hero', { align:'full', minHeightUnit: 'vh', minHeight: 100 }, [
        ['glutenblocks/row', { columns:1, colLayout:'12', tabletLayout:'12',mobileLayout:'12' },[
            ['glutenblocks/column', { colClasses:'col-lg-12', tabletColClasses:'col-md-12', mobileColClasses:'col-sm-12' }, [
                ['core/paragraph']
            ]],
        ]]
    ]],
];

class JumbotronEdit extends Component {
    render() {
        const {
            attributes: {
                scrollTo,
                scrollToAnchor,
                scrollToText,
                scrollToColor,
                scrollToTheme,
                callToAction,
                theme, text, link, target, noFollow, icon, iconSide,
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
                            <Button setAttributes={setAttributes} className={'wp-block-glutenblocks-button is-style-squared gb-jumbotron__call-to-action'} isSelected={isSelected} { ...{ attributes:{ theme, text, link, target, noFollow, icon, iconSide } } }/>
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
