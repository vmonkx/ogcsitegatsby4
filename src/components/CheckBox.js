import React from "react"
import styled from "styled-components"


const CheckBoxStyled = styled.span`
  position: absolute;
  width: 1em;
  height: 1em;
  margin-left: -1.2em;
  background-image: ${`url('data:image/svg+xml;utf8,<svg stroke="rgb(227, 2,119)" fill="rgb(227, 2,	119)" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"></path></svg>')`};
`

const HiddenInputCheckBox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  margin: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  appearance: none;
`

const CheckBoxWrapperStyled = styled.div`
  .option {
    display: block;
    margin-bottom: 0.25em;
    padding-left: 1.2em;
    line-height: 1.2;
  }

  ${HiddenInputCheckBox}:disabled + ${CheckBoxStyled} {
    background-image: ${`url('data:image/svg+xml;utf8,<svg stroke="gray" fill="gray" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"></path></svg>')`};
  }

  ${HiddenInputCheckBox}:checked:disabled + ${CheckBoxStyled} {
    background-image: ${`url('data:image/svg+xml;utf8,<svg stroke="gray" fill="gray" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg>')`};
  }

  ${HiddenInputCheckBox}:focus + ${CheckBoxStyled} {
    box-shadow: 0 0 0 1px ${props => props.theme.secondaryColor.color100};
  }

  ${HiddenInputCheckBox}:checked + ${CheckBoxStyled} {
    background-image: ${`url('data:image/svg+xml;utf8,<svg stroke="rgb(227, 2,119)" fill="rgb(227, 2,	119)" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg>')`};
  }
`

function CheckBox(props) {
 
  return (
    <CheckBoxWrapperStyled name={props.name} onClick={props.onChange}>
      <label className="check option" >
        <HiddenInputCheckBox
          checked={props.checked}
          disabled={props.disabled}
          {...props}
        />
        <CheckBoxStyled />
        {props.label}
      </label>
    </CheckBoxWrapperStyled>
  )
}

export default CheckBox
