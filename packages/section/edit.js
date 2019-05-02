import PropTypes from 'prop-types';
import utils from '../globals/utils';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { PanelBody, SelectControl } = wp.components;
const { Component, Fragment } = wp.element;
const { InspectorControls, InnerBlocks } = wp.editor;

const TEMPLATE = [
    ['core/paragraph'],
];

class GlutenblocksHeroEdit extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const { attributes: { theme }, className, setAttributes } = this.props;

        const themeOptions = utils.sectionThemes();

        return (
            <Fragment>
                {themeOptions.length > 0 && <InspectorControls>
                    <PanelBody
                        title={ __('Appearance') }
                        initialOpen={ false }
                        className={'gb-section__panel-body'}
                    >
                        <SelectControl
                            label={ __('Theme') }
                            value={ theme }
                            options={ themeOptions }
                            onChange={ value => setAttributes({ theme: value }) }
                        />
                    </PanelBody>
                </InspectorControls>}
                <section className={ classnames(className, `gb-section gb-section--theme-${theme}`) }>
                    <InnerBlocks templateLock={ false } template={TEMPLATE} />
                </section>
            </Fragment>
        );
    }
}

GlutenblocksHeroEdit.propTypes = {
    clientId: PropTypes.string,
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string
};

export default (
    GlutenblocksHeroEdit
);
