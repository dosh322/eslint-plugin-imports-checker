/**
 * @fileoverview feature sliced relative imports checker
 * @author dosh322
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/imports-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("imports-checker", rule, {
  valid: [
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\Article\\ui\\Article.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ message: "В рамках одного слайса все пути должны быть относительными"}],
      output: "import { addCommentFormActions, addCommentFormReducer } from \"../model/slices/addCommentFormSlice\"",
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\Article\\ui\\Article.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
      output: "import { addCommentFormActions, addCommentFormReducer } from \"../model/slices/addCommentFormSlice\"",
      errors: [{ message: "В рамках одного слайса все пути должны быть относительными"}],
    },
  ],
});
