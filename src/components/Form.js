import { useState, useEffect } from "react";
import styled from "styled-components";

import FormFieldText from "./formFields/Text";

const fieldsTypeMap = {
  text: FormFieldText,
};

export default function Form({ fields, submitBtn, submitHandler }) {
  return (
    <StyledForm onSubmit={onSubmitHandler}>
      {fields.map((field) => {
        const Component = fieldsTypeMap[field.type];

        field.onUpdate = (value, setValue) => {
          field.value = value;
          field.setValue = setValue;
        };

        return (
          <div key={field.name} className="form-group">
            <Component {...field} />
          </div>
        );
      })}

      <button>{submitBtn.label}</button>
    </StyledForm>
  );

  function onSubmitHandler(e) {
    e.preventDefault();

    const handlerAllowedActions = {
      resetFields,
    };

    submitHandler(getValues(), handlerAllowedActions);
  }

  function getValues() {
    const values = {};

    fields.forEach((field) => {
      values[field.name] = field.value;
    });

    return values;
  }

  function resetFields() {
    fields.forEach((field) => {
      const value = field.defaultValue || "";
      field.setValue(value);
    });
  }
}

const StyledForm = styled.form`
  padding: 1em;
  display: flex;

  input,
  button {
    padding: 1em;
    border: none;
    font-family: inherit;
  }

  button {
    background-color: #0f08;
    color: #fffc;
  }
`;
