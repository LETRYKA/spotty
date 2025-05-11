"use client";
import React, { useRef, useState } from "react";

interface PinInputProps {
  length?: number;
  onChange?: (pin: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({ length = 4, onChange }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    onChange?.(newValues.join(""));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const newValues = [...values];
      newValues[index - 1] = "";
      setValues(newValues);
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-between w-full space-x-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="password"
          maxLength={1}
          inputMode="numeric"
          value={values[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          className="w-12 h-12 text-center text-white text-xl bg-[#28272A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#68686d]"
        />
      ))}
    </div>
  );
};

export default PinInput;
