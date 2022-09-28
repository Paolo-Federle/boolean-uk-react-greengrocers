import './styles/reset.css'
import './styles/index.css'
import { useRef, useState } from 'react'
import initialStoreItems from './store-items'

// console.log(initialStoreItems)

export default function App() {

  const [food, setCart] = useState(initialStoreItems)

  const inputRef = useRef()

  function addType() {
    food.forEach((item) => {
      if (["apple", "apricot", "avocado", "bananas", "berry", "blueberry"].includes(item.name)) {
        item.type = "fruit"
      } else {
        item.type = "vegetable"
      }
    })
  }

  addType()
  // console.log(food)

  const [search, setSearch] = useState('')


  const getSearchedItem = (items, search) => {
    // console.log("filteredStore:", filteredStore)
    // console.log("search:", search)
    const newFilteredStore = items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    // console.log("newFilteredStore:", newFilteredStore)
    return newFilteredStore
  }

  let filteredItems = [...food]
  if (search !== '') {
    filteredItems = getSearchedItem(food, search)
  }

  function filterByType(type) {
    if (type === "all") {
      setSearch("")
      return setCart(initialStoreItems)
    } else{
    const showType = initialStoreItems.filter(item =>
      item.type === type
    )
    setCart(showType)}
  }


  function addOne(item) {
    if (!item.quantity) {
      item.quantity = 1
      setCart([...food])
    } else {
      item.quantity++
      setCart([...food])
    }
  }

  function minusOne(item) {
    item.quantity--
    setCart([...food])
  }

  function checkIfShow(item, index) {
    if (item.quantity > 0) {
      return <li key={index}>
        <img
          className="cart--item-icon"
          src={`/assets/icons/${item.id}.svg`}
          alt={item.name}
        />
        <p>{item.name}</p>
        <button className="quantity-btn remove-btn center" onClick={() => minusOne(item)}>-</button>
        <span className="quantity-text center">{item.quantity}</span>
        <button className="quantity-btn add-btn center" onClick={() => addOne(item)}>+</button>
      </li>
    }
  }

  function calcTot() {
    let total = 0
    food.forEach((item) => {
      if (item.quantity > 0) {
        total = + ((Number(item.price) * Number(item.quantity)) + total).toFixed(2)
      }
    })
    return total
  }

  function dynamicSort(property, ascendingOrDescending){
    if (ascendingOrDescending === "ascending") {
    var sortOrder = 1
    if (property[0] === "-") {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a,b){
      var result = (a[property] < b[property] ? -1 : (a[property] > b[property]))
      return result * sortOrder
    }} else if (ascendingOrDescending === "descending") {
      var sortOrder = 1
    if (property[0] === "-") {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a,b){
      var result = (b[property] < a[property] ? -1 : (b[property] > a[property]))
      return result * sortOrder
    }
    }
  }

  function sortAtoZ(){
    setCart (filteredItems.sort(dynamicSort("name", "ascending")))
  }

  function sortZtoA(){
    setCart (filteredItems.sort(dynamicSort("name", "descending")))
  }

  function sortPriceDecrease(){
    setCart (filteredItems.sort(dynamicSort("price", "ascending")))
  }

  function sortPriceIncrease(){
    setCart (filteredItems.sort(dynamicSort("price", "descending")))
  }

  console.log(`input= ${inputRef.current?.value}`)

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <div className='store--item-list'>
        <button onClick={() => filterByType("fruit")}>Show Fruits</button>
        <button onClick={() => filterByType("vegetable")}>Show Vegetables</button>
        <button onClick={() => filterByType(("all"))}>Clear filters</button>
        <input placeholder="Name" ref={inputRef} value={search} onChange={e => setSearch(e.target.value)} />
        </div><br></br>
        <div className='store--item-list'>
        <button onClick={sortAtoZ}>Sort A-Z</button>
        <button onClick={sortZtoA}>Sort Z-A</button>
        <button onClick={sortPriceDecrease}>Sort price incr.</button>
        <button onClick={sortPriceIncrease}>Sort price decr.</button>
        </div><br></br>
        <ul className="item-list store--item-list">
          {filteredItems.map((food, index) => (
            // {food.map((food, index) => (
            <li key={index}>
              <div className="store--item-icon">
                <img src={`/assets/icons/${food.id}.svg`} alt={food.name} />
              </div>
              <p>{food.name} - £{food.price}</p>
              <button onClick={() => addOne(food)}>Add to cart</button>
            </li>
          ))
          }
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">

            {food.map((item, index) => (
              checkIfShow(item, index)
            ))}

          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">£{calcTot()}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
