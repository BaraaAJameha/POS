$(() => {

    const isAdmin = localStorage.getItem('POS_admin')
    if (isAdmin) {
        $('#hompage_return_to_admin_page').show()
        $('#hompage_logout').hide()
    } else {
        $('#hompage_return_to_admin_page').hide()
        $('#hompage_logout').show()
    }

    $('#hompage_return_to_admin_page').on('click', function () {
        location.replace('../HTML/Admin.html')
    })

    const getCQ = () => {
        $.ajax(
            {
                url: 'http://localhost:8080/customerQueue/customerQueue',
                type: 'GET',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {

                    customerItems = "";
                    var subtotal = 0;
                    var total = 0;
                    returnedJson.allProductDetails.forEach(product => {
                        customerItems += '<tr><td>' + product.product.name + "</td>" +
                            '<td>' + product.quantity + '</td>' +
                            '<td>' + product.product.price + '</td>' +
                            '<td>' + product.quantity * product.product.price + '</td>' +
                            '<td><button class="btn btn-danger productdelete" barcode=' + product.barcode + ' > ' + 'delete' + '</button></td>' + //TODO replace delete button or the word with delete icon
                            '</tr>'

                        subtotal += product.quantity * product.product.price
                    })
                    $("#customer_items").html(customerItems);
                    $("#subtotal").html(subtotal);
                    total = subtotal * (12.5 / 100)
                    $("#total").html(subtotal + total);

                },
                error: error => {
                    console.log(error)
                }
            }
        )
    }

    getCQ()

    $('#printButton').click("on", function () {

        $.ajax(
            {
                url: 'http://localhost:8080/customerQueue/customerQueue',
                type: 'GET',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {

                    if (returnedJson.allProductDetails.length !== 0) {
                        location.replace("../HTML/Bill.html");
                    } else {
                        alert('no items added to bill')
                    }

                },
                error: error => {
                    console.log(error)
                }
            }
        )


    })

    $('#detail_search').on('click', function () {
        const productName = $('#detail_product_name_input').val()

        url = productName === '' ? 'http://localhost:8080/products/productsv' : 'http://localhost:8080/products/namev'
        type = productName === '' ? 'GET' : 'POST'

        $.ajax(
            {
                url: url,
                type: type,
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                data: {
                    name: productName
                },
                caches: false,
                success: data => {

                    productButtons = ""
                    data.data.forEach(product => {
                        productButtons += '<div class="col-auto"><button class="btn btn-secondary btn-lg product" barcode="' + product.barcode + '">' + product.name + '</button></div>'
                    })
                    $('#choose_product').html(productButtons)

                },
                error: error => {
                    console.log(error)
                }
            }
        )
    })

    $(document).on('click', '.product', async function () {

        await $.ajax(
            {
                url: 'http://localhost:8080/customerQueue/customerQueue',
                type: 'POST',
                data: {
                    barcode: this.getAttribute('barcode')
                },
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {

                    if (returnedJson.code === 'noadd') {
                        alert(returnedJson.message)
                    }

                },
                error: error => {
                    console.log(error)
                }
            }
        )

        await getCQ()
    })

    $(document).on('click', '.productdelete', async function () {
        await $.ajax(
            {
                url: 'http://localhost:8080/customerQueue/customerQueue',
                type: 'DELETE',
                data: {
                    barcode: this.getAttribute('barcode')
                },
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {
                },
                error: error => {
                    console.log(error)
                }
            }
        )

        await getCQ()
    })

    $('#hompage_logout').on('click', function () {
        localStorage.removeItem('POS_Token')
        location.replace("../HTML/Login.html")
    })

})