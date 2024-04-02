/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { RenderOptions } from "./RenderOptions";
import { renderNodes } from "./renderNodes";

/**
 * Render all child nodes recursively of a given element or shadow root.
 */
export const renderChildren = (element: Element | ShadowRoot, options: RenderOptions): string => renderNodes(element?.childNodes || [], options);

