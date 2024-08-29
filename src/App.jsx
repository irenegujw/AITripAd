import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
      <h2>Welcome to Irene's AI Trip Planner</h2>
      <Button>Subscribe</Button>
    </>
  )
}

export default App
