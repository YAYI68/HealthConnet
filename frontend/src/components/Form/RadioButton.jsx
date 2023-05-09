import React from "react";

export default function RadioButton({ name, value, user, onChange }) {
  return (
    <div className="flex items-center justify-center">
      <label className="radio-label">
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={value == user}
          onChange={onChange}
        />
        <span className="radio-input-span"></span>
      </label>
    </div>
  );
}
