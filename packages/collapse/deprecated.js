import { InnerBlocks } from '@wordpress/block-editor';
import omit from 'lodash/omit';

export default [
    {
        attributes: {
            title: {
                type: 'string',
                default: '',
            },
            uniqueId : {
                type: 'string',
                default: null,
            }
        },

        migrate(attributes) {
            return [omit(attributes, 'uniqueId')];
        },

        save(props) {
            const { attributes: { title, uniqueId }, className } = props;
            const id = 'ck-' + uniqueId;

            return (
                <div className={ className } >
                    <div className="gb-collapse">
                        <input type="checkbox" id={id}/>
                        <label className="gb-collapse__bar" htmlFor={id}>
                            <h3 className = "gb-collapse__bar--title">{title}</h3>
                            <div className="gb-collapse__bar--arrow"></div>
                        </label>
                        <div className="gb-collapse__content">
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </div>
            );
        }
    }
];
