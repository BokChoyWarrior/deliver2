import styled, { keyframes } from 'styled-components';
import {Button} from '../components/button';
import {Link} from 'react-router-dom';

const logo = keyframes`
    from {
        transform: scale(1);
        transform: rotate(-10deg);
    }
    to {
        transform: scale(1.1);
    }
`

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const Navbar = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    background-color: dodgerblue;
    width: 100%;

    & h1 {
        color: white;
        font-size: 3rem;
        background-color: springgreen;
        padding: 1rem;
        border-radius: 10px;
        transform: rotate(-10deg);
        margin-left: -2rem;
        box-shadow: 2px 2px 25px white;
        animation-name: ${logo};
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    & h1:hover{
        animation-name: ${spin};
        animation-direction: 1s;
    }
`


const Controls = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
`

function Nav() {
    return (
        <Navbar>
            <Link to="/">
                <h1>Deliver2</h1>
            </Link>
            <Controls>
                <Button color="crimson" primary>Primary</Button>
                <Button login>Login</Button>
                <Button>Not Primary</Button>
            </Controls>
        </Navbar>
    )
}

export default Nav;