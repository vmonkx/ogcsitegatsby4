import styled from "styled-components";

const ButtonPrimary = styled.button`
  margin: 0;
  border: none;
  border-radius: 0.375rem;
  width: 100%;
  overflow: visible;
  display: block;
  color: inherit;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.7rem;
  text-align: center;
  text-decoration: none;
  transition: 0.1s ease-in-out;
  transition-property: color, background-color, border-color;
  background-color: ${(props) => props.theme.primaryButton};
  cursor: pointer;
  padding: 0.45rem 1rem;
  color: #fff;
  
  &:hover {
    background-color: ${(props) => props.theme.primaryButtonHover};
    box-shadow: none;
  }
`;

const ButtonSecondary = styled(ButtonPrimary)`
  color: #fff;
  background-image: linear-gradient(
    -200deg,
    rgba(205, 2, 107, 1) 0%,
    rgba(249, 81, 110, 1) 100%
  );
  &:hover {
    background-image: linear-gradient(
      -200deg,
      rgba(156, 0, 81, 1) 0%,
      rgba(224, 69, 95, 1) 100%
    );
  }
`;

export { ButtonPrimary, ButtonSecondary };
