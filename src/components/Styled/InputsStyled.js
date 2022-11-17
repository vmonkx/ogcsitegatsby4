import styled from "styled-components"
import { Form } from "formik"

const PageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const ContainerStyled = styled.div`
  display: flex;

  width: 320px;
  flex-direction: column;

  @media ${(props) => props.theme.media.medium} {
    width: 700px;

    flex-direction: row;
    margin: 0 auto;
    align-items: center;
  }
`

const LeftPanelStyled = styled.div`
  background: white;
  height: 100%;
  left: 20px;
  width: calc(100% - 40px);
  min-height: 270px;
  padding: 40px;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  position: relative;
  @media ${(props) => props.theme.media.medium} {
    height: calc(100% - 40px);

    left: 0;
    width: 50%;
    min-height: 310px;
  }
`

const AuthHeaderStyled = styled.div`
  font-size: 40px;
  font-weight: 900;
  line-height: 45px;
`

const AuthDescriptionStyled = styled.div`
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 40px;
`

const RightPanelStyled = styled.div`
  background: #474a59;
  background: ${props => props.theme.primaryColor.color600};
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #f1f1f2;
  flex-shrink: 0;

  width: 100%;
  min-height: 350px;
  position: relative;
  @media ${(props) => props.theme.media.medium} {
    width: 50%;
  }
`

const AuthFormStyled = styled(Form)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  .btn-secondary {
    margin-top: 40px;
  }
`

const AuthLabelStyled = styled.label`
  color: ${props => props.theme.primaryColor.color500};
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
`

const AuthInputStyled = styled.input`
  background: transparent;
  border: 1.5px solid transparent;
  color: ${props => props.theme.primary};
  font-size: 20px;
  height: 30px;
  line-height: 35px;
  outline: none !important;
  width: 100%;
  border-bottom: 1.5px solid ${props => props.theme.primary};
  &:focus,
  &:hover,
  &:active {
    border-bottom: 1.5px solid ${props => props.theme.secondary};
  }
`

const AuthTextAreaStyled = styled.textarea`
  background: transparent;
  border: 1.5px solid transparent;
  color: ${props => props.theme.primary};
  font-size: 1.2rem;

  height: 100px;
  line-height: 1;
  outline: none !important;
  width: 100%;
  max-width: 350px;
  border-bottom: 1.5px solid ${props => props.theme.primary};
  &:focus,
  &:hover,
  &:active {
    border-bottom: 1.5px solid ${props => props.theme.secondary};
  }
`

const InputErrorStyled = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.secondary};
  margin-top: 0.5rem;
`

export {
  PageStyled,
  ContainerStyled,
  LeftPanelStyled,
  AuthHeaderStyled,
  AuthDescriptionStyled,
  RightPanelStyled,
  AuthInputStyled,
  AuthFormStyled,
  AuthLabelStyled,
  InputErrorStyled,
  AuthTextAreaStyled,
}
