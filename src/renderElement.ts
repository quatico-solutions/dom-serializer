/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { isVoidTag } from "./isVoidTag";
import { renderAttributes } from "./renderAttributes";
import { renderChildren } from "./renderChildren";
import { INDENTATION } from "./renderIndentation";
import { RenderOptions } from "./RenderOptions";
import { renderShadowContent } from "./renderShadowContent";
import { renderSlot } from "./renderSlot";

/**
 * Renders a given element into a string value, including its shadow DOM, if configured.
 */
export const renderElement = (element: Element, options: RenderOptions): string => {
    const { indent, shadowDepth, filterTags, slottedContent, withinSlot } = options;
    const tagName = element.nodeName.toLowerCase() || "";

    if ((filterTags || []).includes(tagName)) {
        return "";
    }

    if (slottedContent == "map-contents" && !!element.assignedSlot && !withinSlot) {
        return "";
    }

    let shadowContent = "";
    let childContent = "";
    const attributes = renderAttributes(element, options);

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

    if (slottedContent == "map-contents" && element instanceof HTMLSlotElement) {
        childContent = renderSlot(element, {
            ...options,
            indent: indent + INDENTATION,
            shadowDepth: shadowDepth - 1,
        });
    } else if (element.hasChildNodes()) {
        childContent = renderChildren(element, {
            ...options,
            indent: indent + INDENTATION,
            shadowDepth: shadowDepth - 1,
        });
    }

    if (isVoidTag(tagName)) {
        return `${indent}<${tagName}${attributes ? " " + attributes : ""} />`;
    }
    return (
        `${indent}<${tagName}${attributes ? " " + attributes : ""}>` +
        (shadowContent.length > 0 || childContent.length > 0 ? "\n" : "") +
        shadowContent +
        (shadowContent.length > 0 && childContent.length > 0 ? "\n" : "") +
        childContent +
        (shadowContent.length > 0 || childContent.length > 0 ? "\n" + indent : "") +
        `</${tagName}>`
    );
};
