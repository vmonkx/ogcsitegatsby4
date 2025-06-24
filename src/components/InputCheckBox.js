import React, { Fragment } from "react"
import { useField } from "formik"

import { InputErrorStyled } from "./Styled/InputStyled"
import {
  CheckBoxContainer,
  CheckBoxWrapper,
} from "./Styled/CheckBoxStyled"

import CheckBox from "./CheckBox"

function InputCheckBox(props) {
  
  const [field, { error, touched }] = useField(props)
  
  return (
    <Fragment>
      <CheckBoxContainer error={error && touched}>
        <CheckBoxWrapper>
          <CheckBox label={props.label} {...props} {...field}/>
        </CheckBoxWrapper>
      </CheckBoxContainer>
      {error ? <InputErrorStyled>{error}</InputErrorStyled> : null}
    </Fragment>
  )
}

export default InputCheckBox
