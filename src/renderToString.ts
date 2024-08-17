/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { renderElement } from "./renderElement";
import { RenderOptions } from "./RenderOptions";

export type RenderFn = (element: unknown, options?: Partial<RenderOptions>) => string;

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
        filterAttrs = [],
        filterComments = true,
        filterTags = ["style", "script"],
        indent = "",
        shadow = true,
        shadowDepth = Number.MAX_SAFE_INTEGER,
        shadowRoots = "declarative",
        slottedContent,
    } = options;
    const element = value as Element;
    if (element && element.nodeType === Node.ELEMENT_NODE) {
        return renderElement(element, {
            diffable,
            filterAttrs,
            filterComments,
            filterTags,
            indent,
            shadow,
            shadowDepth,
            shadowRoots,
            slottedContent,
            root: true,
        });
    }
    return "";
};
