import React from 'react'
import { useState } from 'react'

import Calander from './components/Calander'
import MinCalander from './components/MinCalander'

function App() {
  const [value, setValue] = useState<Date>()
  const handleChange = (value: Date) => {
    console.log('ppp', value)
    setValue(value)
  }
  const handleNull = () => {
    console.log('ppp1')
    setValue(undefined)
  }
  return (
    <div className="App">
      <button onClick={handleNull}>value设为空</button>
      <Calander defaultValue={new Date('2024-7-28')} value={value} onChange={handleChange}></Calander>
      <div>-------------------------------------</div>
      <MinCalander></MinCalander>
    </div>
  )
}

export default App
