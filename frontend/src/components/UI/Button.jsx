import React from "react";

export default function Button({ text, type, name, id, bgColor, textColor }) {
  return (
    <button type={type || "button"} className={`h-full w-full bg-${bgColor? `[${bgColor}]`: "primary"} text-${textColor || "text-white"}`}>
      {text}
    </button>
  );
}
