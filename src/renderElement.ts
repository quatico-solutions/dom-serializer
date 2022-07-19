/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { renderChildren } from "./renderChildren";
import { INDENTATION } from "./renderIndentation";
import { RenderOptions } from "./RenderOptions";
import { isVoidTag } from "./isVoidTag";
import { renderShadowContent } from "./renderShadowContent";

/**
 * Renders a given element into a string value, including its shadow DOM, if configured.
 */
export const renderElement = (element: Element, options: RenderOptions): string => {
    const { indent, shadowDepth, diffable, filterTags, filterAttrs } = options;
    const tagName = element.nodeName.toLowerCase() || "";
    if ((filterTags || []).includes(tagName)) {
        return "";
    }

    let attributes = "";
    let shadowContent = "";
    let childContent = "";

    if (element.attributes && element.attributes.length > 0) {
        attributes =
            (diffable ? `\n${indent + INDENTATION}` : " ") +
            Array.from(element.attributes)
                .filter(
                    (cur: Attr) => cur.name && (!filterAttrs || filterAttrs?.includes(cur.name.toLowerCase()) === false)
                )
                .sort((a: Attr, b: Attr) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                .map((attr: Attr) => `${attr.name}="${attr.value}"`)
                .join(diffable ? `\n${indent + INDENTATION}` : " ") +
            (diffable ? `\n${indent}` : "");
    }

    if (shadowDepth > 0 && element.shadowRoot && element.shadowRoot.hasChildNodes() && options.shadow !== false) {
        shadowContent = renderShadowContent(
            renderChildren(element.shadowRoot, {
                ...options,
                indent: indent + INDENTATION + INDENTATION,
                shadowDepth: shadowDepth - 1,
            }),
            options
        );
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
