import styled from "styled-components";

const LabelStyled = styled.label`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  display: block;
  color: rgba(55, 65, 81, 1);
`;

const InputStyled = styled.input`
  border-color: rgba(209, 213, 219, 1);
  border-radius: 0.375rem;
  margin-top: 0.25rem;

  box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  width: 100%;

  &:focus {
    border-color: ${(props) => props.theme.secondary};
  }
`;

const TextAreaStyled = styled.textarea`
  border-color: rgba(209, 213, 219, 1);
  border-radius: 0.375rem;
  margin-top: 0.25rem;

  box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  width: 100%;

  &:focus {
    border-color: ${(props) => props.theme.secondary};
  }
`;

const InputErrorStyled = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.secondary};
  margin-top: 0rem;
`;

const InputWrapperStyled = styled.div`
  ${(props) => (props.internal ? "display: none" : "display: block")};
  ${(props) =>
    props.error
      ? "animation-name: shake; animation-duration: 1s;animation-fill-mode: both;"
      : null};

  @keyframes shake {
    from,
    to {
      transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate3d(-10px, 0, 0);
    }

    20%,
    40%,
    60%,
    80% {
      transform: translate3d(10px, 0, 0);
    }
  }
`;

export {
  InputStyled,
  LabelStyled,
  TextAreaStyled,
  InputErrorStyled,
  InputWrapperStyled,
};
