import PropTypes from 'prop-types';

const {
    Component, Fragment
} = wp.element;

class GlutenblocksExampleSave extends Component {
    render() {
        const {
            attributes: {
                desktopImgURL, desktopImgHeight, desktopImgWidth, desktopImgAlt,
                tabletImgURL, tabletImgHeight, tabletImgWidth, tabletImgAlt,
                mobileImgURL, mobileImgHeight, mobileImgWidth, mobileImgAlt,
            },
            className,
        } = this.props;

        const mobileDisplay = _ => {
            if (mobileImgURL) {
                return (
                    <Fragment>
                        <figure>
                            <img src={mobileImgURL}
                                alt={mobileImgAlt}
                                width={mobileImgWidth}
                                height={mobileImgHeight}
                            />
                        </figure>
                    </Fragment>
                );
            }
            return '';
        };

        const tabletDisplay = _ => {
            if (tabletImgURL) {
                return (
                    <Fragment>
                        <figure>
                            <img src={tabletImgURL}
                                alt={tabletImgAlt}
                                width={tabletImgWidth}
                                height={tabletImgHeight}
                            />
                        </figure>
                    </Fragment>
                );
            }
            return '';
        };

        const desktopDisplay = _ => {
            if (desktopImgURL) {
                return (
                    <Fragment>
                        <figure>
                            <img src={desktopImgURL}
                                alt={desktopImgAlt}
                                width={desktopImgWidth}
                                height={desktopImgHeight}
                            />
                        </figure>
                    </Fragment>
                );
            }
            return '';
        };

        return (
            <div className={className} >
                <div className="gb-responsive-image gb-responsive-image--desktop">
                    {desktopDisplay()}
                </div>
                <div className="gb-responsive-image gb-responsive-image--tablet">
                    {tabletDisplay()}
                </div>
                <div className="gb-responsive-image gb-responsive-image--mobile">
                    {mobileDisplay()}
                </div>
            </div>
        );
    }
}

GlutenblocksExampleSave.propTypes = {
    className: PropTypes.string,
    attributes: PropTypes.object
};

export default GlutenblocksExampleSave;
