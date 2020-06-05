
// A Class with functions for validating form input
const ValidateFormInput = require('../model/validate');

// This Class containing / represent the User Model with form input validation 
class UserValidate {
    
     // Constructor for creating a an instance of a User object representing the User Model
     constructor( email, password, title, firstname, lastname, role ) {
                  
        // The Class members initilized with the input values from the user interface recived in the Controller
        this.email = email;
        this.password = password;
        this.title = title;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        

        // Class members used for validating the input from the user interface 
        this.valid_email = false;
        this.valid_password = false;
        this.valid_title = false;
        this.valid_firstname = false;
        this.valid_lastname = false;
        this.valid_role = false;

      }


    // ------------------------------- Validations Methods - GET / SET Mothods -------------------------- 
    isInputDataValid(){
        let alldatavalid = false;  

        if( this.valid_email && this.valid_password && this.valid_title && this.valid_firstname && this.valid_lastname && this.valid_role )
            alldatavalid = true;
        return alldatavalid;
     }
   

    isEmailValid( min, max ){
       const v = new ValidateFormInput();
       
       if( this.email != "" ){
            this.valid_email = v.ValidateEmail( this.email );
            if( this.valid_email )
                this.valid_email = v.ValidateStringLength( this.email, min, max );
            console.log("Model - Valid Email: " + this.valid_email );
           }
        return this.valid_email;
     }
     
     
    isTitleValid( min, max ){
        const v = new ValidateFormInput();
              
        if( this.title != "" ){
            this.valid_title = v.ValidateAllLetters( this.title );
            if( this.valid_title )
                this.valid_title = v.ValidateStringLength( this.title, min, max );
            console.log("Model - Valid Title: " + this.valid_title );
           }
        return this.valid_title;
     } 


    isFirstNameValid( min, max ){
        const v = new ValidateFormInput();
              
        if( this.firstname != "" ){
            this.valid_firstname = v.ValidateAllLetters( this.firstname );
            if( this.valid_firstname )
                this.valid_firstname = v.ValidateStringLength( this.firstname, min, max );
            console.log("Model - Valid firstName: " + this.valid_firstname );
           }
        return this.valid_firstname;
     }
         
      
    isLastNameValid( min, max ){
        const v = new ValidateFormInput();
              
        if( this.lastname != "" ){
            this.valid_lastname = v.ValidateAllLetters( this.lastname );
            if( this.valid_lastname )
                this.valid_lastname = v.ValidateStringLength( this.lastname, min, max );
            console.log("Model - Valid lastName: " + this.valid_lastname );
           }
        return this.valid_lastname;
     }
     
     
    isRoleValid( min, max ){
        const v = new ValidateFormInput();
       
        if( (! this.role ) || this.role == '' || this.role === 'undefined' ){
             this.role = "User";
             this.valid_role = true;
             console.log("Model - Valid Role - was Empty: " + this.valid_role );
        }
        else {
             this.valid_role = v.ValidateStringLength( this.role, min, max );
             console.log("Model - Valid Role: " + this.valid_role );
        }
        console.log("Model - Role: " + this.role );
        return this.valid_role;
    }
           
    
    // ------------------Password is empty when updating without changing the Password ---------------
    isPasswordValidUpdate( min, max ){
        const v = new ValidateFormInput();
       
        if( this.password.length === 0 ){
            this.valid_password = true;
            console.log("Model - Valid Password is Empty: " + this.valid_password );
            }   
        else {
            this.valid_password = v.ValidateStringLength( this.password, min, max );
             console.log("Model - Valid Password: " + this.valid_password );
            } 
        return this.valid_password;
      }


    // ------------------Password must never be empty when creating or register --------------- 
    isPasswordValidCreateRegister( min, max ){
        const v = new ValidateFormInput();
        
        if( this.password != "" ){
            this.valid_password = v.ValidateStringLength( this.password, min, max );
            console.log("Model - Valid Password: " + this.valid_password );
           } 
        return this.valid_password;
     }

     
}

module.exports = UserValidate;