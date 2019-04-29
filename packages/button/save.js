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
        const { attributes: { theme, link, target, noFollow, text, icon, iconSide }, className } = this.props;

        let relAttr = 'noopener noreferrer';

        if (noFollow) {
            relAttr = relAttr + ' nofollow';
        }

        const classes = classnames({
            [ `${className}` ]: className,
            [ `gb-button gb-button--${ theme }` ]: theme,
        });

        return (
            <a href={ (link ? link : '#') } target={ (target ? target : undefined) } className={classes} rel={ relAttr }>
                { icon && 'left' === iconSide && (
                    <GenIcon className={ `gb-button__svg-icon gb-button__svg-icon--${ icon } gb-button__svg-icon--${ iconSide }` } name={ icon } icon={ ('fa' === icon.substring(0, 2) ? FaIco[ icon ] : Ico[ icon ]) } />
                ) }
                { text }
                { icon && 'left' !== iconSide && (
                    <GenIcon className={ `gb-button__svg-icon gb-button__svg-icon--${ icon } gb-button__svg-icon--${ iconSide }` } name={ icon } icon={ ('fa' === icon.substring(0, 2) ? FaIco[ icon ] : Ico[ icon ]) } />
                ) }
            </a>
        );
    }
}

GlutenblocksButtonSave.propTypes = {
    attributes: PropTypes.object,
    className: PropTypes.string,
};

export default GlutenblocksButtonSave;
