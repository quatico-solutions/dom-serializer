/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { RenderOptions } from "./RenderOptions";
import { renderNodes } from "./renderNodes";

/**
 * Render all assignedNodes or default content for slot elements.
 */
export const renderSlot = (element: HTMLSlotElement, options: RenderOptions): string => 
    element?.assignedNodes().length > 0 
        ? renderNodes(element?.assignedNodes(), options) 
        : renderNodes(element?.childNodes, options);

