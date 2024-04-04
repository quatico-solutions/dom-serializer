/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { INDENTATION } from "./renderIndentation";
import { InternalRenderOptions } from "./InternalRenderOptions";

/**
 * Renders a given element string into as shadow content, either as declarative shadow root (HTML compliant)
 * or as a more readable version used by browser devtools.
 */
export const renderShadowContent = (
    element: string,
    { shadowRoots, indent }: Partial<InternalRenderOptions>
): string => {
    if (shadowRoots === "devtools") {
        return `${indent + INDENTATION}#shadowRoot\n${element}`;
    }
    return `${indent + INDENTATION}<template shadowroot="open">\n${element}\n${indent + INDENTATION}</template>`;
};
