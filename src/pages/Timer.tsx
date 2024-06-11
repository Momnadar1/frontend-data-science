import { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState('No Name');

  useEffect(() => {
    setCount('Momna Dar')
    console.log(count)
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      <p className='text-white'>Here the name: {count}</p>
    </>
  );
}

export default Timer; 