/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
module.exports = {
    collectCoverageFrom: ["./src/**/*.{ts,tsx}"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["index.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    prettierPath: null,
    testEnvironment: "jsdom",
    testRegex: "src/.*(test|spec)\\.(jsx?|tsx?)$",
    testEnvironmentOptions: {
        url: "http://localhost/",
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": [
            "ts-jest",
            { tsconfig: "./tsconfig.test.json", diagnostics: false, isolatedModules: true },
        ],
    },
    transformIgnorePatterns: ["node_modules"],
    resetMocks: true,
};
