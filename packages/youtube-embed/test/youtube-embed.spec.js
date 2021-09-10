/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import GlutenblocksYoutubeEmbedEdit from '../edit';

const attributes = {
    playBgColor: '',
    playIconColor: '',
    url: '',
    poster: null,
    enableCaption: false,
    ccLang: '',
    start: null,
    end: null,
};

describe('youtube-embed', () => {
    describe('edit', () => {
        it('should render without crashing', () => {
            const wrapper = shallow(
                <GlutenblocksYoutubeEmbedEdit attributes={attributes}/>
            );
            expect(wrapper).toBeTruthy();
        });
    });
});
