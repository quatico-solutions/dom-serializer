/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { RenderOptions } from "./RenderOptions";
import { renderNode } from "./renderNode";

/**
 * Render all child nodes recursively of a given element or shadow root.
 */
export const renderChildren = (element: Element | ShadowRoot, options: RenderOptions): string => {
    return Array.from(element?.childNodes || [])
        .map(child => renderNode(child, options))
        .filter(it => it.trim().length > 0)
        .join("\n");
};
