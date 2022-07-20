/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { isVoidTag } from "./isVoidTag";
import { renderAttributes } from "./renderAttributes";
import { renderChildren } from "./renderChildren";
import { INDENTATION } from "./renderIndentation";
import { RenderOptions } from "./RenderOptions";
import { renderShadowContent } from "./renderShadowContent";

/**
 * Renders a given element into a string value, including its shadow DOM, if configured.
 */
export const renderElement = (element: Element, options: RenderOptions): string => {
    const { indent, shadowDepth, filterTags, shallow } = options;
    const tagName = element.nodeName.toLowerCase() || "";

    if ((filterTags || []).includes(tagName)) {
        return "";
    }

    if (shallow === true && isReactComponent(element)) {
        const { props, name } = getReactPropNames(element);
        return `${indent}{ ${name} = { props: ${JSON.stringify(props)} } }`;
    }

    let shadowContent = "";
    let childContent = "";
    const attributes = renderAttributes(element, options);

    if (shadowDepth > 0 && element.shadowRoot && element.shadowRoot.hasChildNodes() && options.shadow !== false) {
        shadowContent = renderShadowContent(
            renderChildren(element.shadowRoot, {
                ...options,
                indent: indent + INDENTATION + INDENTATION,
                shadowDepth: shadowDepth - 1,
            }),
            options
        );
    }

    if (element.hasChildNodes()) {
        childContent = renderChildren(element, {
            ...options,
            indent: indent + INDENTATION,
            shadowDepth: shadowDepth - 1,
        });
    }

    if (isVoidTag(tagName)) {
        return `${indent}<${tagName}${attributes ? " " + attributes : ""} />`;
    }
    return (
        `${indent}<${tagName}${attributes ? " " + attributes : ""}>` +
        (shadowContent.length > 0 || childContent.length > 0 ? "\n" : "") +
        shadowContent +
        (shadowContent.length > 0 && childContent.length > 0 ? "\n" : "") +
        childContent +
        (shadowContent.length > 0 || childContent.length > 0 ? "\n" + indent : "") +
        `</${tagName}>`
    );
};

type ShallowComponent = {
    props: any;
    name: string;
};

const isReactComponent = (element: Element): boolean =>
    Object.keys(element).some(key => key.startsWith("__reactProps"));

const getReactPropNames = (element: Element): ShallowComponent => {
    const propName = Object.keys(element).find(key => key.startsWith("__reactFiber"));
    // @ts-ignore
    const props = (element as any)[propName]._debugOwner.memoizedProps;
    // @ts-ignore
    const name = (element as any)[propName]._debugOwner.elementType?.name;

    return { props, name };
};
