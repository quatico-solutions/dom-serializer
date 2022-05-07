/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { DomSerializer } from "./DomSerializer";

export interface PluginOptions {
    edgeSpacing: string;
    min: boolean;
    spacing: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function createSerializer(options: PluginOptions): DomSerializer {
    return new DomSerializer();
}
