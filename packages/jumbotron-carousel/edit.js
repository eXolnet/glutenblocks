import Jumbotron from '../jumbotron/edit';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Button, Dashicon, PanelBody, Tooltip } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';

class JumbotronCarouselEdit extends Jumbotron {

    constructor() {
        super(...arguments);

        this.onRemoveImage = this.onRemoveImage.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
    }

    componentDidMount() {
        const { attributes: { uniqueId }, setAttributes } = this.props;
        if (!uniqueId) {
            const uniqueNumber = '' + new Date().getTime() + Math.random();
            setAttributes({ uniqueId: uniqueNumber });
        }
    }

    getHeroClassName() {
        return classnames(super.getHeroClassName(), 'gb-jumbotron');
    }

    setHeroBackground() {
        const { attributes: { carouselImages } } = this.props;
        let elements = document.getElementsByClassName('gb-hero__background');
        let image = carouselImages[0] ? carouselImages[0].url : '';
        [].forEach.call(elements, el => {
            el.style.backgroundImage = `url('${image}')`;
        });
    }

    onRemoveImage(key) {
        const { attributes: { carouselImages }, setAttributes } = this.props;
        let images = carouselImages;
        setAttributes({
            carouselImages: images.filter(u => u.key !== key)
        });
    }

    onSelectImage(img) {
        const { attributes: { carouselImages }, setAttributes } = this.props;
        let images = carouselImages;

        setAttributes({ carouselImages: images.concat([{ key: img.id, url: img.url }]) });
    }

    renderSelectedCarouselImages() {
        const { attributes: { carouselImages } } = this.props;

        return carouselImages.map((image, index) => {
                return (
                    <div key={image['key']} className="carousel-image-edit">
                        <div className="carousel-image-edit__nav">
                            <label>{(index + 1) + '.'}</label>
                            <Tooltip text={ __('Remove Image') }>
                                <Button
                                    className={ 'components-button components-icon-button gb-hero__remove-img gb-hero__cta-upload-btn' }
                                    onClick={ () => this.onRemoveImage(image['key']) }
                                >
                                    <Dashicon icon="no-alt" />
                                </Button>
                            </Tooltip>
                        </div>
                        <img src={image['url']} ></img>
                    </div>
                );
        });
    }

    renderPanelCarouselImages() {
        return (
            <PanelBody
                title={ __('Carousel Images') }
                initialOpen={ false }
                className={'gb-hero__panel-body'}
            >
                <p>{ __('Image') }</p>
                <MediaUpload
                    onSelect={ (img) => this.onSelectImage(img) }
                    type="image"
                    render={ ({ open }) => (
                        <Button
                            className={ 'components-button components-icon-button gb-hero__cta-upload-btn' }
                            onClick={ open }
                        >
                            <Dashicon icon="format-image" />
                            { __('Select Image') }
                        </Button>
                    ) }
                />
                {this.renderSelectedCarouselImages()}

                {super.renderBackgroundImageSize()}
            </PanelBody>
        );
    }

    renderPanelBodySizing() {
        return null;
    }

    renderInspectorControls() {
        this.setHeroBackground();

        return (
            <Fragment>
                {super.renderInspectorControls(true)}
                {this.renderPanelCarouselImages()}
            </Fragment>
        );
    }

    renderHeroAfter() {
        return (
            <Fragment>
                { super.renderHeroAfter() }
                { super.renderJumbotronScrollComponent() }
            </Fragment>
        );
    }
}

export default JumbotronCarouselEdit;

