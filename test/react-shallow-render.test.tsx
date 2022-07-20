import { render } from "@testing-library/react";
import { renderToString } from "../src/renderToString";
import { HelloWorld } from "./components/HelloWorld";

describe("renderToString()", () => {
    it("renders with simple component", () => {
        const { container } = render(<HelloWorld name="John Doe"></HelloWorld>);

        const actual = renderToString(container, { shallow: true });

        expect(actual).toMatchInlineSnapshot(`
            "<div>
                { HelloWorld = { props: {\\"name\\":\\"John Doe\\"} } }
            </div>"
        `);
    });
});
