/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
export const create = (tagName: string, createShadowRoot = true) => new Builder(tagName, createShadowRoot);

class Builder {
    private _root: HTMLElement;
    private _shadowRoot?: ShadowRoot;

    constructor(private tagName: string, shadowRoot: boolean) {
        this._root = document.createElement(this.tagName);
        if (shadowRoot) {
            this._shadowRoot = this._root.attachShadow({ mode: "open" });
        }
    }

    public root() {
        return this._root;
    }

    public shadowRoot() {
        return this.shadowRoot;
    }

    public html(html: string): this {
        this._root.innerHTML = html;
        return this;
    }

    public shadowHtml(html: string): this {
        if (this._shadowRoot) {
            this._shadowRoot.innerHTML = html;
        }
        return this;
    }

    public elements(...elems: HTMLElement[]): this {
        elems.forEach(cur => this._root.appendChild(cur));
        return this;
    }

    public shadowElements(...elems: HTMLElement[]): this {
        elems.forEach(cur => this._shadowRoot?.appendChild(cur));
        return this;
    }
}
