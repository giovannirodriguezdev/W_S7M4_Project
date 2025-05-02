import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import i18n from '../i18n/index.json'

const en = i18n.en;
const esp = i18n.esp;

describe('Module 4 Project Tests', () => {
  describe('English Language', () => {
    beforeEach(() => {
      render(<App lang='en' />);
    });
    /*
      👉 TASK 1

      One test is done for you as an example.
    */
    test(`TEXT_HEADING_CREATE_ACCOUNT is visible`, () => {
      expect(screen.getByText(en.TEXT_HEADING_CREATE_ACCOUNT)).toBeVisible()
    })

    test(`LABEL_USERNAME is visible`, () => {
      expect(screen.getByLabelText(en.LABEL_USERNAME)).toBeVisible()
    })

    test(`PLACEHOLDER_USERNAME is visible`, () => {
      expect(screen.getByPlaceholderText(en.PLACEHOLDER_USERNAME)).toBeVisible()
    })

    test(`TEXT_FAV_LANG is visible`, () => {
      expect(screen.getByText(en.TEXT_FAV_LANG)).toBeVisible()
    })

    test(`TEXT_FAV_LANG_JS is visible`, () => {
      expect(screen.getByText(en.TEXT_FAV_LANG_JS)).toBeVisible()
    })

    test(`TEXT_FAV_LANG_RUST is visible`, () => {
      expect(screen.getByText(en.TEXT_FAV_LANG_RUST)).toBeVisible()
    })

    test(`LABEL_FAV_FOOD is visible`, () => {
      expect(screen.getByLabelText(en.LABEL_FAV_FOOD)).toBeVisible()
    })

    test(`TEXT_OPT_FAV_FOOD_1 is visible`, () => {
      expect(screen.getByText(en.TEXT_OPT_FAV_FOOD_1)).toBeVisible()
    })

    test(`TEXT_OPT_FAV_FOOD_2 is visible`, () => {
      expect(screen.getByText(en.TEXT_OPT_FAV_FOOD_2)).toBeVisible()
    })

    test(`TEXT_OPT_FAV_FOOD_3 is visible`, () => {
      expect(screen.getByText(en.TEXT_OPT_FAV_FOOD_3)).toBeVisible()
    })

    test(`TEXT_OPT_FAV_FOOD_4 is visible`, () => {
      expect(screen.getByText(en.TEXT_OPT_FAV_FOOD_4)).toBeVisible()
    })

    test(`LABEL_ACCEPT_TERMS is visible`, () => {
      expect(screen.getByLabelText(en.LABEL_ACCEPT_TERMS)).toBeVisible()
    })

    test(`TEXT_SUBMIT is visible`, () => {
      expect(screen.getByDisplayValue(en.TEXT_SUBMIT)).toBeVisible()
    })
  })

  describe('Spanish Language', () => {
    beforeEach(() => {
      render(<App lang='esp' />);
    });

    test(`TEXT_HEADING_CREATE_ACCOUNT is visible`, () => {
      expect(screen.getByText(esp.TEXT_HEADING_CREATE_ACCOUNT)).toBeVisible();
    });

    test(`LABEL_USERNAME is visible`, () => {
      expect(screen.getByLabelText(esp.LABEL_USERNAME)).toBeVisible();
    });

    test(`PLACEHOLDER_USERNAME is visible`, () => {
      expect(screen.getByPlaceholderText(esp.PLACEHOLDER_USERNAME)).toBeVisible();
    });

    test(`TEXT_FAV_LANG is visible`, () => {
      expect(screen.getByText(esp.TEXT_FAV_LANG)).toBeVisible();
    });

    test(`TEXT_FAV_LANG_JS is visible`, () => {
      expect(screen.getByText(esp.TEXT_FAV_LANG_JS)).toBeVisible();
    });

    test(`TEXT_FAV_LANG_RUST is visible`, () => {
      expect(screen.getByText(esp.TEXT_FAV_LANG_RUST)).toBeVisible();
    });

    test(`LABEL_FAV_FOOD is visible`, () => {
      expect(screen.getByLabelText(esp.LABEL_FAV_FOOD)).toBeVisible();
    });

    test(`TEXT_OPT_FAV_FOOD_1 is visible`, () => {
      expect(screen.getByText(esp.TEXT_OPT_FAV_FOOD_1)).toBeVisible();
    });

    test(`TEXT_OPT_FAV_FOOD_2 is visible`, () => {
      expect(screen.getByText(esp.TEXT_OPT_FAV_FOOD_2)).toBeVisible();
    });

    test(`TEXT_OPT_FAV_FOOD_3 is visible`, () => {
      expect(screen.getByText(esp.TEXT_OPT_FAV_FOOD_3)).toBeVisible();
    });

    test(`TEXT_OPT_FAV_FOOD_4 is visible`, () => {
      expect(screen.getByText(esp.TEXT_OPT_FAV_FOOD_4)).toBeVisible();
    });

    test(`LABEL_ACCEPT_TERMS is visible`, () => {
      expect(screen.getByLabelText(esp.LABEL_ACCEPT_TERMS)).toBeVisible();
    });

    test(`TEXT_SUBMIT is visible`, () => {
      expect(screen.getByDisplayValue(esp.TEXT_SUBMIT)).toBeVisible();
    });
    /*
      👉 TASK 3

      This is done after making the UI multilingual.
    */
  });
  
  describe('getEntriesByKeyPrefix', () => {
    const testObject = {
      abc_1: 'data_abc_1',
      abc_2: 'data_abc_2',
      xyz_1: 'data_xyz_1',
      abc_3: 'data_abc_3',
    };

    test('should return correct entries for prefix "abc"', () => {
      const result = getEntriesByKeyPrefix(testObject, 'abc');
      expect(result).toEqual([
        ['abc_1', 'data_abc_1'],
        ['abc_2', 'data_abc_2'],
        ['abc_3', 'data_abc_3'],
      ]);
    });

    test('should return correct entries for prefix "xyz"', () => {
      const result = getEntriesByKeyPrefix(testObject, 'xyz');
      expect(result).toEqual([['xyz_1', 'data_xyz_1']]);
    });

    test('should return an empty array for a non-matching prefix', () => {
      const result = getEntriesByKeyPrefix(testObject, 'foo');
      expect(result).toEqual([]);
    });

    test('should handle an empty object', () => {
      const result = getEntriesByKeyPrefix({}, 'abc');
      expect(result).toEqual([]);
    });

    test('should handle a prefix that is a substring of other prefixes but not followed by underscore', () => {
      const testObjectWithSimilarPrefix = {
        ab: 'data_ab',
        abc_1: 'data_abc_1',
      };
      const result = getEntriesByKeyPrefix(testObjectWithSimilarPrefix, 'ab');
      expect(result).toEqual([['abc_1', 'data_abc_1']]);
    });

    
  });

});

