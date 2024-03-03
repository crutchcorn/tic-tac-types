module.exports = {
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["prettier"],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: true,
    },
    rules: {
        "@typescript-eslint/no-unused-vars": "off"
    }
};