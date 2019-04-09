module.exports = {
    extends: [
        "standard",
    ],
    "env": {
        "es6": true
    },
    parser: "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    rules: {
        semi: [2, "always"],
        indent: ["error", 4],
        "comma-dangle": ["error", "always-multiline"],
        "react/jsx-uses-vars": ["error"],
    },
    globals: {
        "__webpack_public_path__": true,
        "wp": true,
    },
    plugins: [
        "react",
    ]
};
