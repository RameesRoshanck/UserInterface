jQuery.validator.addMethod("noSpace", function(value, element) { 
    return value.indexOf("  ") < 0 && value != ""; 
  }, "Not to enterted space only , please enter your correct name");

$("#valid").validate({
   rules:{
    name:{
        required:true,
        minlength:4
    },
    email:{
        required:true,
        email:true
    },
    password:{
        required:true,
        minlength:3
    }
   },
   messages:{
    email:{
        required:"enter your needed email",
        email:"enter the valid email id"
    },
    password:{
        required:"Enter the password",
        minlength:"minimum 3 number"
    },
    name:{
        required:"enter your name",
        minlength:"minimum 4 charector"

    }
   }
    })
