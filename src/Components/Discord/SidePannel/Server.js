import styled from "styled-components";

const Server = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  :hover {
    border: 2px solid #fff;
  }
`;

export const Switch = styled(Server)``;
export const Add = styled(Server)`
  transition: all 0.2s ease-out;
  opacity: 0.7;
  :hover {
    border: none;
    transform: rotate(90deg);
  }
`;

export default Server;
