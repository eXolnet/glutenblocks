import Hero from '../hero/save';
import classnames from 'classnames';

import { Fragment } from '@wordpress/element';

class GlutenblocksJumbotronSave extends Hero {

    constructor() {
        super(...arguments);
    }

    getHeroClassName() {
        return classnames(super.getHeroClassName(), 'gb-jumbotron');
    }

    renderJumbotronScrollComponent() {
        const { attributes: { scrollTo, scrollToAnchor, scrollToText } } = this.props;
        const scrollToHref = scrollToAnchor || '#gb-jumbotron-end';

        return (
            <Fragment>
                {scrollTo && (
                    <footer className={'gb-jumbotron__footer'}>
                        {scrollTo && (
                            <a className={'gb-jumbotron__scroll-to'} href={scrollToHref}>{ scrollToText }</a>
                        )}
                    </footer>
                )}
                <a href={'#gb-jumbotron-end'} id={'gb-jumbotron-end'} aria-hidden={'true'} className={'gb-jumbotron__anchor'}/>
            </Fragment>
        );
    }

    renderHeroAfter() {
        return (
            <Fragment>
                { super.renderHeroAfter() }
                { this.renderJumbotronScrollComponent() }
            </Fragment>
        );
    }
}

export default GlutenblocksJumbotronSave;
