import Hero from '../hero/edit';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RichText } = wp.editor;
const { PanelBody, ToggleControl, TextControl } = wp.components;

class JumbotronEdit extends Hero {
    getHeroClassName() {
        return classnames(super.getHeroClassName(), 'gb-jumbotron');
    }

    renderPanelBodySizing() {
        return null;
    }

    renderInspectorControls() {
        const {
            attributes: {
                scrollTo,
                scrollToAnchor,
            },
            setAttributes,
        } = this.props;

        return (
            <Fragment>
                {super.renderInspectorControls()}

                <PanelBody title={ __('Scroll To') } initialOpen={ false }>
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
                        </Fragment>
                    )}
                </PanelBody>
            </Fragment>
        );
    }

    renderHeroAfter() {
        const { attributes: { scrollTo, scrollToText }, setAttributes } = this.props;

        return (
            <Fragment>
                { super.renderHeroAfter() }
            
                {scrollTo && (
                    <div className={'gb-jumbotron__scroll-to'}>
                        <RichText
                            tagName="div"
                            placeholder={ __('Scroll To Text...') }
                            value={ scrollToText }
                            onChange={ value => {
                                setAttributes({ scrollToText: value });
                            } }
                            className={ 'gb-jumbotron__scroll-to' }
                            keepPlaceholderOnFocus
                        />
                    </div>
                )}
            </Fragment>
        );
    }
}

export default JumbotronEdit;
