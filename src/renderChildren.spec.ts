/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { create } from "./custom-element";
import { renderChildren } from "./renderChildren";

describe("renderChildren", () => {
    it("returns innerHTML with element", () => {
        const target = create("div").html("<p>EXPECTED</p>").root();

        const actual = renderChildren(target, { indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<p>
                EXPECTED
            </p>"
        `);
    });

    it("returns empty string with empty tag", () => {
        const target = create("div").root();

        const actual = renderChildren(target, { indent: "" } as any);

        expect(actual).toBe("");
    });
});
