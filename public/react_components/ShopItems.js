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
  const [basket, setBasket] = React.useState(null)
  const shopId = localStorage.getItem('shop_id')
    
  // Comment
  // only run after mounting
  React.useEffect(async () => {
    const res = await axios.get(`/api/account/baskets/${shopId}`)
    setBasket(res.data)
    const data = await axios.get(`/api/shops/${shopId}/items`)
    setItems(data.data)
  }, [])

  // only run after unmounting
  // React.useEffect(() => {
  //   return () => {
  //     console.log("basket updated!")
  //   }
  // }, [basket])

  return (
    items.map((item, _index) => {
      var quantity = 0
      const index = basket.findIndex(x => x.item._id === item._id)
      quantity = (index >=0) ? basket[index].quantity : 0
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
