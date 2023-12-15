# Carbon14 Node

[![npm version](https://badge.fury.io/js/carbon14-node.svg)](https://www.npmjs.com/package/carbon14-node)

Carbon14 Node is a Node.js module for [Carbon14](https://www.carbon14.com/) web page analysis.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install carbon14-node
```

## usage

After Installing as a dependancy you can use this package like below

```

const analyze = require('carbon14-node');

analyze(
 'https://www.hindustantimes.com'
)
 .then((result) => console.log('Shahid', result))
 .catch((error) => console.error(error));


```

## API

`run(): Promise<void>`
Starts the analysis process. Returns a Promise that resolves when the analysis is completed.

## Contribution

We welcome contributions! To contribute to Carbon14 Node, follow these steps:

1.Fork the repository.
2.Create a new branch for your feature or bug fix: git checkout -b feature/your-feature or git checkout -b bugfix/your-bugfix.
3.Make your changes and commit them with a descriptive commit message.
4.Push your branch to your fork: git push origin feature/your-feature.
5. Open a pull request to the main branch of the original repository.

## License

Carbon14 Node is licensed under the [GNU General Public License v3.0](./LICENSE).
