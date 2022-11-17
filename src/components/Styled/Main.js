import styled from "styled-components"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 83px);
`

const Main = styled.main`
  
  padding-bottom: 80px;
`

export { Main, MainContainer }
