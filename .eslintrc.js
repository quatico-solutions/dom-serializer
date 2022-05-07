module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:jest/recommended",
        "plugin:jest/style",
    ],
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: __dirname + "/tsconfig.lint.json",
        sourceType: "module",
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    },
    settings: {
        jest: {
            version: 26,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-var-requires": "warn",
        "arrow-parens": ["error", "as-needed"],
        "max-len": ["warn", { code: 150, tabWidth: 4 }],
        "no-console": "error",
        "prettier/prettier": "off",
    },
    ignorePatterns: ["*.min.js", "lib", "dist"],
    overrides: [
        {
            files: ["**/*.test.js", "**/*.test.ts", "**/*.spec.ts"],
            env: {
                jest: true,
            },
            rules: {
                "max-len": "off",
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/no-explicit-any": "off",
            },
        },
    ],
};
