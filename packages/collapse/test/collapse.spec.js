/**
 * External dependencies
 */
import {shallow} from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksCollapseEdit from '../edit';
import GlutenblocksCollapseSave from '../save';

const attributes = {
    title: '',
};

describe('collapse', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksCollapseEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });

    describe('save', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksCollapseSave attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
