export const checkWokingDays = (date)=>{
    const selectedDate = new Date(date)
    // current Day in Index number
    const day = selectedDate.getDay()
    // 0 is Sunday and 6 is Saturday
    const weekend = [0,6]
    if (weekend.includes(day)) return false
    return true 
   }

 export const filteredInput = (input)=>{
    const newInput = Object.keys(input)
    //Filter Object with key for empty values
    .filter((key) => input[key] !== undefined && input[key])
    .reduce((obj, key) => {
    return Object.assign(obj, {
      [key]: input[key]
    });
    }, {});

    return newInput
 }

  