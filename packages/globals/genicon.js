import PropTypes from 'prop-types';
const { createElement } = wp.element;

const walkChildren = (children) => {
    return children.map((child, idx) => {
        const { nE, aBs: attribsMap, children: gchildren = null } = child;

        //fill, stroke
        const attribs = Object.keys(attribsMap)
            .filter(key => key !== 'fill' && key !== 'stroke' && attribsMap[ key ] !== 'none')
            .reduce((partial, key) => {

                //partial[camelcase(key)] = attribsMap[key];
                partial[ key ] = attribsMap[ key ];
                return partial;
            }, {});
        //special case, it has fill and stroke at the same time
        let merge = {};
        if (attribsMap.fill === 'none' && attribsMap.stroke) {
            merge = { fill: 'none', stroke: 'currentColor' };
        }
        return createElement(nE, { key: idx, ...attribs, ...merge }, gchildren === null ? gchildren : walkChildren(gchildren));
    });
};

export const GenIcon = (props) => {
    const { className, icon, name } = props;
    const type = name.substring(0, 2);
    const lineIcon = (!!(type && 'fe' === type));
    const fill = (lineIcon ? 'none' : 'currentColor');
    const strokeWidth = (lineIcon ? props.strokeWidth : undefined);
    const stroke = (lineIcon ? 'currentColor' : undefined);
    const strokeLinecap = (lineIcon ? 'round' : undefined);
    const strokeLinejoin = (lineIcon ? 'round' : undefined);
    return (
        <i className={ className }>
            <svg viewBox={ (! icon ? '0 0 24 24' : icon.vB) } height={ props.size } width={ props.size } fill={ fill } stroke={ stroke } xmlns={ props.xmlns } strokeWidth={ strokeWidth } strokeLinecap={ strokeLinecap } strokeLinejoin={ strokeLinejoin } >
                { icon && (
                    walkChildren(icon.cD)
                ) }
            </svg>
        </i>
    );
};

GenIcon.defaultProps = {
    size: 24,
    xmlns: 'http://www.w3.org/2000/svg',
    strokeWidth: 2
};

GenIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    xmlns: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
};

export default GenIcon;
