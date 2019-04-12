import PropTypes from 'prop-types';

const { Component } = wp.element;

class ExampleEdit extends Component {
    render() {
        const {
            className,
        } = this.props;

        return (
            <div className={ className } >
                Hello Glutenblocks!
            </div>
        );
    }
}

ExampleEdit.propTypes = {
    className: PropTypes.string
};

export default (
    ExampleEdit
);
