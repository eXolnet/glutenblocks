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

utils.themeStyles = () => {
    if (typeof window.php_vars === 'undefined') {
        return [];
    }

    return window.php_vars.themeStyles;
};

utils.sectionThemes = () => {
    const themes = window.php_vars?.sectionThemes;

    if (typeof themes !== 'object') {
        return [];
    }

    return Object.entries(themes).map(theme => {
        return {
            value: theme[0],
            label: theme[1],
        };
    });
};

export default utils;
