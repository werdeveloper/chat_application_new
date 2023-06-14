$(document).ready(function () {
    //Logout 
    $("#logout").on("click", function (e) {
        e.preventDefault();
        //alert("Logout Click"); return false;
        let token = localStorage.getItem("token"); //Get the token value from local storeage
        if (token == null) {
            console.log("Token is null");
            location.href = baseUrl;
        }
        else {
            $.ajax({
                url: baseUrl + '/api/users/logout',
                type: "POST",
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function (data) {
                    console.log(data);
                    if(data.status == 1){
                        localStorage.removeItem("token");   //Remove the token from local storage
                        location.href = baseUrl;    //Redirect to login page
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });
    // set LOgedIn User Email and Email
    

});