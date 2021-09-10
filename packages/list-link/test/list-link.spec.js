/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksListLinkEdit from '../edit';

const attributes = {
    links: 1,
};

describe('list-link', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksListLinkEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
