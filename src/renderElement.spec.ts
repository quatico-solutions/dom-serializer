/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { create } from "./custom-element";
import { renderElement } from "./renderElement";

describe("renderElement()", () => {
    it("returns outerHTML for single element", () => {
        const target = create("div", false).root();

        const actual = renderElement(target, { indent: "" } as any);

        expect(actual).toBe("<div></div>");
    });

    it("returns element markup without shadow dom", () => {
        const target = create("div").shadowHtml(`<p>inside</p>`).root();

        const actual = renderElement(target, { indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`"<div></div>"`);
    });

    it("returns markup including innerHTML w/o shadow root child", () => {
        const target = create("div").html(`<pre>I'm outside</pre>`).shadowHtml(`<p>inside</p>`).root();

        const actual = renderElement(target, { indent: "", shadowDepths: Number.POSITIVE_INFINITY } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <pre>
                    I'm outside
                </pre>
            </div>"
        `);
    });

    it("returns only light-dom markup with shadowDepth option set to 0", () => {
        const target = create("div").html(`<pre>I'm outside</pre>`).shadowHtml(`<p>inside</p>`).root();

        const actual = renderElement(target, { shadowDepth: 0, indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <pre>
                    I'm outside
                </pre>
            </div>"
        `);
    });

    it("returns only light-dom markup with no shadowDepth set but dom set to 'light'", () => {
        const target = create("div").html(`<pre>I'm outside</pre>`).shadowHtml(`<p>inside</p>`).root();

        const actual = renderElement(target, { shadow: false, indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <pre>
                    I'm outside
                </pre>
            </div>"
        `);
    });

    it("returns markup including only one level of shadow dom with shadowDepth set to 1", () => {
        const target = create("div")
            .shadowHtml(`<p>inside</p>`)
            .shadowElements(create("div").shadowHtml(`<button>click me I'm inside of a second root</button>`).root())
            .root();

        const actual = renderElement(target, { shadowDepth: 1, indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <template shadowroot=\\"open\\">
                    <p>
                        inside
                    </p>
                    <div></div>
                </template>
            </div>"
        `);
    });
});

describe("filter tags", () => {
    it("returns markup with filtered parent tag", () => {
        const target = create("div")
            .html(`<p>inside the element</p>`)
            .elements(create("main").html(`<button>click me I'm inside of a second element</button>`).root())
            .root();

        const actual = renderElement(target, { filterTags: ["div"], indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`""`);
    });

    it("returns markup without filtered tags", () => {
        const target = create("div")
            .html(`<p>inside the element</p>`)
            .elements(create("main").html(`<button>click me I'm inside of a second element</button>`).root())
            .root();

        const actual = renderElement(target, { filterTags: ["button", "main"], indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <p>
                    inside the element
                </p>
            </div>"
        `);
    });

    it("returns markup with filtered and non-filtered tags", () => {
        const target = create("div")
            .html(`<p>inside the element</p>`)
            .elements(create("main").html(`<button>click me I'm inside of a second element</button>`).root())
            .root();

        const actual = renderElement(target, { filterTags: ["button"], indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <p>
                    inside the element
                </p>
                <main></main>
            </div>"
        `);
    });
});

describe("filter attributes", () => {
    it("returns markup without filtered attributes", () => {
        const target = create("div")
            .html(`<p id="remove-one">inside the element</p>`)
            .elements(
                create("main").html(`<button id="remove-two">click me I'm inside of a second element</button>`).root()
            )
            .root();

        const actual = renderElement(target, { filterAttrs: ["id"], indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <p>
                    inside the element
                </p>
                <main>
                    <button>
                        click me I'm inside of a second element
                    </button>
                </main>
            </div>"
        `);
    });

    it("returns markup with filtered and non-filtered attributes", () => {
        const target = create("div")
            .html(`<p id="remove-one" align="center">inside the element</p>`)
            .elements(
                create("main")
                    .html(`<button class="favorite" id="remove-two">click me I'm inside of a second element</button>`)
                    .root()
            )
            .root();

        const actual = renderElement(target, { filterAttrs: ["id"], indent: "" } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <p align=\\"center\\">
                    inside the element
                </p>
                <main>
                    <button class=\\"favorite\\">
                        click me I'm inside of a second element
                    </button>
                </main>
            </div>"
        `);
    });
});
