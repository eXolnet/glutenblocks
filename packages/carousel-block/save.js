import Hero from '../hero/save';

/**
 * BLOCK: Glutenblock Column
 */

import { InnerBlocks } from '@wordpress/block-editor';

class GlutenBlocksCarouselBlockSave extends Hero {

    constructor() {
        super(...arguments);
    }

    render() {
        const { attributes: { bgImg, bgImgSize } } = this.props;
        const bgImgAttribute = bgImg ? `url('${bgImg}')` : '';

        return (
            <li className="gb-carousel__slide" style={{ backgroundImage: bgImgAttribute, backgroundSize: bgImgSize, }}>
                <InnerBlocks.Content />
            </li>
        );
    }
}
export default GlutenBlocksCarouselBlockSave;
