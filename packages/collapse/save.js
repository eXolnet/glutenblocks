import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock Collapse
 */

import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { withInstanceId } from '@wordpress/compose';


class GlutenblocksCollapseSave extends Component {


    render() {
        const { attributes: { title }, className, instanceId } = this.props;

        return (
            <div className={ className } >
                <div className="gb-collapse">
                    <input type="checkbox" id={ `ck-${ instanceId }`}/>
                    <label className="gb-collapse__bar" htmlFor={ `ck-${ instanceId }`}>
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
    instanceId: PropTypes.number,
};
export default withInstanceId(GlutenblocksCollapseSave);
