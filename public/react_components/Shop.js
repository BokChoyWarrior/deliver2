const Shop = (props) => {
  const [shop, setShop] = React.useState({})
  const [items, setItems] = React.useState([])
  const [basket, setBasket] = React.useState([])

  // only run after mounting
  React.useEffect(async () => {
    const _shop = await axios.get(`/api/shops/${props.shopId}`)
    setShop(_shop.data)
    const _basket = await axios.get(`/api/account/baskets/${props.shopId}`)
    setBasket(_basket.data)
    const _items = await axios.get(`/api/shops/${props.shopId}/items`)
    setItems(_items.data)
  }, [])

  return (
    <React.Fragment>
      <div className="container">
        <div className="main-shop">
          <main className="shop-header">
            <div className="shop-description">
              <h2 className="shop-name">{shop.name}</h2>
              <hr/>
              <p>{shop.description}</p>
              <hr/>
              <p>{shop.details}</p>
            </div>
            <img className="shop-image" src={shop.imagefile}/>
          </main>
          <div className="shop-items">
            <ShopItems items={items} basket={basket}/>
          </div>
        </div>
      </div>
      <div className="container">
        <ShopBasket basket={basket}/>
      </div>
    </React.Fragment>
  )
}

const ShopBasket = (props) => {
  return (
    <div className="shop-basket">
      <h1>Basket (react)</h1>
    </div>
  )
}
const Item = (props) => {
  // const [itemInfo, setItemInfo] = React.useState({})
  const [quantity, setQuantity] = React.useState(props.quantity)
  async function onClick (amount) {
    const res = await axios.put(`/api/account/baskets/${props.shopId}`, { itemId: props.item._id, amount: amount })
    const item = res.data.new_item
    setQuantity((item === undefined ? 0 : item.quantity))
  }
  return (
    <div className="shop-item" id={props.item._id}>
      <div className="shop-item-details">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" alt=""></img>
        <div className="item-name">{props.item.name}</div>
      </div>
      <div className="shop-item-controls">
        <button className="button-action" onClick={() => onClick(-1)}><span className="material-icons">remove</span></button>
        <h3>{quantity}</h3>
        <button className="button-action" onClick={() => onClick(1)}><span className="material-icons">add</span></button>
      </div>
    </div>
  )
}

const ShopItems = (props) => {
  return (
    props.items.map((item, _index) => {
      let quantity = 0
      const index = props.basket.findIndex(x => x.item._id === item._id)
      quantity = (index >= 0) ? props.basket[index].quantity : 0
      return (<Item key={item._id} item={item} basket={props.basket} shopId={shopId} quantity={quantity} />)
    })
  )
}

const shopId = localStorage.getItem('shop_id')
const element = document.querySelector('.shop-container')
if (element !== null) {
  ReactDOM.render(<Shop shopId={shopId} />, element)
}
