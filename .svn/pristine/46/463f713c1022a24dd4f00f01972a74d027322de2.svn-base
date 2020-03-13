var apiValidated = false;
var formModified = false;

$(document).ready(function(){
    $('.clickable-calendar').click(function(){
        $(this).parent().siblings('input').datepicker('show');
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


    $('input:radio[name="ThirdPartyPayor"]').change(function(){
        if ($(this).val() == 'true') {
            $('.third-party-info').show();
        } else {
            $('.third-party-info').hide();
        }
    })
});

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

function showValidNOP()
{
    $('#validNOP').fadeIn(500);
}

function showPopup(id)
{
    hidePopup(1);
}

function hidePopup(id)
{
    $('.questionHelpText').fadeOut();
}

function checkInsurer()
{
    $('#OtherExcessInsurer').prop('readonly', false);
    $('#liabilityLimits').show();

    if ($('#NameofInsurer').chosen().val() == null)
    {
        $('#NameofInsurer').val('');
        $('#NameofInsurer').trigger("chosen:updated");
    }else if ($('#NameofInsurer').chosen().val().indexOf('NONE') > -1)
    {
        $('#NameofInsurer').val('NONE');
        $('#NameofInsurer').trigger("chosen:updated");
        $('#OtherExcessInsurer').prop('readonly', true);
        $('#OtherExcessInsurer').val('');
        $('#liabilityLimits').hide();
        $('#Excess_per_Claim').val('');
        $('#Aggregate').val('');
    }
}

function checkRestricted()
{
    setTimeout(_checkRestricted, 200);
}

function _checkRestricted()
{
    if ($('#RPracYes').parent().hasClass('active'))
    {
        $('#restrictedDeclaration').show();
    }else
    {
        $('#restrictedDeclaration').hide();
    }
}

function checkPartTime()
{
    setTimeout(_checkPartTime, 200);
}

function _checkPartTime()
{
    if ($('#PPracYes').parent().hasClass('active'))
    {
        $('#parttimeDeclaration').show();
    }else
    {
        $('#parttimeDeclaration').hide();
    }
}

function checkPracticeOutside()
{
    setTimeout(_checkPracticeOutside, 200);
}

function _checkPracticeOutside()
{
    if ($('#PracticeOutsideYes').parent().hasClass('active') && ($('#Ontario_Years').val() == '0' || $('#Ontario_Years').val() == ''))
    {
        $('#PracticeOutsideOther').show();
    }
    else{
        $('#PracticeOutsideOther').hide();
        if ($('#PracticeOutsideOther').next().hasClass('errorMessage'))
        {
            $('#PracticeOutsideOther').next().hide();
        }
    }
}

function checkVolumeBillings()
{
    setTimeout(_checkVolumeBillings, 200);
}

function _checkVolumeBillings()
{
    if ($('#VolumeBillingsAnnualButton').parent().hasClass('active'))
    {
        $('#volumeBillingsAverage').val('');
        $('#volumeBillingsAverage').trigger("chosen:updated");

        $('#volumeBillingsAnnualContainer').show();
        $('#volumeBillingsAverageContainer').hide();
    }
    else if ($('#VolumeBillingsAverageButton').parent().hasClass('active'))
    {
        $('#volumeBillingsAnnual').val('');
        $('#volumeBillingsAnnual').trigger("chosen:updated");

        $('#volumeBillingsAverageContainer').show();
        $('#volumeBillingsAnnualContainer').hide();
    }
}

function checkTCRD()
{
    setTimeout(_checkTCRD, 200);
}

function _checkTCRD()
{
    if ($('#CertIndianStatusYes').parent().hasClass('active'))
    {
        $('#CertIndianStatusYesContainer').show();
    }else
    {
        $('#CertIndianStatusYesContainer').hide();
    }
}

function checkRealEstate()
{
    setTimeout(_checkRealEstate, 200);
}

function _checkRealEstate()
{
    if ($('#LandTitleYes').parent().hasClass('active'))
    {
        $('#RealEstatePracticeYesContainer').show();
    }else
    {
        $('#RealEstatePracticeYesContainer').hide();
    }
}

function showCreditAuth(value)
{
    $('#Instalment_Option').val(value);
    $('#creditAuth').show();
    $('#paymentAuthorization').show();
    $('#bankingAuth').hide();
    $('#paymentAuth').hide();
}

function showBankingAuth(value)
{
    $('#Instalment_Option').val(value);
    $('#creditAuth').hide();
    $('#bankingAuth').show();
    $('#paymentAuth').show();
    $('#paymentAuthorization').show();
}

function hidePaymentAuth(value)
{
    $('#Instalment_Option').val(value);
    $('#creditAuth').hide();
    $('#bankingAuth').hide();
    $('#paymentAuth').hide();
    $('#paymentAuthorization').hide();
}

function submitCC()
{
    window.location = '/moneris?custid=' + $('#UserName').val() + '_NEWAPP' + '&fromform=newapplicationform';
}

function reviseForm()
{
    window.location.reload();
}


function submitForm()
{
    if (confirm('Are you sure you have printed a copy of the form?'))
    {
        $(':checkbox').attr('disabled', false);
        $('#submitButton').attr('disabled', true);

        $.ajax({
            url: "/forms/submit/newapplicationform",
            type: "post",
            dataType: "json",
            data: $('#newApplicationForm').serialize(),
            success: function (result) {
                if (result.error == false)
                {
                    $('#formIntro').show();
                    $('#newApplicationForm').hide();
                    $('#confirmation').show();
                    $('#confirmationNumber').html(result.confirmation);
                    $('#submittedDate').html(result.createdDate);
                    $('#helpContainer').hide();
                    $('#efilingInfo').show();
                }
                else
                {
                    window.location.href = '/error';
                }
            },
            error: function (result) {
                if (result.status == 403)
                {
                    window.location.href = '/timeout';
                }else {
                    window.location.href = '/error';
                }

            }
        });

        $(':checkbox').attr('disabled', true);

    }

    return false;
}

function save()
{
    $.ajax({
        url: "/forms/save/newapplicationform",
        type: "post",
        dataType: "json",
        data: $('#newApplicationForm').serialize(),
        success: function (result) {
            return true;
        },
        error: function (a, b, c) {
            return false;
        }
    });
}

function validateAPI()
{
    setTimeout(5000);
    var validAPIForm = false;
    $.ajax({
        url: "/forms/validate/newapplicationform",
        type: "post",
        async: false,
        dataType: "json",
        data: $('#newApplicationForm').serialize(),
        success: function (result) {
            if (result.error == false)
            {
                validAPIForm = true;
            }else
            {
                for (var i=0; i<result.violations.length;i++)
                {
                    var errorElement = document.createElement('div');
                    errorElement.setAttribute('class', 'errorMessage');
                    errorElement.appendChild(document.createTextNode(result.violations[i].message));
                    var violationKey = result.violations[i].name.split('_');

                    if(violationKey[0] !== 'nameofInsurer'){

                        if ($("input[data-id='" + violationKey[0] + "']").length > 0)
                        {
                            if ($("input[data-id='" + violationKey[0] + "']").hasClass('touchspin1'))
                            {
                                $("input[data-id='" + violationKey[0] + "']").addClass('radioError');
                                $("input[data-id='" + violationKey[0] + "']").parent().parent().after($(errorElement));
                            }else if ($("input[data-id='" + violationKey[0] + "']").parent().hasClass('icheckbox_square-green'))
                            {
                                $("input[data-id='" + violationKey[0] + "']").parent().parent().parent().parent().next().after($(errorElement));
                                $("input[data-id='" + violationKey[0] + "']").addClass('radioError');
                            }else
                            {
                                $(errorElement).insertAfter("input[data-id='" + violationKey[0] + "']");
                                $("input[data-id='" + violationKey[0] + "']").addClass('radioError');
                            }

                            //find tab
                            $('#' + $("input[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').addClass('radioError');
                        }else if ($("select[data-id='" + violationKey[0] + "']").length > 0)
                        {
                            $("select[data-id='" + violationKey[0] + "']").next().addClass('radioError');
                            $("select[data-id='" + violationKey[0] + "']").next().after($(errorElement));

                            //find tab
                            $('#' + $("select[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').addClass('radioError');
                        }else if ($("div[data-id='" + violationKey[0] + "']").length > 0)
                        {
                            $("div[data-id='" + violationKey[0] + "']").addClass('radioError');
                            $("div[data-id='" + violationKey[0] + "']").after($(errorElement));

                            //find tab
                            $('#' + $("div[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').addClass('radioError');
                        }else if ($("textarea[data-id='" + violationKey[0] + "']").length > 0)
                        {
                            $("textarea[data-id='" + violationKey[0] + "']").addClass('radioError');
                            $("textarea[data-id='" + violationKey[0] + "']").parent().after($(errorElement));

                            //find tab
                            $('#' + $("textarea[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').addClass('radioError');
                        }
                    }
                    if (i == result.violations.length-1)
                    {
                        $('#' + $("select[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("input[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("div[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("textarea[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                    }
                }
            }
        },
        error: function (a,b,c) {
            if (a.status == 403)
            {
                window.location.href = '/timeout';
            }else {
                window.location.href = '/error';
            }

        }
    });

    return validAPIForm;
}

//submit form and pass to review
function review()
{
    save();


    var result1 = validate();
    if(result1){
        if (validateAPI()) //client side
        {
            $('.bigButton').hide();
            $('#addressTab').trigger('click');
            $('#myInfoTabs').hide();
            $('#myTabedu1').hide();
            $('#btnUpdateDetails').hide();
            $('.btnSave').hide();
            $('.formIntro').hide();
            $('.formReview').show();
            $('.input-group-btn').hide();
            $('.input-group-addon').hide();
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
            $('#printIcon').show();
            $('#validNOPText').hide();
            $('.actionLink').remove();
            $('#checkVolumeBillings').hide();
            $('#addressConfirmation').hide();
            $('.address-details').show();
            $('#firmConfirmation').hide();
            $('.banking-info-review').show();

            window.scrollTo(0,0)

            $('.millionPerClaimValue').attr('style', 'width: initial; padding-right: 10px; float: left;')
            $('.millionPerClaimLabel').attr('style', 'float: left; margin-top: 10px;')

            var paymentElement = document.createElement('div');
            paymentElement.setAttribute('class', 'readOnlyInput');
            var paymentSelection = '';
            if ($('#Instalment_Option').val() == '1S CASH')
            {
                paymentSelection = 'Lump sum payment by cheque';
                $('#creditAlert').hide();
            } else if ($('#Instalment_Option').val() == '1S EFT')
            {
                paymentSelection = 'Lump sum payment by pre-authorized transfer';
                $('#creditAlert').hide();
            } else if ($('#Instalment_Option').val() == '1S CREDIT CARD')
            {
                $('#submitButton').hide();
                $('#creditButton').show();
                $('#creditInfo').show();
                $('#creditAlert').show();
                paymentSelection = 'Lump sum payment by credit card';
            } else if ($('#Instalment_Option').val() == '4S EFT')
            {
                paymentSelection = 'Quarterly payments by pre-authorized transfer';
                $('#creditAlert').hide();
            } else if ($('#Instalment_Option').val() == '4S CREDIT CARD')
            {
                $('#submitButton').hide();
                $('#creditButton').show();
                $('#creditInfo').show();
                $('#creditAlert').show();
                paymentSelection = 'Quarterly payments by credit card';
            } else if ($('#Instalment_Option').val() == '12S EFT')
            {
                paymentSelection = 'Monthly payments by pre-authorized transfer';
                $('#creditAlert').hide();
            } else if ($('#Instalment_Option').val() == '12S CREDIT CARD')
            {
                $('#submitButton').hide();
                $('#creditButton').show();
                $('#creditInfo').show();
                $('#creditAlert').show();
                paymentSelection = 'Monthly payments by credit card';
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

            //remove instructions in comments.
            $('.comments-area div.questionInstructions').hide();
        }

    }


    $('#provinceReadOnly').next().hide();

    if ($('#OtherExcessInsurer').val() == '')
    {
        $('#OtherExcessInsurer').prev().hide();
    }

    return false;
}

function validate() {
    $('.radioError').each(function () {
        $(this).removeClass('radioError');
        $('.errorMessage').each(function () {
            $(this).remove();
        });
    });

    var result = true;
    var tab;

    /*if ($('#CertIndianStatusYes').parent().hasClass('active') == false && $('#CertIndianStatusNo').parent().hasClass('active') == false)
    {
        $('#CertIndianStatusYes').parent().parent().addClass('radioError');
        $('#lawInfoTab').addClass('radioError');
        msg = msg + 'Certificate of Indian Status or TCRD is required<br/>';
        tab = $('#lawInfoTab');
        result = false;
    }*/

    if ($('#repcoAllowed').val() == 'false' && $('#LandTitleYes').parent().hasClass('active'))
    {
        var msg = 'Our records indicate you do not meet eligibility requirements for the Real Estate Practice Option. Please select \'No\' with respect to this coverage option.';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#LandTitleYes').parent().parent());

        $('#LandTitleYes').parent().parent().addClass('radioError');
        $('#coverageTab').addClass('radioError');
        if (tab == null) {
            tab = $('#coverageTab');
        }

        result = false;
    }

    if ($('#Ontario_Years').val() == '')
    {
        var msg = 'Please enter the number of years in practice';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#Ontario_Years').parent().parent());

        $('#Ontario_Years').parent().addClass('radioError');
        $('#lawInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#lawInfoTab');
        }

        result = false;
    }

    if ($('#PracticeOutsideYes').parent().hasClass('active') == false && $('#PracticeOutsideNo').parent().hasClass('active') == false)
    {
        var msg = 'Please select if you have practiced law outside of Ontario';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#PracticeOutsideYes').parent().parent());

        $('#PracticeOutsideYes').parent().parent().addClass('radioError');
        $('#lawInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#lawInfoTab');
        }

        result = false;
    }

    if (($('#volumeBillingsAnnual').chosen().val() == '' || $('#volumeBillingsAnnual').chosen().val() == null) && ($('#volumeBillingsAverage').chosen().val() == null || $('#volumeBillingsAverage').chosen().val() == ''))
    {
        if ($('#VolumeBillingsAnnualButton').parent().hasClass('active') == false && $('#VolumeBillingsAverageButton').parent().hasClass('active') == false)
        {
            var msg = 'Please select actual or average volume billing';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#VolumeBillingsAnnualButton').parent().parent());

            $('#VolumeBillingsAnnualButton').parent().parent().addClass('radioError');
            result = false;
        }else
        {
            var msg = 'Please select a volume billing option';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#volumeBillingsAverage').parent());
            $(errorElement).insertAfter($('#volumeBillingsAnnual').parent());

            $('#volumeBillingsAnnual').next().addClass('radioError');
            $('#volumeBillingsAverage').next().addClass('radioError');
            if (tab == null)
            {
                tab = $('#lawInfoTab');
            }

            result = false;
        }
    }

    if ($('#primaryAreaOfPractice').chosen().val() == '' || $('#primaryAreaOfPractice').chosen().val() == null)
    {
        var msg = 'Please select your primary area of practice';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#primaryAreaOfPractice').next());

        $('#primaryAreaOfPractice').next().addClass('radioError');
        $('#lawInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#lawInfoTab');
        }

        result = false;
    }

    if ($('#Private_Hours').val() == '')
    {
        $('#Private_Hours').parent().addClass('radioError');
        var msg = 'Please enter number of professional hours';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#Private_Hours').parent().parent());

        $('#lawInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#lawInfoTab');
        }

        result = false;
    }

    /*if ($('#PersonalLawCorp').val() == '')
    {
        $('#PersonalLawCorp').parent().addClass('radioError');
        $('#lawInfoTab').addClass('radioError');
        tab = $('#lawInfoTab');
        result = false;

    }*/

    if ($('#PracticeOutsideOtherText').val() == '' && $('#PracticeOutsideYes').parent().hasClass('active') == true && ($('#Ontario_Years').val() == '0' || $('#Ontario_Years').val() == ''))
    {
        var msg = 'Please enter details';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#PracticeOutsideOtherText').parent().parent());

        $('#PracticeOutsideOtherText').addClass('radioError');
        $('#lawInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#lawInfoTab');
        }

        result = false;

    }
    if ($('#NatureOfLawPractice').chosen().val() == null)
    {
        var msg = 'Please select the nature of your law practice';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#NatureOfLawPractice').next());

        $('#NatureOfLawPractice').next().addClass('radioError');
        $('#firmInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#firmInfoTab');
        }

        result = false;
    }

    if ($('#NameofInsurer').chosen().val() == null && $('#OtherExcessInsurer').val() == '')
    {
        var msg = 'Please select an excess insurer';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#NameofInsurer').next());
        $('#NameofInsurer').next().addClass('radioError');
        $('#firmInfoTab').addClass('radioError');
        tab = $('#firmInfoTab');
        result = false;
    }

    if ($('#NumberofLawyers').val() == '')
    {
        var msg = 'Please enter the number of insured lawyers';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#NumberofLawyers').parent().parent());

        $('#NumberofLawyers').parent().addClass('radioError');
        $('#firmInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#firmInfoTab');
        }

        result = false;
    }

    if($('#NonLaw').val() != '' && parseInt($('#NonLaw').val()) > 999){
        var msg = 'Number of uninsured staff can not be more than 999';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#NonLaw').parent().parent());
        $('#NonLaw').parent().addClass('radioError');
        $('#firmInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#firmInfoTab');
        }

        result = false;
    }

    if ($('#NonLaw').val() == '')
    {
        var msg = 'Please enter the number of uninsured staff';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#NonLaw').parent().parent());
        $('#NonLaw').parent().addClass('radioError');
        $('#firmInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#firmInfoTab');
        }

        result = false;
    }



    /*if ($('#Excess_per_Claim').val() == '')
    {
        var msg = 'Please enter enter for excess per claim';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#Excess_per_Claim').parent().parent());

        $('#Excess_per_Claim').parent().addClass('radioError');
        $('#firmInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#firmInfoTab');
        }

        result = false;
    }

    if ($('#Aggregate').val() == '')
    {
        var msg = 'Please enter number for aggregate';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#Aggregate').parent().parent());

        $('#Aggregate').parent().addClass('radioError');
        $('#firmInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#firmInfoTab');
        }

        result = false;
    }*/

    if ($('#Deductibles').chosen().val() == '' || $('#Deductibles').chosen().val() == null)
    {
        var msg = 'Please select a deductible';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#Deductibles').next());
        $('#Deductibles').next().addClass('radioError');
        $('#firmInfoTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#coverageTab');
        }

        result = false;
    }

    /*if ($('#RPracYes').parent().hasClass('active') == false && $('#RPracNo').parent().hasClass('active') == false)
    {
        $('#RPracYes').parent().parent().addClass('radioError');
        $('#coverageTab').addClass('radioError');
        tab = $('#coverageTab');
        result = false;
    }*/

    if ($('#RPracYes').parent().hasClass('active') && $('#DeclarationR').is(':checked') == false)
    {
        var msg = 'Please sign your restricted declaration';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#DeclarationR').parent().parent().parent().parent().next());

        $('#DeclarationR').parent().addClass('radioError');
        $('#coverageTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#coverageTab');
        }

        result = false;
    }

    /*if ($('#PPracYes').parent().hasClass('active') == false && $('#PPracNo').parent().hasClass('active') == false)
    {
        $('#PPracYes').parent().parent().addClass('radioError');
        $('#coverageTab').addClass('radioError');
        tab = $('#coverageTab');
        result = false;
    }*/

    if ($('#PPracYes').parent().hasClass('active') && $('#DeclarationP').is(':checked') == false)
    {
        var msg = 'Please sign your part time practice declaration';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#DeclarationP').parent().parent().parent().parent().next());

        $('#DeclarationP').parent().addClass('radioError');
        $('#coverageTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#coverageTab');
        }

        result = false;
    }

    if ($('#LandTitleYes').parent().hasClass('active') == false && $('#LandTitleNo').parent().hasClass('active') == false)
    {
        var msg = 'Please select a real estate coverage option';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#LandTitleYes').parent().parent());

        $('#LandTitleYes').parent().parent().addClass('radioError');
        $('#coverageTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#coverageTab');
        }

        result = false;
    }

    if ($('#DateofPolicy').val() == '')
    {
        var msg = 'Please enter the effective date of your policy';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#DateofPolicy').parent().parent());

        $('#DateofPolicy').parent().addClass('radioError');
        $('#coverageTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#coverageTab');
        }

        result = false;
    }

    if (isValidDate($('#DateofPolicy').val()) && $('#DateofPolicy').val() !== '') {

        $('#DateofPolicy').val(moment($('#DateofPolicy').val()).format("MMM DD, YYYY"));
    } else {
        if($('#DateofPolicy').val() !== '') {
            var msg = 'Please enter a correctly formatted date as MMM DD, yyyy (or use the Calendar Selection feature).';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#DateofPolicy').parent().parent());
        }

        $('#DateofPolicy').parent().addClass('radioError');

        $('#coverageTab').addClass('radioError');

        if(tab == null) {
            tab = $('#coverageTab');
        }

        result = false;
    }

    if ($('#ThirdPartyPayorYes').parent().hasClass('active') == false && $('#ThirdPartyPayorNo').parent().hasClass('active') == false)
    {
        var msg = 'Please select a third party option';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#ThirdPartyPayorYes').parent().parent());

        $('#ThirdPartyPayorYes').parent().parent().addClass('radioError');
        $('#paymentTab').addClass('radioError');
        if (tab == null)
        {
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

    if ($('#Instalment_Option').val() != '' && $('#Instalment_Option').val() != '1S CASH' && $('#PPA_Check').is(':checked') == false)
    {
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

    if ($('#Instalment_Option').val() == '1S EFT' || $('#Instalment_Option').val() == '4S EFT' || $('#Instalment_Option').val() == '12S EFT')
    {
        if ($('#transitNumber').val() == '')
        {
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
            var msg = 'Please enter a 5 digit transit number';
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
            tab = $('#paymentTab');
            result = false;
        }

        if (!isNaN($('#accountNumber').val()) && $('#accountNumber').val() != '' && parseInt($('#accountNumber').val().length) < 7) {
            var msg = 'Please enter at least 7 digits as a account number';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#accountNumber').parent().parent());

            $('#accountNumber').addClass('radioError');
            $('#paymentTab').addClass('radioError');
            tab = $('#paymentTab');
            result = false;
        }
        if ($('#bankingInstitution2').val() == '')
        {
            var msg = 'Please select your banking institution';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#BankingInstitution').parent().parent());

            $('#BankingInstitution').next().addClass('radioError');
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

    if ($('#claimsYes').parent().hasClass('active') == false && $('#claimsNo').parent().hasClass('active') == false)
    {
        var msg = 'Please select claims or potential claims';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#claimsYes').parent().parent());

        $('#claimsYes').parent().parent().addClass('radioError');
        $('#finalizeTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#finalizeTab');
        }

        result = false;
    }

    if ($('#Declaration').is(':checked') == false)
    {
        var msg = 'Please sign your warranty and signature declaration';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#Declaration').parent().parent());

        $('#Declaration').parent().addClass('radioError');
        $('#finalizeTab').addClass('radioError');
        if (tab == null)
        {
            tab = $('#finalizeTab');
        }

        result = false;
    }

    if (!result)
    {
        showValidateErrors(tab, 'Please fill out all required fields');
    }

    return result;
}

function showValidateErrors(tab, msg)
{
    $(tab).children().first().trigger('click');

    if (msg !== '')
    {
        $('.lobibox-notify-error').remove();

        Lobibox.notify(
            'error',
            {
                delay: 20000,
                msg: msg,
                sound: false
            }
        );

        window.scrollTo(0,0)
    }
}

function next(details)
{
    save();

    window.scrollTo(0,0)

    if (details){
        toggleDetails(false);
    }

    $('#myTabedu1').find('li.active').next().children().first().trigger('click');

    formModified = false;
}

function populateForm()
{
    $.ajax({
        url: "/forms/details/newapplicationform",
        type: "get",
        dataType: "json",
        data: $('#UserDetailsForm').serialize(),
        success: function (result) {
            if (result.found == true)
            {
                $('#submittedDate').html(new Date().toDateString());

                //populate values
                if (result.tcrd == true)
                {
                    $('#CertIndianStatusYes').trigger('click');
                }else if (result.tcrd == false){
                    $('#CertIndianStatusNo').trigger('click');
                }

                if (result.volumeBillings == 'annual')
                {
                    $('#VolumeBillingsAnnualButton').trigger('click');
                }
                else if (result.volumeBillings == 'average')
                {
                    $('#VolumeBillingsAverageButton').trigger('click');
                }

                if (result.practiceOutside == true)
                {
                    $('#PracticeOutsideYes').trigger('click');
                }else if (result.practiceOutside == false){
                    $('#PracticeOutsideNo').trigger('click');
                }
                $('#PracticeOutsideOtherText').val(result.practiceOutsideOther);
                $('#Ontario_Years').val(result.ontario_Years);
                $('#Private_Hours').val(result.private_Hours);
                $('#PersonalLawCorp').val(result.personalLawCorp);
                $('#NumberofLawyers').val(result.numberofLawyers);
                $('#pendingFirmName').val(result.firmInfo);

                $('#NonLaw').val(result.nonLaw);
                $('#Excess_per_Claim').val(result.excess_per_Claim);
                $('#Aggregate').val(result.aggregate);
                $('#DateofPolicy').val(result.dateofPolicy);

                if (result.rprac == true)
                {
                    $('#RPracYes').trigger('click');
                }else if (result.rprac == false){
                    $('#RPracNo').trigger('click');
                }
                if (result.pprac == true)
                {
                    $('#PPracYes').trigger('click');
                }else if (result.pprac == false){
                    $('#PPracNo').trigger('click');
                }
                if (result.landTitle == true)
                {
                    $('#LandTitleYes').trigger('click');
                }else if (result.landTitle == false){
                    $('#LandTitleNo').trigger('click');
                }

                $('#InnocentPartyCoverage').html(result.innocentPartyCoverage);
                $('#InnocentPartyCoverageValue').val(result.innocentPartyCoverage);

                if (result.thirdPartyPayor == true)
                {
                    $('#ThirdPartyPayorYes').trigger('click');
                }else if (result.thirdPartyPayor == false){
                    $('#ThirdPartyPayorNo').trigger('click');
                }
                if (result.claims == true)
                {
                    $('#claimsYes').trigger('click');
                }else if (result.claims == false){
                    $('#claimsNo').trigger('click');
                }
                $('#volumeBillingsAnnual').val(result.gb);
                $('#volumeBillingsAnnual').trigger("chosen:updated");
                $('#volumeBillingsAverage').val(result.gb);
                $('#volumeBillingsAverage').trigger("chosen:updated");
                $('#Deductibles').val(result.deduc);
                $('#Deductibles').trigger("chosen:updated");
                $('#primaryAreaOfPractice').val(result.primaryAreaOfPractice);
                $('#primaryAreaOfPractice').trigger("chosen:updated");
                $('#secondaryAreaOfPractice').val(result.secondaryAreaOfPractice);
                $('#secondaryAreaOfPractice').trigger("chosen:updated");
                if (result.natureOfLawPractice != '' && result.natureOfLawPractice != null)
                {
                    var natureOfLawPractice = result.natureOfLawPractice.split(',');
                    $('#NatureOfLawPractice').val(natureOfLawPractice);
                    $('#NatureOfLawPractice').trigger("chosen:updated");
                }
                if (result.nameofInsurer != '' && result.nameofInsurer != null)
                {
                    var nameofInsurer = result.nameofInsurer.split(',');
                    $('#NameofInsurer').val(nameofInsurer);
                    $('#NameofInsurer').trigger("chosen:updated");
                    checkInsurer();
                }
                $("#OtherExcessInsurer").val(result.otherExcessInsurer);
                $('#OtherExcessInsurer').trigger("chosen:updated");
                $('#comments').val(result.comments);

                if (result.instalment == '1S CASH')
                {
                    $('#1SCASH').parent().trigger('click');
                } else if (result.instalment == '1S EFT')
                {
                    $('#1SEFT').parent().trigger('click');
                } else if (result.instalment == '1S CREDIT CARD')
                {
                    $('#1SCREDITCARD').parent().trigger('click');
                } else if (result.instalment == '4S EFT')
                {
                    $('#4SEFT').parent().trigger('click');
                } else if (result.instalment == '4S CREDIT CARD')
                {
                    $('#4SCREDITCARD').parent().trigger('click');
                } else if (result.instalment == '12S EFT')
                {
                    $('#12SEFT').parent().trigger('click');
                } else if (result.instalment == '12S CREDIT CARD')
                {
                    $('#12SCREDITCARD').parent().trigger('click');
                }
            }else
            {
                $('#volumeBillingsAnnual').val('');
                $('#volumeBillingsAnnual').trigger("chosen:updated");
                $('#volumeBillingsAverage').val('');
                $('#volumeBillingsAverage').trigger("chosen:updated");
                $('#Deductibles').val('');
                $('#Deductibles').trigger("chosen:updated");
                $('#primaryAreaOfPractice').val('');
                $('#primaryAreaOfPractice').trigger("chosen:updated");
                $('#secondaryAreaOfPractice').val('');
                $('#secondaryAreaOfPractice').trigger("chosen:updated");
                $('#NatureOfLawPractice').val('');
                $('#NatureOfLawPractice').trigger("chosen:updated");
                $("#NameofInsurer").val('');
                $('#NameofInsurer').trigger("chosen:updated");
                $("#OtherExcessInsurer").val('');
                $('#OtherExcessInsurer').trigger("chosen:updated");

            }
            formModified = false;
        },
        error: function(result)
        {

        }
    });
}

//Flip questions to edit mode
function edit()
{
    $('#btnEdit').hide();
    $('#btnEditCancel').show();

    $('.questionTitle').hide();
    $('.questionTitleInput').show();

    $('.questionInstructions').hide();
    $('.questionInstructionsInput').show();

        $('.questionInstructionsInput').summernote({
            height : 150,
            callbacks : {
                onBlur : function(){
                    if ($(this).val() != $(this).prev().html())
                    {
                        $.ajax({
                            url: "/forms/update/questionInstructions",
                            type: "post",
                            dataType: "json",
                            data: { 'id': $(this).parent().find('.questionID').val(), 'text': $(this).val()},
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


        $('.questionHelpInput').summernote({
            height : 150,
            callbacks : {
                onBlur : function(){
                    //TODO: Send API call to update question
                    if ($(this).val() != $(this).prev().html())
                    {
                        $.ajax({
                            url: "/forms/update/questionHelp",
                            type: "post",
                            dataType: "json",
                            data: { 'id': $(this).parent().parent().find('.questionID').val(), 'text': $(this).val()},
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
}

$(document).ready(function(){

    $('#coverageTab').trigger('click');

    $(function () {
        var token = _csrf_token;
        var header = "X-CSRF-TOKEN";
        $(document).ajaxSend(function(e, xhr, options) {
            xhr.setRequestHeader(header, token);
        });
    });

    $('.questionHelp').click(function(){
        hidePopup(1); //TODO: Remove parameter
        $(this).parent().parent().find('.questionHelpText').fadeIn();
    }) ;

    $('.touchspin1').change(function(e){
        e.preventDefault();
        if (isNaN($(this).val()))
        {
            $(this).val('');
        }
    });

    $('#DateofPolicy').datepicker(
        {format : 'M dd, yyyy',
            startDate: startOfPreviousYear(),
            endDate: endOfRenewalYear(),
            forceParse: false
        }
    );

    populateForm();
    toggleDetails(false);

    $('#paymentOptions .iCheck-helper').each(function(){
        $(this).click(function(){
            $(this).parent().parent().trigger('click');
        });
    });

    $('#paymentAuthorization .iCheck-helper').each(function(){
        $(this).click(function(){
            $(this).parent().parent().trigger('click');
        });
    });

    $('#volumeBillingsAnnual').chosen();
    $('#volumeBillingsAverage').chosen();
    $('#primaryAreaOfPractice').chosen();
    $('#secondaryAreaOfPractice').chosen();
    $('#BankingInstitution').chosen();
    $('#Deductibles').chosen();
    $('#NatureOfLawPractice').chosen({ placeholder_text_single: 'Select an option'});
    $('#NameofInsurer').chosen({ multiple: true, placeholder_text_multi: 'Select Insurance Provider(s)'});
    $('.chosen-container').each(function(){
        $(this).width($(this).prev().width());
    });
    $('#BankingInstitution').on('change', function(e) {
        $('#bankingInstitution2').val($(this).val());
    });

    $('#btnEdit').click(function(){
        edit();
        return false;
    });

    $('#btnEditCancel').click(function(){
        location.reload();
    });

    $('.questionTitleInput').blur(function(){
        if ($(this).val() != $(this).prev().html())
        {
            $.ajax({
                url: "/forms/update/questionText",
                type: "post",
                dataType: "json",
                data: { 'id': $(this).parent().parent().find('.questionID').val(), 'text': $(this).val()},
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

    $('.questionInstructionsInput').blur(function(){
        //TODO: Send API call to update question

        if ($(this).val() != $(this).prev().html())
        {
            $.ajax({
                url: "/forms/update/questionInstructions",
                type: "post",
                dataType: "json",
                data: { 'id': $(this).parent().find('.questionID').val(), 'text': $(this).val()},
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


    $('.questionHelpInput').blur(function(){
        //TODO: Send API call to update question
        if ($(this).val() != $(this).prev().html())
        {
            $.ajax({
                url: "/forms/update/questionHelp",
                type: "post",
                dataType: "json",
                data: { 'id': $(this).parent().parent().find('.questionID').val(), 'text': $(this).val()},
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

    $('.myNewAppTab').mousedown(function(e){
        save();
        if (formModified)
        {
            var elementClicked = $(this);
            var msg = "You have not saved your changes. Are you sure you want to leave this page?"
            Lobibox.confirm(
                {
                    msg: msg,
                    modal: true,
                    title: 'Unsaved changes',
                    buttons: {
                        'yes': { text: 'Return for form'},
                        'cancel': { text: 'Discard changes'}
                    },
                    callback: function ($this, type, ev) {
                        if (type == 'cancel') {
                            formModified = false;
                            cancelAddress();
                            cancelFirm();
                            $(elementClicked).children().first().trigger('click');
                        }else{
                            formModified = false;
                            save();
                            $(elementClicked).children().first().trigger('click');
                        }

                    }
                }
            );
        }else if ($('#btnSaveFirmDetails').is(':visible'))
        {
            var elementClicked = $(this);
            var msg = "You have not saved your changes. Are you sure you want to leave this page?"
            Lobibox.confirm(
                {
                    msg: msg,
                    modal: true,
                    title: 'Unsaved changes',
                    buttons: {
                        'yes': { text: 'Return to form'},
                        'cancel': { text: 'Discard changes'}
                    },
                    callback: function ($this, type, ev) {
                        if (type == 'cancel') {
                            cancelFirm();
                            $(elementClicked).children().first().trigger('click');
                            $(elementClicked).trigger('click');
                        }else{
                            e.preventDefault();
                        }

                    }
                });
        }else if ($('#btnSaveAddressDetails').is(':visible')) {
            var elementClicked = $(this);
            var msg = "You have not saved your changes. Are you sure you want to leave this page?"
            Lobibox.confirm(
                {
                    msg: msg,
                    modal: true,
                    title: 'Unsaved changes',
                    buttons: {
                        'yes': {text: 'Return to form'},
                        'cancel': {text: 'Discard changes'}
                    },
                    callback: function ($this, type, ev) {
                        if (type == 'cancel') {
                            cancelAddress();
                            $(elementClicked).children().first().trigger('click');
                            $(elementClicked).trigger('click');
                        } else {
                            e.preventDefault();
                        }

                    }
                }
            );
        }

        if ($('#addressConfirmation').is(':visible'))
        {
            $('#addressConfirmation').hide();
            $('#addressDetails').show();
            $('.address-details').show();
            $('#btnUpdateAddressDetails').show();
        }

        if ($('#firmConfirmation').is(':visible'))
        {
            $('#firmConfirmation').hide();
            $('#firmDetails').show();
            $('#firm-details').show();
            $('#btnUpdateFirm').show();
        }

    });



    //$('#newApplicationForm input, #newApplicationForm select, #newApplicationForm textarea').change(function(){
        //formModified = true;
    //});
});

function isValidDate(date) {
    return moment(date, ['MMM DD, YYYY', "MM/DD/YYYY", "M/DD/YYYY", "Mmmm DD, YYYY", "MMMM DD, YYYY", "MMMM D, YYYY", "MMM D, YYYY", "MM-DD-YYYY", "MM-D-YYYY", "MM/D/YYYY", "M-DD-YYYY", "M-D-YYYY", "M/D/YYYY",
                            "M.DD.YYY", "MM.DD.YYYY", "M.D.YYYY", "MM.D.YYYY"], true).format() !== 'Invalid date';
}

$(document).ready(function(){
   $('#DateofPolicy').on('blur', function(){
       if(isValidDate($(this).val())) {
           $(this).val(moment($(this).val()).format("MMM DD, YYYY"));
       }
   });

   $('#DateofPolicy').keydown(function(e){
        e.preventDefault();
    });

});