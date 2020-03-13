$(document).ready(function(){
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");


    /* CSRF token setup */
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
    /* REGEX for email addresses */
    emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    /* Global varable for when adding/editing user */
    addUserVerified = false;
    editUserVerified = false;




    /* Edit user */
    $('.edit-user').click(function(){
        editUserModalCleanup();
        var username = $(this).parent().siblings('.user-username').html();
        var email = $(this).parent().siblings('.user-email').html();
        var role = $(this).parent().siblings('.user-role').html();
        var priv = $(this).parent().siblings('.user-priv').html();
        if($(this).parent().siblings('.user-active').html() == "") {
            $('.edit-user-switch').html("<button style='float:left' type='submit' class='btn btn-success' id='edit-user-activate'>Activate</button>");
            $('.edit-user-switch').append("<input name='action' value='activate' hidden />");
        } else {
            $('.edit-user-switch').html("<button style='float:left' type='submit' class='btn btn-danger' id='edit-user-deactivate'>Deactivate</button>");
            $('.edit-user-switch').append("<input name='action' value='deactivate' hidden />");
        }

        $('#edit-username').val(username);
        $('#deactivate-username').val(username);
        $('#edit-email').val(email);
        $('#edit-role option[value="' + role +'"]').prop("selected", true);
        $('#edit-priv option[value="' + priv +'"]').prop("selected", true);
        $('#edit-modal-header').html("Edit User: " + username)
        $('#edit-user-modal').modal("show");
    });

    /* Add user */
    $('#add-user').click(function(){
        addUserModalCleanup();
        $('#add-user-modal').modal("show");

    });

    $('#add-user-form').on("submit", function(e){

        var username = $('#add-username').val();
        $('#add-user-modal input').css("border", "1px solid #e5e6e7");
        $('#add-user-error').html("");
        var password1 = $('#add-password1').val();
        var password2 = $('#add-password2').val();
        var email = $('#add-email').val();
        var emptyInputs = $('#add-user-form .add-user-input').filter(function() { return $(this).val() == ""; });

        if(!addUserVerified){
            e.preventDefault();
            usernameCheck(username).done(function(exists){
                if(emptyInputs.size() == 0){
                    if(password1 == password2){
                        if(emailPattern.test(email)){
                            if(!exists){
                                addUserVerified = true;
                                $('#add-user-form').submit();
                            } else {
                                $('#add-user-error').html("User already exists");
                            }
                        } else {
                            $('#add-user-error').html("Provided email is incorrect format");
                            $('#add-email').css("border", "1px solid red");
                        }
                    } else {
                        $('#add-password1').css("border", "1px solid red");
                        $('#add-password2').css("border", "1px solid red");
                        $('#add-user-error').html("Passwords do not match");
                    }
                } else {
                    $('#add-user-error').html("Please fill out required fields");
                    emptyInputs.each(function() {
                        $(this).css("border", "1px solid red");
                    });
                }
            });
        }
    });

    $('#edit-user-form').on("submit", function(e){

        var username = $('#edit-username').val();
        $('#edit-user-modal input').css("border", "1px solid #e5e6e7");
        $('#edit-user-error').html("");
        var password1 = $('#edit-password1').val();
        var password2 = $('#edit-password2').val();
        var email = $('#edit-email').val();

        if(!editUserVerified){
            e.preventDefault();
            if(email !== ""){
                if(password1 == password2){
                    if(emailPattern.test(email)){
                        editUserVerified = true;
                        $('#edit-user-form').submit();
                    } else {
                        $('#edit-user-error').html("Provided email is incorrect format");
                        $('#edit-email').css("border", "1px solid red");
                    }
                } else {
                    $('#edit-password1').css("border", "1px solid red");
                    $('#edit-password2').css("border", "1px solid red");
                    $('#edit-user-error').html("Passwords do not match");
                }
            } else {
                $('#edit-user-error').html("Please provide email");
            }
        }
    });



});




function usernameCheck(username){
    return $.get("/checkUserExists", {"username": username});
}



/* Clean the modal for reuse */
function addUserModalCleanup(){
    $('#add-user-modal input').css("border", "1px solid #e5e6e7");
    $('#add-user-error').html("");
}

/* Clean the modal for reuse */
function editUserModalCleanup(){
    $('#edit-user-form input').css("border", "1px solid #e5e6e7");
    $('#edit-user-error').html("");
}