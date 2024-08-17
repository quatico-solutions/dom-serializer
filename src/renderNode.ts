/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { InternalRenderOptions } from "./InternalRenderOptions";
import { renderElement } from "./renderElement";

/**
 * Renders child node and text content. Ignore everything else.
 */
export const renderNode = (node: Node, options: InternalRenderOptions): string => {
    switch (node?.nodeType) {
        case Node.ELEMENT_NODE:
            return renderElement(node as Element, { ...options, root: false });
        case Node.TEXT_NODE:
            return options.indent + (node as Text).data;
        case Node.COMMENT_NODE:
            if (options.filterComments === false) {
                return options.indent + `<!--${(node as Comment).textContent}-->`;
            }
            return "";
        default:
            return "";
    }
};
