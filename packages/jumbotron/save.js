import Hero from '../hero/save';
import classnames from 'classnames';

const { Fragment } = wp.element;

class GlutenblocksJumbotronSave extends Hero {
    getHeroClassName() {
        return classnames(super.getHeroClassName(), 'gb-jumbotron');
    }

    renderHeroAfter() {
        const { attributes: { scrollTo, scrollToAnchor, scrollToText } } = this.props;

        const scrollToHref = scrollToAnchor || '#gb-jumbotron-end';

        return (
            <Fragment>
                { super.renderHeroAfter() }
            
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
}

export default GlutenblocksJumbotronSave;
