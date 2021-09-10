/**
 * External dependencies
 */
import {shallow} from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksHeroBlockEdit from '../edit';
import GlutenblocksHeroBlockSave from '../save';

const attributes = {
    bgColor: '',
    bgImg: '',
    bgImgId: 0,
    bgImgAlt: '',
    bgImgWidth: 512,
    bgImgHeight: 512,
    bgImgSize: 'cover',
    currentOverlayTab: 'normal',
    overlay: '',
    overlaySecond: '#00B5E2',
    overlayGradLoc: 0,
    overlayGradLocSecond: 100,
    overlayGradType: 'linear',
    overlayGradAngle: 180,
    overlayBgImg: '',
    overlayBgImgID: '',
    overlayBgImgSize: 'cover',
    overlayBgImgPosition: 'center center',
    overlayBgImgAttachment: 'scroll',
    overlayBgImgRepeat: 'no-repeat',
    overlayOpacity: 30,
    overlayBlendMode: 'none',
    paddingUnit: 'px',
    paddingTop: null,
    paddingRight: null,
    paddingBottom: null,
    paddingLeft: null,
    marginUnit: 'px',
    marginTop: null,
    marginBottom: null,
    minHeightUnit: 'px',
    minHeight: null,
    heroHeightUnit: 'px',
    heroHeight: null,
    maxWidthUnit: 'px',
    maxWidth: null,
    colorTheme: 'dark',
    verticalAlignment: 'middle',
};

describe('hero', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksHeroBlockEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });

    describe('save', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksHeroBlockSave attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
