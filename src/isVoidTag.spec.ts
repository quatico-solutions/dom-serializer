/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { isVoidTag } from "./isVoidTag";

describe("isVoidTag", () => {
    it("returns true for known void tag", () => {
        expect(isVoidTag("br")).toBe(true);
    });

    it("returns false for other tags", () => {
        expect(isVoidTag("whatever")).toBe(false);
    });

    it("returns false for empty string", () => {
        expect(isVoidTag("")).toBe(false);
    });
});
