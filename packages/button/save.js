import GenIcon from '../globals/genicon';
import classnames from 'classnames';

/**
 * BLOCK: Glutenblock Button
 */

const {
    Component,
} = wp.element;

import PropTypes from 'prop-types';
import FaIco from '../globals/faicons';
import Ico from '../globals/svgicons';

class GlutenblocksButtonSave extends Component {
    render() {
        const { attributes: { color, colorInverse, shape, size, link, target, noFollow, text, icon, iconSide }, className } = this.props;

        let relAttr = target ? 'noopener noreferrer' : '';

        if (noFollow) {
            relAttr = relAttr + ' nofollow';
        }

        const classes = classnames(className, 'gb-button', {
            [ `gb-button--${ color }` ]: color,
            [ 'gb-button--inverse' ]: colorInverse,
            [ `gb-button--${ shape }` ]: shape,
            [ `gb-button--${ size }` ]: size,
        });

        return (
            <div className={'wp-block-glutenblocks-button gb-button-wrapper'}>
                <a href={ (link ? link : '#') } target={ (target ? target : undefined) } className={classes} rel={ relAttr }>
                    { icon && 'left' === iconSide && (
                        <GenIcon className={ `gb-button__svg-icon gb-button__svg-icon--${ icon } gb-button__svg-icon--${ iconSide }` } name={ icon } icon={ ('fa' === icon.substring(0, 2) ? FaIco[ icon ] : Ico[ icon ]) } />
                    ) }
                    { text }
                    { icon && 'left' !== iconSide && (
                        <GenIcon className={ `gb-button__svg-icon gb-button__svg-icon--${ icon } gb-button__svg-icon--${ iconSide }` } name={ icon } icon={ ('fa' === icon.substring(0, 2) ? FaIco[ icon ] : Ico[ icon ]) } />
                    ) }
                </a>
            </div>
        );
    }
}

GlutenblocksButtonSave.propTypes = {
    attributes: PropTypes.object,
    className: PropTypes.string,
};

export default GlutenblocksButtonSave;
