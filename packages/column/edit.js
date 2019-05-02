import classnames from 'classnames';
import icons from '../globals/icons';
import PropTypes from 'prop-types';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks, BlockControls, InspectorControls } = wp.editor;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Button, Toolbar, Tooltip, PanelBody, ToggleControl } = wp.components;

/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const glutenblocksColumnUniqueIDs = [];

class GlutenBlocksColumn extends Component {
    constructor() {
        super(...arguments);
    }
    componentDidMount() {
        if (! this.props.attributes.uniqueID) {
            this.props.setAttributes({
                uniqueID: '_' + this.props.clientId.substr(2, 9),
            });
            glutenblocksColumnUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
        } else if (glutenblocksColumnUniqueIDs.includes(this.props.attributes.uniqueID)) {
            this.props.setAttributes({
                uniqueID: '_' + this.props.clientId.substr(2, 9),
            });
            glutenblocksColumnUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
        } else {
            glutenblocksColumnUniqueIDs.push(this.props.attributes.uniqueID);
        }
    }
    render() {
        const { attributes: { uniqueID, verticalAlignment, colClasses, override }, updateAlignment, setAttributes } = this.props;

        const classes = classnames({
            [ `valign-${ verticalAlignment }` ]: verticalAlignment,
            [`${colClasses}`]: colClasses
        });

        return (
            <Fragment>
                <BlockControls>
                    <Toolbar>
                        <Tooltip text={ __('Vertical Align Top') }>
                            <Button
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': verticalAlignment === 'top' },
                                ) }
                                onClick={ () => updateAlignment('top') }
                            >
                                { icons.aligntop }
                            </Button>
                        </Tooltip>
                    </Toolbar>
                    <Toolbar>
                        <Tooltip text={ __('Vertical Align Middle') }>
                            <Button
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': verticalAlignment === 'middle' },
                                ) }
                                onClick={ () => updateAlignment('middle') }
                            >
                                { icons.alignmiddle }
                            </Button>
                        </Tooltip>
                    </Toolbar>
                    <Toolbar>
                        <Tooltip text={ __('Vertical Align Bottom') }>
                            <Button
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': verticalAlignment === 'bottom' },
                                ) }
                                onClick={ () => updateAlignment('bottom') }
                            >
                                { icons.alignbottom }
                            </Button>
                        </Tooltip>
                    </Toolbar>
                </BlockControls>
                <InspectorControls>
                    <PanelBody>
                        <ToggleControl
                            label={ __('Override Classes') }
                            checked={ (override || false) }
                            onChange={ (value) => setAttributes({ override: value }) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div id={ `glutenblocks-column${ uniqueID }` } className={ classes }>
                    <InnerBlocks templateLock={ false } />
                </div>
            </Fragment>
        );
    }
}

GlutenBlocksColumn.propTypes = {
    attributes: PropTypes.object,
    clientId: PropTypes.string,
    className: PropTypes.string,
    setAttributes: PropTypes.func,
    updateAlignment: PropTypes.func,
    updateLayout: PropTypes.func,
    updateColLayout: PropTypes.func,
    updateTabletLayout: PropTypes.func,
    updateMobileLayout: PropTypes.func,
};

export default compose(
    withSelect((select, { clientId }) => {
        const { getBlockRootClientId } = select('core/editor');

        return {
            parentColumnsBlockClientId: getBlockRootClientId(clientId),
        };
    }),
    withDispatch((dispatch, { clientId, parentColumnsBlockClientId }) => {
        return {
            updateAlignment(alignment) {
                // Update self...
                dispatch('core/editor').updateBlockAttributes(clientId, {
                    verticalAlignment: alignment,
                });

                // Reset Parent Columns Block
                dispatch('core/editor').updateBlockAttributes(parentColumnsBlockClientId, {
                    verticalAlignment: '',
                });
            },
        };
    })
)(GlutenBlocksColumn);
