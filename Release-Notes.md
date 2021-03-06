<!--
 ---------------------------------------------------------------------------------------------
   Copyright (c) Quatico Solutions AG. All rights reserved.
   Licensed under the MIT License. See LICENSE in the project root for license information.
 ---------------------------------------------------------------------------------------------
-->

# Releases

## v0.6.0

> in development

### Shallow Rendering

- Feature :sparkles:: TBD
- Improvement :gift_heart:: TBD
- Bugfix :pill:: TBD

## v0.5.2

> 2022-07-20

### Bugfix Release

- Bugfix :pill:: Fixes the alignment of opening and closing sharp brackets for tags with multiple attributes.

## v0.5.1

> 2022-07-20

### Improved rendering options

- Feature :sparkles:: Introduce "shadowRoots" option to controls how shadow roots are rendered. Choose from HTML compliant "declarative" shadow roots (default), or "devtools" inspired options.
- Feature :sparkles:: Introduce "filterAttrs" option to filter attributes from the output. Name the attributes that should be ignored in the snapshot.
- Feature :sparkles:: Introduce "filterComments" option to remove HTML comments from the output. Defaults to true.

## v0.4.2

> 2022-05-12

### 1st public release

- Feature :sparkles:: Open-source release on GitHub.

## v0.3.1

> 2022-05-06

### Maintenance Release

- Improvement :gift_heart:: Upgrade all project dependencies to the latest versions.
- Improvement :gift_heart:: Upgrade to node 16 and jest 27.
- Improvement :gift_heart:: Replace ts-lint with es-lint.

## v0.3.0

> 2021-03-19

### Snapshot Customization

- Feature :sparkles:: Customize the DOM serializer for Jest snapshots using with various render options

## v0.2.3

> 2021-03-05

### Bugfix release

- Bugfix :pill:: Fixes an issue with duplicated text node rendering

## v0.2.2

> 2021-03-05

### Bugfix release

- Bugfix :pill:: Render void elements with self-closing tags

## v0.2.1

> 2021-03-05

### Bugfix release

- Feature :sparkles:: Improved serialization of void tags
- Improvement :gift_heart:: Custom element builder allows for more concise test setups

## v0.2.0

> 2021-01-08

### Initial release

- Feature :sparkles:: Snapshot serializer for Jest
- Feature :sparkles:: Function API `renderToString()` to render customize rendered DOM structure
