
// A Class with functions for validating form input
const ValidateFormInput = require('../model/validate');

// This Class containing / represent the User Model with form input validation 
class UserValidate {
    
     // Constructor for creating a an instance of a User object representing the User Model
     constructor( email, password, title, firstname, lastname, role ) {
                  
        // Note: For now role and title do not need validation comming from dropdowns
        this.email = email;
        this.password = password;
        this.title = title;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
     
      }


      // ----------GET / SET Methods could be implemented here if needed in a future version --------------------- 
       
    
      // CREATE / REGISTER: Validate the user input calling Class functions in validate.js
      // and returning TRUE only if all input are valid !
      validateInputDataCreateRegister(){
    
         const v = new ValidateFormInput();
      
         var allinputvalid = false;
         var vfname = false;
         var vlname = false;
         var vemail = false;
         var vpassword = false;
        
         if( this.firstname != "" ){
             vfname = v.ValidateAllLetters( this.firstname );
             if( vfname )
                 vfname = v.ValidateStringLength( this.firstname, 2, 15 );
              console.log("Valid firstName: " + vfname );
            }
         if( this.lastname != "" ){
             vlname = v.ValidateAllLetters( this.lastname );
            if( vlname )
                vlname = v.ValidateStringLength( this.lastname, 2, 15 );
             console.log("Valid lastName: " + vlname );
            }
         if( this.email != "" ){
             vemail = v.ValidateEmail( this.email );
             if( vemail )
                 vemail = v.ValidateStringLength( this.email, 8, 25 );
              console.log("Valid Email: " + vemail );
             }
         if( this.password != "" ){
             vpassword = v.ValidateStringLength( this.password, 6, 15 );
             console.log("Valid Password: " + vpassword );
            } 
    
         if( vfname === true && vlname === true && vemail === true && vpassword === true )
             allinputvalid = true;
      
          console.log("All input data valid: " +  allinputvalid );
          return allinputvalid;

      }

       
     // UPDATE: Validate the user input calling Class functions in validate.js
     // and returning TRUE only if all input are valid 
     validateInputDataUpdate() {

        const v = new ValidateFormInput();
    
         var allinputvalid = false;
         var vfname = false;
         var vlname = false;
         var vemail = false;
         var vpassword = false;
      
         if( this.firstname != "" ){
             vfname = v.ValidateAllLetters( this.firstname );
             if( vfname )
                 vfname = v.ValidateStringLength( this.firstname, 2, 15 );
             console.log("Valid firstName: " + vfname );
           }
         if( this.lastname != "" ){
             vlname = v.ValidateAllLetters( this.lastname );
             if( vlname )
                 vlname = v.ValidateStringLength( this.lastname, 2, 15 );
             console.log("Valid lastName: " + vlname );
           }
         if( this.email != "" ){
             vemail = v.ValidateEmail( this.email );
             if( vemail )
                 vemail = v.ValidateStringLength( this.email, 8, 25 );
             console.log("Valid Email: " + vemail );
             }
         if( this.password.length === 0 ){
             vpassword = true;
            }   
         else {
              vpassword = v.ValidateStringLength( this.password, 6, 15 );
              console.log("Valid Password: " + vpassword);
             } 
   

         if( vfname === true && vlname === true && vemail === true && vpassword === true )
             allinputvalid = true;
   
          console.log("All input data valid: " +  allinputvalid );
   
         return allinputvalid;
     }

}

module.exports = UserValidate;