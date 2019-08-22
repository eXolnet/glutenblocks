import Jumbotron from '../jumbotron/save';
import classnames from 'classnames';

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
        const { attributes: { carouselImages } } = this.props;
        const elements = [];
        for (let i = 0; i < carouselImages.length; i++) {
            const id = this.getUniqueId() + (i + 1);
            elements.push(<input className="gb-carousel__activator" type="radio" name="carousel" id={id} checked={i === 0} />);
        }
        return elements;
    }

    createCarouselControls = () => {
        const { attributes: { carouselImages } } = this.props;
        const elements = [];
        for (let i = 0; i < carouselImages.length; i++) {
            const forwardId =  (i + 2 > carouselImages.length) ? (this.getUniqueId() + '1') : this.getUniqueId() + (i + 2);
            const reverseId = (i < 1) ? this.getUniqueId() + carouselImages.length : this.getUniqueId() + i;
            elements.push(
                <div className="gb-carousel__controls">
                    <label className="gb-carousel__control gb-carousel__control--backward" htmlFor={reverseId}></label>
                    <label className="gb-carousel__control gb-carousel__control--forward" htmlFor={forwardId}></label>
                </div>
            );
        }
        return elements;
    }

    createCarouselContent = () => {
        const { attributes: { carouselImages, bgImgSize } } = this.props;
        const elements = [];
        for (let i = 0; i < carouselImages.length; i++) {
            elements.push(<li className="gb-carousel__slide" style={'background-image: url(\'' + carouselImages[i].url + '\'); background-size: ' + bgImgSize + ';'}></li>);
        }
        return elements;
    }

    createCarouselIndicators = () => {
        const { attributes: { carouselImages } } = this.props;
        const elements = [];
        for (let i = 0; i < carouselImages.length; i++) {
            elements.push(<label className="gb-carousel__indicator" htmlFor={this.getUniqueId() + (i + 1)}></label>);
        }
        return elements;
    }


    renderHeroAfter() {
        const { className } = this.props;

        return (
            <div className={className}>
                
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
