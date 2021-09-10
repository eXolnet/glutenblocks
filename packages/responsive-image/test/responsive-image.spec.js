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
    desktop: {
        url: '',
        alt: '',
        width: 0,
        height: 0,
        radius: 0,
        radiusUnit: 'px'
    },
    tablet: {
        url: '',
        alt: '',
        width: 0,
        height: 0,
        radius: 0,
        radiusUnit: 'px'
    },
    mobile: {
        url: '',
        alt: '',
        width: 0,
        height: 0,
        radius: 0,
        radiusUnit: 'px'
    },
};

const setAttributes = jest.fn(() => {});

describe('responsive-image', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksResponsiveImageEdit attributes={attributes}/>
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
});
