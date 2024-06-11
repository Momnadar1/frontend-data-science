import React, { useState } from 'react';

function TextInput() {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
   <>
    <input onChange={handleChange} />
    <p className='text-white'>This input is change like this: {text}</p>
   </>
  );
}

export default TextInput
