import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock Collapse
 */

import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

class GlutenblocksCollapseSave extends Component {
    render() {
        const { attributes: { title, uniqueId }, className } = this.props;
        const id = 'ck-' + uniqueId;

        return (
            <div className={ className } >
                <div className="gb-collapse">
                    <input type="checkbox" id={id}/>
                    <label className="gb-collapse__bar" htmlFor={id}>
                        <h3 className = "gb-collapse__bar--title">{title}</h3>
                        <div className="gb-collapse__bar--arrow"></div>
                    </label>
                    <div className="gb-collapse__content">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        );
    }
}

GlutenblocksCollapseSave.propTypes = {
    className: PropTypes.string,
    attributes: PropTypes.object,
};
export default GlutenblocksCollapseSave;
