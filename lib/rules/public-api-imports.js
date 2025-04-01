/**
 * @fileoverview  prevent imports not from public api in FSD architecture
 * @author dosh322
 */
"use strict";

const { isPathRelative } = require("../utils");
const path = require('path');
const micromatch = require("micromatch");

const PUBLIC_ERROR = "PUBLIC_ERROR";
const TESTING_PUBLIC_ERROR = "TESTING_PUBLIC_ERROR";

module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: " prevent imports not from public api in FSD architecture",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [{ type: "object", properties: { alias: { type: "string"}, testFilesPatterns: { type: "array" } } }], // Add a schema if the rule has options
    messages: {
      [PUBLIC_ERROR]: "Абсолютные импорты разрешены только из public API (index.ts)",
      [TESTING_PUBLIC_ERROR]: "Тестовые данные необходимо импортировать из publicApi/testing.ts"
    } // Add messageId and message
  },

  create(context) {
    const { alias = "", testFilesPatterns = [] } = context.options[0] || {};

    const availableFSDLayers = {
      'entities': 'entities',
      'features': 'features', 
      'pages': 'pages',
      'widgets': 'widgets',
    }

    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        // example app/entities/Article
        const importFrom = alias ? value.replace(`${alias}/`, "") : value;

        if (isPathRelative(importFrom)) {
          return;
        }

        const segments = importFrom.split("/");
        const layer = segments[0];
        const slice = segments[1];

        if (!availableFSDLayers[layer]) {
          return;
        }

        const isImportNotFromPublicApi = segments.length > 2;
        const isTestingPublicApi = segments[2] === "testing" && segments.length < 4;

        if (isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report({
            node,
            messageId: PUBLIC_ERROR,
            fix: function(fixer) {
              return fixer.replaceText(node.source, `"${alias}/${layer}/${slice}"`)
            },
          });
        }

        if(isTestingPublicApi) {
          const currentFilePath = context.getFilename();
          const normalizedPath = path.toNamespacedPath(currentFilePath).replace(/\\/g, '/');

          const isCurrentFileTesting = testFilesPatterns.some(
              pattern => micromatch.isMatch(normalizedPath, pattern)
          )

          if(!isCurrentFileTesting) {
            context.report({
              node,
              messageId: TESTING_PUBLIC_ERROR,
             });
          }
        }
      }
    };
  },
};
