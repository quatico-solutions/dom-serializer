/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { create } from "./custom-element";
import { renderSlot } from "./renderSlot";

describe('renderSlot()', () => {
    it("returns slottedContent with default content", () => {
        const target = create("host-element").shadowHtml("<slot><p>EXPECTED</p></slot>").root();

        const actual = renderSlot(target.shadowRoot!.querySelector("slot")!, { indent: "" } as any);


        expect(actual).toMatchInlineSnapshot(`
            "<p>
                EXPECTED
            </p>"
        `);
    });

    it("returns slottedContent with single slotted element", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<p>EXPECTED</p>").root();

        const actual = renderSlot(target.shadowRoot!.querySelector("slot")!, { indent: "" } as any);


        expect(actual).toMatchInlineSnapshot(`
"#contents
    <p>
        EXPECTED
    </p>"
`);
    });

    it("returns slottedContent with multiple slotted elements", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<div>One</div><div>Two</div><div>Three</div>").root();

        const actual = renderSlot(target.shadowRoot!.querySelector("slot")!, { indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
"#contents
    <div>
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
});