/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { RenderOptions, renderToString } from "./render";

export class DomSerializer {
    constructor(private options?: Partial<RenderOptions>) {}

    public test(value: unknown): boolean {
        return value !== null && value !== undefined && typeof (value as Node).hasChildNodes === "function";
    }
    public print(value: unknown): string {
        return renderToString(value, this.options);
    }
}
