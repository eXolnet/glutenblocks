import Hero from '../hero/edit';

import { Fragment } from '@wordpress/element';

class GlutenBlocksCarouselBlock extends Hero {

    constructor() {
        super(...arguments);
    }

    renderInspectorControls(isCarousel = false) {
        return (
            <Fragment>
                {super.renderInspectorControls(isCarousel)}
            </Fragment>
        );
    }

    renderHeroAfter() {
        return (
            <Fragment>
                { super.renderHeroAfter() }
            </Fragment>
        );
    }
}

GlutenBlocksCarouselBlock.propTypes = {
};

export default GlutenBlocksCarouselBlock;
