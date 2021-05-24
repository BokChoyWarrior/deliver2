import styled from 'styled-components';

export const Button = styled.button`
    background-color: dodgerblue;
    background-color: ${props => props.color};
    padding: 0.5rem;
    font-weight: bold;
    color: white;
    border: none;
    transition: 0.3s;
    &:hover{
        transform: scale(0.9);
    }
`