import PropTypes from 'prop-types';

/**
 * BLOCK: Glutenblock link
 */

const {
    Component
} = wp.element;

class GlutenblocksLinkSave extends Component {
    render() {
        const { attributes : { link, text, type, actionText, target, noFollow } } = this.props;

        let relAttr = 'noopener noreferrer';

        if (noFollow) {
            relAttr = relAttr + ' nofollow';
        }

        return (
            <a href={ (link ? link : '#') } target={ (target ? target : undefined) } rel={ relAttr }>
                { text }
                <span className={`gb-list-links__action gb-list-links--${ type }`}>{ actionText }</span>
            </a>
        );
    }
}

GlutenblocksLinkSave.propTypes = {
    attributes: PropTypes.object,
    className: PropTypes.string
};

export default GlutenblocksLinkSave;
