import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function TextField({
  type,
  name,
  id,
  label,
  value,
  onChange,
  readonly,
  placeholder,
}) {
  const [visible, setVisible] = useState(false);
  const setType = (type) => {
    if (type !== "password") {
      return type;
    }
    if (type == "password") {
      if (visible) {
        return "text";
      } else {
        return "password";
      }
    }
  };

  return (
    <div className=" flex textfield items-center w-full textfield border-b-[1px] border-b-gray-500 focus-within:border-b-[2px] focus-within:border-primary lg:focus-within:border-b-[3px]">
      <input
        type={setType(type) || "text"}
        id={id}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        readOnly={readonly}
        autoComplete="off"
        className=" h-[3rem] w-full  outline-none "
      />
      {type === "password" && (
        <div onClick={() => setVisible((prev) => !prev)}>
          {visible ? (
            <MdVisibility size={24} className="password-icon" />
          ) : (
            <MdVisibilityOff size={24} className="password-icon" />
          )}
        </div>
      )}
    </div>
  );
}
