import styled from "styled-components";

const Server = styled.div`
	width: 5rem;
	height: 5rem;
	background: ${props => `url(${props.url})`};
	background-size: cover;
	background-position: center;
	border-radius: ${props => (props.active ? "25%" : "50%")};
	margin-top: 0.8rem;
	margin-bottom: 0.8rem;
	cursor: pointer;
	transition: all 0.2s ease-out;
	:hover {
		border-radius: 25%;
	}
	&:before {
		content: "";
		position: absolute;
		margin-top: 0.8rem;
		left: 0;
		width: 0.4rem;
		height: ${props => (props.active ? "3.5rem" : "0rem")};
		background-color: #000;
		border-radius: 2rem;
		transform-origin: bottom;
	}
`;

export const Switch = styled(Server)`
  border:${props => (props.active ? "2px solid #fff" : "none")}
  &:hover{
    border: 2px solid #fff
  }
`;
export const Add = styled(Server)`
	transition: all 0.2s ease-out;
	opacity: 0.7;
	:hover {
		border: none;
		transform: rotate(90deg);
	}
`;

export default Server;
