import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-red-400">
      <h1>Pokemon wiki</h1>
    </div>
  )
}

export default App
