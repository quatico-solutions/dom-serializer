/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { create } from "./custom-element";
import { renderAttributes } from "./renderAttributes";

describe("renderAttributes", () => {
    it("returns empty string with no attributes and diffable true", () => {
        const target = create("div").html("<p>target</p>").root().querySelector("p") as Element;

        const actual = renderAttributes(target, { indent: "", diffable: true, filterAttrs: [] } as any);

        expect(actual).toMatchInlineSnapshot(`""`);
    });

    it("returns attributes string with single attribute and diffable true", () => {
        const target = create("div").html("<p class='foo'>target</p>").root().querySelector("p") as Element;

        const actual = renderAttributes(target, { indent: "", diffable: true, filterAttrs: [] } as any);

        expect(actual).toMatchInlineSnapshot(`"class=\\"foo\\""`);
    });

    it("returns attributes string with multiple attributes and diffable true", () => {
        const target = create("div")
            .html("<p class='foo' id='bar' align='center'>target</p>")
            .root()
            .querySelector("p") as Element;

        const actual = renderAttributes(target, { indent: "", diffable: true, filterAttrs: [] } as any);

        expect(actual).toMatchInlineSnapshot(`
            "
                align=\\"center\\"
                class=\\"foo\\"
                id=\\"bar\\"
            "
        `);
    });

    it("returns empty string with no attributes and diffable false", () => {
        const target = create("div").html("<p>target</p>").root().querySelector("p") as Element;

        const actual = renderAttributes(target, { indent: "", diffable: false, filterAttrs: [] } as any);

        expect(actual).toMatchInlineSnapshot(`""`);
    });

    it("returns attributes string with single attribute and diffable false", () => {
        const target = create("div").html("<p class='foo'>target</p>").root().querySelector("p") as Element;

        const actual = renderAttributes(target, { indent: "", diffable: false, filterAttrs: [] } as any);

        expect(actual).toMatchInlineSnapshot(`"class=\\"foo\\""`);
    });

    it("returns attributes string with multiple attributes and diffable false", () => {
        const target = create("div")
            .html("<p class='foo' id='bar' align='center'>target</p>")
            .root()
            .querySelector("p") as Element;

        const actual = renderAttributes(target, { indent: "", diffable: false, filterAttrs: [] } as any);

        expect(actual).toMatchInlineSnapshot(`"align=\\"center\\" class=\\"foo\\" id=\\"bar\\""`);
    });
});
