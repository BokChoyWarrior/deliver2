import {useEffect} from 'react';
import styled from 'styled-components';
import Shopcard from '../components/shopcard';

const ShopGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 1rem;
`

function Home(){
    useEffect(function(){

        console.log('testing');
    }, []);
    return (
        <ShopGrid>
            <Shopcard />
            <Shopcard />
            <Shopcard />
            <Shopcard />
        </ShopGrid>
        
    )
}

export default Home;