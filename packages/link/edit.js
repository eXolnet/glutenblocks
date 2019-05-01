import PropTypes from 'prop-types';
import classnames from 'classnames';
const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;
const { SelectControl, IconButton, PanelBody, ToggleControl } = wp.components;
const { InspectorControls, URLInput, RichText } = wp.editor;

class GlutenblocksLinkEdit extends Component {
    render() {
        const {
            attributes : { link, text, type, actionText, target, noFollow },
            className,
            setAttributes,
            isSelected,
        } = this.props;

        const classname = classnames(className);
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={ __('Settings') }
                        initialOpen={ true }
                        className={'gb-link__panel-body'}
                    >
                        <SelectControl
                            label={ __('Type') }
                            value={ type }
                            options={ [
                                { value: 'visit', label: __('Visit') },
                                { value: 'download', label: __('Download') },
                            ] }
                            onChange={ value => setAttributes({ type: value }) }
                        />
                        <SelectControl
                            label={ __('Link Target') }
                            value={ target }
                            options={ [
                                { value: '_self', label: __('Same Window') },
                                { value: '_blank', label: __('New Window') },
                            ] }
                            onChange={ value => {
                                setAttributes({ target: value });
                            } }
                        />
                        <ToggleControl
                            label={ __('Set link to nofollow?') }
                            checked={ (undefined !== noFollow ? noFollow : false) }
                            onChange={ (value) => setAttributes({ noFollow: value }) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={classname}>
                    <div className={'gb-list-links__text'}>
                        <RichText
                            tagName="span"
                            placeholder={ __('Text...') }
                            value={ text }
                            onChange={ value => {
                                setAttributes({ text: value });
                            } }
                            formattingControls={ ['bold', 'italic', 'strikethrough'] }
                            keepPlaceholderOnFocus
                        />
                    </div>
                    <div className={ `gb-list-links__action gb-list-links--${ type }` }>
                        <RichText
                            tagName="span"
                            placeholder={ __('Action...') }
                            value={ actionText }
                            onChange={ value => {
                                setAttributes({ actionText: value });
                            } }
                            formattingControls={ ['bold', 'italic', 'strikethrough'] }
                            keepPlaceholderOnFocus
                        />
                    </div>
                    { isSelected && (
                        <form
                            key={ 'form-link' }
                            onSubmit={ (event) => event.preventDefault() }
                            className="blocks-button__inline-link">
                            <URLInput
                                value={ link }
                                onChange={ value => {
                                    setAttributes({ link: value });
                                } }
                            />
                            <IconButton
                                icon={ 'editor-break' }
                                label={ __('Apply') }
                                type={ 'submit' }
                            />
                        </form>
                    ) }
                </div>
            </Fragment>
        );
    }
}

GlutenblocksLinkEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    isSelected: PropTypes.bool,
    className: PropTypes.string,
};

export default (
    GlutenblocksLinkEdit
);
