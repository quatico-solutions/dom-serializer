/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { create } from "./custom-element";
import { renderToString } from "./renderToString";

describe("renderToString()", () => {
    it("returns outerHTML for single element", () => {
        const target = create("div", false).root();

        const actual = renderToString(target);

        expect(actual).toBe("<div></div>");
    });

    it("returns markup including shadow dom", () => {
        const target = create("div").shadowHtml(`<p>inside</p>`).root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
"<div>
    <template shadowrootmode="open">
        <p>
            inside
        </p>
    </template>
</div>"
`);
    });

    it("returns markup including shadow dom with string attribute", () => {
        const required = true;
        const target = create("div")
            .shadowHtml(
                `<input type="text" id="name" name="name" ${required ? 'aria-required="true" required' : ""}
        minlength="4" maxlength="8" size="10">`
            )
            .root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
"<div>
    <template shadowrootmode="open">
        <input 
            aria-required="true"
            id="name"
            maxlength="8"
            minlength="4"
            name="name"
            required=""
            size="10"
            type="text"
         />
    </template>
</div>"
`);
    });

    it("returns markup including shadow dom with void tag", () => {
        const target = create("div").shadowHtml(`<br>`).root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
"<div>
    <template shadowrootmode="open">
        <br />
    </template>
</div>"
`);
    });

    it("returns markup including shadow dom with spaces", () => {
        const target = create("div")
            .shadowHtml(
                `
            <a
                class="link link--display-inline-block link--bg"
                href="expectedUrl"
                target="_self"
            >
                Whatever
            </a>
            `
            )
            .root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
"<div>
    <template shadowrootmode="open">
        <a 
            class="link link--display-inline-block link--bg"
            href="expectedUrl"
            target="_self"
        >
            
                Whatever
            
        </a>
    </template>
</div>"
`);
    });

    it("returns markup including multiple levels of shadow dom", () => {
        const target = create("div")
            .shadowHtml(`<p>inside</p>`)
            .shadowElements(create("div").shadowHtml(`<button>click me I'm inside of a second root</button>`).root())
            .root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
"<div>
    <template shadowrootmode="open">
        <p>
            inside
        </p>
        <div>
            <template shadowrootmode="open">
                <button>
                    click me I'm inside of a second root
                </button>
            </template>
        </div>
    </template>
</div>"
`);
    });

    it("returns markup including light-dom children along shadow dom", () => {
        const target = create("div").html(`<pre>I'm outside</pre>`).shadowHtml(`<p>inside</p>`).root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
"<div>
    <template shadowrootmode="open">
        <p>
            inside
        </p>
    </template>
    <pre>
        I'm outside
    </pre>
</div>"
`);
    });

    it("returns only light-dom markup with shadowDepth option set to 0", () => {
        const target = create("div").html(`<pre>I'm outside</pre>`).shadowHtml(`<p>inside</p>`).root();

        const actual = renderToString(target, { shadowDepth: 0 });

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

        const actual = renderToString(target, { shadow: false });

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

        const actual = renderToString(target, { shadowDepth: 1 });

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

        const actual = renderToString(target, { filterTags: ["div"] });

        expect(actual).toMatchInlineSnapshot(`""`);
    });

    it("returns markup without filtered tags", () => {
        const target = create("div")
            .html(`<p>inside the element</p>`)
            .elements(create("main").html(`<button>click me I'm inside of a second element</button>`).root())
            .root();

        const actual = renderToString(target, { filterTags: ["button", "main"] });

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

        const actual = renderToString(target, { filterTags: ["button"] });

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

        const actual = renderToString(target, { filterAttrs: ["id"] });

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

        const actual = renderToString(target, { filterAttrs: ["id"] });

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
    it("returns markup without HTML comments by default", () => {
        const target = create("div")
            .html(`<!-- comment -->`)
            .elements(create("main").html(`<!-- comment -->`).root())
            .root();

        const actual = renderToString(target, { indent: "" });

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

        const actual = renderToString(target, { filterComments: false, indent: "" });

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

describe("render w/ slottedContent map-contents", () => {
    it("returns slottedContent with selected slotted element", () => {
        const target = create("host-element")
            .shadowHtml("<slot></slot>")
            .html("<p class='target'>EXPECTED</p>")
            .root()
            .querySelector(".target");

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<p class="target">
                EXPECTED
            </p>"
        `);
    });

    it("yields mapped slottedContent with nested selected slotted element and assigned elements", () => {
        const nested = create("div").html("<slot><p class='target'>EXPECTED</p></slot>").root();
        const host = create("host-element").shadowHtml("<slot><p>Whatever</p></slot>").elements(nested).root();
        const target = create("my-target")
            .html("<p>Whatever</p>")
            .shadowElements(host)
            .root()
            .shadowRoot!.querySelector(".target");

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<p class="target">
                EXPECTED
            </p>"
        `);
    });

    it("yields mapped slottedContent with nested slot element and selected assigned elements", () => {
        const nested = create("div").html("<slot><p>Whatever</p></slot>").root();
        const host = create("host-element")
            .shadowHtml("<slot></slot>")
            .html("<p class='target'>EXPECTED</p>")
            .elements(nested)
            .root();
        const target = create("my-target")
            .html("<p>Whatever</p>")
            .shadowElements(host)
            .root()
            .shadowRoot!.querySelector(".target");

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        } as any);

        expect(actual).toMatchInlineSnapshot(`
            "<p class="target">
                EXPECTED
            </p>"
        `);
    });

    it("returns slottedContent with default content", () => {
        const target = create("host-element").shadowHtml("<slot><p>EXPECTED</p></slot>").root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot>
                        <p>
                            EXPECTED
                        </p>
                    </slot>
                </template>
            </host-element>"
        `);
    });

    it("yields nested map slottedContent", () => {
        const target = create("host-element")
            .html("<p slot='target'>EXPECTED</p>")
            .shadowHtml("<slot name='target'></slot>")
            .root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot name="target">
                        #contents
                            <p slot="target">
                                EXPECTED
                            </p>
                    </slot>
                </template>
            </host-element>"
        `);
    });

    it("returns slottedContent with single slotted element", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<p>EXPECTED</p>").root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot>
                        #contents
                            <p>
                                EXPECTED
                            </p>
                    </slot>
                </template>
            </host-element>"
        `);
    });

    it("returns slottedContent with multiple slotted elements", () => {
        const target = create("host-element")
            .shadowHtml("<slot></slot>")
            .html("<div>One</div><div>Two</div><div>Three</div>")
            .root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot>
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
                    </slot>
                </template>
            </host-element>"
        `);
    });

    it("yields mapped slottedContent with nested slot element", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<slot></slot>").root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot>
                        #contents
                            <slot></slot>
                    </slot>
                </template>
            </host-element>"
        `);
    });

    it("yields mapped slottedContent with nested slot element and assigned elements", () => {
        const nested = create("div").html("<slot><p>Whatever</p></slot>").root();
        const host = create("host-element").shadowHtml("<slot><p>Whatever</p></slot>").elements(nested).root();
        const target = create("my-target").html("<p>EXPECTED</p>").shadowElements(host).root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "map-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<my-target>
                <template shadowrootmode="open">
                    <host-element>
                        <template shadowrootmode="open">
                            <slot>
                                #contents
                                    <div>
                                        <slot>
                                            #contents
                                                <p>
                                                    EXPECTED
                                                </p>
                                        </slot>
                                    </div>
                            </slot>
                        </template>
                    </host-element>
                </template>
            </my-target>"
        `);
    });
});

