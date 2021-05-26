import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Shopcard from '../components/shopcard';
import axios from 'axios';

const ShopGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 1rem;
`

function Home(){
    var [shops, setShops] = useState(null);
    useEffect( async function(){
        var data = await axios.get('http://localhost:3000/api/shops').catch(err => console.log(err));
        data = data.data;
        var shops = data.map(shop => <Shopcard name={shop.name} description={shop.description} id={shop._id} />);
        setShops(shops);
    }, []);
    return (
        <ShopGrid>
            {shops}
        </ShopGrid>
        
    )
}

export default Home;