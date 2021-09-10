/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksRowEdit from '../edit';
import GlutenblocksRowSave from '../save';

const attributes = {
    uniqueID: '',
    columns: 2,
    colLayout: '6-6',
    mobileLayout: '12-12',
    tabletLayout: '6-6',
    blockAlignment: 'none',
    verticalAlignment: 'top',
    currentTab: 'desk',
};

describe('row', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksRowEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });

    describe('save', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksRowSave attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
