'use strict';
$(function () {
    var validate = $("#passwordForm").validate({
        rules: {
            password1: {
                required: true,
                pwcheck: true
            },
            password2: {
                required: true,
                equalTo: password1
            }
        },
        messages: {
            password1: {
                required: "*",
                pwcheck: "Password must contain atlease 8 character with atleast one number"
            },
            password2: {
                required: '*',
                equalTo: "Password didn't match"
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $.validator.addMethod("pwcheck", function (value) {
        var regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return regex.test(value);
    });

    $("#btnSubmit").on('click', function (e) {
        e.preventDefault();
        if (validate.form())
            submit();
    });
    function submit() {
        var accessToken = ($("#accessToken").val()).trim();
        var password = ($("#password1").val()).trim();
        var submitButtonText = $('#btnSubmit').text();
        $.ajax({
            type: 'PATCH',
            url: '/api/change-password/confirm/' + accessToken,
            contentType: "application/json",
            data: JSON.stringify({password: password}),
            beforeSend: function () {
                // this is where we append a loading image
                $('#btnSubmit').text('Changing...').prop("disabled", true);
            },
            success: function (data) {
                if (data.message)
                    window.location = "/login";
            },
            error: function (err, data, msg) {
                // failed request; give feedback to user
                $('#btnSubmit').text(submitButtonText).prop("disabled", false);
                $('#message').html('<label>' + msg + '</label>').css("visibility", "visible").fadeIn();
            }
        });
    }
});