function getEntriesByKeyPrefix(obj, keyPrefix) {
  const entries = [];
  for (const key in obj) {
    if (key.startsWith(keyPrefix + '_')) {
      entries.push([key, obj[key]]);
    }
  }
  return entries;
}

    /*
      👉 TASK 4 part 2

      Implement the function `getEntriesByKeyPrefix` below
      and then come back here and write a few tests
      to ensure it works as expected.

      Although it should be noted that commonly,
      the tests are written _before_ implementing
      the function being tested.
    */
    
  


  /*
    👉 TASK 4 part 1

    Implement a function that takes as first argument an object `obj` such as this:

    {
      abc_1: "data_abc_1",
      abc_2: "data_abc_2",
      xyz_1: "data_xyz_1",
      abc_3: "data_abc_3",
    }

    and takes as second argument a string `keyPrefix` such as this: "abc"

    and returns an array of arrays such as this (for the arguments given in the examples above):

    [
      ["abc_1", "data_abc_1"],
      ["abc_2", "data_abc_2"],
      ["abc_3", "data_abc_3"],
    ]

    If the function is passed the same `obj` as above but a `keyPrefix` of "xyz" then it would return:

    [
      ["xyz_1", "data_xyz_1"],
    ]

    If the function is passed the same `obj` as above but a `keyPrefix` of "foo" then it would return the empty array.

    The function looks inside the object `obj`, finds all properties whose property names begin
    with the `keyPrefix` given (followed by an underscore), and reorganizes the information before returning it.
    The properties that match the `keyPrefix` are returned inside an array holding key-value-pair sub-arrays.

  */
