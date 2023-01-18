import { render } from "@testing-library/react";
import { renderToString } from "../src/renderToString";
import { HelloWorld } from "./components/HelloWorld";
import { QsPatternComponent } from "./components/QsPatternComponent";

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

    it("renders with webbloqs component", () => {
        const { container } = render(<QsPatternComponent></QsPatternComponent>);

        const actual = renderToString(container, { shallow: true });

        expect(actual).toMatchInlineSnapshot(`
            "<wb-stack>
                { HelloWorld = { props: {\\"name\\":\\"John Doe\\"} } }
            </wb-stack>"
        `);
    });
});
