import Jumbotron from '../jumbotron/edit';
import classnames from 'classnames';
import { getColumnsTemplate } from './utils';

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In carousel block, the only block we allow is 'glutenblocks/carousel-block'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ['glutenblocks/carousel-block'];

class JumbotronCarouselEdit extends Jumbotron {

    constructor() {
        super(...arguments);

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

    renderPanelBodySizing() {
        return null;
    }

    render() {
        const { attributes: { numberOfSlides }, setAttributes } = this.props;
        
        return (
            <Fragment>
                <InspectorControls>
                    <TextControl
                        type="number"
                        label={__('Number of Slides')}
                        value={numberOfSlides}
                        min={1}
                        onChange={value => setAttributes({ numberOfSlides: value })}
                    />
                </InspectorControls>

                <div>
                    <InnerBlocks
                        template={getColumnsTemplate(numberOfSlides)}
                        templateLock="all"
                        allowedBlocks={ALLOWED_BLOCKS}
                    />
                </div>
            </Fragment>
        );
    }
}

export default JumbotronCarouselEdit;

