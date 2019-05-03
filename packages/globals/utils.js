import forEach from 'lodash/forEach';

const utils = {};

utils.objectToOptions = (items) => {
    if (typeof items !== 'object') {
        return [];
    }

    return Object.entries(items).map(theme => {
        return {
            value: theme[0],
            label: theme[1],
        };
    });
};

utils.themeColors = () => {
    const colors = [];

    if (typeof window.php_vars === 'undefined') {
        return [];
    }

    forEach(window.php_vars.themeColors, function (color) {
        colors.push({ color:color });
    });

    return colors;
};

utils.buttonColors = () => {
    return utils.objectToOptions(window.php_vars?.buttonColors);
};

utils.buttonShapes = () => {
    return utils.objectToOptions(window.php_vars?.buttonShapes);
};

utils.sectionThemes = () => {
    return utils.objectToOptions(window.php_vars?.sectionThemes);
};

export default utils;
