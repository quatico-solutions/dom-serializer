/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { INDENTATION } from "./renderIndentation";
import { InternalRenderOptions } from "./InternalRenderOptions";

type AttributeOptions = {
    childIndent?: boolean;
    diffable?: boolean;
    firstAttribute?: boolean;
    indent: string;
    lastAttribute?: boolean;
    multiLine?: boolean;
};

export const renderAttributes = (element: Element, { diffable, indent, filterAttrs }: InternalRenderOptions) => {
    const multiLine = element.attributes?.length > 1;
    if (element.attributes && element.attributes.length > 0) {
        return (
            renderIndent({ diffable, indent, multiLine, childIndent: true, firstAttribute: true }) +
            Array.from(element.attributes)
                .filter(
                    (cur: Attr) => cur.name && (!filterAttrs || filterAttrs?.includes(cur.name.toLowerCase()) === false)
                )
                .sort((a: Attr, b: Attr) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                .map((attr: Attr) => `${attr.name}="${attr.value}"`)
                .join(renderIndent({ diffable, indent, multiLine, childIndent: true })) +
            renderIndent({ diffable, indent, multiLine, lastAttribute: true })
        );
    }
    return "";
};

const renderIndent = ({
    childIndent,
    diffable,
    firstAttribute,
    indent,
    lastAttribute,
    multiLine,
}: AttributeOptions) => {
    const lineBreak = multiLine ? "\n" : "";
    let space = "";
    if (multiLine) {
        space = childIndent ? indent + INDENTATION : firstAttribute ? "" : indent;
    }
    const result = diffable ? lineBreak + space : firstAttribute || lastAttribute ? "" : " ";

    return lastAttribute && !multiLine ? result.trim() : result;
};
