import React from 'react';
import { mount } from 'enzyme';
import Validate from './Validate';
import Validator from './Validator';

const patterns = [ /[A-Z]/, /[0-9]/ ];
const validValue = 'Valid1';
const invalidValue = 'invalid';
const errorValidator = 'Error Validator';
const errorValidate1 = 'Error Validate 1';
const errorValidate2 = 'Error Validate 2';

const handleSubmit = (e, getUpdatedValidation, cbValidator) => {
  cbValidator(getUpdatedValidation());
};

const render = ({
  value1,
  value2,
  cbValidator = () => {},
  cbValidate1 = () => null,
  cbValidate2 = () => null,
} = {}) =>
  mount(
    <Validator requiredError={ errorValidator }>
      { (getUpdatedValidation, error) => (
        <form onSubmit={ (e) => handleSubmit(e, getUpdatedValidation, cbValidator) }>
          <Validate
              error={ () => errorValidate1 }
              patterns={ patterns }
              required
              value={ value1 }>{ cbValidate1 }</Validate>
          <Validate
              error={ () => errorValidate2 }
              patterns={ patterns }
              required
              value={ value2 }>{ cbValidate2 }</Validate>
          <p>{ error }</p>
        </form>
      ) }
    </Validator>
  );

describe('Validation', () => {
  describe('Validator', () => {
    describe('getUpdatedValidation', () => {
      test('unmet validations', () => {
        render({
          cbValidator: (isValid) => expect(isValid).toBe(false),
        }).find('form').simulate('submit');
      });

      test('met validations', () => {
        render({
          value1: validValue,
          value2: validValue,
          cbValidator: (isValid) => expect(isValid).toBe(true),
        }).find('form').simulate('submit');
      });
    });

    describe('validationError', () => {
      test('without submission', () => {
        const component = render({
          value1: invalidValue,
          value2: invalidValue,
        });
        component.update();
        expect(component.find('p').at(0).prop('children')).toBe(null);
      });

      test('unmet required validation', () => {
        const component = render();
        component.find('form').simulate('submit');
        component.update();
        expect(component.find('p').at(0).prop('children')).toBe(errorValidator);
      });

      test('unmet first pattern validation', () => {
        const component = render({
          value1: invalidValue,
          value2: invalidValue,
        });
        component.find('form').simulate('submit');
        component.update();
        expect(component.find('p').at(0).prop('children')).toBe(errorValidate1);
      });

      test('unmet second pattern validation', () => {
        const component = render({
          value1: validValue,
          value2: invalidValue,
        });
        component.find('form').simulate('submit');
        component.update();
        expect(component.find('p').at(0).prop('children')).toBe(errorValidate2);
      });

      test('met validations', () => {
        const component = render({
          value1: validValue,
          value2: validValue,
        });
        component.update();
        expect(component.find('p').at(0).prop('children')).toBe(null);
      });
    });
  });

  describe('Validate', () => {
    describe('getValidity', () => {
      test('unmet required validation', () => {
        let isValid1;
        let isValid2;
        const component = render({
          cbValidate1: (isValid) => isValid1 = isValid,
          cbValidate2: (isValid) => isValid2 = isValid,
        });
        component.find('form').simulate('submit');
        component.update();

        expect(isValid1).toBe(false);
        expect(isValid2).toBe(false);
      });

      test('unmet previous pattern validation', () => {
        let isValid1;
        let isValid2;
        const component = render({
          value1: invalidValue,
          value2: invalidValue,
          cbValidate1: (isValid) => isValid1 = isValid,
          cbValidate2: (isValid) => isValid2 = isValid,
        });
        component.find('form').simulate('submit');
        component.update();

        expect(isValid1).toBe(false);
        expect(isValid2).toBe(true);
      });

      test('met previous pattern validation', () => {
        let isValid1;
        let isValid2;
        const component = render({
          value1: validValue,
          value2: invalidValue,
          cbValidate1: (isValid) => isValid1 = isValid,
          cbValidate2: (isValid) => isValid2 = isValid,
        });
        component.find('form').simulate('submit');
        component.update();

        expect(isValid1).toBe(true);
        expect(isValid2).toBe(false);
      });

      test('met validation', () => {
        let isValid1;
        let isValid2;
        const component = render({
          value1: validValue,
          value2: validValue,
          cbValidate1: (isValid) => isValid1 = isValid,
          cbValidate2: (isValid) => isValid2 = isValid,
        });
        component.find('form').simulate('submit');
        component.update();

        expect(isValid1).toBe(true);
        expect(isValid2).toBe(true);
      });
    });

    test('hasMetRequired', () => {
      let hasMetRequired1;
      let hasMetRequired2;
      const component = render({
        value1: validValue,
        cbValidate1: (_, hasMetRequired) => hasMetRequired1 = hasMetRequired,
        cbValidate2: (_, hasMetRequired) => hasMetRequired2 = hasMetRequired,
      });
      component.find('form').simulate('submit');
      component.update();

      expect(hasMetRequired1).toBe(true);
      expect(hasMetRequired2).toBe(false);
    });

    test('checkPatternMet', () => {
      let hasMetPattern1;
      let hasMetPattern2;
      const component = render({
        value1: validValue,
        value2: invalidValue,
        cbValidate1: (_1, _2, checkPatternMet) => hasMetPattern1 = checkPatternMet(patterns[0]),
        cbValidate2: (_1, _2, checkPatternMet) => hasMetPattern2 = checkPatternMet(patterns[0]),
      });
      component.find('form').simulate('submit');
      component.update();

      expect(hasMetPattern1).toBe(true);
      expect(hasMetPattern2).toBe(false);
    });
  });
});
