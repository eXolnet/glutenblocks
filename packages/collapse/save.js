import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock Collapse
 */

import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

class GlutenblocksCollapseSave extends Component {
    render() {
        const { attributes: { title }, className } = this.props;

        const uniqueConsistenId = title.replace(/ /g,'-').replace(/[^\w-]+/g,'').toLowerCase();

        return (
            <div className={ className } >
                <div className="gb-collapse">
                    <input type="checkbox" id={ `ck-${ uniqueConsistenId }`}/>
                    <label className="gb-collapse__bar" htmlFor={ `ck-${ uniqueConsistenId }`}>
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
