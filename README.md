# eslint-plugin-imports-checker

Check whether you use absolute or relative imports with FSD

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-imports-checker`:

```sh
npm install eslint-plugin-imports-checker --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-imports-checker` and add `imports-checker` to the `plugins` key:

```js
import imports-checker from "eslint-plugin-imports-checker";

export default [
    {
        plugins: {
            imports-checker
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import imports-checker from "eslint-plugin-imports-checker";

export default [
    {
        plugins: {
            imports-checker
        },
        rules: {
            "imports-checker/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


