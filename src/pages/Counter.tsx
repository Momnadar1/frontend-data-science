import { useState } from 'react';

function Counter() {
  const [count1, setCount] = useState(0);

  return (
    <>
      <p className='text-white'>You clicked {count1} times</p>
      <button className='bg-slate-50 p-10' onClick={() => setCount(count1 + 1)}>
        Click me
      </button>
    </>
  );
}

export default Counter;