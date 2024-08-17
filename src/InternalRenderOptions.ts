/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */

import { RenderOptions } from "./RenderOptions";

export interface InternalRenderOptions extends RenderOptions {
    parentSlot?: HTMLSlotElement;
    root?: boolean;
}
