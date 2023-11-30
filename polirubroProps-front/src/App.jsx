import { useState } from 'react'
import './App.css'
import ProductManage from "./ProductManage"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductManage/>
      
    </>
  )
}

export default App
