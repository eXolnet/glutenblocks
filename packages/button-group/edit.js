import PropTypes from 'prop-types';
import classnames from 'classnames';
import memoize from 'memize';
import times from 'lodash/times';

import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['glutenblocks/button', 'glutenblocks/button-extra'];

const getButtonsTemplate = memoize((buttons) => {
    return times(buttons, () => ['glutenblocks/button']);
});

class GlutenblocksButtonGroupEdit extends Component {
    render() {
        const { attributes: { buttonCount }, className, setAttributes } = this.props;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={ __('Appearance') }
                        initialOpen={ true }
                    >
                        <RangeControl
                            label={__('Button Count')}
                            value={buttonCount}
                            onChange={(nextButtonCount) => {
                                setAttributes({ buttonCount: nextButtonCount });
                            }}
                            min={1}
                            max={6}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className={ classnames(className, 'gb-button-group') } >
                    <InnerBlocks
                        template={ getButtonsTemplate(buttonCount) }
                        templateLock="all"
                        allowedBlocks={ ALLOWED_BLOCKS } />
                </div>
            </Fragment>
        );
    }
}

GlutenblocksButtonGroupEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string,
};

export default (
    GlutenblocksButtonGroupEdit
);
