import styled from "styled-components"

const CheckBoxContainer = styled.div`
  display: flex;

  input {
    margin: 0;
  }
`

const CheckBoxWrapper = styled.label`
  cursor: pointer;
  display: flex;
`

const CheckBoxStyledWrap = styled.span`
  display: inline-block;
  margin-right: 8px;
  cursor: pointer;
`

const CheckBoxStyledInput = styled.input`
  margin: 0;
  cursor: pointer;
`

const CheckBoxLabelStyled = styled.span`
  font-size: 0.875rem;
  line-height:1.2;
  padding-right: 8px;
  padding-left: 8px;

  
`

export {
  CheckBoxContainer,
  CheckBoxStyledWrap,
  CheckBoxWrapper,
  CheckBoxLabelStyled,
  CheckBoxStyledInput,
}
