/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { create } from "./custom-element";
import { renderNodes } from "./renderNodes";

describe("renderNodes", () => {
    it("returns innerHTML with single child element", () => {
        const target = create("div").html("<p>EXPECTED</p>").root();

        const actual = renderNodes(target.childNodes, { indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<p>
                EXPECTED
            </p>"
        `);
    });

    it("returns innerHTML with multiple children", () => {
        const target = create("div").html("<div>One</div><div>Two</div><div>Three</div>").root();

        const actual = renderNodes(target.childNodes, { indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                One
            </div>
            <div>
                Two
            </div>
            <div>
                Three
            </div>"
        `);
    });

    it("returns slottedContent with default content", () => {
        const target = create("host-element").shadowHtml("<slot><p>EXPECTED</p></slot>").root();

        const actual = renderNodes(target.shadowRoot!.querySelector("slot")!.childNodes, { indent: "" } as any);


        expect(actual).toMatchInlineSnapshot(`
            "<p>
                EXPECTED
            </p>"
        `);
    });

    it("returns slottedContent with single slotted element", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<p>EXPECTED</p>").root();

        const actual = renderNodes(target.shadowRoot!.querySelector("slot")!.assignedNodes(), { indent: "" } as any);


        expect(actual).toMatchInlineSnapshot(`
            "<p>
                EXPECTED
            </p>"
        `);
    });

    it("returns slottedContent with multiple slotted elements", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<div>One</div><div>Two</div><div>Three</div>").root();

        const actual = renderNodes(target.shadowRoot!.querySelector("slot")!.assignedNodes(), { indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                One
            </div>
            <div>
                Two
            </div>
            <div>
                Three
            </div>"
        `);
    });

    it("returns empty string with empty nodeList", () => {
        const actual = renderNodes([], { indent: "" } as any);

        expect(actual).toBe("");
    });
});
