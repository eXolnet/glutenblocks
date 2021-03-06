import Hero from '../hero/edit';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';

class JumbotronEdit extends Hero {

    constructor() {
        super(...arguments);
    }

    getHeroClassName() {
        return classnames(super.getHeroClassName(), 'gb-jumbotron');
    }

    renderPanelBodySizing() {
        return null;
    }

    renderInspectorControls(isCarousel = false) {
        const {
            attributes: {
                scrollTo,
                scrollToAnchor,
            },
            setAttributes,
        } = this.props;

        return (
            <Fragment>
                {super.renderInspectorControls(isCarousel)}

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

    renderJumbotronScrollComponent() {
        const { attributes: { scrollTo, scrollToText }, setAttributes } = this.props;

        return (
            <Fragment>
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

    renderHeroAfter() {
        

        return (
            <Fragment>
                { super.renderHeroAfter() }
                { this.renderJumbotronScrollComponent()}
            </Fragment>
        );
    }
}

export default JumbotronEdit;
