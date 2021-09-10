/**
 * External dependencies
 */
import {shallow} from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksCardEdit from '../edit';
import GlutenblocksCardSave from '../save';

const attributes = {
    posts: [],
    target: '_self',
    noFollow: false,
};

describe('card', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksCardEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });

    describe('save', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksCardSave attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
