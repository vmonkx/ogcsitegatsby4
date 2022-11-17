import React, { forwardRef, Fragment } from "react";
import { useField } from "formik";

import {
  InputStyled,
  LabelStyled,
  InputErrorStyled,
  InputWrapperStyled,
} from "./Styled/InputStyled";

const InputField = forwardRef((props, ref) => {
  const [field, { error, touched }] = useField(props);


  

  return props.service ? (
    <InputWrapperStyled internal>
      <LabelStyled htmlFor={field.name}>{props.label}</LabelStyled>
      {error ? <InputErrorStyled>{error}</InputErrorStyled> : null}
      <InputStyled {...field} id={field.name} {...props} />
    </InputWrapperStyled>
  ) : (
    <Fragment>
      <InputWrapperStyled error={error && touched}>
        <LabelStyled htmlFor={field.name}>{props.label}</LabelStyled>
        {error ? <InputErrorStyled>{error}</InputErrorStyled> : null}
        <InputStyled ref={ref} {...field} id={field.name} {...props} />
      </InputWrapperStyled>
    </Fragment>
  );
});

export default InputField;
