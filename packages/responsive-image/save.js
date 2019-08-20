import PropTypes from 'prop-types';

import { Component, Fragment } from '@wordpress/element';
import { compose, ifCondition } from '@wordpress/compose';

class GlutenblockResponsiveImageSave extends Component {
    render() {
        const {
            attributes, className,
        } = this.props;

        const figure = att => (
            <Fragment>
                <figure>
                    <img src={att.url}
                        alt={att.alt}
                        width={att.width}
                        height={att.height}
                        style={{ borderRadius: `${att.radius}${att.radiusUnit}` }}
                    />
                </figure>
            </Fragment>
        );

        const imageDisplay = compose(ifCondition(({ url }) => url), figure);

        return (
            <div className={className} >
                {['desktop', 'tablet', 'mobile'].map(size => (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`gb-responsive-image gb-responsive-image--${size}`}>
                        {imageDisplay(attributes[size])}
                    </div>
                ))}
            </div>
        );
    }
}

GlutenblockResponsiveImageSave.propTypes = {
    className: PropTypes.string,
    attributes: PropTypes.object
};

export default GlutenblockResponsiveImageSave;
