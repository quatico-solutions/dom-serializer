/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
/**
 * Options object to customize the rendering of the DOM structure.
 */
export interface RenderOptions {
    /**
     * Initial indent string for resulting structure. Child levels are indented
     * by 4 spaces; defaults to empty string.
     */
    indent: string;

    /**
     * Controls how shadow roots are rendered. Defaults to "declarative".
     */
    shadowRoots: "declarative" | "devtools";

    /**
     * Number of showRoots to be rendered; defaults to infinity.
     */
    shadowDepth: number;

    /**
     * Boolean to enable/disable the rendering of shadow DOM contents; defaults
     * to true.
     */
    shadow?: boolean;

    /**
     * Controls how slotted content is rendered. "reveal-contents" shows it as
     * referenced child to the slot element as well as in its original position.
     * "map-contents" moves it into the slot element. Defaults to "ignore", which
     * leaves slotted content in its original position.
     */
    slottedContent?: "reveal-contents" | "map-contents" | "ignore";

    /**
     * Boolean to add extra line breaks for better comparablity; defaults to true.
     */
    diffable: boolean;

    /**
     * Array of lowercase tag names that are filtered out of the snapshot; defaults to ["style", "script"].
     */
    filterTags?: string[];

    /**
     * Flag to filter comment out of the snapshot; defaults to false.
     */
    filterComments?: boolean;

    /**
     * Array of lowercase attributes names that are filtered out of the snapshot; defaults to [].
     */
    filterAttrs?: string[];

    parentSlot?: HTMLSlotElement;
}
