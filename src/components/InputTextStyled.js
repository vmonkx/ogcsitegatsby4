import React, { Fragment } from "react"
import { useField } from "formik"

import { LabelStyled, TextAreaStyled } from "./Styled/InputStyled"

const InputTextField = props => {
  const [field] = useField(props)

  return (
    <Fragment>
      <LabelStyled htmlFor={field.name}>{props.label}</LabelStyled>
      <TextAreaStyled {...field} id={field.name} {...props} />
    </Fragment>
  )
}

export default InputTextField
