import React from 'react'

export default function CheckBox({name, value, onChange}) {
 
  return (
    <div>
        <label className='checkbox-label'>
            <input type="checkbox" name={name} id="" checked={value} onChange={onChange}/>
            <span className='checkmark'></span>
        </label>
    </div>
  )
}
