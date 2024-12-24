"use client"

import { useState } from "react"

function Counter({users}) {

    const [counter, setCounter] = useState(0)

  
    
  return (
    <button onClick={() => setCounter((count) => count + 1)}>{users?.length}</button>
  );
}

export default Counter