describe("render w/ slottedContent reveal-contents", () => {
    it("nested yie mappe", () => {
        const target = create("host-element").shadowHtml("<slot><p>EXPECTED</p></slot>").root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "reveal-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot>
                        <p>
                            EXPECTED
                        </p>
                    </slot>
                </template>
            </host-element>"
        `);
    });

    it("yields nested map slottedConten", () => {
        const target = create("host-element")
            .shadowHtml("<slot name='target'></slot>")
            .html("<p slot='target'>EXPECTED</p>")
            .root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "reveal-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot name="target">
                        #contents
                            <p slot="target">
                                EXPECTED
                            </p>
                    </slot>
                </template>
                <p slot="target">
                    EXPECTED
                </p>
            </host-element>"
        `);
    });

    it("returns slottedContent with single slotted element", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<p>EXPECTED</p>").root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "reveal-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot>
                        #contents
                            <p>
                                EXPECTED
                            </p>
                    </slot>
                </template>
                <p>
                    EXPECTED
                </p>
            </host-element>"
        `);
    });

    it("returns slottedContent with multiple slotted elements", () => {
        const target = create("host-element")
            .shadowHtml("<slot></slot>")
            .html("<div>One</div><div>Two</div><div>Three</div>")
            .root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "reveal-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot>
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
                    </slot>
                </template>
                <div>
                    One
                </div>
                <div>
                    Two
                </div>
                <div>
                    Three
                </div>
            </host-element>"
        `);
    });

    it("yields mapped slottedContent with nested slot element", () => {
        const target = create("host-element").shadowHtml("<slot></slot>").html("<slot></slot>").root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "reveal-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<host-element>
                <template shadowrootmode="open">
                    <slot>
                        #contents
                            <slot></slot>
                    </slot>
                </template>
                <slot></slot>
            </host-element>"
        `);
    });

    it("yields mapped slottedContent with nested slot element and assigned elements", () => {
        const nested = create("div").html("<slot><p>Whatever</p></slot>").root();
        const host = create("host-element").shadowHtml("<slot><p>Whatever</p></slot>").elements(nested).root();
        const target = create("my-target").html("<p>EXPECTED</p>").shadowElements(host).root();

        const actual = renderToString(target, {
            indent: "",
            slottedContent: "reveal-contents",
        });

        expect(actual).toMatchInlineSnapshot(`
            "<my-target>
                <template shadowrootmode="open">
                    <host-element>
                        <template shadowrootmode="open">
                            <slot>
                                #contents
                                    <div>
                                        <slot>
                                            #contents
                                                <p>
                                                    EXPECTED
                                                </p>
                                        </slot>
                                    </div>
                            </slot>
                        </template>
                        <div>
                            <slot>
                                #contents
                                    <p>
                                        EXPECTED
                                    </p>
                            </slot>
                        </div>
                    </host-element>
                </template>
                <p>
                    EXPECTED
                </p>
            </my-target>"
        `);
    });
});
