<!--
 ---------------------------------------------------------------------------------------------
   Copyright (c) Quatico Solutions AG. All rights reserved.
   Licensed under the MIT License. See LICENSE in the project root for license information.
 ---------------------------------------------------------------------------------------------
-->
<!-- markdownlint-disable MD024 -->

# Releases

Release notes follow the [keep a changelog](https://keepachangelog.com/en/1.0.0/) format.

## [Unreleased]

### Changed

- Feature :sparkles:: TBD
- Improvement :gift_heart:: TBD
- Bugfix :pill:: TBD

## [0.6.2] - 2024-05-29

Bugfix release to address installation issues with preinstall scripts.

### Fixed

- Bugfix :pill:: Fixes an issue where clients could not install the package with yarn or npm.

### Changed

- Upgrades all package dependencies to the latest versions

## [0.6.1] - 2024-04-13

Bugfix release to address installation issues with engine requirements.

### Fixed

- Bugfix :pill:: Fixes an issues where installing the package would fail due to unmet engine requirements.

## [0.6.0] - 2024-04-04

Rendering of slotted content within slots.

### Added

- Feature :sparkles:: Provides new options to render slotted content within slots.

## [0.5.2] - 2022-07-20

Bugfix release to address rendering issues with sharp brackets.

### Fixed

- Bugfix :pill:: Fixes the alignment of opening and closing sharp brackets for tags with multiple attributes.

## [0.5.1] - 2022-07-20

Improved rendering options for shadow roots.

### Added

- Feature :sparkles:: Introduce "shadowRoots" option to controls how shadow roots are rendered. Choose from HTML compliant "declarative" shadow roots (default), or "devtools" inspired options.
- Feature :sparkles:: Introduce "filterAttrs" option to filter attributes from the output. Name the attributes that should be ignored in the snapshot.
- Feature :sparkles:: Introduce "filterComments" option to remove HTML comments from the output. Defaults to true.

## [0.4.2] - 2022-05-12

1st public release on GitHub.

### Added

- Feature :sparkles:: Open-source release on GitHub.

## [0.3.1] - 2022-05-06

Maintenance Release with dependency upgrades.

### Changed

- Improvement :gift_heart:: Upgrade all project dependencies to the latest versions.
- Improvement :gift_heart:: Upgrade to node 16 and jest 27.
- Improvement :gift_heart:: Replace ts-lint with es-lint.

## [0.3.0] - 2021-03-19

Snapshot Customization

### Added

- Feature :sparkles:: Customize the DOM serializer for Jest snapshots using with various render options

## [0.2.3] - 2021-03-05

Bugfix release to address rendering issues with text nodes.

### Fixed

- Bugfix :pill:: Fixes an issue with duplicated text node rendering
  
## [0.2.2] - 2021-03-05

Bugfix release to address rendering issues with void elements.

### Fixed

- Bugfix :pill:: Render void elements with self-closing tags

## [0.2.1] - 2021-03-05

Maintenance release with improved serialization.

### Changed

- Feature :sparkles:: Improved serialization of void tags
- Improvement :gift_heart:: Custom element builder allows for more concise test setups

## [0.2.0] - 2021-01-08

Initial release with Jest snapshot serializer.

### Added

- Feature :sparkles:: Snapshot serializer for Jest
- Feature :sparkles:: Function API `renderToString()` to render customize rendered DOM structure
