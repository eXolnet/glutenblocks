import PropTypes from 'prop-types';
import classnames from 'classnames';
import LinkSelect from '../components/link-select/link-select';

import { __ } from '@wordpress/i18n';

import { Component, Fragment } from '@wordpress/element';
import { IconButton, PanelBody } from '@wordpress/components';
import { InspectorControls, URLInput, RichText } from '@wordpress/block-editor';

class GlutenblocksLinkEdit extends Component {

    constructor() {
        super(...arguments);

        this.onLinkTypeChange = this.onLinkTypeChange.bind(this);
        this.onTargetChange = this.onTargetChange.bind(this);
        this.onNoFollowChange = this.onNoFollowChange.bind(this);
        this.onCustomPostTypeChange = this.onCustomPostTypeChange.bind(this);
        this.onCustomPostIdChange = this.onCustomPostIdChange.bind(this);
        this.onCustomPostAttributeChange = this.onCustomPostAttributeChange.bind(this);
    }

    onLinkTypeChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ type: value });
    }

    onTargetChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ target: value });
    }

    onNoFollowChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ noFollow: value });
    }

    onCustomPostTypeChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ customPostType: value });
    }

    onCustomPostIdChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ customPostObjectID: value });
    }

    onCustomPostAttributeChange(value) {
        const { setAttributes } = this.props;
        setAttributes({ customPostAttribute: value });
    }


    render() {
        const {
            attributes: {
                link,
                text,
                type,
                actionText,
                target,
                noFollow,
                customPostType,
                customPostObjectID,
                customPostAttribute
            },
            className,
            setAttributes,
            isSelected
        } = this.props;


        const classname = classnames(className);
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={__('Settings')}
                        initialOpen={true}
                        className={'gb-link__panel-body'}
                    >
                        <LinkSelect
                            onLinkTypeChange={ this.onLinkTypeChange }
                            onTargetChange={ this.onTargetChange}
                            onNoFollowChange={ this.onNoFollowChange }
                            onCustomPostTypeChange={this.onCustomPostTypeChange}
                            onCustomPostIdChange={this.onCustomPostIdChange}
                            onCustomPostAttributeChange={this.onCustomPostAttributeChange}
                            { ...{ type, target, noFollow, customPostType, customPostObjectID, customPostAttribute } }
                        >
                        </LinkSelect>

                    </PanelBody>
                </InspectorControls>
                <div className={classname}>
                    <div className={'gb-list-links__text'}>
                        <RichText
                            tagName='span'
                            placeholder={__('Text...')}
                            value={text}
                            onChange={value => {
                                setAttributes({ text: value });
                            }}
                            formattingControls={[
                                'bold',
                                'italic',
                                'strikethrough'
                            ]}
                            keepPlaceholderOnFocus
                        />
                    </div>
                    <div
                        className={`gb-list-links__action gb-list-links--${type}`}
                    >
                        <RichText
                            tagName='span'
                            placeholder={__('Action...')}
                            value={actionText}
                            onChange={value => {
                                setAttributes({ actionText: value });
                            }}
                            formattingControls={[
                                'bold',
                                'italic',
                                'strikethrough'
                            ]}
                            keepPlaceholderOnFocus
                        />
                    </div>
                    {isSelected && (
                        <form
                            key={'form-link'}
                            onSubmit={event => event.preventDefault()}
                            className='blocks-button__inline-link'
                        >
                            <URLInput
                                value={link}
                                onChange={value => {
                                    setAttributes({ link: value });
                                }}
                            />
                            <IconButton
                                icon={'editor-break'}
                                label={__('Apply')}
                                type={'submit'}
                            />
                        </form>
                    )}
                </div>
            </Fragment>
        );
    }
}

GlutenblocksLinkEdit.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
    isSelected: PropTypes.bool,
    className: PropTypes.string
};

export default GlutenblocksLinkEdit;
