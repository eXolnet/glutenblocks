/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksButtonEdit from '../edit';
import GlutenblocksButtonSave from '../save';

const attributes = {
    color: 'default',
    colorInverse: false,
    shape: 'default',
    size: '',
    text: '',
    link: '',
    target: '_self',
    noFollow: false,
    type : 'visit',
    customPostType : '',
    customPostObjectID : '',
    customPostAttribute : ''
};

describe('button', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksButtonEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });

    describe('save', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksButtonSave attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
