/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { RenderOptions } from "./RenderOptions";
import { renderElement } from "./renderElement";

/**
 * Renders child node and text content. Ignore everything else.
 */
export const renderChild = (child: ChildNode, options: RenderOptions): string => {
    switch (child?.nodeType) {
        case child.ELEMENT_NODE:
            return renderElement(child as Element, options);
        case child.TEXT_NODE:
            return options.indent + (child as Text).data;
        default:
            return "";
    }
};
