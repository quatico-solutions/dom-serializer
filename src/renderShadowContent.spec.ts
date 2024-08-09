/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { renderShadowContent } from "./renderShadowContent";

describe("renderShadowContent", () => {
    it("renders declarative shadow root with default options", () => {
        const target = "EXPECTED";

        const actual = renderShadowContent(target, { indent: "" });

        expect(actual).toMatchInlineSnapshot(`
"    <template shadowrootmode="open">
EXPECTED
    </template>"
`);
    });

    it("renders declarative shadow root with options set 'declarative'", () => {
        const target = "EXPECTED";

        const actual = renderShadowContent(target, { indent: "", shadowRoots: "declarative" });

        expect(actual).toMatchInlineSnapshot(`
"    <template shadowrootmode="open">
EXPECTED
    </template>"
`);
    });

    it("renders devtools shadow root with option set", () => {
        const target = "EXPECTED";

        const actual = renderShadowContent(target, { indent: "", shadowRoots: "devtools" });

        expect(actual).toMatchInlineSnapshot(`
            "    #shadowRoot
            EXPECTED"
        `);
    });
});
