/**
 * @fileoverview Check whether you use absolute or relative imports with FSD
 * @author Andrei Prokofev
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

const ruleTester = new RuleTester();
ruleTester.run("imports-checker", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "fill later",
      errors: [{ messageId: "Fill me in.", type: "Me too" }],
    },
  ],
});
