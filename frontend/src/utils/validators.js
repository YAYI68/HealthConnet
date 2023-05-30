
export const validateInputs = (target,validator)=>{
        const { type,value } = target
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
       if (type === "email" && (value && value.match(mailFormat)) ){

       }
}