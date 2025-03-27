"use strict";

const path = require('path');

module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "feature sliced relative path checker",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [{ type: "object", properties: { alias: { type: "string"} } }], // Add a schema if the rule has options
    messages: {
      wrongImport: "В рамках одного слайса все пути должны быть относительными"
    }
  },

  create(context) {
    const alias = context.options[0]?.alias ?? 0;

    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        // example app/entities/Article
        const importFrom = alias ? value.replace(`${alias}/`, "") : value;

        // example C:\Users\tim\Desktop\javascript\production_project\src\entities\Article
        const currentFileName = context.getFilename();

        if(shouldBeRelative(importFrom, currentFileName)) {
          context.report({node, messageId: "wrongImport"});
        }
      }
    };
  },
};

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

const layers = {
  'entities': 'entities',
  'features': 'features',
  'shared': 'shared',
  'pages': 'pages',
  'widgets': 'widgets',
}

function shouldBeRelative(from, to) {
  const normalizedPath = path.toNamespacedPath(to);
  const projectTo = normalizedPath.split('src')[1];

  if(isPathRelative(from) || !projectTo) {
    return false;
  }

  // example entities/Article
  const fromArray = from.split('/');
  const fromLayer = fromArray[0]; // entities
  const fromSlice = fromArray[1]; // Article

  if(!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }
  
  const toArray = projectTo.split('\\')

  const toLayer = toArray[1];
  const toSlice = toArray[2];

  if(!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  return fromSlice === toSlice && toLayer === fromLayer;
}

// console.log(shouldBeRelative('entities/Article/fasfasfas', 'C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article'))
// console.log(shouldBeRelative('entities/ASdasd/fasfasfas', 'C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article'))
// console.log(shouldBeRelative('features/Article/fasfasfas', 'C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article'))
// console.log(shouldBeRelative('features/Article/fasfasfas', 'C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\features\\Article'))
// console.log(shouldBeRelative('app/index.tsx', 'C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article'))
// console.log(shouldBeRelative('entities/Article/asfasf/asfasf', 'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article'))
// console.log(shouldBeRelative('../../model/selectors/getSidebarItems', 'C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article'))

