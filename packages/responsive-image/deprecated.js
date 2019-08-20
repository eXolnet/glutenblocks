import { Fragment } from '@wordpress/element';

export default [
    {
        attributes: {
            desktopImgURL: {
                type: 'string',
                default: ''
            },
            desktopImgAlt: {
                type: 'string',
                default: ''
            },
            desktopImgWidth: {
                type: 'number',
                default: 0
            },
            desktopImgHeight: {
                type: 'number',
                default: 0
            },
            tabletImgURL: {
                type: 'string',
                default: ''
            },
            tabletImgAlt: {
                type: 'string',
                default: ''
            },
            tabletImgWidth: {
                type: 'number',
                default: 0
            },
            tabletImgHeight: {
                type: 'number',
                default: 0
            },
            mobileImgURL: {
                type: 'string',
                default: ''
            },
            mobileImgAlt: {
                type: 'string',
                default: ''
            },
            mobileImgWidth: {
                type: 'number',
                default: 0
            },
            mobileImgHeight: {
                type: 'number',
                default: 0
            }
        },

        migrate(attributes) {
            const extract = (size) => {
                return {
                    url: attributes[`${size}ImgURL`],
                    alt: attributes[`${size}ImgAlt`],
                    width: attributes[`${size}ImgWidth`],
                    height: attributes[`${size}ImgHeight`],
                };
            };

            return {
                desktop: extract('desktop'),
                tablet: extract('tablet'),
                mobile: extract('mobile'),
            };
        },

        save(props) {
            const {
                // eslint-disable-next-line react/prop-types
                attributes: {
                    desktopImgURL, desktopImgHeight, desktopImgWidth, desktopImgAlt,
                    tabletImgURL, tabletImgHeight, tabletImgWidth, tabletImgAlt,
                    mobileImgURL, mobileImgHeight, mobileImgWidth, mobileImgAlt,
                },
                // eslint-disable-next-line react/prop-types
                className,
            } = props;

            const mobileDisplay = () => {
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

            const tabletDisplay = () => {
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

            const desktopDisplay = () => {
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
    },
];
