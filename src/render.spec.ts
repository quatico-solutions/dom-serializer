/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { create } from "./custom-element";
import { renderToString } from "./render";

describe("renderToString()", () => {
    it("return outerHTML for single element", () => {
        const target = create("div", false).root();

        const actual = renderToString(target);

        expect(actual).toBe("<div></div>");
    });

    it("returns markup including shadow dom", () => {
        const target = create("div").shadowHtml(`<p>inside</p>`).root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                #shadowRoot
                    <p>
                        inside
                    </p>
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
                #shadowRoot
                    <input
                        aria-required=\\"true\\"
                        id=\\"name\\"
                        maxlength=\\"8\\"
                        minlength=\\"4\\"
                        name=\\"name\\"
                        required=\\"\\"
                        size=\\"10\\"
                        type=\\"text\\"
                     />
            </div>"
        `);
    });

    it("returns markup including shadow dom with void tag", () => {
        const target = create("div").shadowHtml(`<br>`).root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                #shadowRoot
                    <br />
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
                #shadowRoot
                    <a
                        class=\\"link link--display-inline-block link--bg\\"
                        href=\\"expectedUrl\\"
                        target=\\"_self\\"
                    >
                        
                            Whatever
                        
                    </a>
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
                #shadowRoot
                    <p>
                        inside
                    </p>
                    <div>
                        #shadowRoot
                            <button>
                                click me I'm inside of a second root
                            </button>
                    </div>
            </div>"
        `);
    });

    it("returns markup including light-dom children along shadow dom", () => {
        const target = create("div").html(`<pre>I'm outside</pre>`).shadowHtml(`<p>inside</p>`).root();

        const actual = renderToString(target);

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                #shadowRoot
                    <p>
                        inside
                    </p>
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
                #shadowRoot
                    <p>
                        inside
                    </p>
                    <div></div>
            </div>"
        `);
    });
});
