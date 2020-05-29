class UserValidate {
    
 // Validate the users input ( Person ) and using the modules in this Class
 // Returning TRUE if all input are valid !
 validateInputDataCreateRegister(firstname, lastname, email, password){
    
    var allinputvalid = false;
    var vfname = false;
    var vlname = false;
    var vemail = false;
    var vpassword = false;
        

     if( firstname != "" ){
         vfname = this.ValidateAllLetters(firstname);
         if(vfname)
            vfname = this.ValidateStringLength(firstname, 2, 15);
        console.log("Valid firstName: " + vfname);
       }
       if( lastname != "" ){
         vlname = this.ValidateAllLetters(lastname);
         if(vlname)
            vlname = this.ValidateStringLength(lastname, 2, 15);
          console.log("Valid lastName: " + vlname);
         }
     if( email != "" ){
         vemail = this.ValidateEmail(email);
         if(vemail)
            vemail = this.ValidateStringLength(email, 8, 25);
         console.log("Valid Email: " + vemail);
       }
       if( password != "" ){
          vpassword = this.ValidateStringLength(password, 6, 15);
          console.log("Valid Password: " + vpassword);
       } 
    
    if( vfname == true && vlname == true && vemail == true && vpassword == true )
       allinputvalid = true;

    return allinputvalid;

 }


 // Validate the users input ( Person ) and using the modules in this Class
 // Returning TRUE if all input are valid !
 validateInputDataUpdate(firstname, lastname, email, password){
    
   var allinputvalid = false;
   var vfname = false;
   var vlname = false;
   var vemail = false;
   var vpassword = false;
       

    if( firstname != "" ){
        vfname = this.ValidateAllLetters(firstname);
        if(vfname)
           vfname = this.ValidateStringLength(firstname, 2, 15);
       console.log("Valid firstName: " + vfname);
      }
      if( lastname != "" ){
        vlname = this.ValidateAllLetters(lastname);
        if(vlname)
           vlname = this.ValidateStringLength(lastname, 2, 15);
         console.log("Valid lastName: " + vlname);
        }
    if( email != "" ){
        vemail = this.ValidateEmail(email);
        if(vemail)
           vemail = this.ValidateStringLength(email, 8, 25);
        console.log("Valid Email: " + vemail);
      }
     if( password.length === 0 ){
         vpassword = true;
       }   
     else {
           vpassword = this.ValidateStringLength(password, 6, 15);
           console.log("Valid Password: " + vpassword);
      } 
   
   if( vfname == true && vlname == true && vemail == true && vpassword == true )
      allinputvalid = true;

   return allinputvalid;

}

    
 ValidateEmail(inputText) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if( inputText.match(mailformat) )
        return true;
    else
        return false;
   }
 
 
 
  ValidateStringLength(inputtxt, minlength, maxlength)
   { 
     var field = inputtxt; 
     var mnlen = minlength;
     var mxlen = maxlength;
 
    if( field.length < mnlen || field.length > mxlen )
       return false;
    else
       return true;
 
    }
 
    ValidateAllLetters(inputtxt)
       { 
         
        inputtxt = inputtxt.replace(/\s+/g,'');
       
       var letters = /^[A-Za-z]+$/;
       if( inputtxt.match(letters) )
          return true;
        else
           return false;
       }

     
       ValidateIsNumber(inputtxt, minlength, maxlength)
        { 
      
         var field = inputtxt; 
         var mnlen = minlength;
         var mxlen = maxlength;
         
         // Note: "inputtxt" NEEDS to be a String !!!!!
         inputtxt =  inputtxt + "";
        
         //console.log("Age validate: " + inputtxt );
              
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