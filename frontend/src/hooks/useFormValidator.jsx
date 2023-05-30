

const InitialState = {
    firstname:false,
    lastname:false,
    email: false,
    password: false,
}

const FIRSTNAME = "firstname"
const LASTNAME = "lastname"
const EMAIL = "email"
const PASSWORD = "password"

const reducer = (state,action)=>{
    if(action.type === EMAIL){
        const { value } = action
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!value.match(mailFormat)){
            return {...state,email:true}
        }
        return {...state,email:false}
    }
    if(action.type === FIRSTNAME){
        const { value } = action
        if( value.length < 3 || value.length > 20){
            return {...state,firstname:true}
        }
        return {...state,firstname:false} 
    }
    if(action.type === LASTNAME){
        const { value } = action
        if ( value.length < 3 || value.length > 20){
            return {...state,lastname:true}
        }
        return {...state,lastname:false} 
    }
    if(action.type === PASSWORD){
        const { value } = action
        if( value.length < 5 ){
            return { ...state,password:true}
        }
        return {...state,password:false}
    }

    return state
}

import React, { useReducer } from 'react'

function useFormValidator() {
    const [validator,dispatch] = useReducer(reducer,InitialState)
  return {validator,dispatch}
}

export default useFormValidator