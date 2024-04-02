/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { RenderOptions } from "./RenderOptions";
import { renderChildren } from "./renderChildren";
import { renderNodes } from "./renderNodes";
import { INDENTATION } from "./renderIndentation";

/**
 * Render all assignedNodes or default content for slot elements.
 */
export const renderSlot = (element: HTMLSlotElement, options: RenderOptions): string => {
    const indent = options.indent || "";

    if (element?.assignedNodes().length > 0) {
        return `${indent}#contents\n${renderNodes(element?.assignedNodes(), { ...options, indent: indent + INDENTATION, withinSlot: true })}`;
    } else {
        return renderChildren(element, options);
    }
};
