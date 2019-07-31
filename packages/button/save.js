import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock Button
 */

const {
    Component,
} = wp.element;

class GlutenblocksButtonSave extends Component {
    render() {
        const { attributes: { color, colorInverse, shape, size, link, target, noFollow, text, align }, className } = this.props;

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

        const containerClasses = classnames('wp-block-glutenblocks-button gb-button-wrapper', {
            [ `gb-button--align-${ align }` ]: align,
        });



        return (
            <div className={containerClasses}>
                <a href={ (link ? link : '#') } target={ (target ? target : undefined) } className={classes} rel={ relAttr }>
                    { text }
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
