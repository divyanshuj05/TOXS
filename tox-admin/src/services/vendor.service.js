export const CheckVendorData = (name,email,mobile,password,cafe) => {
    if(!name||!email||!mobile||!password||!cafe)
    {
        alert("Fill information first!!")
        return false
    }
    if(email.includes("@gmail.com") === false) {
        if(email.includes("@thapar.edu") === false) {
            if(email.includes("@outlook.com") === false) {
                alert("Error: E Mail format not correct/not supported!!")
                return false
            }
        }
    }
    console.log(mobile)
    for(let i=0;i<mobile.length;i++)
    {
        console.log(mobile[i])
        if(isNaN(mobile[i]))
        {
            console.log(isNaN(mobile[i]))
            alert("Mobile Number should contain only numbers")
            return false
        }
    }
    // eslint-disable-next-line eqeqeq
    if(mobile.length!=10)
    {
        alert("Length of mobile number should be 10")
        return false
    }

    if (password.match(/[A-Z]/g) != null) {
        if (password.match(/[a-z]/g) != null) {
          if (password.match(/[0-9]/g) != null) {
            if (password.length >= 8) { }
            else {
              alert( "Error: Length of password should be greater than or equal to 8!!");
              return false
            }
          }
          else {
            alert("Error: Password should contain atleast one number!!");
            return false
          }
        }
        else {
           alert("Error: Password should contain atleast one lowercase letter!!");
           return false
        }
      }
      else {
        alert("Error: Password should contain atleast one uppercase letter!!");
        return false
      }
}