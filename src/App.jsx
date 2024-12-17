import { useState } from 'react'
import './App.css'
import Quotes from './components/quotes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Quotes />
  )
}

export default App
