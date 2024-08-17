/*
 * ---------------------------------------------------------------------------------------------
 *   Copyright (c) Quatico Solutions AG. All rights reserved.
 *   Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------------
 */
import { create } from "./custom-element";
import { renderNode } from "./renderNode";
import { renderElement } from "./renderElement";

jest.mock("./renderElement");

describe("renderNode", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls renderElement with HTML element", () => {
        const target = create("div").root();

        renderNode(target, { indent: "" } as any);

        expect(renderElement).toHaveBeenCalledWith(target, { indent: "", root: false });
    });

    it("should not call renderElement with text content", () => {
        const target = document.createTextNode("target");

        renderNode(target, { indent: "" } as any);

        expect(renderElement).not.toHaveBeenCalled();
    });

    it("yields HTML value from renderNode with HTML element", () => {
        const target = create("div").root();
        (renderElement as jest.Mock).mockReturnValue("EXPECTED");

        const actual = renderNode(target, { indent: "" } as any);

        expect(actual).toBe("EXPECTED");
    });

    it("yields text value with text content", () => {
        const target = document.createTextNode("target");

        const actual = renderNode(target, { indent: "" } as any);

        expect(actual).toBe("target");
    });
});
