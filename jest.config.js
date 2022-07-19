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
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig.test.json",
        },
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testRegex: "src/.*(test|spec)\\.(jsx?|tsx?)$",
    testURL: "http://localhost/",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    transformIgnorePatterns: ["node_modules"],
    resetMocks: true,
};
