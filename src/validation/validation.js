// regular expression for name
const expEmail =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/



export const validation=(currentInput,inputs)=> {

    console.log(inputs)
    let errors = {};
   
    if( !inputs.displayName) errors.displayName = "*Campo requerido";

   if( !inputs.email) errors.email = "*Campo requerido";

   else if(  !expEmail.test(inputs.email)) errors.email = "No es un formato de correo valido";

   if(!inputs.password) errors.password= "*Campo requerido"

    return errors;

}



