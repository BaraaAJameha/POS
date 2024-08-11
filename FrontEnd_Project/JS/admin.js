$(() => {

    $('#admin_name').html('Welcome ' + localStorage.getItem('POS_username'))

    $('#admin_search_item').on('click', () => {

        $('#admin_main_message').html('')

        $('#admin_main_header').html('<h2> Search for product </h2>')


        $('#admin_main_body').html(
            '<div class="input-group mb-3" style="width: 35rem;">' +
            '<input type="text" class="form-control" placeholder="product\'s name" aria-label="product\'s name"' +
            'aria-describedby="button-addon2" id="detail_product_name_input">' +
            '<button class="btn btn-outline-secondary" type="button" id="detail_search">search</button>' +
            '</div>' +
            '<div class="row gy-2 gx-3 align-items-center" style="width: 40%;" id="choose_product">' +
            '</div>' +
            '<br>' +
            '<div id="product_detail" class="card" style="width: 30rem;">' +
            '</div>'
        )

    })

    $(document).on('click', '#detail_search', async function () {
        $('#admin_main_message').html('')
        $('#product_detail').html('')
        let productName = $('#detail_product_name_input').val()

        url = productName === '' ? 'http://localhost:8080/products/products' : 'http://localhost:8080/products/name'
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

        $('#choose_product').html('')

        await $.ajax(
            {
                url: 'http://localhost:8080/products/producth',
                type: 'POST',
                data: {
                    barcode: this.getAttribute('barcode')
                },
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {
                    const selected = returnedJson.data[0].hidden ? 'selected' : ''

                    productDetail = '<div class="card-body">' +
                        '<h5 class="detail_name">' + returnedJson.data[0].name + '\'s details </h5>' +
                        '<p class="card-text" id="admin_update_old_barcode">' + returnedJson.data[0].barcode + '</p>' +
                        '</div>' +
                        '<ul class="list-group list-group-flush">' +

                        '<li class="list-group-item">' +
                        '<div class="input-group mb-3">' +
                        '<span class="input-group-text" id="detail_name">name</span>' +
                        '<input class="form-control" id="admin_update_name" aria-describedby="basic-addon3" value="' + returnedJson.data[0].name + '"></input>' +
                        '</div>' +
                        '</li>' +

                        '<li class="list-group-item">' +
                        '<div class="input-group mb-3">' +
                        '<span class="input-group-text" id="detail_barcode">barcode</span>' +


                        // '<span class="form-control" id="admin_update_barcode" aria-describedby="basic-addon3" >' + returnedJson.data[0].barcode + '</span>' +

                        '<input class="form-control" id="admin_update_barcode" aria-describedby="basic-addon3" type="number" min="0" value="' + returnedJson.data[0].barcode + '"></input>' +

                        '</div>' +
                        '</li>' +

                        '<li class="list-group-item">' +
                        '<div class="input-group mb-3">' +
                        '<span class="input-group-text" id="detail_quantity">quantity</span>' +
                        '<input class="form-control" id="admin_update_quantity" type="number" min="0" aria-describedby="basic-addon3" value="' + returnedJson.data[0].quantity + '"></input>' +
                        '</div>' +
                        '</li>' +

                        '<li class="list-group-item">' +
                        '<div class="input-group mb-3">' +
                        '<span class="input-group-text" id="detail_price">price</span>' +
                        '<input class="form-control" id="admin_update_price" type="number" min="0" aria-describedby="basic-addon3" value="' + returnedJson.data[0].price + '"></input>' +
                        '<span class="input-group-text">$</span>' +
                        '</div>' +
                        '</li>' +

                        '<li class="list-group-item">' +
                        '<div class="input-group mb-3">' +
                        '<span class="input-group-text" id="detail_material">material</span>' +
                        '<input class="form-control" id="admin_update_material" aria-describedby="basic-addon3" value="' + returnedJson.data[0].material + '"></input>' +
                        '</div>' +
                        '</li>' +

                        '<li class="list-group-item">' +
                        '<div class="input-group mb-3">' +
                        '<span class="input-group-text" id="detail_size">size</span>' +
                        '<input class="form-control" id="admin_update_size" aria-describedby="basic-addon3" value="' + returnedJson.data[0].size + '"></input>' +
                        '</div>' +
                        '</li>' +

                        '<li class="list-group-item">' +
                        '<div class="input-group mb-3">' +
                        '<span class="input-group-text" id="detail_color">color</span>' +
                        '<input class="form-control" id="admin_update_color" aria-describedby="basic-addon3" value="' + returnedJson.data[0].color + '"></input>' +
                        '</div>' +
                        '</li>' +

                        '<li class="list-group-item">' +
                        '<div class="input-group mb-3">' +
                        '<span class="input-group-text" id="detail_hidden">hidden</span>' +
                        '<select id="detail_isHidden" class="form-select" aria-label="Default select example">' +
                        '<option value="no"  ' + selected + '>False</option>' +
                        '<option value="yes" ' + selected + '>True</option>' +
                        '</select>' +
                        '</div>' +
                        '</li>' +


                        '<li class="list-group-item">' +
                        '<button id="admin_delete" class="btn btn-danger" style="margin: 10px; padding: 10px;" barcode="' + returnedJson.data[0].barcode + '"> Delete </button>' +
                        '<button id="admin_update" class="btn btn-warning" style="margin: 10px; padding: 10px;" barcode="' + returnedJson.data[0].barcode + '"> Update </button>' +
                        '</li>' +

                        '</ul>'

                    $('#product_detail').html(productDetail)
                },
                error: error => {
                    console.log(error)
                }
            }
        )

    })

    $(document).on('click', '#admin_delete', async function () {

        await $.ajax(
            {
                url: 'http://localhost:8080/products/product',
                type: 'DELETE',
                data: {
                    barcode: this.getAttribute('barcode')
                },
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {
                    // $('#admin_main_body').html(returnedJson.message)
                    $('#admin_main_body').html(
                        '<div class="input-group mb-3" style="width: 35rem;">' +
                        '<input type="text" class="form-control" placeholder="product\'s name" aria-label="product\'s name"' +
                        'aria-describedby="button-addon2" id="detail_product_name_input">' +
                        '<button class="btn btn-outline-secondary" type="button" id="detail_search">search</button>' +
                        '</div>' +
                        '<div class="row gy-2 gx-3 align-items-center" style="width: 40%;" id="choose_product">' +
                        '</div>' +
                        '<br>' +
                        '<div id="product_detail" class="card" style="width: 30rem;">' +
                        '</div>'
                    )
                    $('#admin_main_message').html('<h3> ' + returnedJson.message + ' </h3>')
                },
                error: error => {
                    console.log(error)
                }
            }
        )

    })

    $(document).on('click', '#admin_update', async function () {

        const oldbarcode = $('#admin_update_old_barcode').html()

        const name = $('#admin_update_name').val()
        const barcode = $('#admin_update_barcode').val()
        const quantity = $('#admin_update_quantity').val()
        const price = $('#admin_update_price').val()
        const material = $('#admin_update_material').val()
        const color = $('#admin_update_color').val()
        const size = $('#admin_update_size').val()
        const hidden = $('#detail_isHidden').val()

        if (!name || !barcode || !quantity || !price || !material || !color || !size || !hidden) {
            alert('missing elements')
            return
        }

        // check +ve barcode
        if (price < 0) {
            alert('barcode cannot be negaive')
            return
        }

        // check +ve price
        if (price < 0) {
            alert('price cannot be negaive')
            return
        }

        // check for +ve quantity
        if (quantity < 0) {
            alert('quantity cannot be negatice')
            return
        }

        // console.log(name, barcode, quantity, price, material, color, size)

        await $.ajax(
            {
                url: 'http://localhost:8080/products/product',
                type: 'PUT',
                data: {
                    oldbarcode: oldbarcode,
                    barcode: barcode,
                    name: name,
                    quantity: quantity,
                    price: price,
                    material: material,
                    color: color,
                    size: size,
                    hidden: hidden
                },
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {
                    // $('#admin_main_body').html(returnedJson.message)
                    $('#admin_main_body').html(
                        '<div class="input-group mb-3" style="width: 35rem;">' +
                        '<input type="text" class="form-control" placeholder="product\'s name" aria-label="product\'s name"' +
                        'aria-describedby="button-addon2" id="detail_product_name_input">' +
                        '<button class="btn btn-outline-secondary" type="button" id="detail_search">search</button>' +
                        '</div>' +
                        '<div class="row gy-2 gx-3 align-items-center" style="width: 40%;" id="choose_product">' +
                        '</div>' +
                        '<br>' +
                        '<div id="product_detail" class="card" style="width: 30rem;">' +
                        '</div>'
                    )
                    $('#admin_main_message').html('<h3> ' + returnedJson.message + ' </h3>')
                },
                error: error => {
                    $('#admin_main_body').html('')
                    $('#admin_main_message').html('<h3> ' + error.message + ' </h3>')
                    console.log(error)
                }
            }
        )

    })

    $('#admin_add_item').on('click', function () {

        $('#admin_main_message').html('')

        $('#admin_main_header').html('<h2> Add item </h2>')

        $('#admin_main_body').html(
            '<div class="card" style="width: 40rem;">' +
            '<div class="card-body">' +

            '<div class="row g-3">' +

            '<div class="col-md-6">' +
            '<label class="form-label">Barcode</label>' +
            '<input class="form-control" id="admin_add_barcode" min="0" type="number">' +
            '</div>' +
            '<div class="col-md-6">' +
            '<label class="form-label">Name</label>' +
            '<input class="form-control" id="admin_add_name">' +
            '</div>' +

            '<div class="col-md-6">' +
            '<label class="form-label">Price</label>' +
            '<div class="input-group">' +
            '<input class="form-control" id="admin_add_price" min="0" type="number">' +
            '<span class="input-group-text">$</span>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<label class="form-label">Quantity</label>' +
            '<input class="form-control" id="admin_add_quantity" min="0" type="number">' +
            '</div>' +

            '<div class="col-md-6">' +
            '<label class="form-label">Size</label>' +
            '<input class="form-control" id="admin_add_size">' +
            '</div>' +
            '<div class="col-md-6">' +
            '<label class="form-label">Color</label>' +
            '<input class="form-control" id="admin_add_color">' +
            '</div>' +

            '<div class="col-md-6">' +
            '<label class="form-label">Material</label>' +
            '<input class="form-control" id="admin_add_material">' +
            '</div>' +
            '<div class="col-md-6">' +
            '<label class="form-label">Hidden</label>' +
            '<select id="ishidden" class="form-select" aria-label="Default select example">' +
            '<option value="no" selected>False</option>' +
            '<option value="yes">True</option>' +
            '</select>' +
            '</div>' +

            '<button type="button" class="btn btn-lg btn-success" id="admin_add_product" style="margin-top: 50px;">add product</button>' +
            '' +
            '<div class="col-12 py-4" id="admin_main_message">' +

            '</div>' +

            '</div>' +
            '</div>' +
            '</div>'
        )

    })

    $(document).on('click', '#admin_add_product', async function () {

        const barcode = $('#admin_add_barcode').val()
        const name = $('#admin_add_name').val()
        const price = $('#admin_add_price').val()
        const quantity = $('#admin_add_quantity').val()
        const size = $('#admin_add_size').val()
        const color = $('#admin_add_color').val()
        const material = $('#admin_add_material').val()
        const hidden = $('#ishidden').val()

        // check for missing elements
        if (!barcode || !name || !price || !quantity || !size || !color || !material || !hidden) {
            alert('missing elements')
            return
        }

        if (barcode < 0) {
            alert('barcode cannot be negatice')
            return
        }

        // check for -ve price
        if (price < 0) {
            alert('price cannot be negaive')
            return
        }

        // check for +ve price
        if (quantity < 0) {
            alert('quantity cannot be negatice')
            return
        }

        // console.log(barcode, name, price, quantity, size, color, material, hidden)

        await $.ajax(
            {
                url: 'http://localhost:8080/products/products',
                type: 'POST',
                data: {
                    barcode: barcode,
                    name: name,
                    price: price,
                    quantity: quantity,
                    size: size,
                    color: color,
                    material: material,
                    hidden: hidden,
                },
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {
                    $('#admin_main_body').html('')
                    $('#admin_main_message').html('<h3> ' + returnedJson.message + ' </h3>')
                },
                error: error => {
                    $('#admin_main_body').html('')
                    $('#admin_main_message').html('<h3 class="btn-outline-danger" > an error occured in the data entered </h3>')
                }
            }
        )

    })

    $('#admin_add_employee').on('click', function () {
        $('#admin_main_message').html('')

        $('#admin_main_header').html('<h2> Add Employee </h2>')

        $('#admin_main_body').html(
            '<div class="card" style="width: 50rem;">' +
            '<div class="card-body">' +
            '<h4 class="card-title" style="padding-bottom: 30px;">Add employee</h4>' +

            '<div class="row g-3">' +

            '<div class="col-md-4">' +
            '<label class="form-label">First name</label>' +
            '<input class="form-control" id="admin_add_employee_firstname">' +
            '</div>' +

            '<div class="col-md-4">' +
            '<label class="form-label">Last name</label>' +
            '<input class="form-control" id="admin_add_employee_lastname">' +
            '</div>' +

            '<div class="col-md-4">' +
            '<label class="form-label">ID</label>' +
            '<input class="form-control" id="admin_add_employee_id" min="1" type="number">' +
            '</div>' +

            '<div class="col-md-4">' +
            '<label class="form-label">Email</label>' +
            '<input class="form-control" id="admin_add_employee_email">' +
            '</div>' +

            '<div class="col-md-4">' +
            '<label class="form-label">Gender</label>' +
            '<select id="admin_add_employee_gender" class="form-select" aria-label="Default select example">' +
            '<option value="noval" selected>Choose gender</option>' +
            '<option value="male">Male</option>' +
            '<option value="female">Female</option>' +
            '</select>' +
            '</div>' +

            '<div class="col-md-4">' +
            '<label class="form-label">Role</label>' +
            '<select id="admin_add_employee_role" class="form-select" aria-label="Default select example">' +
            '<option value="noval" selected>Choose role</option>' +
            '<option value="admin">Admin</option>' +
            '<option value="staff">Staff</option>' +
            '</select>' +
            '</div>' +

            '<div class="col-md-4">' +
            '<label class="form-label">Username</label>' +
            '<input class="form-control" id="admin_add_employee_username">' +
            '</div>' +

            '<div class="col-md-4">' +
            '<label class="form-label">Password</label>' +
            '<input type="password" class="form-control" id="admin_add_employee_password">' +
            '</div>' +

            '<div class="col-md-4">' +
            '<label class="form-label">Confirm password</label>' +
            '<input type="password" class="form-control" id="admin_add_employee_confirmpassword">' +
            '</div>' +

            '<button type="button" class="btn btn-lg btn-success" id="admin_add_new_employee"' +
            'style="margin-top: 50px;">add employee</button>' +
            '</div>' +

            '<div class="col-12 py-4" id="admin_main_message">' +

            '</div>' +

            '</div>' +
            '</div>' +
            '</div>'
        )
    })

    const validateEmail = email => {
        const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return email.match(emailRE)

    }

    $(document).on('click', '#admin_add_new_employee', async function () {

        const firstname = $('#admin_add_employee_firstname').val()
        const lastname = $('#admin_add_employee_lastname').val()
        const id = $('#admin_add_employee_id').val()
        const email = $('#admin_add_employee_email').val()
        const gender = $('#admin_add_employee_gender').val()
        const role = $('#admin_add_employee_role').val()
        const username = $('#admin_add_employee_username').val()
        const password = $('#admin_add_employee_password').val()
        const confirmpassword = $('#admin_add_employee_confirmpassword').val()

        const valres = validateEmail(email)

        if (!valres) {
            alert('email format is incorrect')
            return
        }

        if (!firstname || !lastname || !id || !email || gender === 'noval' || role === 'noval' || !username || !password || !confirmpassword) {
            alert('missing elements')
            return
        }

        if (id <= 0) {
            alert('id cannot be zero or negative')
            return
        }

        if (password !== confirmpassword || password === '') {
            $('#admin_add_employee_password').val('')
            $('#admin_add_employee_confirmpassword').val('')
            alert('passwords are not matching')
            return
        }

        await $.ajax(
            {
                url: 'http://localhost:8080/user/signup',
                type: 'POST',
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    user_id: id,
                    email: email,
                    gender: gender,
                    role: role,
                    username: username,
                    password: password
                },
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: returnedJson => {
                    // $('#admin_main_body').html(returnedJson.message)
                    $('#admin_main_body').html('')
                    $('#admin_main_message').html('<h3> ' + returnedJson.message + ' </h3>')
                },
                error: error => {
                    $('#admin_main_body').html('')
                    $('#admin_main_message').html('<h3 class="btn-outline-danger"> an error occured while adding a new user </h3>')
                }
            }
        )

    })

    $('#admin_make_sale').on('click', function () {
        $('#admin_main_message').html('')

        $('#admin_main_header').html('')

        $('#admin_main_body').html('')

        location.replace('../HTML/Homepage.html')
    })

    $('#admin_get_employees').on('click', async function () {

        $('#admin_main_message').html('')

        $('#admin_main_header').html('<h2> All employees </h2>')

        await $.ajax(
            {
                url: 'http://localhost:8080/user/users',
                type: 'GET',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("POS_Token")
                },
                caches: false,
                success: users => {
                    let allUsers = '<div class="d-flex flex-row bd-highlight mb-3" style="flex-wrap: wrap;">'
                    users.forEach(user => {
                        allUsers +=
                            '<div class="p-2 bd-highlight">' +
                            '<div class="card" style="width: 20rem;">' +

                            '<div class="card-body">' +
                            '<h5 class="card-title">' + user.firstname + ' ' + user.lastname + '</h5>' +
                            '<h6 class="card-subtitle mb-2 text-muted">' + user.role + '</h6>' +

                            '<br>' +

                            '<div class="input-group mb-3">' +
                            '<span class="input-group-text">id</span>' +
                            '<label class="form-control">' + user.user_id + '</label>' +
                            '</div>' +

                            '<div class="input-group mb-3">' +
                            '<span class="input-group-text">@</span>' +
                            '<label class="form-control">' + user.username + '</label>' +
                            '</div>' +

                            '<div class="input-group mb-3">' +
                            '<span class="input-group-text">email</span>' +
                            '<label class="form-control">' + user.email + '</label>' +
                            '</div>' +

                            '</div>' +
                            '</div>' +
                            '</div>'
                    })
                    allUsers += '</div>'
                    $('#admin_main_body').html(allUsers)
                },
                error: error => {
                    console.log(error)
                }
            }
        )

    })

    $('#admin_logout').on('click', function () {
        localStorage.removeItem('POS_Token')
        localStorage.removeItem('POS_username')
        localStorage.removeItem('POS_admin')
        location.replace("../HTML/Login.html")
    })

})