/**
 * External dependencies
 */
import {shallow} from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksSectionEdit from '../edit';

const attributes = {
    theme: 'default',
    sectionId: '',
};

describe('section', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksSectionEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
