class UserValidate {
    
   // Constructor taking some of the values of the User Model / form input data as arguments
     constructor( email, password, title, firstname, lastname, role ) {
            
      // Note: For now role and title doest not need validation comming from a dropdown
      this.email = email;
      this.password = password;
      this.title = title;
      this.firstname = firstname;
      this.lastname = lastname;
      this.role = role;
     
    }


    // ----------GET / SET Methods could be implemented here --------------------- 
       
    
    // CREATE / REGISTER: Validate the user input calling Class functions 
    // and returning TRUE only if all input are valid !
    validateInputDataCreateRegister(){
    
       var allinputvalid = false;
       var vfname = false;
       var vlname = false;
       var vemail = false;
       var vpassword = false;
        
       if( this.firstname != "" ){
           vfname = this.ValidateAllLetters( this.firstname );
           if( vfname )
               vfname = this.ValidateStringLength( this.firstname, 2, 15 );
            console.log("Valid firstName: " + vfname );
          }
       if( this.lastname != "" ){
          vlname = this.ValidateAllLetters( this.lastname );
          if( vlname )
              vlname = this.ValidateStringLength( this.lastname, 2, 15 );
           console.log("Valid lastName: " + vlname );
          }
       if( this.email != "" ){
           vemail = this.ValidateEmail( this.email );
           if( vemail )
               vemail = this.ValidateStringLength( this.email, 8, 25 );
            console.log("Valid Email: " + vemail );
           }
       if( this.password != "" ){
            vpassword = this.ValidateStringLength( this.password, 6, 15 );
            console.log("Valid Password: " + vpassword );
          } 
    
       if( vfname === true && vlname === true && vemail === true && vpassword === true )
            allinputvalid = true;
      
       console.log("All input data valid: " +  allinputvalid );
       return allinputvalid;

    }

       
   // UPDATE: Validate the user input calling Class functions 
   // and returning TRUE only if all input are valid ! if all input are valid !
   validateInputDataUpdate() {
    
     var allinputvalid = false;
     var vfname = false;
     var vlname = false;
     var vemail = false;
     var vpassword = false;
      
     if( this.firstname != "" ){
         vfname = this.ValidateAllLetters( this.firstname );
         if( vfname )
            vfname = this.ValidateStringLength( this.firstname, 2, 15 );
         console.log("Valid firstName: " + vfname );
       }
      if( this.lastname != "" ){
          vlname = this.ValidateAllLetters( this.lastname );
          if( vlname )
            vlname = this.ValidateStringLength( this.lastname, 2, 15 );
          console.log("Valid lastName: " + vlname );
         }
      if( this.email != "" ){
          vemail = this.ValidateEmail( this.email );
          if( vemail )
             vemail = this.ValidateStringLength( this.email, 8, 25 );
             console.log("Valid Email: " + vemail );
          }
      if( this.password.length === 0 ){
            vpassword = true;
            }   
      else {
             vpassword = this.ValidateStringLength( this.password, 6, 15 );
             console.log("Valid Password: " + vpassword);
           } 
   

        if( vfname === true && vlname === true && vemail === true && vpassword === true )
           allinputvalid = true;
   
        console.log("All input data valid: " +  allinputvalid );
   
     return allinputvalid;

   }


   // These functions can be called from the above Create and Update functions    
   ValidateEmail( inputText ) {

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if( inputText.match(mailformat) )
          return true;
      else
          return false;
     }
 
  
    ValidateStringLength( inputtxt, minlength, maxlength ) { 
         var field = inputtxt; 
         var mnlen = minlength;
         var mxlen = maxlength;
 
         if( field.length < mnlen || field.length > mxlen )
             return false;
         else
             return true;
 
       }
 

    ValidateAllLetters( inputtxt ) { 
          inputtxt = inputtxt.replace(/\s+/g,'');
       
          var letters = /^[A-Za-z]+$/;
          if( inputtxt.match(letters) )
              return true;
          else
              return false;
      }

     
      ValidateIsNumber( inputtxt, minlength, maxlength ) { 
      
           var field = inputtxt; 
           var mnlen = minlength;
           var mxlen = maxlength;
         
           // Note: "inputtxt" NEEDS to be a String !!!!!
           inputtxt =  inputtxt + "";
                      
           var numbers = /^[0-9]+$/;
           if( inputtxt.match(numbers) ){
              if( field >= minlength && field <= maxlength )
                  return true;
               else
                  return false;
            }
            else
                return false;
       } 
         
    

}

module.exports = UserValidate;