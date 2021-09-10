/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksMediaEdit from '../edit';

const attributes = {
    align: 'wide',
    mediaAlt: '',
    mediaPosition: 'left',
    mediaId: 1,
    mediaUrl: 'https://localhost',
    mediaType: 'image',
    mediaWidth: 50,
    mediaHeight: 50,
    width: 50,
    height: 50,
    isStackedOnMobile: false,
    verticalAlignment: 'middle',
    imageFill: undefined,
    focalPoint: undefined,
};

describe('media', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksMediaEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
