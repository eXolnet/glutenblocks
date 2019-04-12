const { registerBlockType } = wp.blocks;
const { InnerBlocks, MediaUpload } = wp.editor;
const { __ } = wp.i18n;
const { Button } = wp.components;

class Hero {
    title = __('Hero', 'glutenblocks');
    icon = 'slides';
    category = 'layout';

    attributes = {
        image: {
            type: 'object',
            default: null, // no image by default!
        },
        content: {
            type: 'string',
            default: null, // no image by default!
        },
    };

    edit = ({ attributes, setAttributes, className }) => {
        const getImageButton = (openEvent) => {
            if (attributes.image) {
                return (
                    <img
                        src={ attributes.image.url }
                        onClick={ openEvent }
                        className="image"
                    />
                );
            } else {
                return (
                    <div className="button-container">
                        <Button
                            onClick={ openEvent }
                            className="button button-large"
                        >
                            Pick an image
                        </Button>
                    </div>
                );
            }
        };

        return (
            <div>
                <MediaUpload
                    key={ attributes }
                    onSelect={ media => {
                        setAttributes({ image: media });
                    } }
                    type="image"
                    value={ attributes.image?.id }
                    render={ ({ open }) => getImageButton(open) }
                />
                <InnerBlocks/>
            </div>
        );
    };

    save = ({ attributes, className }) => {
        const { image } = attributes;
        return (
            <div className="hero full-width">
                <div className="hero__image">
                    <figure className="wp-block-image">
                        <img src={image?.url} width={image?.width} height={image?.height} className={'wp-image-' + image.id}/>
                    </figure>
                </div>
                <div className="container hero__content">
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    };
}

export default registerBlockType(
    'glutenblocks/hero',
    new Hero()
);
