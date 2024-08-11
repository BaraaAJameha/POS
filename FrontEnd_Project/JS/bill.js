$(() => {

    $.ajax({

        url: 'http://localhost:8080/customerQueue/customerQueue',
        type: "GET",
        //! must see how to take and store the token to send it to the backend in order to Verify that issue
        // data:  ,
        headers: {
            // 'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
        },
        caches: false,

        success: function (returnedJson) {

            console.log(returnedJson)


            var products = "";
            var subtotal = 0;
            var index = 1;

            returnedJson.allProductDetails.forEach(el => {
                products += ' <tr>' +
                    "<th scrop='row'>" + index +
                    '<td>' + el.product.name + '</td >' +
                    '<td>' + el.quantity + '</td >' +
                    '<td>' + el.product.price + '</td >' +
                    '<td >' + el.product.price * el.quantity + '</td >' +
                    '</tr > ';

                subtotal += el.product.price * el.quantity;
                index++;
            });

            console.log(subtotal);
            $("#bill_number").html(returnedJson.bill_number+1)
            $("#productTable").html(products);
            $("#subtotal").html(subtotal);
            $("#tax_amount").html(subtotal * 12.5 / 100);
            $("#total").html(subtotal + (subtotal * 12.5) / 100);



        },
        error: function (error) {
            console.log(error)
            $("#display").html("404 ERROR");
        }

    });


    $('#printBill').click("on", function () {

        let confirmResult = confirm("Are You Sure You Want To Print The Bill ??");
        if (confirmResult) {

            var postData = {
                bill_date: new Date(Date.now()).toUTCString()
            }

            $.ajax({

                url: 'http://localhost:8080/bill/bill',
                type: "POST",
                data: postData,
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,

                success: function (billReturnedData) {


                    if (billReturnedData.message === "successful") {
                        $.ajax({
                            url: 'http://localhost:8080/customerQueue/allCustomerQueue',
                            type: "DELETE",
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                            },
                            caches: false,

                            success: function (returnedJson) {
                                console.log(returnedJson)
                                location.replace("../HTML/Homepage.html");
                            },
                            error: function (error) {

                                $("#display").html("404 ERROR " + error.returnedJson.message);
                            }

                        });

                    }

                },
                error: function (error) {

                    $("#display").html("404 ERROR " + error.message);
                }

            });

        }
    });

});