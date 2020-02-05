# babel-plugin-webpack-async-module-name

> This plugin use custom identifier to named webpack dynamic import modules, supports single or multiple modules.

## Installation

```shell
npm i -D babel-plugin-webpack-async-module-name
```

## Usage

Add the plugin to [babelrc](https://babeljs.io/docs/usage/babelrc/):

```json
{
  "plugins": ["webpack-async-module-name"]
}
```

Use in code:

```javascript
importName("./src/a.js");

importName("./src/a.js", { chunkName: "module-a" });

importName("./src/a.js", {
  chunkName: "module-a",
  preload: true,
  include: /\.json$/,
  exclude: /\.noimport\.json$/,
  mode: "lazy",
  prefetch: true,
  ignore: true
});
```

It will be transformed to:

```javascript
import("./src/a.js");

import(/*webpackChunkName: 'module-a'*/ "./src/a.js");

import(/*webpackChunkName: 'module-a', webpackPreload: true*/ "./src/a.js");
```

## License

[MIT](https://opensource.org/licenses/mit-license.php)
