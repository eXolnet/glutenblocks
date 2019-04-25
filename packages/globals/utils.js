import forEach from 'lodash/forEach';

const utils = {};

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

export default utils;
