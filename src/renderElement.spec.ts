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

        const actual = renderElement(target, {
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toBe("<div></div>");
    });

    it("returns element markup without shadow dom", () => {
        const target = create("div").shadowHtml(`<p>inside</p>`).root();

        const actual = renderElement(target, {
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`"<div></div>"`);
    });

    it("returns markup including innerHTML w/o shadow root child", () => {
        const target = create("div").html(`<pre>I'm outside</pre>`).shadowHtml(`<p>inside</p>`).root();

        const actual = renderElement(target, {
            indent: "",
            shadowDepth: 0,
            diffable: true,
            shadowRoots: "declarative",
        });

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

        const actual = renderElement(target, {
            shadowDepth: 0,
            indent: "",
            diffable: true,
            shadowRoots: "declarative",
        });

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

        const actual = renderElement(target, {
            shadow: false,
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

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

        const actual = renderElement(target, {
            shadowDepth: 1,
            indent: "",
            diffable: true,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <template shadowrootmode="open">
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

        const actual = renderElement(target, {
            filterTags: ["div"],
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`""`);
    });

    it("returns markup without filtered tags", () => {
        const target = create("div")
            .html(`<p>inside the element</p>`)
            .elements(create("main").html(`<button>click me I'm inside of a second element</button>`).root())
            .root();

        const actual = renderElement(target, {
            filterTags: ["button", "main"],
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

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

        const actual = renderElement(target, {
            filterTags: ["button"],
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

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

        const actual = renderElement(target, {
            filterAttrs: ["id"],
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

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

        const actual = renderElement(target, {
            filterAttrs: ["id"],
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <p 
                    align="center"
                >
                    inside the element
                </p>
                <main>
                    <button 
                        class="favorite"
                    >
                        click me I'm inside of a second element
                    </button>
                </main>
            </div>"
        `);
    });
});

describe("filter comments", () => {
    it("returns markup with HTML comments and filterComments true", () => {
        const target = create("div")
            .html(`<!-- comment -->`)
            .elements(create("main").html(`<!-- comment -->`).root())
            .root();

        const actual = renderElement(target, {
            filterComments: true,
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <main></main>
            </div>"
        `);
    });

    it("returns markup with HTML comments and filterComments false", () => {
        const target = create("div")
            .html(`<!-- comment -->`)
            .elements(create("main").html(`<!-- comment -->`).root())
            .root();

        const actual = renderElement(target, {
            filterComments: false,
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                <!-- comment -->
                <main>
                    <!-- comment -->
                </main>
            </div>"
        `);
    });
});

describe("render w/ slottedContent ignore", () => {
    it("returns slottedContent with default content", () => {
        const target = create("host-element").shadowHtml("<slot><p>EXPECTED</p></slot>").root();

        const actual = renderElement(target.shadowRoot!.querySelector("slot")!, {
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<slot>
                <p>
                    EXPECTED
                </p>
            </slot>"
        `);
    });

    it("returns slottedContent with single slotted element", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<p>EXPECTED</p>").root();

        const actual = renderElement(target.shadowRoot!.querySelector("slot")!, {
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`"<slot></slot>"`);
    });

    it("returns slottedContent with multiple slotted elements", () => {
        const target = create("host-element")
            .shadowHtml("<slot></slot>")
            .html("<div>One</div><div>Two</div><div>Three</div>")
            .root();

        const actual = renderElement(target.shadowRoot!.querySelector("slot")!, {
            indent: "",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`"<slot></slot>"`);
    });
});

describe("render w/ slottedContent reveal-contents", () => {
    it("returns slottedContent with default content", () => {
        const target = create("host-element").shadowHtml("<slot><p>EXPECTED</p></slot>").root();

        const actual = renderElement(target.shadowRoot!.querySelector("slot")!, {
            indent: "",
            slottedContent: "reveal-contents",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<slot>
                <p>
                    EXPECTED
                </p>
            </slot>"
        `);
    });

    it("returns slottedContent with single slotted element", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<p>EXPECTED</p>").root();

        const actual = renderElement(target.shadowRoot!.querySelector("slot")!, {
            indent: "",
            slottedContent: "reveal-contents",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<slot>
                #contents
                    <p>
                        EXPECTED
                    </p>
            </slot>"
        `);
    });

    it("returns slottedContent with multiple slotted elements", () => {
        const target = create("host-element")
            .shadowHtml("<slot></slot>")
            .html("<div>One</div><div>Two</div><div>Three</div>")
            .root();

        const actual = renderElement(target.shadowRoot!.querySelector("slot")!, {
            indent: "",
            slottedContent: "reveal-contents",
            diffable: true,
            shadowDepth: 0,
            shadowRoots: "declarative",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<slot>
                #contents
                    <div>
                        One
                    </div>
                    <div>
                        Two
                    </div>
                    <div>
                        Three
                    </div>
            </slot>"
        `);
    });
});
