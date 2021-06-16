import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const ShopItems = (props) => {
  const [items, setItems] = React.useState([])
  const shopId = localStorage.getItem('shop_id')
  console.log(shopId)
  async function handleClick () {
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
      console.log('Bye!')
    }
  }, [])

  return (
        <div className="shop-items">
          {items.map((item, _index) => {
            return (
              <div className="shop-item" key={item._id}>
                <div className="shop-item-details">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" alt=""></img>
                    <div className="item-name">{item.name}</div>
                </div>
                <div className="shop-item-controls">
                    <button className="button-action"><span className="material-icons">remove</span></button>
                    <h1>(amnt)</h1>
                    <button className="button-action"><span className="material-icons">add</span></button>
                </div>
            </div>
          )
          }
          )}
        </div>
  )
}

const element = document.querySelector('.shop-items')
if (element !== null) {
  ReactDOM.render(<ShopItems />, element)
}
