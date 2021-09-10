/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksLinkEdit from '../edit';

const attributes = {
    link: '',
    text : '',
    type : 'visit',
    actionText : '',
    target: '_self',
    noFollow: false,
    customPostType : '',
    customPostObjectID : '',
    customPostAttribute : '',
};

describe('link', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksLinkEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
