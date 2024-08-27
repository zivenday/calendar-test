import React from 'react'
import { useState } from 'react'

const Calander = () => {
  const [value, setValue] = useState(new Date())
  return (
    <div>
      <div>组件值：{value.toString()}</div>
      <button>明天</button>
      <button>后天</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Calander></Calander>
    </div>
  )
}

export default App
