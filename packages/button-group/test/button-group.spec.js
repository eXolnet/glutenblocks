/**
 * External dependencies
 */
import {shallow} from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksButtonGroupEdit from '../edit';
import GlutenblocksButtonGroupSave from '../save';

const attributes = {
    buttonCount: 1,
};

describe('button-group', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksButtonGroupEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });

    describe('save', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksButtonGroupSave attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
