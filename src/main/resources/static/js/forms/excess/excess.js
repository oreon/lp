$(function () {
    var token = _csrf_token;
    var header = "X-CSRF-TOKEN";
    $(document).ajaxSend(function (e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});


$(document).ready(function () {

    $('.policy-coverage-options label').click(function(){
       $(this).find('input[name="desiredAmmount"]').trigger('click');
    });

    $('.iCheck-helper').click(function() {
        $(this).parent().find('input[name="desiredAmmount"]').trigger('click');
        $(this).parent().find('input[name="Instalment"]').trigger('click');
    });

    $('.excessTab').click(function(){
        save();
    });

    (function($) {
        $.fn.inputFilter = function(inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        };
    }(jQuery));

    $(".NumbersOnly").inputFilter(function(value) {
        return /^\d*$/.test(value); });


    <!-- Help Icon -->
    $('.questionHelp').click(function () {
        hidePopup(1); //TODO: Remove parameter
        $(this).parent().parent().find('.questionHelpText').fadeIn();
    });

    $('.nop').chosen({placeholder_text_single: 'Select an option'});
    $('.chosen-container').each(function () {
        $(this).width($(this).prev().width());
    });

    $('#btnEdit').click(function () {
        edit();
        return false;
    });

    $('#btnEditCancel').click(function () {
        window.location.reload();
    });


    $('.questionTitleInput').blur(function () {
        if ($(this).val() != $(this).prev().html()) {
            $.ajax({
                url: "/forms/update/questionText",
                type: "post",
                dataType: "json",
                data: {'id': $(this).parent().parent().find('.questionID').val(), 'text': $(this).val()},
                success: function (result) {
                    Lobibox.notify(
                        'success',
                        {
                            msg: 'Question has been saved'
                        }
                    );
                },
                error: function (result) {
                    Lobibox.notify(
                        'error',
                        {
                            msg: 'Unable to save question'
                        }
                    );

                }
            });

        }
    });

    $('.questionInstructionsInput').blur(function () {
        //TODO: Send API call to update question

        if ($(this).val() != $(this).prev().html()) {
            $.ajax({
                url: "/forms/update/questionInstructions",
                type: "post",
                dataType: "json",
                data: {'id': $(this).parent().find('.questionID').val(), 'text': $(this).val()},
                success: function (result) {
                    Lobibox.notify(
                        'success',
                        {
                            msg: 'Question has been saved'
                        }
                    );
                },
                error: function (result) {
                    Lobibox.notify(
                        'error',
                        {
                            msg: 'Unable to save question'
                        }
                    );

                }
            });
        }
    });


    $('.questionHelpInput').blur(function () {
        //TODO: Send API call to update question
        if ($(this).val() != $(this).prev().html()) {
            $.ajax({
                url: "/forms/update/questionHelp",
                type: "post",
                dataType: "json",
                data: {'id': $(this).parent().parent().find('.questionID').val(), 'text': $(this).val()},
                success: function (result) {
                    Lobibox.notify(
                        'success',
                        {
                            msg: 'Question has been saved'
                        }
                    );
                },
                error: function (result) {
                    Lobibox.notify(
                        'error',
                        {
                            msg: 'Unable to save question'
                        }
                    );

                }
            });
        }
    });


});


function showPopup(id) {
    hidePopup(1);
}

function hidePopup(id) {
    $('.questionHelpText').fadeOut();
}

function save() {

    var data = getExcessFormJson();
    $.ajax({
        url: "/forms/save/newexcessform",
        type: "post",
        contentType : "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (result) {
            return true;
        },
        error: function (a, b, c) {

            return false;
        }
    });
}

function next(details) {
    save();

    if (details) {
        toggleDetails(false);
        $('#btnUpdateDetails').prop('disabled', false);
        //TODO : Save details with another API call
    }

    $('#myTabedu1').find('li.active').next().children().first().trigger('click');
    window.scrollTo(0, 0);
}

function validate() {

    var result = true;
    var msg = '';
    var tab = null;

    $('.radioError').each(function () {
        $(this).removeClass('radioError');
        $('.errorMessage').each(function () {
            $(this).remove();
        });
    });

    if ($('#filer-name').val() == '') {
        var msg = 'Please provide name of filer';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#filer-name'));

        $('#filer-name').addClass('radioError');
        $('#yourInfoTab').addClass('radioError');
        if (tab == null) {
            tab = $('#yourInfoTab');
        }
        result = false;
    }


    if ($('#branch-outside-ontario-yes').is(':checked') == false && $('#branch-outside-ontario-no').is(':checked') == false) {
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#branch-outside-ontario-yes').parent().parent());

        $('#branch-outside-ontario-yes').parent().parent().addClass('radioError');
        $('#yourInfoTab').addClass('radioError');

        if (tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }

    if ($('#outside-ontario-city').val() == '' && $('#branch-outside-ontario-yes').is(':checked') == true) {
        var msg = 'Please enter name of city';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#outside-ontario-city'));

        $('#outside-ontario-city').addClass('radioError');

        if (tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }

    if ($('#branch-outside-canada-yes').is(':checked') == false && $('#branch-outside-canada-no').is(':checked') == false) {
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#branch-outside-canada-yes').parent().parent());

        $('#branch-outside-canada-yes').parent().parent().addClass('radioError');
        $('#yourInfoTab').addClass('radioError');

        if (tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }

    if ($('#branch-outside-canada-yes').is(':checked') && $('#outside-canada-country').val() == '') {
        var msg = 'Please enter name of country';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#outside-canada-country'));

        $('#outside-canada-country').addClass('radioError');
        $('#yourInfoTab').addClass('radioError');

        if (tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }

    if ($('#nature-of-law-practice').val() == null) {
        var msg = 'Please select the nature of your law practice';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#nature-of-law-practice').next());
        $('#nature-of-law-practice').next().addClass('radioError');

        $('#yourInfoTab').addClass('radioError');

        if (tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }

    var applicantLetterheadExists = false;

    $.each($('#your-firm-letterhead input[type="file"]'), function(index, value) {
       if ($(this).val() !== '') {
           applicantLetterheadExists = true;
       }
    });

    if (!applicantLetterheadExists) {
        var msg = 'Please provide the applicants letterhead';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#attach-your-letterhead-btn'));

        $('#attach-your-letterhead-btn').addClass('radioError');
        $('#yourInfoTab').addClass('radioError');

        if (tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }

    var applicantLetterheadTooBig = false;
    $.each($('#your-firm-letterhead input[type="file"]'), function(index, value) {
        if($(this).val() != '') {
            var file = $(this)[0].files[0];
            if (file.size > 1500000) {
                $(this).parent().parent().addClass('radioError');
                applicantLetterheadTooBig = true;
            }
        }
    });

    if(applicantLetterheadTooBig) {
        var msg = 'One of your files is too big (1.5mb max)';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#attach-your-letterhead-btn'));

        $('#attach-your-letterhead-btn').addClass('radioError');
        $('#yourInfoTab').addClass('radioError');

        if(tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }



    if ($('#share-office-space-yes').is(':checked') == false && $('#share-office-space-no').is(':checked') == false) {
        var msg = 'Please select a response to this shared office space inquiry';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#share-office-space-yes').parent().parent());

        $('#share-office-space-yes').parent().parent().addClass('radioError');
        $('#yourInfoTab').addClass('radioError');

        if (tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }

    if ($('#share-office-space-yes').is(':checked') == true) {

        if ($('#share-office-yes').is(':checked') == false && $('#share-office-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares office space';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-office-yes').parent().parent());

            $('#share-office-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#refer-other-name').val() == '') {
            var msg = 'Please enter name of lawyer and name of the other law practice or business';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#refer-other-name'));

            $('#refer-other-name').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-reception-yes').is(':checked') == false && $('#share-reception-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares reception area/receptionist';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-reception-yes').parent().parent());

            $('#share-reception-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-telephone-yes').is(':checked') == false && $('#share-telephone-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares a telephone number';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-telephone-yes').parent().parent());

            $('#share-telephone-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if(tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-telephone-yes').is(':checked') && $('#telephone-refer-info').val() == '') {
            var msg = 'Please provide details';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#telephone-refer-info'));

            $('#telephone-refer-info').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-fax-yes').is(':checked') == false && $('#share-fax-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares a fax number';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-fax-yes').parent().parent());

            $('#share-fax-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-fax-yes').is(':checked') && $('#fax-refer-info').val() == '') {
            var msg = 'Please provide details';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#fax-refer-info'));

            $('#fax-refer-info').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-email-yes').is(':checked') == false && $('#share-email-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares an email address';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-email-yes').parent().parent());

            $('#share-email-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-website-yes').is(':checked') == false && $('#share-website-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares a website';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-website-yes').parent().parent());

            $('#share-website-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-website-yes').is(':checked') && $('#website-refer-info').val() == '') {
            var msg = 'Please provide details';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#website-refer-info'));

            $('#website-refer-info').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-letterhead-yes').is(':checked') == false && $('#share-letterhead-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares a letterhead';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-letterhead-yes').parent().parent());

            $('#share-letterhead-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-letterhead-yes').is(':checked') && $('#letterhead-refer-info').val() == '') {
            var msg = 'Please provide details';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#letterhead-refer-info'));

            $('#letterhead-refer-info').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-signage-yes').is(':checked') == false && $('#share-signage-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares signage';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-signage-yes').parent().parent());

            $('#share-signage-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-signage-yes').is(':checked') && $('#signage-refer-info').val() == '') {
            var msg = 'Please provide details';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#signage-refer-info'));

            $('#signage-refer-info').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-promo-yes').is(':checked') == false && $('#share-promo-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares promotional material';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#share-promo-yes').parent().parent());

            $('#share-promo-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#share-promo-yes').is(':checked') && $('#promo-refer-info').val() == '') {
            var msg = 'Please provide details';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#promo-refer-info'));

            $('#promo-refer-info').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#prac-assoc-other-law-yes').is(':checked') == false && $('#prac-assoc-other-law-no').is(':checked') == false) {
            var msg = 'Please select if applicant firm shares employees';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#prac-assoc-other-law-yes').parent().parent());

            $('#prac-assoc-other-law-yes').parent().parent().addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

        if ($('#prac-assoc-other-law-yes').is(':checked') && $('#assoc-refer-info').val() == '') {
            var msg = 'Please provide details';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#assoc-refer-info'));

            $('#assoc-refer-info').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

    }

    if ($('#firm-assoc-other-yes').is(':checked') == false && $('#firm-assoc-other-no').is(':checked') == false) {
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#firm-assoc-other-yes').parent().parent());

        $('#firm-assoc-other-yes').parent().parent().addClass('radioError');
        $('#yourInfoTab').addClass('radioError');

        if (tab == null) {
            tab = $('#yourInfoTab');
        }

        result = false;
    }

    if ($('#firm-assoc-other-yes').is(':checked') == true) {
        if ($('.firm-assoc-other-info .table').find('tr:not(:has(th))').length == 0) {
            var msg = 'Please add up to 5 firms';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('.firm-assoc-other-info .table'));

            $('#firm-assoc-modal-toggle').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if (tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }
    }

        var assocLetterheadTooBig = false;

        $.each($('#related-firm-letterhead input[type="file"]'), function(index, value) {
            if($(this).val() != '') {
                var file = $(this)[0].files[0];
                if (file.size > 1500000) {
                    $(this).parent().parent().addClass('radioError');
                    assocLetterheadTooBig = true;
                }
            }

        });



        if(assocLetterheadTooBig) {
            var msg = 'One of your files is too big (1.5mb max)';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#related-letterhead-btn'));

            $('#related-letterhead-btn').addClass('radioError');
            $('#yourInfoTab').addClass('radioError');

            if(tab == null) {
                tab = $('#yourInfoTab');
            }

            result = false;
        }

    if ($('#DateofPolicy').val() == '') {
        var msg = 'Please provide Requested Effective Date';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#DateofPolicy').parent().parent());

        $('#DateofPolicy').parent().addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');
        if (tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }


    if (!isValidDate($('#DateofPolicy').val()) && $('#DateofPolicy').val() !== '') {
        var msg = 'Please enter a correctly formatted date as MMM DD, YYYY (or use the Calendar Selection feature)';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#DateofPolicy').parent());

        $('#DateofPolicy').parent().addClass('radioError');

        $('#coverageRequestedTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if($('#desired-amount-val').val() == '' || $('#desired-amount-val').val() == null) {
        var msg = 'Please provide desired amount of Excess Coverage';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('.policy-coverage-options'));

        $('#coverageRequestedTab').addClass('radioError');

        $('.policy-coverage-options').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if($('#coverage-reason-for-applying').val() == '') {
        var msg = 'Please provide reason for applying';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-reason-for-applying'));
        $('#coverage-reason-for-applying').addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }



    if($('#coverage-former-firm-yes').is(':checked') == false && $('#coverage-former-firm-no').is(':checked') == false) {
        var msg = 'Please answer does the applicant firm wish to request coverage for a management company?';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-former-firm-yes').parent().parent());
        $('#coverage-former-firm-yes').parent().parent().addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if($('#coverage-former-firm-yes').is(':checked')){
        if($('.coverage-former-firm-info .table').find('tr:not(:has(th))').length == 0) {
            var msg = 'Please add former firm';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('.coverage-former-firm-info .table'));

            $('#coverage-former-firm-modal-toggle').addClass('radioError');
            $('#coverageRequestedTab').addClass('radioError');

            if(tab == null) {
                tab = $('#coverageRequestedTab');
            }

            result = false;
        }
    }

    if($('#coverage-man-yes').is(':checked') == false && $('#coverage-man-no').is(':checked') == false) {
        var msg = 'Please answer does the applicant firm wish to request coverage for a management company?';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-man-yes').parent().parent());
        $('#coverage-man-yes').parent().parent().addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if($('#coverage-man-yes').is(':checked')) {
        if($('.coverage-man-info .table').find('tr:not(:has(th))').length == 0){
            var msg = 'Please add management company';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('.coverage-man-info .table'));
            $('#coverage-man-firm-modal-toggle').addClass('radioError');
            $('#coverageRequestedTab').addClass('radioError');

            if(tab == null) {
                tab = $('#coverageRequestedTab');
            }

            result = false;
        }
    }

    var manCompanyLetterheadTooBig = false;

    $.each($('#man-company-letterhead input[type="file"]'), function(index, value) {
        if($(this).val() != '') {
            var file = $(this)[0].files[0];
            if (file.size > 1500000) {
                $(this).parent().parent().addClass('radioError');
                manCompanyLetterheadTooBig = true;
            }
        }
    });

    if(manCompanyLetterheadTooBig) {
        var msg = 'One of your files is too big (1.5mb max)';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-man-letterhead-btn'));

        $('#coverage-man-letterhead-btn').addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if ($('#coverage-assoc-num-lawyers').val() == '') {
        var msg = 'Please provide the number of lawyers';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-assoc-num-lawyers').parent().parent());

        $('#coverage-assoc-num-lawyers').parent().addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if (tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if($('#coverage-assoc-num-lawyers').val() != '' && parseInt($('#coverage-assoc-num-lawyers').val()) > 999 ) {
        var msg = 'Number of lawyers cannot be more than 999';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-assoc-num-lawyers').parent().parent());

        $('#coverage-assoc-num-lawyers').parent().addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if (tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    } else if ($('#coverage-assoc-num-lawyers').val() != '' && parseInt($('#coverage-assoc-num-lawyers').val()) < 1) {
        var msg = 'Number of lawyers cannot be less than 1';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-assoc-num-lawyers').parent().parent());

        $('#coverage-assoc-num-lawyers').parent().addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if (tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if($('#coverage-insure-counsel-yes').is(':checked') == false && $('#coverage-insure-counsel-no').is(':checked') == false) {
        var msg = 'Please indicate the total number of LAWYER(s) (including "of counsel") in the APPLICANT FIRM.';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-insure-counsel-yes').parent().parent());
        $('#coverage-insure-counsel-yes').parent().parent().addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if($('#coverage-insure-counsel-yes').is(':checked')) {
        if($('.coverage-counsel-info .table').find('tr:not(:has(th))').length == 0) {
            var msg = "Please add 'Of Counsel' lawyer.";
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('.coverage-counsel-info .table'));
            $('#coverage-insure-counsel-modal-toggle').addClass('radioError');
            $('#coverageRequestedTab').addClass('radioError');

            if(tab == null) {
                tab = $('#coverageRequestedTab');
            }

            result = false;
        }
    }

    if($('#coverage-buyup-yes').is(':checked') == false && $('#coverage-buyup-no').is(':checked') == false) {
        var msg = 'Please answer is the applicant interested in LAWPRO’s Innocent Party Sublimit Buy-up Coverage of $1 million per CLAIM/in the aggregate? Please provide copy of applicant firm letterhead.';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-buyup-yes').parent().parent());
        $('#coverage-buyup-yes').parent().parent().addClass('radioError');
        $('#coverageRequestedTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if ($('#coverage-buyup-no').is(':checked') && $('#coverage-buy-up-dec').is(':checked') == false) {
        var msg = 'Please sign the innocent party declaration.';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#buy-up-evidence-val').parent().parent());
        $('.buy-up-dec-container').find('.icheckbox_square-green').addClass('radioError')
        $('#coverageRequestedTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageRequestedTab');
        }

        result = false;
    }

    if($('#other-purchased-coverage-yes').is(':checked') == false && $('#other-purchased-coverage-no').is(':checked') == false) {
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-purchased-coverage-yes').parent().parent())
        $('#other-purchased-coverage-yes').parent().parent().addClass('radioError');

        $('#otherInsuranceTab').addClass('radioError');

        if(tab == null) {
            tab = $('#otherInsuranceTab');
        }

        result = false;

    }

    if($('#other-purchased-coverage-yes').is(':checked')){
        if($('.other-purchased-coverage-info .table').find('tr:not(:has(th))').length == 0) {
            var  msg = 'Please add insurer';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('.other-purchased-coverage-info .table'));
            $('#other-purchased-coverage-toggle').addClass('radioError');
            $('#otherInsuranceTab').addClass('radioError');

            if(tab == null) {
                tab = $('#otherInsuranceTab');
            }

            result = false;
        }
    }

    if($('#other-purchase-extra-coverage-yes').is(':checked') == false && $('#other-purchase-extra-coverage-no').is(':checked') == false) {
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-purchase-extra-coverage-yes').parent().parent());
        $('#other-purchase-extra-coverage-yes').parent().parent().addClass('radioError');
        $('#otherInsuranceTab').addClass('radioError');

        if(tab == null) {
            tab = $('#otherInsuranceTab');
        }

        result = false;
    }

    if($('#other-purchase-extra-coverage-yes').is(':checked') && $('#other-purchase-extra-coverage-details').val() == '') {
        var msg = 'Please provide details';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-purchase-extra-coverage-details'));

        $('#other-purchase-extra-coverage-details').addClass('radioError');
        $('#otherInsuranceTab').addClass('radioError');

        if (tab == null) {
            tab = $('#otherInsuranceTab');
        }

        result = false;
    }

    if($('#other-denied-yes').is(':checked') == false && $('#other-denied-no').is(':checked') == false) {
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-denied-yes').parent().parent());

        $('#other-denied-yes').parent().parent().addClass('radioError');
        $('#otherInsuranceTab').addClass('radioError');

        if (tab == null) {
            tab = $('#otherInsuranceTab');
        }

        result = false;
    }

    if($('#other-denied-yes').is(':checked') && $('#other-denied-details').val() == '') {
        var msg = 'Please provide details';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-denied-details'));

        $('#other-denied-details').addClass('radioError');
        $('#otherInsuranceTab').addClass('radioError');

        if (tab == null) {
            tab = $('#otherInsuranceTab');
        }

        result = false;
    }

    if($('#third-party-payor-yes').is(':checked') == false && $('#third-party-payor-no').is(':checked') == false) {
        var msg = 'Please select a third party option';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#third-party-payor-yes').parent().parent());

        $('#third-party-payor-yes').parent().parent().addClass('radioError');
        $('#paymentTab').addClass('radioError');

        if(tab == null) {
            tab = $('#paymentTab');
        }

        result = false;
    }

    if ($('#Instalment_Option').val() == '')
    {
        var msg = 'Please select a payment option';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#paymentOptions'));

        $('#paymentOptions').addClass('radioError');
        $('#paymentTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#paymentTab');
        }

        result = false;
    }


    if ($('#Instalment_Option').val() != '' && $('#Instalment_Option').val() != '1S CASH' && $('#PPA_Check').is(':checked') == false) {
        var msg = 'Please sign the payment declaration';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#PPA_Check').parent().parent());

        $('#PPA_Check').parent().addClass('radioError');
        $('#paymentTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#paymentTab');
        }

        result = false;
    }

    if ($('#Instalment_Option').val() == '1S EFT' || $('#Instalment_Option').val() == '4S EFT' || $('#Instalment_Option').val() == '12S EFT') {
        if ($('#transitNumber').val() == '') {
            var msg = 'Please enter your transit number';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#transitNumber').parent().parent());

            $('#transitNumber').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            if (tab == null)
            {
                tab = $('#paymentTab');
            }

            result = false;
        } else if ($('#transitNumber').val() != '' && $('#transitNumber').val().length < 5) {
            var msg = 'Transit Number must be a 5-digit number';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#transitNumber').parent().parent());

            $('#transitNumber').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            if (tab == null)
            {
                tab = $('#paymentTab');
            }

            result = false;
        }
        if (isNaN($('#transitNumber').val()))
        {
            var msg = 'Transit number must be numeric';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#transitNumber').parent().parent());

            $('#transitNumber').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            if (tab == null)
            {
                tab = $('#paymentTab');
            }

            result = false;
        }
        if ($('#accountNumber').val() == '')
        {
            var msg = 'Please enter your account number';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#accountNumber').parent().parent());

            $('#accountNumber').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            if (tab == null)
            {
                tab = $('#paymentTab');
            }

            result = false;
        }
        if (isNaN($('#accountNumber').val()))
        {
            var msg = 'Account number must be numeric';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#accountNumber').parent().parent());

            $('#accountNumber').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            if(tab == null) {
                tab = $('#paymentTab');
            }
            result = false;
        }

        if (!isNaN($('#accountNumber').val()) && $('#accountNumber').val() != '' && $('#accountNumber').val().length < 7) {
            var msg = 'Account number must be at least 7 digits';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#accountNumber').parent().parent());

            $('#accountNumber').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            if(tab == null) {
                tab = $('#paymentTab');
            }
            result = false;
        }
        if ($('#bankingInstitution2').val() == '')
        {
            var msg = 'Please select your banking institution';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#BankingInstitution').parent().parent());

            $('#BankingInstitution').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            if (tab == null)
            {
                tab = $('#paymentTab');
            }

            result = false;
        }
        if ($('#NameOnAccount').val() == '')
        {
            var msg = 'Please enter the name on your account';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#NameOnAccount').parent().parent());

            $('#NameOnAccount').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            if (tab == null)
            {
                tab = $('#paymentTab');
            }

            result = false;
        }
    }

    if($('#claims-yes').is(':checked') == false && $('#claims-no').is(':checked') == false){
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#claims-yes').parent().parent());

        $('#claims-yes').parent().parent().addClass('radioError');
        $('#authTab').addClass('radioError');

        if(tab == null) {
            tab = $('#authTab');
        }

        result = false;
    }

    if ($('#auth-sig').is(':checked') == false) {
        var msg = 'Please sign your warranty and signature declaration';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#auth-sig').parent().parent());
        $('#auth-sig').parent().addClass('radioError');
        $('#authTab').addClass('radioError');

        if(tab == null) {
            tab = $('#authTab');
        }

        result = false;
    }



    // if($('#coverage-former-firm-yes').is(':checked')) {
    //     var rows = $('#coverage-former-firm-add-table .table > tr');
    //     if(rows == 0) {
    //         var msg = 'Please provide information for the related firms';
    //         var errorElement = document.createElement('div');
    //         errorElement.setAttribute('class', 'errorMessage');
    //         errorElement.append(document.createTextNode(msg));
    //         $(errorElement).insertAfter($('#coverage-former-firm-yes').parent());
    //         $('##coverage-former-firm-add-table .table').addClass('radioError');
    //
    //         if(tab == null) {
    //             tab = $('#coverageRequestedTab');
    //         }
    //
    //         result = false;
    //     }
    // }




    if (!result) {
        showValidateErrors(tab, 'Please fill out all required fields');
    } else {
        $('#review-btn').attr('hidden', true);
        $('#submit-btn').removeAttr('hidden');
    }


    return result;
}

function validateAPI() {

    var json = getExcessFormJson();


    var validAPIForm = false;
    $.ajax({
        url: "/forms/validate/newexcessform",
        type: "post",
        async: false,
        dataType: "json",
        data: {form : json},
        success: function (result) {
            if (result.error == false) {
                validAPIForm = true;
            } else {

                for (var i = 0; i < result.violations.length; i++) {
                    var errorElement = document.createElement('div');
                    errorElement.setAttribute('class', 'errorMessage');
                    errorElement.appendChild(document.createTextNode(result.violations[i].message));
                    if ($("input[data-id='" + result.violations[i].name + "']").length > 0) {
                        $(errorElement).insertAfter("input[data-id='" + result.violations[i].name + "']");
                        $("input[data-id='" + result.violations[i].name + "']").addClass('radioError');

                        //find tab
                        $('#' + $("input[data-id='" + result.violations[i].name + "']").closest('.tab-pane').attr('id') + 'Tab').addClass('radioError');
                    } else if ($("select[data-id='" + result.violations[i].name + "']").length > 0) {
                        $("select[data-id='" + result.violations[i].name + "']").next().addClass('radioError');
                        $("select[data-id='" + result.violations[i].name + "']").next().after($(errorElement));

                        //find tab
                        $('#' + $("select[data-id='" + result.violations[i].name + "']").closest('.tab-pane').attr('id') + 'Tab').addClass('radioError');
                    } else if ($("div[data-id='" + result.violations[i].name + "']").length > 0) {
                        $("div[data-id='" + result.violations[i].name + "']").addClass('radioError');
                        $("div[data-id='" + result.violations[i].name + "']").after($(errorElement));

                        //find tab
                        $('#' + $("div[data-id='" + result.violations[i].name + "']").closest('.tab-pane').attr('id') + 'Tab').addClass('radioError');
                    }

                    if (i == result.violations.length - 1) {
                        $('#' + $("select[data-id='" + result.violations[i].name + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("input[data-id='" + result.violations[i].name + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("div[data-id='" + result.violations[i].name + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                    }

                }
            }
        },
        error: function (a, b, c) {
            window.location.href = '/error';
        }
    });

    return validAPIForm;
}

function submitCC() {
    var letterheads = getLetterheads();
    letterheads.append("username", $('#UserName').val());
    $.ajax({
        url: "/forms/submit/excessformcc",
        type: "post",
        contentType: false,
        data: letterheads,
        processData: false,
        cache: false,
        success: function (result) {
            if (result.error == false) {

                window.location = '/moneris?custid=' + $('#UserName').val() + '_EXCESS' + '&fromform=excess';
            }
            else {
                console.log(result.errorMessage)
                //window.location.href = '/error';
            }            },
        error: function (e) {
            console.log(e);

            <!--alert('Unable to submit form. Contact system admin');-->
        }
    });
}

function getExcessFormJson(){

    var json = {};
    var fileInfo = {};
    fileInfo.source = "XS";
    fileInfo.description = "Letterheads";
    var letterheads = [];

    $.each($('.firm-letterhead-table input'), function(index, value) {
       if ($(this).val() != '') {
           var fileDetail = {};
           var fileName = $(this).val().replace('C:\\fakepath\\', '');
           fileDetail.fileId = fileName;
           fileDetail.fileName = fileName;
           fileDetail.fileSize = $(this)[0].files[0].size;
           fileDetail.fileType = fileName.split('.')[1];
           fileDetail.description = "letterheadAttached";
           letterheads.push(fileDetail);
       }
    });

    $.each($('.related-letterhead-table input'), function(index, value){
        if ($(this).val() != '') {
            var fileDetail = {};
            var fileName = $(this).val().replace('C:\\fakepath\\', '');
            fileDetail.fileId = fileName;
            fileDetail.fileName = fileName;
            fileDetail.fileSize = $(this)[0].files[0].size;
            fileDetail.fileType = fileName.split('.')[1];
            fileDetail.description = "associatedLetterheadAttached";
            letterheads.push(fileDetail);
        }
    });

    $.each($('.man-company-letterhead-table input'), function(index, value) {
        if ($(this).val() != '') {
            var fileDetail = {};
            var fileName = $(this).val().replace('C:\\fakepath\\', '');
            fileDetail.fileId = fileName;
            fileDetail.fileName = fileName;
            fileDetail.fileSize = $(this)[0].files[0].size;
            fileDetail.fileType = fileName.split('.')[1];
            fileDetail.description = "managementCompanyLetterheadAttached";
            letterheads.push(fileDetail);
        }
    });

    fileInfo.files = letterheads;
    json.attachments = fileInfo;



    json.userId = $('#UserName').val();
    json.source = "XS";
    json.submittedFor = $('#submitted-for').val();
    json.applicantLsoNumber = $('#lso-number').val();
    json.coverageRequestedOption = $('#desired-amount-val').val();
    json.applicantFirmName = $('#excess-firm-details-name').text();
    json.applicantFirmAddress = $('#excess-firm-details-address1').text() + "\n" + $('#excess-firm-details-address2').text() + "\n" + $('#excess-firm-details-address3').text()
        + "\n" + $('#excess-firm-details-city').text() + "\n" + $('#excess-firm-details-phone').text() + "\n" + $('#excess-firm-details-fax').text();
    json.applicantFirmPhone = $('#excess-firm-details-phone').text();
    json.applicantFirmFax = $('#excess-firm-details-fax').text();

    json.hasOfficesInsideCanada = $('input[name="applicantBranchOutsideOntario"]:checked').val();
    json.officeInsideCanadaCity = $('#outside-ontario-city').val();
    json.officeInsideCanadaProvince = $('#outside-ontario-prov').val();
    json.hasOfficesOutsideCanada = $('input[name="applicantBranchOutsideCanada"]:checked').val();
    json.officeOutsideCanadaCountry = $('#outside-canada-country').val();
    json.natureOfPractice = $('#nature-of-law-practice').val();
    json.officeShared = $('input[name="applicantShareOfficeSpace"]:checked').val();
    json.officeSharedFirmName = $('#refer-other-name').val();


    json.officeSpaceShared = $('input[name="applicantShareOffice"]:checked').val();

    json.receptionAreaShared = $('input[name="applicantShareReception"]:checked').val();

    json.phoneNumberShared =  $('input[name="applicantShareTelephone"]:checked').val();

    json.phoneNumberSharedDetails = $('#telephone-refer-info').val();

    json.faxNumberShared = $('input[name="applicantShareFax"]:checked').val();

    json.faxNumberSharedDetails = $('#fax-refer-info').val();

    json.emailAddressShared = $('input[name="applicantShareEmail"]:checked').val();

    json.websiteShared = $('input[name="applicantShareWebsite"]:checked').val();

    json.websiteSharedDetails = $('#website-refer-info').val();

    json.letterheadShared = $('input[name="applicantShareLetterhead"]:checked').val();


    json.letterheadSharedDetails = $('#letterhead-refer-info').val();

    json.signageShared = $('input[name="applicantShareSignage"]:checked').val();


    json.signageSharedDetails = $('#signage-refer-info').val();

    json.promoMaterialsShared = $('input[name="applicantSharePromo"]:checked').val();


    json.promoMaterialsSharedDetails = $('#promo-refer-info').val();

    json.practisingShared = $('input[name="applicantPracAssocOtherLaw"]:checked').val();

    json.practisingSharedDetails = $('#assoc-refer-info').val();

    json.hasRelatedFirms =  $('input[name="firmAssocOther"]:checked').val();

    var relatedFirmsArray = [];

    $('.firm-assoc-other-info .table').find('tr:not(:has(th))').each(function(){
        var firmNop = $(this).find('span[class="firm-refer-row-nop-val"]').text();
        var row = {"rowId" : $(this).attr('id') , name : $(this).find('td[class="firm-refer-row-name"]').text(), "address" : $(this).find('td[class="firm-refer-row-address"]').text(),
            "numberOfLawyers" : $(this).find('td[class="firm-refer-row-num-lawyers"]').text(), "natureOfPractice" : firmNop};

        relatedFirmsArray.push(row);
    });

    json.allRelatedFirms = relatedFirmsArray;

    json.inseptionDateSelected = $('#DateofPolicy').val();

    json.coverageRequestedReason = $('#coverage-reason-for-applying').val();

    json.primaryContact = $('#primary-contact').val();

    json.hasFormerFirms = $('input[name="coverageFormerFirm"]:checked').val();

    var formerFirmsArray = [];

    $('.coverage-former-firm-info .table').find('tr:not(:has(th))').each(function(){

        var yio = $(this).find('td[class="coverage-former-firm-row-yio"]').text().split(" To ");
        var row = {"rowId" : $(this).attr('id'), "number" : $(this).find('td[class="coverage-former-firm-row-num"]').text(), "name" : $(this).find('td[class="coverage-former-firm-row-name"]').text(),
            "city" : $(this).find('td[class="coverage-former-firm-row-city"]').text(), "province" : $(this).find('td[class="coverage-former-firm-row-prov"] span').text(),
            "dissolved" : ($(this).find('td[class="coverage-former-firm-row-dissolved"]').text() === 'Yes'), "inOperationFrom" : (yio[0] === "N/A" ? 0 : yio[0]), "inOperationTo" : (yio[1] === undefined ? 0 : yio[1]),
            "averageNumberOfLawyers" : ($(this).find('td[class="coverage-former-firm-row-avg-lawyers"]').text() === "N/A" ? 0 : $(this).find('td[class="coverage-former-firm-row-avg-lawyers"]').text())};
        formerFirmsArray.push(row);
    });

    json.allFormerFirms = formerFirmsArray;

    json.hasManagementCompanies = $('input[name="coverageRequestManCompany"]:checked').val();

    var managementCompanyArray = [];

    $('.coverage-man-info .table').find('tr:not(:has(th))').each(function(){
        var yio = $(this).find('td[class="coverage-man-row-yio"]').text().split(" To ");
        var row = {"rowId" : $(this).attr('id'),"name" : $(this).find('td[class="coverage-man-row-name"]').text(), "inOperationFrom" : yio[0], "inOperationTo" : yio[1],
            "serviceProvided" : $(this).find('td[class="coverage-man-row-services"]').text()};
        managementCompanyArray.push(row);
    });

    json.allMgtCompanies = managementCompanyArray;

    json.numberOfLawyers = $('#coverage-assoc-num-lawyers').val();

    json.hasCounselLawyersIncluded = $('input[name="coverageInsureCounsel"]:checked').val();

    var actingAsCounselLawyers = [];

    $('.coverage-counsel-info .table').find('tr:not(:has(th))').each(function(){
        var row = {"rowId" : $(this).attr('id') ,"lsoKey" : $(this).find('td[class="coverage-counsel-row-lso"]').text(), "fullName" : $(this).find('td[class="coverage-counsel-row-name"]').text()};
        actingAsCounselLawyers.push(row);
    });

    json.actingAsOfCounselLawyers = actingAsCounselLawyers;

    json.hasInnocentPartyCoverage = $('input[name="coverageBuyUp"]:checked').val();

    json.hasInnocentPartyCoverageDeclaration = $('#coverage-buy-up-dec').is(':checked');

    json.hasOtherInsurance = $('input[name="otherPurchasedCoverage"]:checked').val();

    var otherPurchasedCoverageInsurerArray = [];

    $('.other-purchased-coverage-info .table').find('tr:not(:has(th))').each(function(){
        var yio = $(this).find('td[class="other-purchased-coverage-row-yio"]').text().split(" To ");
        var perClaim = $(this).find('td[class="other-purchased-coverage-row-limits-claim"]').text().split(' ')[0];
        var perAgg =  $(this).find('td[class="other-purchased-coverage-row-limits-agg"]').text().split(' ')[0];
        var insurerKey = $(this).find('td[class="other-purchased-coverage-row-name"] span[class="other-purchased-coverage-row-name-val"]').text();
        var insurerCompanyName = $(this).find('td[class="other-purchased-coverage-row-name"] span[class="other-purchased-coverage-row-name-span"]').text();
        var row = {"rowId" : $(this).attr('id') , "insurerCompanyKey" : insurerKey, "insurerCompanyName" : insurerCompanyName,
            "perClaim" : perClaim, "perAgg" : perAgg, "policyPeriodFrom" : yio[0], "policyPeriodTo" : yio[1], "policyLawFirmName" : $(this).find('td[class="other-purchased-coverage-row-lawfirm"]').text()};

        otherPurchasedCoverageInsurerArray.push(row);
    });

    json.otherInsurance = otherPurchasedCoverageInsurerArray;

    json.additionalCoverageContemplated = $('input[name="otherPurchaseExtraCoverage"]:checked').val();
    json.additionalCoverageContemplatedDetail = $('#other-purchase-extra-coverage-details').val();

    json.coverageDeclined = $('input[name="otherDenied"]:checked').val();
    json.coverageDeclinedDetail = $('#other-purchase-extra-coverage-details').val();

    json.coverageDeclined = $('input[name="otherDenied"]:checked').val();
    json.coverageDeclinedDetail = $('#other-denied-details').val();

    json.thirdPartyAuthorized = $('input[name="thirdPartyPayor"]:checked').val();
    json.hasThirdPartyAuthorized = $('#coverage-buy-up-dec').is(':checked');
    json.installmentOption = $('#Instalment_Option').val();

    if($('#1SCASH').is(':checked') || $('#1SEFT').is(':checked') || $('#1SCREDITCARD').is(':checked')) {
        json.paymentOption = "LUMPSUM";
    } else if ($('#4SEFT').is(':checked') || $('#4SCREDITCARD').is(':checked')) {
        json.paymentOption = "QUARTERLY";
    } else if ($('#12SEFT').is(':checked') || $('#12SCREDITCARD').is(':checked')) {
        json.paymentOption = "MONTHLY";
    } else {
        json.paymentOption = "";
    }

    json.bankingInstitution = $('#BankingInstitution').find('selected').val();
    json.transitNumber = $('#transitNumber').val();
    json.bankingInstitution2 = $('#bankingInstitution2').val();
    json.accountNumber = $('#accountNumber').val();
    json.nameOnAccount = $('#NameOnAccount').val();
    json.paymentAuthorized = $('#PPA_Check').is(':checked');

    json.applicantName = $('#filer-name').val();

    json.signatureDeclaration = $('#auth-sig').is(':checked');
    json.claimsNotReported = $('input[name="claims"]:checked').val();
    json.comments = $('#comments').val();

    return json;
}

function review() {
    save();
    var result1 = validate();

    if (result1) //client side
    {
        window.scrollTo(0, 0);

        $('#revise-btn').attr('hidden', false);
        $('#review-btn').attr('hidden', true);
        $('#submit-btn').attr('hidden', false);
        $('#creditButton').attr('hidden', false);


        $('#myTabedu1').hide();
        $('#btnUpdateDetails').hide();
        $('#before').hide();
        $('.tab-one-intro').hide();
        $('.btnSave').hide();
        $('.formIntro').hide();
        $('.formReview').show();
        $('.input-group-btn').hide();
        $('.input-group-addon').hide();
        $('#formIntro').hide();
        $('.formHelpIcon').hide();
        $('.tab-pane').addClass('active');
        $('.tab-pane').addClass('in');
        $('.alert-info').hide();
        $('#nextSteps1').hide();

        $('#nextSubmit1').hide();
        $('#nextSteps2').show();
        $('#nextSubmit2').show();
        $('#onlinePayment').hide();
        $('#paymentOptions').show();
        $(':checkbox').attr('disabled', true);
        $('.review-print').show();
        $('.table-header-with-btn').hide();
        $('#attach-your-letterhead-btn').hide();
        $('#related-letterhead-btn').hide();
        $('#coverage-man-letterhead-btn').hide();
        $('.policy-coverage-options label').hide();
        $('.banking-info-review').show();
        $(window).scrollTop();

        var paymentElement = document.createElement('div');

        paymentElement.setAttribute('class', 'readOnlyInput');
        var paymentSelection = '';
        if ($('#Instalment_Option').val() == '1S CASH') {
            paymentSelection = 'Lump sum payment by cheque';
            $('#creditAlert').hide();
        } else if ($('#Instalment_Option').val() == '1S EFT') {
            paymentSelection = 'Lump sum payment by pre-authorized transfer';
            $('#creditAlert').hide();
        } else if ($('#Instalment_Option').val() == '1S CREDIT CARD') {

            $('#submitButton').hide();
            $('#creditButton').show();
            $('#creditInfo').show();
            $('#creditAlert').show();
            paymentSelection = 'Lump sum payment by credit card';
        } else if ($('#Instalment_Option').val() == '4S EFT') {
            paymentSelection = 'Quarterly payments by pre-authorized transfer';
            $('#creditAlert').hide();

        } else if ($('#Instalment_Option').val() == '4S CREDIT CARD') {
                $('#submitButton').hide();
                $('#creditButton').show();
                $('#creditInfo').show();
                $('#creditAlert').show();
                paymentSelection = 'Quarterly payments by credit card';
            } else if ($('#Instalment_Option').val() == '12SEFT') {
                paymentSelection = 'Monthly payments by pre-authorized transfer';
                $('#creditAlert').hide();

        } else if ($('#Instalment_Option').val() == '12S CREDIT CARD') {
                $('#submitButton').hide();
                $('#creditButton').show();
                $('#creditInfo').show();
                $('#creditAlert').show();
                paymentSelection = 'Monthly payments by credit card';
            }
            if ($('#Instalment_Option').val() == 'mailin') {
                paymentSelection = 'Lump sum payment by cheque';
                $('#creditAlert').hide();
            }
            $(paymentElement).html(paymentSelection);
            $('#paymentOptions').children().first().append(paymentElement);


            $('.tab-pane').find('input').each(function()
            {
                if ($(this).attr('type') == 'text'){
                    if ($(this).hasClass('questionTitleInput') || $(this).hasClass('questionInstructionsInput') || $(this).hasClass('review-hidden'))
                    {
                        $(this).hide();
                    }else {
                        $(this).hide();
                        var readOnlyInput = document.createElement('div');
                        readOnlyInput.setAttribute('class', 'readOnlyInput');
                        $(readOnlyInput).html($(this).val());
                        $(this).after(readOnlyInput);
                    }
                }else if ($(this).attr('type') == 'radio')
                {
                    if ($(this).parent().hasClass('active'))
                    {
                        $(this).parent().hide();
                        var readOnlyInput = document.createElement('div');
                        readOnlyInput.setAttribute('class', 'readOnlyInput');
                        $(readOnlyInput).html($(this).attr('data-value'));
                        $(this).parent().after(readOnlyInput);
                    } else if ($(this).parent().hasClass('checked')) {
                        if($(this).attr('name') == 'desiredAmmount') {
                            $(this).parent().hide();
                            var readOnlyInput = document.createElement('div');
                            readOnlyInput.setAttribute('class', 'readOnlyInput');
                            $(readOnlyInput).html($(this).attr('data-value'));
                            $(readOnlyInput).insertAfter($('.policy-coverage-options').parent());
                        }
                    }
                    else
                    {
                        $(this).parent().hide();
                    }
                }
                else if ($(this).attr('type') == 'number')
                {
                    if ($(this).hasClass('questionTitleInput') || $(this).hasClass('questionInstructionsInput'))
                    {

                    }else {
                        $(this).hide();
                        var readOnlyInput = document.createElement('div');
                        readOnlyInput.setAttribute('class', 'readOnlyInput');
                        $(readOnlyInput).html($(this).val());
                        $(this).after(readOnlyInput);
                    }
                }
            });

            $('.tab-pane').find('select').each(function()
            {
                if ($(this).attr('id') != 'provinceValue')
                {
                    $(this).next().hide();
                    var readOnlyInput = document.createElement('div');
                    readOnlyInput.setAttribute('class', 'readOnlyInput');
                    if ($(this).chosen().val() != null && $(this).chosen().val().length > 1 && Array.isArray($(this).chosen().val()))
                    {
                        var chosenValueString = "";
                        for (var c=0; c<=$(this).chosen().val().length; c++)
                        {
                            if ($('option[value="' + $(this).chosen().val()[c] + '"]').html() !== undefined)
                            {
                                chosenValueString += $('option[value="' + $(this).chosen().val()[c] + '"]').html() + "<br/>";
                            }
                        }
                        $(readOnlyInput).html(chosenValueString);
                    }
                    else
                    {
                        $(readOnlyInput).html($(this).find('option:selected').text());

                    }

                    $(this).after(readOnlyInput);
                }
            });
            $('.tab-pane').find('textarea').each(function()
            {
                if ($(this).hasClass('questionTitleInput') || $(this).hasClass('questionInstructionsInput'))
                {

                }else {
                    $(this).hide();
                    var readOnlyInput = document.createElement('div');
                    readOnlyInput.setAttribute('class', 'readOnlyInput');
                    $(readOnlyInput).html($(this).val());
                    $(this).after(readOnlyInput);
                }
            });


        $('#outside_ontario_prov_chosen').hide();
        $('#BankingInstitution_chosen').hide();

        $('.review-edit-remove').hide();

        //remove instructions in comments.
        $('.comments-area div.questionInstructions').hide();

    }

    return false;
}

function showValidateErrors(tab, msg) {
    $(tab).children().first().trigger('click');
    window.scrollTo(0, 0);
    if (msg !== '') {
        Lobibox.notify(
            'error',
            {
                msg: msg,
                sound: false
            }
        );
    }
}

function printForm()
{
    //Hide menu stuff
    $('.left-sidebar-pro').hide();
    $('.all-content-wrapper').attr('style', 'margin-left: 0px;');
    $('.header-advance-area').hide();
    $('.footer-copyright-area').hide();
    $('#nextSubmit2').hide();
    $('#printIcon').hide();

    window.print();

    setTimeout(donePrint, 500);
}

function donePrint()
{
    //Show menu stuff
    $('.left-sidebar-pro').show();
    $('.all-content-wrapper').attr('style', 'margin-left: 230px;');
    $('.header-advance-area').show();
    $('.footer-copyright-area').show();
    $('#nextSubmit2').show();
    $('#printIcon').show();
}

function submitForm() {
    if (confirm('Are you sure you have printed a copy of the form?')) {
        $('#submitButton').attr('disabled', true);

        $(':checkbox').attr('disabled', false);

        var formData = new FormData();
        var json = getExcessFormJson();

        formData.append("form", JSON.stringify(json));

        formData.append("applicantLetterheads", $('#firm-letterhead-one')[0].files[0]);
        formData.append("applicantLetterheads", $('#firm-letterhead-two')[0].files[0]);
        formData.append("applicantLetterheads", $('#firm-letterhead-three')[0].files[0]);
        formData.append("applicantLetterheads", $('#firm-letterhead-four')[0].files[0]);
        formData.append("applicantLetterheads", $('#firm-letterhead-five')[0].files[0]);

        formData.append("assocLetterheads", $('#related-letterhead-one')[0].files[0]);
        formData.append("assocLetterheads", $('#related-letterhead-two')[0].files[0]);
        formData.append("assocLetterheads", $('#related-letterhead-three')[0].files[0]);
        formData.append("assocLetterheads", $('#related-letterhead-four')[0].files[0]);
        formData.append("assocLetterheads", $('#related-letterhead-five')[0].files[0]);

        formData.append("manCompanyLetterheads", $('#man-company-letterhead-one')[0].files[0]);
        formData.append("manCompanyLetterheads", $('#man-company-letterhead-two')[0].files[0]);
        formData.append("manCompanyLetterheads", $('#man-company-letterhead-three')[0].files[0]);
        formData.append("manCompanyLetterheads", $('#man-company-letterhead-four')[0].files[0]);
        formData.append("manCompanyLetterheads", $('#man-company-letterhead-five')[0].files[0]);

        $.ajax({
            url: "/forms/submit/excessform",
            type: "post",
            contentType: false,
            data: formData,
            processData: false,
            cache: false,
            success: function (result) {
                if (result == null) {
                    window.location.href = "/error";
                } else {
                    if (result.error == false) {
                        $('#formIntro').show();
                        $('#newExcessForm').hide();
                        $('#confirmation').show();
                        $('#confirmationNumber').html(result.confirmation);
                        $('#submittedDate').html(result.createdDate);
                        $('#helpContainer').hide();
                        $('#efilingInfo').show();
                    }
                    else {
                        window.location.href = '/error';
                    }
                }

            },
            error: function (e) {
                console.log(e);

                <!--alert('Unable to submit form. Contact system admin');-->
            }
        });

        $(':checkbox').attr('disabled', true);

    }

    return false;
}

function showCreditAuth(value) {
    $('.credit-card-declaration').show();
    $('#Instalment_Option').val(value);
    $('#creditAuth').show();
    $('#paymentAuthorization').show();
    $('#bankingAuth').hide();
    $('#paymentAuth').hide();
}

function showBankingAuth(value) {

    $('.credit-card-declaration').show();
    $('#Instalment_Option').val(value);
    $('#creditAuth').hide();
    $('#bankingAuth').show();
    $('#paymentAuth').show();
    $('#paymentAuthorization').show();
}

function hidePaymentAuth(value) {
    $('.credit-card-declaration').hide();
    $('#Instalment_Option').val(value);
    $('#creditAuth').hide();
    $('#bankingAuth').hide();
    $('#paymentAuth').hide();
    $('#paymentAuthorization').hide();
}

function setDesiredAmount(value) {
    $('#desired-amount-val').val(value);
}

function setContactLawPro(value) {
    $('#contact-law-pro-val').val(value);
}

function reviseForm() {
    window.location.reload();
}

function populateForm() {

    $.ajax({
        url: "/forms/details/newexcessform",
        type: "get",
        dataType: "json",
        data: $('#UserDetailsForm').serialize(),
        success: function (result) {
            if(result.found == true) {
                $('#filer-name').val(result.applicantName);
                $('#lso-number').val(result.applicantLsoNumber);
                $('#primary-contact').val(result.primaryContact);

                if(result.hasOfficesInsideCanada == true) {
                    $('#branch-outside-ontario-yes').parent().trigger('click');
                    $('#outside-ontario-city').val(result.officeInsideCanadaCity);
                    $('#outside-ontario-prov').val(result.officeInsideCanadaProvince);
                } else if (result.hasOfficesInsideCanada == false) {
                    $('#branch-outside-ontario-no').parent().trigger('click');
                    $('#outside-ontario-prov').val("");
                    $('#outside-ontario-city').val("");
                } else {
                    $('#outside-ontario-prov').val("");
                    $('#outside-ontario-city').val("");
                }

                if(result.hasOfficesOutsideCanada == true){
                    $('#branch-outside-canada-yes').parent().trigger('click');
                    $('#outside-canada-country').val(result.officeOutsideCanadaCountry);
                } else if (result.hasOfficesOutsideCanada == false) {
                    $('#branch-outside-canada-no').parent().trigger('click');
                }

                if (result.natureOfPractice != '' && result.natureOfPractice != null) {

                    $('#nature-of-law-practice').val(result.natureOfPractice);
                    $('#nature-of-law-practice').trigger("chosen:updated");
                }


                if (result.officeShared == true) {
                    $('#share-office-space-yes').parent().trigger('click');
                    $('#refer-other-name').val(result.officeSharedFirmName);

                    if (result.officeSpaceShared == true) {
                        $('#share-office-yes').parent().trigger('click');
                    } else if (result.officeSpaceShared == false) {
                        $('#share-office-no').parent().trigger('click');
                    }

                    if (result.receptionAreaShared == true) {
                        $('#share-reception-yes').parent().trigger('click');
                    } else if (result.receptionAreaShared == false) {
                        $('#share-reception-no').parent().trigger('click');
                    }

                    if(result.phoneNumberShared == true) {
                        $('#telephone-refer-info').val(result.phoneNumberSharedDetails);
                        $('#share-telephone-yes').parent().trigger('click');
                    } else if (result.phoneNumberShared == false) {
                        $('#share-telephone-no').parent().trigger('click');
                    }

                    if (result.faxNumberShared == true) {
                        $('#fax-refer-info').val(result.faxNumberSharedDetails);
                        $('#share-fax-yes').parent().trigger('click');
                    } else if (result.faxNumberShared == false) {
                        $('#share-fax-no').parent().trigger('click');
                    }

                    if (result.emailAddressShared == true) {
                        $('#share-email-yes').parent().trigger('click');
                    } else if (result.emailAddressShared == false) {
                        $('#share-email-no').parent().trigger('click');
                    }

                    if (result.websiteShared == true) {
                        $('#website-refer-info').val(result.websiteSharedDetails);
                        $('#share-website-yes').parent().trigger('click');
                    } else if (result.websiteShared == false) {
                        $('#share-website-no').parent().trigger('click');
                    }

                    if (result.letterheadShared == true) {
                        $('#letterhead-refer-info').val(result.letterheadSharedDetails);
                        $('#share-letterhead-yes').parent().trigger('click');
                    } else if (result.letterheadShared == false) {
                        $('#share-letterhead-no').parent().trigger('click');
                    }

                    if (result.signageShared == true) {
                        $('#signage-refer-info').val(result.signageSharedDetails);
                        $('#share-signage-yes').parent().trigger('click');
                    } else if (result.signageShared == false) {
                        $('#share-signage-no').parent().trigger('click');
                    }

                    if (result.promoMaterialsShared == true) {
                        $('#promo-refer-info').val(result.promoMaterialsSharedDetails);
                        $('#share-promo-yes').parent().trigger('click');
                    } else if (result.promoMaterialsShared == false) {
                        $('#share-promo-no').parent().trigger('click');
                    }

                    if (result.practisingShared == true) {
                        $('#assoc-refer-info').val(result.practisingSharedDetails);
                        $('#prac-assoc-other-law-yes').parent().trigger('click');
                    } else if (result.practisingShared == false) {
                        $('#prac-assoc-other-law-no').parent().trigger('click');
                    }

                } else if (result.officeShared == false) {
                    $('#share-office-space-no').parent().trigger('click');
                }

                if (result.hasRelatedFirms == true) {
                    var assocFirmCtr = 0;
                    $.each(result.allRelatedFirms, function(index, value){

                        var nopText = $('#related-firm-nop').find('option[value="' + value.natureOfPractice + '"]').text();
                        var row = "<tr id='" + value.rowId + "'><td class='firm-refer-row-name'>" + value.name + "</td>" +
                            "<td class='firm-refer-row-address'>" + value.address + "</td><td class='firm-refer-row-num-lawyers'>" + value.numberOfLawyers + "</td>" +
                            "<td class='firm-refer-row-nop'><span style='display: none' class='firm-refer-row-nop-val'>" + value.natureOfPractice + "</span>" + nopText + "</td><td class='review-edit-remove'><i class=\"table-row-edit firm-assoc-edit-row fa fa-edit\"></i></td>" +
                            "<td class='review-edit-remove'><i class=\"table-row-delete firm-assoc-remove-row fa fa-trash\"></i></td></tr>";
                        $('.firm-assoc-other-info .table').append(row);

                        $('.firm-assoc-other-info .table tr[id="' + value.rowId + '"] .firm-assoc-edit-row').click(function () {
                            editFirmAssocRowPopulate(this);
                        });

                        $('.firm-assoc-other-info .table tr[id="' + value.rowId + '"] .firm-assoc-remove-row').click(function () {
                            removeFirmAssocRowPopulate(this);
                        });


                    });

                    if(getNumberOfRowsFromTable($('.firm-assoc-other-info .table')) >= 5) {
                        $('#firm-assoc-modal-toggle').prop('disabled', true);
                    }

                    if(getNumberOfRowsFromTable($('.firm-assoc-other-info .table')) == 0) {
                        $('#firm-assoc-table-header').hide();
                    } else {
                        $('#firm-assoc-table-header').show();
                    }

                    $('#firm-assoc-other-yes').parent().trigger('click');
                } else if (result.hasRelatedFirms == false) {
                    $('#firm-assoc-other-no').parent().trigger('click');
                }

                $('#DateofPolicy').val(result.inseptionDateSelected);

                switch (result.coverageRequestedOption) {
                    case "$1,000,000" :
                        $('#desired-amount-1m').parent().trigger('click');
                        break;
                    case "$2,000,000" :
                        $('#desired-amount-2m').parent().trigger('click');
                        break;
                    case "$3,000,000" :
                        $('#desired-amount-3m').parent().trigger('click');
                        break;
                    case "$4,000,000" :
                        $('#desired-amount-4m').parent().trigger('click');
                        break;
                    case "$9,000,000" :
                        $('#desired-amount-9m').parent().trigger('click');
                        break;
                }


                $('#coverage-reason-for-applying').val(result.coverageRequestedReason);

                if(result.hasFormerFirms == true) {
                    if (result.allFormerFirms.length) {
                        var coverageFormerFirmCtr = 0;

                        $.each(result.allFormerFirms, function(index, value) {
                            var dissolved = (value.dissolved) ? "Yes" : "No";
                            var yio = "";
                            var prov = $('#coverage-former-firm-province').find('option[value="' + value.province + '"]').text();
                            var numLawyers = "";

                            if (dissolved == 'No') {
                                yio = "N/A";
                                numLawyers = "N/A";
                            } else if (dissolved == "Yes") {
                                yio = value.inOperationFrom + " To " + value.inOperationTo;
                                numLawyers = value.averageNumberOfLawyers;
                            }
                            var row = "<tr id='" + value.rowId + "'><td class='coverage-former-firm-row-num'>" + value.number + "</td>" +
                                "<td class='coverage-former-firm-row-name'>" + value.name + "</td><td class='coverage-former-firm-row-city'>" + value.city + "</td>" +
                                "<td class='coverage-former-firm-row-prov'><span style='display:none'>" + value.province + "</span>" + prov + "</td>" +
                                "<td class='coverage-former-firm-row-dissolved'>" + dissolved + "</td><td class='coverage-former-firm-row-yio'>" + yio + "</td>" +
                                "<td class='coverage-former-firm-row-avg-lawyers'>" + numLawyers + "</td>" +
                                "<td class='review-edit-remove coverage-former-firm-row-edit-col'><i class='table-row-edit coverage-former-firm-edit-row fa fa-edit'></i></td>" +
                                "<td class='review-edit-remove'><i class='table-row-delete coverage-former-firm-delete-row fa fa-trash'></i></td></tr>";
                            $('.coverage-former-firm-info .table').append(row);

                            $('.coverage-former-firm-info .table tr[id="' + value.rowId + '"] .coverage-former-firm-edit-row').click(function () {
                                editFormerFirmRowPopulate(this);
                            });

                            $('.coverage-former-firm-info .table tr[id="' + value.rowId + '"] .coverage-former-firm-delete-row').click(function () {
                                removeFormerFirmRowPopulate(this);
                            });
                        });

                        $('#coverage-former-firm-table-header').show();

                    }


                    if(getNumberOfRowsFromTable($('.coverage-former-firm-info table')) >= 10) {
                        $('#coverage-former-firm-modal-toggle').prop('disabled', true);
                    }

                    $('#coverage-former-firm-yes').parent().trigger('click');
                } else if (result.hasFormerFirms == false) {
                    $('#coverage-former-firm-no').parent().trigger('click');
                }

                if (result.hasManagementCompanies == true) {
                    var coverageRequestManCtr = 0;

                    if (result.allMgtCompanies.length) {
                        $.each(result.allMgtCompanies, function(index, value){

                            var row = "<tr id='" + value.rowId + "'><td class='coverage-man-row-name'>" + value.name + "</td><td class='coverage-man-row-yio'>" + value.inOperationFrom + " To " + value.inOperationTo + "</td>" +
                                "<td class='coverage-man-row-services'>" + value.serviceProvided + "</td><td class='review-edit-remove'><i class=\"table-row-edit coverage-man-edit-row fa fa-edit\"></i></td><td class='review-edit-remove'><i class=\"table-row-delete coverage-man-delete-row fa fa-trash\"></i></td></tr>";

                            $('.coverage-man-info .table').append(row);

                            $('.coverage-man-info .table tr[id="' + value.rowId + '"] .coverage-man-edit-row').click(function () {
                                editManRowPopulate(this);
                            });

                            $('.coverage-man-info .table tr[id="' + value.rowId + '"] .coverage-man-delete-row').click(function () {
                                removeManRowPopulate(this);
                            });

                            if(getNumberOfRowsFromTable($('.coverage-man-info .table')) >= 10) {
                                $('#coverage-man-firm-modal-toggle').prop('disabled', true);
                            }
                        });

                        $('#coverage-man-firm-table-headers').show();
                    }

                    $('#coverage-man-yes').parent().trigger('click');

                } else if (result.hasManagementCompanies == false) {
                    $('#coverage-man-no').parent().trigger('click');
                }

                $('#coverage-assoc-num-lawyers').val(result.numberOfLawyers);

                if(result.hasCounselLawyersIncluded == true) {
                    if(result.actingAsOfCounselLawyers.length) {
                        var lawyerCtr = 0;

                        $.each(result.actingAsOfCounselLawyers, function(index, value) {
                            var row = "<tr id='" + value.rowId + "'><td class='coverage-counsel-row-lso'>" + value.lsoKey + "</td>" +
                                "<td class='coverage-counsel-row-name'>" + value.fullName + "</td>" +
                                "<td class='review-edit-remove'><i class=\"table-row-edit coverage-counsel-edit-row fa fa-edit\"></i></td><td class='review-edit-remove'><i class=\"table-row-delete coverage-counsel-delete-row fa fa-trash\"></i></td></tr>";

                            $('.coverage-counsel-info .table').append(row);

                            $('.coverage-counsel-info .table tr[id="' + value.rowId + '"] .coverage-counsel-edit-row').click(function () {
                                editCounselRowPopulate(this);
                            });

                            $('.coverage-counsel-info .table tr[id="' + value.rowId + '"] .coverage-counsel-delete-row').click(function () {
                                removeCounselRowPopulate(this);
                            });


                            if(getNumberOfRowsFromTable($('.coverage-counsel-info .table')) >= 10) {
                                $('#coverage-insure-counsel-modal-toggle').prop('disabled', true);
                            }

                        });

                        $('#coverage-insure-counsel-table-header').show();

                    }


                    $('#coverage-insure-counsel-yes').parent().trigger('click');

                } else if (result.hasCounselLawyersIncluded == false) {
                    $('#coverage-insure-counsel-no').parent().trigger('click');
                }
                if (result.hasInnocentPartyCoverage == true) {
                    $('#coverage-buyup-yes').parent().trigger('click');
                } else if (result.hasInnocentPartyCoverage == false) {
                    $('#coverage-buyup-no').parent().trigger('click');
                }

                if(result.hasOtherInsurance == true) {
                    if (result.otherInsurance.length) {
                        $.each(result.otherInsurance, function(index, value) {
                            var yio = value.policyPeriodFrom + " To " + value.policyPeriodTo;
                            var row = "<tr id='" + value.rowId + "'><td class='other-purchased-coverage-row-name'><span class='other-purchased-coverage-row-name-val' style='display: none;'>" + value.insurerCompanyKey + "</span><span class='other-purchased-coverage-row-name-span'>" + value.insurerCompanyName + "</span></td>" +
                                "<td class='other-purchased-coverage-row-limits-claim'>" + value.perClaim + " Million</td><td class='other-purchased-coverage-row-limits-agg'>" + value.perAgg + " Million</td><td class='other-purchased-coverage-row-yio'>" + yio + "</td>" +
                                "<td class='other-purchased-coverage-row-lawfirm'>" + value.policyLawFirmName + "</td><td class='review-edit-remove'><i class=\"table-row-edit other-purchased-coverage-edit-row fa fa-edit\"></i></td><td class='review-edit-remove'><i class=\"table-row-delete other-purchased-coverage-delete-row fa fa-trash\"></i></td></tr>";

                            $('.other-purchased-coverage-info .table').append(row);

                            $('tr[id="' + value.rowId + '"] .other-purchased-coverage-edit-row').click(function(){
                                editOtherPurchasedCoverageRowPopulate(this);
                            });

                            $('tr[id="' + value.rowId + '"] .other-purchased-coverage-delete-row').click(function(){
                                removeOtherPurchasedCoverageRowPopulate(this);
                            });
                        });

                        if(getNumberOfRowsFromTable($('.other-purchased-coverage-info .table')) >= 10) {
                            $('#other-purchased-coverage-toggle').attr('disabled', true);
                        }

                        $('#other-purchased-coverage-table-header').show();
                    }

                    $('#other-purchased-coverage-yes').parent().trigger('click');
                } else if (result.hasOtherInsurance == false) {
                    $('#other-purchased-coverage-no').parent().trigger('click');
                }

                $('#other-purchase-extra-coverage-details').val(result.additionalCoverageContemplatedDetail);

                if(result.additionalCoverageContemplated == true) {
                    $('#other-purchase-extra-coverage-yes').parent().trigger('click');
                } else if (result.additionalCoverageContemplated == false) {
                    $('#other-purchase-extra-coverage-no').parent().trigger('click');
                }

                if(result.coverageDeclined == true) {
                    $('#other-denied-yes').parent().trigger('click');
                } else if (result.coverageDeclined == false) {
                    $('#other-denied-no').parent().trigger('click');
                }

                $('#other-denied-details').val(result.coverageDeclinedDetail);

                if (result.thirdPartyAuthorized == true) {
                    $('#third-party-payor-yes').parent().trigger('click');
                } else if (result.thirdPartyAuthorized == false) {
                    $('#third-party-payor-no').parent().trigger('click');
                }

                switch (result.installmentOption) {
                    case "1S CASH" :
                        $('#1SCASH').parent().trigger('click');
                        break;
                    case "1S EFT" :
                        $('#1SEFT').parent().trigger('click');
                        break;
                    case "1S CREDIT CARD" :
                        $('#1SCREDITCARD').parent().trigger('click');
                        break;
                    case "4S EFT" :
                        $('#4SEFT').parent().trigger('click');
                        break;
                    case "4S CREDIT CARD" :
                        $('#4SCREDITCARD').parent().trigger('click');
                        break;
                    case "12SEFT" :
                        $('#12SEFT').parent().trigger('click');
                        break;
                    case "12S CREDIT CARD" :
                        $('#12SCREDITCARD').parent().trigger('click');
                        break;
                }

                if (result.claimsNotReported == true) {
                    $('#claims-yes').parent().trigger('click');
                } else if (result.claimsNotReported == false) {
                    $('#claims-no').parent().trigger('click');
                }

                $('#comments').val(result.comments);

            } else {
                $('#outside-ontario-prov').val("");
            }
        },
        error: function (result) {
            alert('Unable to retrieve form details. Please contact admin.');
        }
    });
}


function edit() {
    $('#btnEdit').hide();
    $('#btnEditCancel').show();

    $('.questionTitle').hide();
    $('.questionTitleInput').show();

    $('.questionInstructions').hide();
    $('.questionInstructionsInput').show();

    $('.questionInstructionsInput').summernote({
        height: 150,
        callbacks: {
            onBlur: function () {
                if ($(this).val() != $(this).prev().html()) {
                    $.ajax({
                        url: "/forms/update/questionInstructions",
                        type: "post",
                        dataType: "json",
                        data: {'id': $(this).parent().find('.questionID').val(), 'text': $(this).val()},
                        success: function (result) {
                            Lobibox.notify(
                                'success',
                                {
                                    msg: 'Question has been saved'
                                }
                            );
                        },
                        error: function (result) {
                            Lobibox.notify(
                                'error',
                                {
                                    msg: 'Unable to save question'
                                }
                            );
                        }
                    });
                }
            }
        }
    });

    $('.questionHelp').show();
    $('.questionHelpParagraph').hide();
    $('.questionHelpInput').show();

    $('.questionHelpInput').summernote(
        {
            height: 150,
            callbacks: {
                onBlur: function () {
                    //TODO: Send API call to update question
                    if ($(this).val() != $(this).prev().html()) {
                        $.ajax({
                            url: "/forms/update/questionHelp",
                            type: "post",
                            dataType: "json",
                            data: {'id': $(this).parent().parent().find('.questionID').val(), 'text': $(this).val()},
                            success: function (result) {
                                Lobibox.notify(
                                    'success',
                                    {
                                        msg: 'Question has been saved'
                                    }
                                );
                            },
                            error: function (result) {
                                Lobibox.notify(
                                    'error',
                                    {
                                        msg: 'Unable to save question'
                                    }
                                );

                            }
                        });
                    }
                }
            }
        });
}

function showValidNOP() {
    $('#validNOP').fadeIn(500);
}



$(document).ready(function(){

   populateForm();
});


function editFirmAssocRowPopulate(el) {

    $('#firm-assoc-add-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#firm-assoc-add-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });

    $('#firm-assoc-add-modal').modal('show');
    $('#firm-assoc-add-btn').hide();
    $('#firm-assoc-save-edit-btn').show();

    var row = $(el).parent().parent();

    $('#firm-assoc-row-id-ref').val(row.attr('id'));

    $('#firm-assoc-name').val(row.find("td[class='firm-refer-row-name']").text());
    $('#firm-assoc-address').val(row.find("td[class='firm-refer-row-address']").text());
    $('#firm-assoc-num-lawyers').val(row.find("td[class='firm-refer-row-num-lawyers']").text());
    $('#related-firm-nop').val(row.find('td[class="firm-refer-row-nop"] > span').text());
}

function removeFirmAssocRowPopulate(el){
    $(el).parent().parent().remove();

    var rowCtr = getNumberOfRowsFromTable($('.firm-assoc-other-info .table'));

    if(rowCtr == 0) {
        $('#firm-assoc-table-header').hide();
    }

    if(rowCtr < 5)
        $('#firm-assoc-modal-toggle').attr('disabled', false);

}

function editFormerFirmRowPopulate(el) {
    var row = $(el).parent().parent();

    $('#coverage-add-former-firm-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#coverage-add-former-firm-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });
    $('#coverage-add-former-firm-modal input:not([type="radio"])').val("");
    $('#coverage-former-firm-dissolved-yes').prop('checked', false);
    $('#coverage-former-firm-dissolved-no').prop('checked', false);
    $('.coverage-former-firm-dissolved-info').hide();
    $('#coverage-former-firm-dissolved-yes').parent().removeClass('active');
    $('#coverage-former-firm-dissolved-no').parent().removeClass('active');


    $('#coverage-former-firm-row-id-ref').val(row.attr('id'));

    $('#coverage-former-firm-number').val(row.find('td[class="coverage-former-firm-row-num"]').text());
    $('#coverage-former-firm-name').val(row.find('td[class="coverage-former-firm-row-name"]').text());
    $('#coverage-former-firm-city').val(row.find('td[class="coverage-former-firm-row-city"]').text());
    $('#coverage-former-firm-province').val(row.find('td[class="coverage-former-firm-row-prov"] > span').text());


    if ($(row.find('td[class="coverage-former-firm-row-dissolved"]')).text() == 'Yes') {
        $('#coverage-former-firm-dissolved-yes').parent().trigger('click');
        $('#coverage-former-firm-dissolved-no').prop('checked', false);
    } else {
        $('#coverage-former-firm-dissolved-no').parent().trigger('click');
        $('#coverage-former-firm-dissolved-yes').prop('checked', false);
    }

    var unformattedDate = row.find('td[class="coverage-former-firm-row-yio"]').text();
    if (unformattedDate == 'N/A') {
        $('#coverage-former-firm-from').val("");
        $('#coverage-former-firm-to').val("");
    } else {
        var splitDates = unformattedDate.split(" To ");
        $('#coverage-former-firm-from').val(splitDates[0]);
        $('#coverage-former-firm-to').val(splitDates[1]);

    }

    $('#coverage-former-firm-num-lawyers').val(row.find('td[class="coverage-former-firm-row-avg-lawyers"]').text());

    $('#coverage-former-firm-save-btn').show();
    $('#coverage-former-firm-add-btn').hide();

    $('#coverage-add-former-firm-modal').modal('show');


}

function removeFormerFirmRowPopulate(el) {
    $(el).parent().parent().remove();

    var rowCtr = getNumberOfRowsFromTable($('.coverage-former-firm-info .table'));

    if (rowCtr < 10) {
        $('#coverage-former-firm-modal-toggle').attr('disabled', false);
    }

    if(rowCtr == 0) {
        $('#coverage-former-firm-table-header').hide();
    }

}


function removeManRowPopulate(el) {

    $(el).parent().parent().remove();

    var rowCtr = getNumberOfRowsFromTable($('.coverage-man-info .table'));

    if(rowCtr == 0) {
        $('#coverage-man-firm-table-headers').hide();
    }

    if (rowCtr < 5)
        $('#coverage-man-firm-modal-toggle').attr('disabled', false);
}

function editManRowPopulate(el) {
    var row = $(el).parent().parent();
    $('#coverage-add-man-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#coverage-add-man-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });

    $('#coverage-man-add-to-list-btn').hide();
    $('#coverage-man-save-changes-btn').show();

    $('#coverage-man-row-id-ref').val(row.attr('id'));

    $('#coverage-man-name').val(row.find('td[class="coverage-man-row-name"]').text());

    var splitDates = row.find('td[class="coverage-man-row-yio"]').text().split(" To ");

    $('#coverage-man-from').val(splitDates[0]);
    $('#coverage-man-to').val(splitDates[1]);

    $('#coverage-man-services').val(row.find('td[class="coverage-man-row-services"]').text());

    $('#coverage-add-man-modal').modal('show');


}

function editCounselRowPopulate(el){
    var row = $(el).parent().parent();

    $('#coverage-add-counsel-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#coverage-add-counsel-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });

    $('#coverage-counsel-save-changes-btn').show();
    $('#coverage-counsel-add-to-list-btn').hide();
    $('#coverage-counsel-row-id-ref').val(row.attr('id'));

    $('#coverage-counsel-lso').val(row.find('td[class="coverage-counsel-row-lso"]').text());
    $('#coverage-counsel-name').val(row.find('td[class="coverage-counsel-row-name"]').text());

    $('#coverage-add-counsel-modal').modal('show');
}

function removeCounselRowPopulate(el){
    $(el).parent().parent().remove();

    var rowCtr = getNumberOfRowsFromTable($('.coverage-counsel-info .table'));

    if(rowCtr == 0) {
        $('#coverage-insure-counsel-table-header').hide();
    }

    if(rowCtr < 10) {
        $('#coverage-insure-counsel-modal-toggle').attr('disabled', false);
    }
}

function editOtherPurchasedCoverageRowPopulate(el) {


    var row = $(el).parent().parent();

    $('#other-purchased-coverage-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#other-purchased-coverage-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });

    var insurerKey = row.find('span[class="other-purchased-coverage-row-name-val"]').text();
    var insurerName = row.find('span[class="other-purchased-coverage-row-name-span"]').text();
    var claim = row.find('td[class="other-purchased-coverage-row-limits-claim"]').text().split(" ");
    var agg = row.find('td[class="other-purchased-coverage-row-limits-agg"]').text().split(" ");
    var policyPeriod = row.find('td[class="other-purchased-coverage-row-yio"]').text().split(" To ");
    $('#other-purchased-coverage-com-name').val(insurerKey);

    if(insurerKey == 'OTHER') {
        $('#other-purchased-coverage-other').val(insurerName);
        $('#other-purchased-coverage-com-name-other').show();
    } else {
        $('#other-purchased-coverage-other').val("");
        $('#other-purchased-com-name-other').hide();
    }

    $('#other-purchased-coverage-add-to-list-btn').hide();
    $('#other-purchased-coverage-save-changes-btn').show();

    $('#other-purchased-coverage-row-id-ref').val(row.attr('id'));
    $('#other-purchased-coverage-from').val(policyPeriod[0]);
    $('#other-purchased-coverage-to').val(policyPeriod[1]);
    $('#other-purchased-coverage-claim').val(claim[0]);
    $('#other-purchased-coverage-agg').val(agg[0]);
    $('#other-purchased-coverage-name').val(row.find('td[class="other-purchased-coverage-row-lawfirm"]').text());
    $('#other-purchased-coverage-modal').modal('show');

}

function removeOtherPurchasedCoverageRowPopulate(el) {
    $(el).parent().parent().remove();

    var rowCtr = getNumberOfRowsFromTable($('.other-purchased-coverage-info .table'));

    if(rowCtr == 0) {
        $('#other-purchased-coverage-table-header').hide();
    }


}


function isValidDate(date) {
    return moment(date, ['MMM DD, YYYY', "MM/DD/YYYY", "M/DD/YYYY", "MMMM DD, YYYY", "MMMM D, YYYY", "MMM D, YYYY", "MM-DD-YYYY", "MM-D-YYYY", "MM/D/YYYY", "M-DD-YYYY", "M-D-YYYY", "M/D/YYYY",
        "M.DD.YYY", "MM.DD.YYYY", "M.D.YYYY", "MM.D.YYYY"], true).format() !== 'Invalid date';
}

$(document).ready(function(){
    $('#DateofPolicy').on('blur', function(){
        if(isValidDate($(this).val())) {
            $(this).val(moment($(this).val()).format("MMM DD, YYYY"));
        }
    });

    $('#firm-letterhead-one').change(function(){
        handleApplicantLetterhead($(this), $('#applicant-letterheads-list-one'));
    });

    $('#firm-letterhead-two').change(function(){
       handleApplicantLetterhead($(this), $('#applicant-letterheads-list-two'));
    });

    $('#firm-letterhead-three').change(function(){
       handleApplicantLetterhead($(this), $('#applicant-letterheads-list-three'));
    });

    $('#firm-letterhead-four').change(function(){
        handleApplicantLetterhead($(this), $('#applicant-letterheads-list-four'));
    });

    $('#firm-letterhead-five').change(function(){
        handleApplicantLetterhead($(this), $('#applicant-letterheads-list-five'));
    });

    $('#related-letterhead-one').change(function(){
        handleApplicantLetterhead($(this), $('#applicant-former-firm-letterheads-list-one'));
    });

    $('#related-letterhead-two').change(function(){
        handleApplicantLetterhead($(this), $('#applicant-former-firm-letterheads-list-two'));
    });

    $('#related-letterhead-three').change(function(){
        handleApplicantLetterhead($(this), $('#applicant-former-firm-letterheads-list-three'));
    });

    $('#related-letterhead-four').change(function(){
        handleApplicantLetterhead($(this), $('#applicant-former-firm-letterheads-list-four'));
    });

    $('#related-letterhead-five').change(function(){
        handleApplicantLetterhead($(this), $('#applicant-former-firm-letterheads-list-five'));
    });

    $('#man-company-letterhead-one').change(function(){
       handleApplicantLetterhead($(this), $('#man-company-letterheads-list-one'));
    });

    $('#man-company-letterhead-two').change(function(){
       handleApplicantLetterhead($(this), $('#man-company-letterheads-list-two'));
    });

    $('#man-company-letterhead-three').change(function(){
       handleApplicantLetterhead($(this), $('#man-company-letterheads-list-three'));
    });

    $('#man-company-letterhead-four').change(function(){
       handleApplicantLetterhead($(this), $('#man-company-letterheads-list-four'));
    });

    $('#man-company-letterhead-five').change(function(){
       handleApplicantLetterhead($(this), $('#man-company-letterheads-list-five'));
    });

});

function getNumberOfRowsFromRow(row) {
    return $(row).parent().parent().find('tr:not(:has(th))').length;
}

function getNumberOfRowsFromTable(table) {
    return parseInt($(table).find('tr:not(:has(th))').length);
}


function handleApplicantLetterhead(fileElem, listElem) {
    var fileName = $(fileElem).val().replace("C:\\fakepath\\", "");

    $(listElem).text(fileName);

    if (fileName == '') {
        $(listElem).hide();

    } else {
        $(listElem).show();
    }

}

$(document).ready(function(){
   $('#DateofPolicy').keydown(function(e){
       e.preventDefault();
    });

   $('#effective-date-year-and-one').text(moment().year() + 1);
   $('#effective-date-year').text(moment().year());
});

function openApplicantInfoPopup() {
    $('#applicant-info-popup').show();
}

function getLetterheads() {
    var letterheads = new FormData();

    letterheads.append("applicantLetterheads", $('#firm-letterhead-one')[0].files[0]);
    letterheads.append("applicantLetterheads", $('#firm-letterhead-two')[0].files[0]);
    letterheads.append("applicantLetterheads", $('#firm-letterhead-three')[0].files[0]);
    letterheads.append("applicantLetterheads", $('#firm-letterhead-four')[0].files[0]);
    letterheads.append("applicantLetterheads", $('#firm-letterhead-five')[0].files[0]);

    letterheads.append("assocLetterheads", $('#related-letterhead-one')[0].files[0]);
    letterheads.append("assocLetterheads", $('#related-letterhead-two')[0].files[0]);
    letterheads.append("assocLetterheads", $('#related-letterhead-three')[0].files[0]);
    letterheads.append("assocLetterheads", $('#related-letterhead-four')[0].files[0]);
    letterheads.append("assocLetterheads", $('#related-letterhead-five')[0].files[0]);

    letterheads.append("manCompanyLetterheads", $('#man-company-letterhead-one')[0].files[0]);
    letterheads.append("manCompanyLetterheads", $('#man-company-letterhead-two')[0].files[0]);
    letterheads.append("manCompanyLetterheads", $('#man-company-letterhead-three')[0].files[0]);
    letterheads.append("manCompanyLetterheads", $('#man-company-letterhead-four')[0].files[0]);
    letterheads.append("manCompanyLetterheads", $('#man-company-letterhead-five')[0].files[0]);

    return letterheads;
}

function getFileSize(el) {
    return $(el)[0].files[0].size;
}