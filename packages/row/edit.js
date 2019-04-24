/**
 * External dependencies
 */

import { getColumnsTemplate } from './utils';
import classnames from 'classnames';
import icons from '../globals/icons';
import map from 'lodash/map';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;
const { Button, ButtonGroup, Dashicon, PanelBody, RangeControl, Toolbar, Tooltip, TabPanel } = wp.components;
const { Component, Fragment } = wp.element;
const { InspectorControls, InnerBlocks, BlockControls } = wp.editor;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ['glutenblocks/column'];

/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const GlutenblocksRowUniqueIDs = [];

export class GlutenBlocksRowEdit extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        if (!this.props.attributes.uniqueID) {
            this.props.setAttributes({
                uniqueID: '_' + this.props.clientId.substr(2, 9),
            });
            GlutenblocksRowUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
        } else if (GlutenblocksRowUniqueIDs.includes(this.props.attributes.uniqueID)) {
            this.props.setAttributes({
                uniqueID: '_' + this.props.clientId.substr(2, 9),
            });
            GlutenblocksRowUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
        } else {
            GlutenblocksRowUniqueIDs.push(this.props.attributes.uniqueID);
        }
    }

    render() {
        const { attributes: { uniqueID, columns, colLayout, mobileLayout, tabletLayout, verticalAlignment, currentTab }, className, setAttributes, updateAlignment, updateLayout, updateColLayout, updateTabletLayout, updateMobileLayout } = this.props;

        const widthString = `${colLayout}`;

        const selectColLayout = (columns && (2 === columns) ? widthString : colLayout);

        let layoutOptions;
        let mobileLayoutOptions;

        if (2 === columns) {
            layoutOptions = [
                { key: '6-6', name: __('Equal'), icon: icons.twocol },
                { key: '8-4', name: __('Left Heavy 66/33'), icon: icons.twoleftheavy },
                { key: '4-8', name: __('Right Heavy 33/66'), icon: icons.tworightheavy },
            ];
        } else if (3 === columns) {
            layoutOptions = [
                { key: '4-4-4', name: __('Equal'), icon: icons.threecol },
                { key: '6-3-3', name: __('Left Heavy 50/25/25'), icon: icons.lefthalf },
                { key: '3-3-6', name: __('Right Heavy 25/25/50'), icon: icons.righthalf },
                { key: '3-6-3', name: __('Center Heavy 25/50/25'), icon: icons.centerhalf },
                { key: '2-8-2', name: __('Wide Center 20/60/20'), icon: icons.widecenter },
                { key: '1-10-1', name: __('Wider Center 15/70/15'), icon: icons.widercenter },
            ];
        } else if (4 === columns) {
            layoutOptions = [
                { key: '3-3-3-3', name: __('Equal'), icon: icons.fourcol },
                { key: '6-2-2-2', name: __('Left Heavy 40/20/20/20'), icon: icons.lfourforty },
                { key: '2-2-2-6', name: __('Right Heavy 20/20/20/40'), icon: icons.rfourforty },
            ];
        } else if (5 === columns) {
            layoutOptions = [
                { key: '2-2-2-2-2', name: __('Equal'), icon: icons.fivecol },
            ];
        } else if (6 === columns) {
            layoutOptions = [
                { key: '2-2-2-2-2-2', name: __('Equal'), icon: icons.sixcol },
            ];
        } else {
            layoutOptions = [
                { key: '12', name: __('Single Row'), icon: icons.row },
            ];
        }
        if (2 === columns) {
            mobileLayoutOptions = [
                { key: '6-6', name: __('Equal'), icon: icons.twocol },
                { key: '8-4', name: __('Left Heavy 66/33'), icon: icons.twoleftheavy },
                { key: '4-8', name: __('Right Heavy 33/66'), icon: icons.tworightheavy },
                { key: '12-12', name: __('Collapse to Rows'), icon: icons.collapserow },
            ];
        } else if (3 === columns) {
            mobileLayoutOptions = [
                { key: '4-4-4', name: __('Equal'), icon: icons.threecol },
                { key: '6-3-3', name: __('Left Heavy 50/25/25'), icon: icons.lefthalf },
                { key: '3-3-6', name: __('Right Heavy 25/25/50'), icon: icons.righthalf },
                { key: '3-6-3', name: __('Center Heavy 25/50/25'), icon: icons.centerhalf },
                { key: '2-8-2', name: __('Wide Center 20/60/20'), icon: icons.widecenter },
                { key: '1-10-1', name: __('Wider Center 15/70/15'), icon: icons.widercenter },
                { key: '12-12-12', name: __('Collapse to Rows'), icon: icons.collapserowthree },
            ];
        } else if (4 === columns) {
            mobileLayoutOptions = [
                { key: '3-3-3-3', name: __('Equal'), icon: icons.fourcol },
                { key: '6-2-2-2', name: __('Left Heavy 40/20/20/20'), icon: icons.lfourforty },
                { key: '2-2-2-6', name: __('Right Heavy 20/20/20/40'), icon: icons.rfourforty },
                { key: '6-6-6-6', name: __('Two Column Grid'), icon: icons.grid },
                { key: '12-12-12-12', name: __('Collapse to Rows'), icon: icons.collapserowfour },
            ];
        } else if (5 === columns) {
            mobileLayoutOptions = [
                { key: '2-2-2-2-2', name: __('Equal'), icon: icons.fivecol },
                { key: '12-12-12-12-12', name: __('Collapse to Rows'), icon: icons.collapserowfive },
            ];
        } else if (6 === columns) {
            mobileLayoutOptions = [
                { key: '2-2-2-2-2-2', name: __('Equal'), icon: icons.sixcol },
                { key: '6-6-6-6-6-6', name: __('Two Column Grid'), icon: icons.grid },
                { key: '3-3-3-3-3-3', name: __('Three Column Grid'), icon: icons.threegrid },
                { key: '12-12-12-12-12-12', name: __('Collapse to Rows'), icon: icons.collapserowsix },
            ];
        } else {
            mobileLayoutOptions = [
                { key: '12', name: __('Single Row'), icon: icons.row },
            ];
        }


        const onTabSelect = (tabName) => {
            setAttributes({ currentTab: tabName });
        };
        const mobileControls = (
            <Fragment>
                <PanelBody>
                    {columns > 1 && (
                        <Fragment>
                            <p className="components-base-control__label">{__('Mobile Layout')}</p>
                            <ButtonGroup aria-label={__('Mobile Layout')}>
                                {map(mobileLayoutOptions, ({ name, key, icon }) => (
                                    <Tooltip text={name}>
                                        <Button
                                            key={key}
                                            className="gb-layout-btn"
                                            isSmall
                                            isPrimary={mobileLayout === key}
                                            aria-pressed={mobileLayout === key}
                                            onClick={() => updateMobileLayout(key, columns)}
                                        >
                                            {icon}
                                        </Button>
                                    </Tooltip>
                                ))}
                            </ButtonGroup>
                        </Fragment>
                    )}
                </PanelBody>
            </Fragment>
        );
        const tabletControls = (
            <Fragment>
                <PanelBody>
                    {columns > 1 && (
                        <Fragment>
                            <p className="components-base-control__label">{__('Tablet Layout')}</p>
                            <ButtonGroup aria-label={__('Tablet Layout')}>
                                {map(mobileLayoutOptions, ({ name, key, icon }) => (
                                    <Tooltip text={name}>
                                        <Button
                                            key={key}
                                            className="gb-layout-btn"
                                            isSmall
                                            isPrimary={tabletLayout === key}
                                            aria-pressed={tabletLayout === key}
                                            onClick={() => updateTabletLayout(key, columns)}
                                        >
                                            {icon}
                                        </Button>
                                    </Tooltip>
                                ))}
                            </ButtonGroup>
                        </Fragment>
                    )}
                </PanelBody>
            </Fragment>
        );
        const deskControls = (
            <Fragment>
                <PanelBody>
                    <RangeControl
                        label={__('Columns')}
                        value={columns}
                        onChange={(nextColumns) => {
                            updateLayout(nextColumns);
                        }}
                        min={1}
                        max={6}
                    />
                    {columns > 1 && (
                        <Fragment>
                            <p className="components-base-control__label">{__('Layout')}</p>
                            <ButtonGroup aria-label={__('Column Layout')}>
                                {map(layoutOptions, ({ name, key, icon }) => (
                                    <Tooltip text={name}>
                                        <Button
                                            key={key}
                                            className="gb-layout-btn"
                                            isSmall
                                            isPrimary={selectColLayout === key}
                                            aria-pressed={selectColLayout === key}
                                            onClick={() => {
                                                updateColLayout(key, columns);
                                            }}
                                        >
                                            {icon}
                                        </Button>
                                    </Tooltip>
                                ))}
                            </ButtonGroup>
                        </Fragment>
                    )}
                </PanelBody>
            </Fragment>
        );

        const tabControls = (
            <TabPanel className="gb-inspect-tabs"
                activeClass="active-tab"
                initialTabName={currentTab}
                onSelect={onTabSelect}
                tabs={[
                    {
                        name: 'desk',
                        title: <Dashicon icon="desktop"/>,
                        className: 'gb-desk-tab',
                    },
                    {
                        name: 'tablet',
                        title: <Dashicon icon="tablet"/>,
                        className: 'gb-tablet-tab',
                    },
                    {
                        name: 'mobile',
                        title: <Dashicon icon="smartphone"/>,
                        className: 'gb-mobile-tab',
                    },
                ]}>
                {
                    (tab) => {
                        let tabOut;
                        if (tab.name) {
                            if ('mobile' === tab.name) {
                                tabOut = mobileControls;
                            } else if ('tablet' === tab.name) {
                                tabOut = tabletControls;
                            } else {
                                tabOut = deskControls;
                            }
                        }
                        return <div>{tabOut}</div>;
                    }
                }
            </TabPanel>
        );

        return (
            <Fragment>
                <BlockControls>
                    <Toolbar>
                        <Tooltip text={__('Vertical Align Top')}>
                            <Button
                                className={classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': verticalAlignment === 'top' },
                                )}
                                onClick={() => updateAlignment('top')}
                            >
                                {icons.aligntop}
                            </Button>
                        </Tooltip>
                    </Toolbar>
                    <Toolbar>
                        <Tooltip text={__('Vertical Align Middle')}>
                            <Button
                                className={classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': verticalAlignment === 'middle' },
                                )}
                                onClick={() => updateAlignment('middle')}
                            >
                                {icons.alignmiddle}
                            </Button>
                        </Tooltip>
                    </Toolbar>
                    <Toolbar>
                        <Tooltip text={__('Vertical Align Bottom')}>
                            <Button
                                className={classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': verticalAlignment === 'bottom' },
                                )}
                                onClick={() => updateAlignment('bottom')}
                            >
                                {icons.alignbottom}
                            </Button>
                        </Tooltip>
                    </Toolbar>
                </BlockControls>
                <InspectorControls>
                    {tabControls}
                </InspectorControls>
                <div id={ `glutenblocks-row${ uniqueID }` } className={className}>
                    <InnerBlocks
                        template={getColumnsTemplate(columns)}
                        templateLock="all"
                        allowedBlocks={ALLOWED_BLOCKS}/>
                </div>
            </Fragment>
        );
    }
}

