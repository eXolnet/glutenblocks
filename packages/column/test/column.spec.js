/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksColumnEdit from '../edit';
import GlutenblocksColumnSave from '../save';

const attributes = {
    id: 1,
    uniqueID: '',
    verticalAlignment: '',
    colClasses: 'col-lg-6',
    tabletColClasses: 'col-md-6',
    mobileColClasses: 'col-sm-12',
    override: false,
};

describe('column', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksColumnEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });

    describe('save', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksColumnSave attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
