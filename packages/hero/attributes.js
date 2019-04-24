/**
 * BLOCK: Glutenblock Hero Attributes
 */
const attributes = {
    bgColor: {
        type: 'string',
        default: '',
    },
    bgImg: {
        type: 'string',
        default: '',
    },
    bgImgID: {
        type: 'string',
        default: '',
    },
    bgImgAlt: {
        type: 'string',
        default: '',
    },
    bgImgWidth: {
        type: 'Number',
    },
    bgImgHeight: {
        type: 'Number',
    },
    bgImgSize: {
        type: 'string',
        default: 'cover',
    },
    currentOverlayTab: {
        type: 'string',
        default: 'normal',
    },
    overlay: {
        type: 'string',
        default: '',
    },
    overlaySecond: {
        type: 'string',
        default: '#00B5E2',
    },
    overlayGradLoc: {
        type: 'number',
        default: 0,
    },
    overlayGradLocSecond: {
        type: 'number',
        default: 100,
    },
    overlayGradType: {
        type: 'string',
        default: 'linear',
    },
    overlayGradAngle: {
        type: 'number',
        default: 180,
    },
    overlayBgImg: {
        type: 'string',
        default: '',
    },
    overlayBgImgID: {
        type: 'string',
        default: '',
    },
    overlayBgImgSize: {
        type: 'string',
        default: 'cover',
    },
    overlayBgImgPosition: {
        type: 'string',
        default: 'center center',
    },
    overlayBgImgAttachment: {
        type: 'string',
        default: 'scroll',
    },
    overlayBgImgRepeat: {
        type: 'string',
        default: 'no-repeat',
    },
    overlayOpacity: {
        type: 'number',
        default: 30,
    },
    overlayBlendMode: {
        type: 'string',
        default: 'none',
    },
};
export default attributes;
