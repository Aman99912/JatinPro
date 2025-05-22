import React, { useState, useEffect, useRef } from 'react';
import './FloatingInput.css';

const FloatingInput = ({ label, value, setValue, type = 'text' }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const shouldFloat = focused || value;

  return (
    <div className="input-wrapper">
      <label
        className={`floating-label ${shouldFloat ? 'float' : ''}`}
        onClick={() => inputRef.current.focus()}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="floating-input"
        placeholder=" "
      />
    </div>
  );
};

export default FloatingInput;