GlutenBlocksRowEdit.propTypes = {
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

const DEFAULT_EMPTY_ARRAY = [];

function setChildColumnsDeviceClasses(layout, columns, type, childColumns, dispatch) {

    let colDeviceClass = 'col';

    if (type === 'desktop') {
        colDeviceClass += '-lg-';
    }
    if (type === 'tablet') {
        colDeviceClass += '-md-';
    }
    if (type === 'mobile') {
        colDeviceClass += '-sm-';
    }

    const layoutClasses = layout.split('-');

    // Update all child Column Blocks to match
    childColumns.forEach((childColumn, index) => {

        if (type === 'desktop') {
            dispatch('core/editor').updateBlockAttributes(childColumn.clientId, {
                colClasses: colDeviceClass + layoutClasses[index],
            });
        }

        if (type === 'tablet') {
            dispatch('core/editor').updateBlockAttributes(childColumn.clientId, {
                tabletColClasses: colDeviceClass + layoutClasses[index],
            });
        }

        if (type === 'mobile') {
            dispatch('core/editor').updateBlockAttributes(childColumn.clientId, {
                mobileColClasses: colDeviceClass + layoutClasses[index],
            });
        }
    });
}

export default compose(
    /**
     * Selects the child column Blocks for this parent Column
     */
    withSelect((select, { clientId }) => {
        const { getBlocksByClientId } = select('core/editor');
        const block = getBlocksByClientId(clientId)[0];

        return {
            childColumns: block ? block.innerBlocks : DEFAULT_EMPTY_ARRAY,
        };
    }),
    withDispatch((dispatch, { clientId, childColumns }) => {
        return {
            /**
             * Update all child column Blocks with a new
             * vertical alignment setting based on whatever
             * alignment is passed in. This allows change to parent
             * to overide anything set on a individual column basis
             *
             * @param  {string} alignment the vertical alignment setting
             */
            updateAlignment(alignment) {
                // Update self...
                dispatch('core/editor').updateBlockAttributes(clientId, {
                    verticalAlignment: alignment,
                });

                // Update all child Column Blocks to match
                childColumns.forEach((childColumn) => {
                    dispatch('core/editor').updateBlockAttributes(childColumn.clientId, {
                        verticalAlignment: alignment,
                    });
                });
            },

            updateLayout(nextColumns) {
                // Update self...
                dispatch('core/editor').updateBlockAttributes(clientId, {
                    columns: nextColumns,
                    colLayout: '6-6',
                    firstColumnWidth: undefined,
                    secondColumnWidth: undefined,
                    tabletLayout: '6-6',
                    mobileLayout: '12-12',
                });

                if (nextColumns === 1) {
                    this.updateColLayout('12', 1);
                    this.updateTabletLayout('12', 1);
                    this.updateMobileLayout('12', 1);
                }

                if (nextColumns === 2) {
                    this.updateColLayout('6-6', 2);
                    this.updateTabletLayout('6-6', 2);
                    this.updateMobileLayout('12-12', 2);
                }

                if (nextColumns === 3) {
                    this.updateColLayout('4-4-4', 3);
                    this.updateTabletLayout('4-4-4', 3);
                    this.updateMobileLayout('12-12-12', 3);
                }

                if (nextColumns === 4) {
                    this.updateColLayout('3-3-3-3', 4);
                    this.updateTabletLayout('3-3-3-3', 4);
                    this.updateMobileLayout('12-12-12-12', 4);
                }

                if (nextColumns === 5) {
                    this.updateColLayout('2-2-2-2-2', 5);
                    this.updateTabletLayout('2-2-2-2-2', 5);
                    this.updateMobileLayout('12-12-12-12-12', 5);
                }

                if (nextColumns === 6) {
                    this.updateColLayout('2-2-2-2-2-2', 6);
                    this.updateTabletLayout('2-2-2-2-2-2', 6);
                    this.updateMobileLayout('12-12-12-12-12-12', 6);
                }
            },

            updateColLayout(layout, columns) {
                // Update self...
                dispatch('core/editor').updateBlockAttributes(clientId, {
                    colLayout: layout,
                });

                setChildColumnsDeviceClasses(layout, columns, 'desktop', childColumns, dispatch);
            },

            updateTabletLayout(layout, columns) {
                // Update self...
                dispatch('core/editor').updateBlockAttributes(clientId, {
                    tabletLayout: layout,
                });

                setChildColumnsDeviceClasses(layout, columns, 'tablet', childColumns, dispatch);
            },

            updateMobileLayout(layout, columns) {
                // Update self...
                dispatch('core/editor').updateBlockAttributes(clientId, {
                    mobileLayout: layout,
                });

                setChildColumnsDeviceClasses(layout, columns, 'mobile', childColumns, dispatch);
            }
        };
    }),
)(GlutenBlocksRowEdit);
