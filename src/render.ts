/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
export type RenderFn = (element: unknown, options?: Partial<RenderOptions>) => string;

/**
 * Options object to custom the rendering of the DOM structure.
 */
export interface RenderOptions {
    /**
     * Initial indent string for resulting structure. Child levels are indented
     * by 4 spaces; defaults to empty string
     */
    indent: string;
    /**
     * Number of showRoots to be rendered; defaults to infinity
     */
    shadowDepth: number;
    /**
     * Boolean to enable/disable the rendering of shadow DOM contents; defaults
     * to true
     */
    shadow?: boolean;
    /**
     * Boolean to add extra line breaks for better comparablity; defaults to true
     */
    diffable: boolean;

    /**
     * Array of lowercase tag names that are filtered out of the snapshot; defaults to ["style", "script"]
     */
    filterTags?: string[];
}

const INDENTATION = "    ";

/**
 * Render all childNodes recursively.
 */
const renderChildren = (element: Element | ShadowRoot, options: RenderOptions): string => {
    return Array.from(element?.childNodes || [])
        .map(child => renderChild(child, options))
        .filter(it => it.trim().length > 0)
        .join("\n");
};

/**
 * Render elements nodes and text content. Ignore everything else.
 */
const renderChild = (child: ChildNode, options: RenderOptions): string => {
    switch (child?.nodeType) {
        case child.ELEMENT_NODE:
            return renderElement(child as Element, options);
        case child.TEXT_NODE:
            return options.indent + (child as Text).data;
        default:
            return "";
    }
};

/**
 * Render the provided element as string, including its shadow DOM if configured.
 */
const renderElement = (element: Element, options: RenderOptions): string => {
    const { indent, shadowDepth, diffable, filterTags } = options;
    const tagName = element.nodeName.toLowerCase() || "";
    if ((filterTags || []).includes(tagName)) {
        return "";
    }

    let attributes = "";
    let shadowContent = "";
    let childContent = "";

    if (element.attributes && element.attributes.length > 0) {
        attributes =
            (diffable ? "\n" + indent + INDENTATION : " ") +
            Array.from(element.attributes)
                .filter((cur: Attr) => cur.name)
                .sort((a: Attr, b: Attr) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                .map((attr: Attr) => `${attr.name}="${attr.value}"`)
                .join(diffable ? "\n" + indent + INDENTATION : " ") +
            (diffable ? "\n" + indent : "");
    }

    if (shadowDepth > 0 && element.shadowRoot && element.shadowRoot.hasChildNodes() && options.shadow !== false) {
        shadowContent =
            indent +
            INDENTATION +
            "#shadowRoot" +
            "\n" +
            renderChildren(element.shadowRoot, {
                ...options,
                indent: indent + INDENTATION + INDENTATION,
                shadowDepth: shadowDepth - 1,
            });
    }

    if (element.hasChildNodes()) {
        childContent = renderChildren(element, {
            ...options,
            indent: indent + INDENTATION,
            shadowDepth: shadowDepth - 1,
        });
    }

    if (isVoidTag(tagName)) {
        return `${indent}<${tagName}${attributes} />`;
    }
    return (
        `${indent}<${tagName}${attributes}>` +
        (shadowContent.length > 0 || childContent.length > 0 ? "\n" : "") +
        shadowContent +
        (shadowContent.length > 0 && childContent.length > 0 ? "\n" : "") +
        childContent +
        (shadowContent.length > 0 || childContent.length > 0 ? "\n" + indent : "") +
        `</${tagName}>`
    );
};

/**
 * Serializes an DOM node to string including its complete DOM structure.
 *
 * @param value The DOM content to render, e.g., HTMLElement
 * @param options Options to customize the resulting string
 *
 */
export const renderToString: RenderFn = (value: unknown, options: Partial<RenderOptions> = {}): string => {
    const {
        diffable = true,
        filterTags = ["style", "script"],
        indent = "",
        shadow = true,
        shadowDepth = Number.MAX_SAFE_INTEGER,
    } = options;
    const element = value as Element;
    if (element && element.nodeType === Node.ELEMENT_NODE) {
        return renderElement(element, {
            diffable,
            filterTags,
            indent,
            shadow,
            shadowDepth,
        });
    }
    return "";
};

export const isVoidTag = (tagName: string) =>
    [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
    ].includes(tagName);
