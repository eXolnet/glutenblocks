import Jumbotron from '../jumbotron/save';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

class GlutenblocksJumbotronCarouselSave extends Jumbotron {

    constructor() {
        super(...arguments);
    }

    getHeroClassName() {
        return classnames(super.getHeroClassName(), 'gb-jumbotron');
    }

    getUniqueId() {
        const { attributes: { uniqueId } } = this.props;

        return 'wp-' + uniqueId + '-';
    }

    createCarouselActivators = () => {
        const { attributes: { numberOfSlides } } = this.props;
        const elements = [];
        for (let i = 0; i < numberOfSlides; i++) {
            const id = this.getUniqueId() + (i + 1);
            elements.push(<input key={i} className="gb-carousel__activator" type="radio" name="carousel" id={id} checked={i === 0} />);
        }
        return elements;
    }

    createCarouselControls = () => {
        const { attributes: { numberOfSlides } } = this.props;
        const elements = [];
        for (let i = 0; i < numberOfSlides; i++) {
            const forwardId =  (i + 2 > numberOfSlides) ? (this.getUniqueId() + '1') : this.getUniqueId() + (i + 2);
            const reverseId = (i < 1) ? this.getUniqueId() + numberOfSlides : this.getUniqueId() + i;
            elements.push(
                <div key={i} className="gb-carousel__controls">
                    <label className="gb-carousel__control gb-carousel__control--backward" htmlFor={reverseId}></label>
                    <label className="gb-carousel__control gb-carousel__control--forward" htmlFor={forwardId}></label>
                </div>
            );
        }
        return elements;
    }

    createCarouselContent = () => {
        return (
            <Fragment>
                <div className="gb-height-calculator">
                    <InnerBlocks.Content/>
                </div>
                <InnerBlocks.Content/>
            </Fragment>
        );
    }

    createCarouselIndicators = () => {
        const { attributes: { numberOfSlides } } = this.props;
        const elements = [];
        for (let i = 0; i < numberOfSlides; i++) {
            elements.push(<label key={i} className="gb-carousel__indicator" htmlFor={this.getUniqueId() + (i + 1)}></label>);
        }
        return elements;
    }


    render() {
        const { attributes: { autoplayDelay }, className } = this.props;
        return (
            <div className={className}>
                <input id="autoplay-value" type="hidden" value={autoplayDelay}></input>
                <div className="gb-carousel">
                    {super.renderHeroBackgroundOverlay()}
                    <div className="gb-carousel__container">

                        {/* Carousel Navigation Mechanics */}
                        {this.createCarouselActivators()}

                        {/* Carousel Navigation Buttons (circles) */}
                        {this.createCarouselControls()}

                        {/* Carousel Content (slides) */}
                        <div className="gb-carousel__track">
                            {this.createCarouselContent()}
                        </div>

                        {/* Carousel Navigation Buttons (arrows) */}
                        <div className="gb-carousel__indicators">
                            {this.createCarouselIndicators()}
                        </div>
                    </div>
                </div>

                { super.renderJumbotronScrollComponent() }
            </div>
        );
    }
}

export default GlutenblocksJumbotronCarouselSave;
