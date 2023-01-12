export const validateAuth = (resource) => {
   const oauth = getWithExpiry("userLogIn");
   if (oauth == null) {
      return false;
   }
   else {
      return true;
   }
}

// Remove the localStorage item and redirect to Login  screencd.
export const logOut = () => {
   localStorage.removeItem("auth");
   localStorage.removeItem("userProfile");
   localStorage.removeItem("userLogIn");
   delete user.name;
   delete user.email;
   delete user.role;
   window.location.replace("#/login");
}

export const validateonSubmit = (form, fields, gCapcha) => {
   //return false;
   // add a "submit" event listener to the form
   form.addEventListener("submit", (e) => {
      // remove default functionality 
      e.preventDefault();
      var error = 0;
      // loop through the fields and check them against a function for validation
      fields.forEach((field) => {
         const input = document.querySelector(`#${field}`);
         if (validateFields(input) == false) {
            // if a field does not validate, auto-increment our error integer
            error++;
         }
      });
      // if everything validates, error will be 0 and can continue

      if (gCapcha == "" || gCapcha == undefined || gCapcha.length == 0 || error > 0) {
         return false;
      } else {
         //do login api here or in this case, just submit the form and set a localStorage item

         var data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
         };
         console.log("config", config);
         fetch(config.api_url + '/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: config.fetchHeaders,
         })
            .then(function (response) { return response.json(); })
            .then(function (json) {

               if (json.status) {

                  // let token = json.data.token;
                  setWithExpiry("auth", 1, 1000 * 60 * 60);
                  setWithExpiry("userLogIn", json.data.token, 1000 * 60 * 60);
                  setWithExpiry("userProfile", json.data, 1000 * 60 * 60);
                  //return false;
                  window.location.replace("/");

               } else {
                  console.log("Login failed");
                  document.querySelector('.alert').classList.remove('d-none');
               }
            })
            .catch(function (err) {
               // There was an error
               return false;
               console.log(err);
            });
      }
   });
}

const validateFields = (field) => {
   // remove any whitespace and check to see if the field is blank, if so return false
   if (field.value.trim() === "") {
      // set the status based on the field, the field label, and if it is an error message
      setStatus(
         field,
         `${field.nextElementSibling.innerText} tidak boleh kosong!`,
         "error"
      );
      return false;
   } else {

      // set the status based on the field without text and return a success message
      setStatus(field, null, "success");
      return true;

   }
}

const setStatus = (field, message, status) => {
   // create variable to hold message
   const errorMessage = field.parentElement.querySelector(".error-message");

   // if success, remove messages and error classes
   if (status == "success") {
      if (errorMessage) {
         errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
   }
   // if error, add messages and add error classes
   if (status == "error") {
      errorMessage.innerText = message;
      field.classList.add("input-error");
   }
}