import validator from "validator";


export const validate=(data)=>{
      
      const mandotoryFields=["firstname","lastname","email","password"];
      let isAllowed=mandotoryFields.every(field => Object.keys(data).includes(field));
     
      if(!isAllowed) throw new Error("All fields are required");

        if(!validator.isEmail(data.email)) 
            throw new Error("Invalid Email Address");
        if(!validator.isStrongPassword(data.password)){
            throw new Error("Password is not strong enough. It should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.");
        }
         console.log("Validating data:", data);

}

export default validate;