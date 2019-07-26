import PropTypes from 'prop-types';
import classnames from 'classnames';
import memoize from 'memize';
import { times } from 'lodash';

const { __ } = wp.i18n;
const { PanelBody, RangeControl } = wp.components;
const { Component, Fragment } = wp.element;
const { InnerBlocks, InspectorControls } = wp.editor;

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
