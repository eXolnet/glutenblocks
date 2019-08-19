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
        }
    },
];
