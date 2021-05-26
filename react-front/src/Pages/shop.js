import {useParams} from 'react-router-dom';

function Shop(props){
    console.log(props.location.data);
    return (
        <div><h1>Shop page!</h1></div>
    )
}

export default Shop;