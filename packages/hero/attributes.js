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
    bgImgId: {
        type: 'Number',
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
        type: 'Number',
        default: 0,
    },
    overlayGradLocSecond: {
        type: 'Number',
        default: 100,
    },
    overlayGradType: {
        type: 'string',
        default: 'linear',
    },
    overlayGradAngle: {
        type: 'Number',
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
        type: 'Number',
        default: 30,
    },
    overlayBlendMode: {
        type: 'string',
        default: 'none',
    },
    paddingUnit: {
        type: 'String',
        default: 'px',
    },
    paddingTop: {
        type: 'Number',
        default: null,
    },
    paddingRight: {
        type: 'Number',
        default: null,
    },
    paddingBottom: {
        type: 'Number',
        default: null,
    },
    paddingLeft: {
        type: 'Number',
        default: null,
    },
    marginUnit: {
        type: 'String',
        default: 'px',
    },
    marginTop: {
        type: 'Number',
        default: null,
    },
    marginBottom: {
        type: 'Number',
        default: null,
    },
    minHeightUnit: {
        type: 'String',
        default: 'px',
    },
    minHeight: {
        type: 'Number',
        default: null,
    },
    heroHeightUnit: {
        type: 'String',
        default: 'px',
    },
    heroHeight: {
        type: 'Number',
        default: null,
    },
    maxWidthUnit: {
        type: 'String',
        default: 'px',
    },
    maxWidth: {
        type: 'Number',
        default: null,
    },
    colorTheme: {
        type: 'String',
        default: 'dark'
    },
    verticalAlignment: {
        type: 'string',
        default: 'middle',
    },
};
export default attributes;
