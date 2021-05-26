import { render } from 'nunjucks';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Shopcarddescription = styled.p`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0;
    margin-top: auto;
    padding: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
`

const Shopcardtitle = styled.h1`
    font-size: 2rem;
    color: white;
`

const Shopcardlink = styled.a`
    display: none;
    background-color: springgreen;
    color: black;
    padding: 0.5rem;
    margin: 0.25rem;
    border-radius: 10px;
`

const Scard = styled.div`
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-image: url("${props => props.image}");
    min-height: 20rem;
    transition: 1s;

    &:hover{
        transform: scale(1.05);
        box-shadow: 4px 4px 25px black;
    }
    &:hover ${Shopcarddescription}{
        background-color: rgba(0, 0, 0, 0.9);
        color: rgba(255, 255, 255, 1);
    }
    &:hover ${Shopcardlink}{
        display: flex;
    }
    & div{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        margin: 0;
        padding: 0.25;
    }
`

function renderdiscount(){
    if(1 == 0){
        return null;
    }else{
        return null;
    }
}


function Shopcard(props){
    
    let imageurl = 'http://localhost:3000/public/shop-card-images/' + props.id + ".png";
    return (
        <Scard image={imageurl}>
            <div>
                {renderdiscount()}
                <Shopcardtitle>{props.name}</Shopcardtitle>
                <Link to={{
                    pathname:'/shop',
                    data:{
                        id:`${props.id}`
                    }
                }} ><Shopcardlink >order now</Shopcardlink></Link>
            </div>
            <Shopcarddescription>{props.description}</Shopcarddescription>
        </Scard>
    )
}

export default Shopcard;