/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import '../../../tests/matchMedia.mock';
import GlutenblocksResponsiveImageEdit from '../edit';

const attributes = {
    desktopImgURL: '',
    desktopImgAlt: '',
    desktopImgWidth: 0,
    desktopImgHeight: 0,
    tabletImgURL: '',
    tabletImgAlt: '',
    tabletImgWidth: 0,
    tabletImgHeight: 0,
    mobileImgURL: '',
    mobileImgAlt: '',
    mobileImgWidth: 0,
    mobileImgHeight: 0
};

const setAttributes = jest.fn(() => {});

describe('responsive-image/edit', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(
            <GlutenblocksResponsiveImageEdit attributes={attributes} />
        );
        expect(wrapper).toBeTruthy();
    });

    it('should update currentTab on tab selection', () => {
        const testRenderer = TestRenderer.create(
            <GlutenblocksResponsiveImageEdit
                setAttributes={setAttributes}
                attributes={attributes}
            />
        );

        const instance = testRenderer.getInstance();

        instance.onTabSelect('mobile');
        expect(setAttributes).toHaveBeenCalledWith({ currentTab: 'mobile' });
    });
});
