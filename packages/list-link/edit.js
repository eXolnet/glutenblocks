import PropTypes from 'prop-types';
import classnames from 'classnames';
import memoize from 'memize';
import times from 'lodash/times';
import { __ } from '@wordpress/i18n';

import { Component, Fragment } from '@wordpress/element';
import { PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['glutenblocks/link'];

export const getLinksTemplate = memoize((columns) => {
    return times(columns, () => ['glutenblocks/link']);
});

class GlutenblocksListLinkEdit extends Component {
    render() {
        const {
            attributes : { links },
            className,
            setAttributes,
        } = this.props;

        const classname = classnames(className, 'gb-list-links');
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={ __('Settings') }
                        initialOpen={ true }
                        className={'gb-listlink__panel-body'}
                    >
                        <RangeControl
                            label={__('Number of links')}
                            value={links}
                            onChange={(nextLinks) => {
                                setAttributes({ links: nextLinks });
                            }}
                            min={1}
                            max={10}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={classname}>
                    <InnerBlocks
                        template={getLinksTemplate(links)}
                        templateLock="all"
                        allowedBlocks={ALLOWED_BLOCKS}/>
                </div>
            </Fragment>
        );
    }
}

GlutenblocksListLinkEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string,
};

export default (
    GlutenblocksListLinkEdit
);
