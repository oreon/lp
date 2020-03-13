$(document).ready(function(){


    $('#change-password-btn').click(function(){
        changePasswordModalCleanup();
    });

    $('#my-account-password-form').on("submit", function(e){
        $('#my-account-change-password-modal input').css("border", "1px solid #e5e6e7");
        var password1 = $('#new-password1').val();
        var password2 = $('#new-password2').val();
        var emptyInputs = $('#my-account-password-form .new-password-input').filter(function() { return $(this).val() == ""; });
        var $form = $('#my-account-password-form');

        e.preventDefault();
        if(emptyInputs.size() == 0){
            if(password1 == password2){

                 $.ajax({
                      url: $form.attr('action'),
                      type: 'post',
                      data: $form.serialize(),
                      success: function(response) {
                        setSuccessMessage("Password updated successfully");
                        setTimeout(function(){
                            $('#my-account-change-password-modal').modal("hide");
                        }, 1000);

                      }
                  });
            } else {
                setErrorMessage("Passwords do not match");
            }
        } else {
            setErrorMessage("Please fill out required fields");
            emptyInputs.each(function() {
                $(this).css("border", "1px solid red");
            });
        }

    });

});

function changePasswordModalCleanup(){
    $('#my-account-change-password-modal input').css("border", "1px solid #e5e6e7");
    $('#my-account-change-password-message').html("");
    $('#new-password1').val("");
    $('#new-password2').val("");
    $('#my-account-change-password-modal').modal("show");
}

function setErrorMessage(message){
    $('#my-account-change-password-message').css("color", "red");
    $('#my-account-change-password-message').html(message);
}

function setSuccessMessage(message){
    $('#my-account-change-password-message').css("color", "green");
    $('#my-account-change-password-message').html(message);
}