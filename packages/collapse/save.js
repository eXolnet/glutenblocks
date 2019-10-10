import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock Collapse
 */

import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

class GlutenblocksCollapseSave extends Component {
    render() {
        const { attributes: { title }, className } = this.props;

        return (
            <div className={ className } >
                <label className="gb-collapse">
                    <input type="checkbox"/>
                    <div className="gb-collapse__bar">
                        <h3 className = "gb-collapse__bar--title">{title}</h3>
                        <div className="gb-collapse__bar--arrow"/>
                    </div>
                    <div className="gb-collapse__content">
                        <InnerBlocks.Content/>
                    </div>
                </label>
            </div>
        );
    }
}

GlutenblocksCollapseSave.propTypes = {
    className: PropTypes.string,
    attributes: PropTypes.object,
};
export default GlutenblocksCollapseSave;
