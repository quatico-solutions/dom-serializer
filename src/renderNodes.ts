/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { InternalRenderOptions } from "./InternalRenderOptions";
import { renderNode } from "./renderNode";

export const renderNodes = (nodes: NodeListOf<Node> | Node[] | undefined, options: InternalRenderOptions): string =>
    Array.from(nodes || [])
        .map(child => renderNode(child, options))
        .filter(it => it.trim().length > 0)
        .join("\n");
