/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { INDENTATION } from "./renderIndentation";
import { RenderOptions } from "./RenderOptions";

export const renderAttributes = (element: Element, { diffable, indent, filterAttrs }: RenderOptions) => {
    if (element.attributes && element.attributes.length > 0) {
        return (
            renderIndent(diffable, indent, true) +
            Array.from(element.attributes)
                .filter(
                    (cur: Attr) => cur.name && (!filterAttrs || filterAttrs?.includes(cur.name.toLowerCase()) === false)
                )
                .sort((a: Attr, b: Attr) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                .map((attr: Attr) => `${attr.name}="${attr.value}"`)
                .join(renderIndent(diffable, indent, true)) +
            renderIndent(diffable, indent).trim()
        );
    }
    return "";
};

const renderIndent = (diffable: boolean, indent: string, childLevel = false) => {
    const space = childLevel ? indent + INDENTATION : indent;
    return diffable ? `\n${space}` : "";
};
