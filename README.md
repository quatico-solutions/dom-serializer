<!--
 ---------------------------------------------------------------------------------------------
   Copyright (c) Quatico Solutions AG. All rights reserved.
   Licensed under the MIT License. See LICENSE in the project root for license information.
 ---------------------------------------------------------------------------------------------
-->

# @quatico/dom-serializer

[![Node.js Package](https://github.com/quatico-solutions/dom-serializer/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/quatico-solutions/dom-serializer/actions/workflows/npm-publish.yml)

A markup serializer that renders the complete DOM structure, including shadow DOM, into a string. The library can be used as:

1. a snapshot serializer for [Jest](https://jestjs.io),
2. an imported `renderToString()` function,
3. an HTML element to show the DOM structure of an element.

## Install

Add the `@quatico/dom-serializer` as (dev-) dependency to your project

```sh
yarn add -D @quatico/dom-serializer
```

## Jest Serializer

You can use the library as serializer for your Jest snapshot tests.
Add it to `snapshotSerializers` in your `jest.config.js`:

```javascript
// jest.config.js
module.exports = {
    /* ... */
    snapshotSerializers: ["@quatico/dom-serializer/bin/serializer"],
}
```

Call `toMatchSnapshot()` or `toMatchInlineSnapshot()` in your Jest tests to create/compare the snapshot:

```javascript
describe("my-element", () => {
    it(`shows markup with default properties`, async () => {
        const el: HTMLElement = ...;

        expect(el).toMatchSnapshot();
    });
    ...
```

## Customize the snapshot

You can use the package as library. Create a script file of the following structure
and import the `DomSerializer` with a `module.exports` statement:

```javascript
// ./tests/customSnapshotSerializer.ts

import { DomSerializer } from "@quatico/dom-serializer";

module.exports = new DomSerializer({ filterTags: ["script"] });
```

Add your `customSnapshotSerializer.ts` to your jest.config.js:

```javascript
// jest.config.js
module.exports = {
    /* ... */
    snapshotSerializers: ["./tests/customSnapshotSerializer.ts"],
}
```

The class DomSerializer provides the following `RenderOptions` to customize the snapshot:

- `indent`: Initial indent string for resulting structure; defaults to empty string. Child levels are indented by 4 spaces.
- `shadowDepth`: Number of showRoots to be rendered; defaults to infinity
- `shadow`: Boolean to enable/disable the rendering of shadow DOM contents; defaults to true
- `diffable`: Boolean to add extra line breaks for better comparability; defaults to true
- `filterTags`: Array of lowercase tag names that are filtered out of the snapshot; defaults to ["style", "script"]

## Render a DOM structure as string

You can also use the library to render a DOM structure into a string:

```javascript
import { renderToString } from "@quatico/dom-serializer";

const htmlElement = ...;

const string = renderToString(htmlElement, { diffable: false, shadow: true, shadowDepth: 1, filterTag: ["script"] });
```

Here the same `RenderOptions` as for the `DomSerializer` can be used to customize the resulting string.

## Render the DOM structure into an React component

Using the library can easily create an [React](https://reactjs.org/) component that shows the DOM structure of a provided element, e.g., in [Storybook](https://storybook.js.org/):

```javascript
import { renderToString } from "@quatico/dom-serializer";
import { Source } from "@storybook/components";
import * as React from "react";
import { useEffect, useRef, useState } from "react";


export const DomMarkup = ({ children, shadow, shadowDepth = 1, diffable = false }: any) => {
    const domRef = useRef<HTMLDivElement>(null);
    const [markup, setMarkup] = useState("");
    useEffect(() => {
        const host = domRef.current;
        setMarkup(
            host?.firstElementChild ? renderToString(host.firstElementChild, { diffable, shadow, shadowDepth }) : ""
        );
    });
    return (
        <div>
            <div ref={domRef} style={{ display: "none" }} className={"dom-markup__dom-container"}>
                {children}
            </div>
            <div className={"dom-markup__markup-container"}>
                <Source language={"html"} format={false} code={markup} />
            </div>
        </div>
    );
};
```
