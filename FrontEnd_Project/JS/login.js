$(() => {

    $('#loginButton').click("on", function () {

        $("#display").html('')

        var credentials = {
            username: $("#username").val(),
            password: $("#password").val()
        }


        if (credentials.username == "") {
            alert("Please Enter Your Username");
        } else {
            $.ajax({

                url: 'http://localhost:8080/user/login',
                type: "POST",
                data: credentials,
                caches: false,

                success: function (returnedJson) {

                    var text = "";

                    if (returnedJson.user != undefined) {
                        localStorage.setItem("POS_Token", returnedJson.token);
                        localStorage.setItem('POS_username', returnedJson.user.firstname)
                        if (returnedJson.user.role === 'staff') {
                            location.replace("../HTML/Homepage.html");
                        } else {
                            localStorage.setItem('POS_admin', true)
                            location.replace("../HTML/Admin.html");
                        }
                    } else {
                        text += "Invalid LogIn, Please Try Again";
                    }
                    $('#display').html(text);
                },
                error: function (error) {

                    $("#display").html("404 ERROR " + error.returnedJson.message);
                }

            });
        }

    });
});