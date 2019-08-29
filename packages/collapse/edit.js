import PropTypes from 'prop-types';

import { Component, Fragment } from '@wordpress/element';
import { InnerBlocks, PlainText } from '@wordpress/block-editor';

const TEMPLATE = [
    ['core/paragraph'],
];

class GlutenblocksCollapseEdit extends Component {

    render() {
        const { attributes: { title }, className, setAttributes } = this.props;

        return (
            <Fragment>
                <PlainText
                    className={ className }
                    value={ title }
                    onChange={value => {
                        setAttributes({ title: value });
                    }}
                    placeholder="add collapse title..."
                />

                <section>
                    <InnerBlocks templateLock={ false } template={TEMPLATE} />
                </section>
            </Fragment>
        );
    }
}

GlutenblocksCollapseEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    className: PropTypes.string,
};

export default (
    GlutenblocksCollapseEdit
);
