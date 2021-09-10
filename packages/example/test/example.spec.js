/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksExampleEdit from '../edit';
import GlutenblocksExampleSave from '../save';

const attributes = {};

describe('example', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksExampleEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });

    describe('save', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksExampleSave attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
