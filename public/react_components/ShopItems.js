const Item = (props) => {
  const [itemInfo, setItemInfo] = React.useState({})
  const [quantity, setQuantity] = React.useState(props.quantity)
  async function onClick(amount) {
    const res = await axios.put(`/api/account/baskets/${props.shopId}`, {itemId: props.item._id, amount: amount})
    const item = res.data.new_item
    setQuantity((item == undefined ? 0 : item.quantity))
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
  const [items, setItems] = React.useState([])
  const [basket, setBasket] = React.useState([])
  const shopId = localStorage.getItem('shop_id')
  async function handleClick() {
    const res = axios.get(`/api/account/baskets/${shopId}`).then(res => setBasket(res.data))
    setBasket(res)
    const data = await axios.get(`/api/shops/${shopId}/items`)
    setItems(data.data)

  }
  // Comment
  // only run after mounting
  React.useEffect(() => {
    handleClick()
  }, [])

  // only run after unmounting
  React.useEffect(() => {
    return () => {
    }
  }, [])

  return (
    items.map((item, _index) => {
      // console.log("Basket::::", basket)
      // const index = basket.findIndex(x => x.item === item._id)
      // const quantity = (index >=0) ? basket[index].quantity : 0
      const quantity = 0
      return (<Item key={item._id} item={item} basket={basket} shopId={shopId} quantity={quantity} />)
    }
    )
  )
}
const shopId = localStorage.getItem('shop_id')
const element = document.querySelector('.shop-items')
if (element !== null) {
  ReactDOM.render(<ShopItems shopId={shopId} />, element)
}
