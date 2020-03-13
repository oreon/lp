$(document).ready(function(){

    postalCodeRx = " ^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$";

    $('#preferredMailingValue').hide();
    $('#mailingAddress1').siblings('label').text("Address for future LAWPRO Correspondence");
    $('#position').parent().hide();
    $('#firmTab').hide();
    $('#btnContinueFromAddressReview').text("Continue to IROP Form");
    $('#faxNumber').parent().hide();
    $('#addlPhone').parent().hide();
    $('#workPhone').parent().hide();
    $('#laywerFirmName').parent().hide();
    $('#homePhone').siblings('label').text("Telephone number");
    $('#previewMailingLabel').siblings('label').hide();
    $('#preferredMailingButtons').hide();
    $('#preferredMailingHome').trigger('click');
    $('#website').parent().hide();
    $('#city').prop('readonly', true);
    $('#province').hide();
});


function submitAddress()
{
    var submitAPIAddressForm = false;
    var json = getAddressJson();
    $.ajax({
        url: "/forms/submit/irop/address",
        type: "post",
        async: false,
        contentType : "application/json",
        dataType: "json",
        data: JSON.stringify(json),
        success: function (result) {
            if (result.error == false)
            {
                $('#submittedDateAddress').html(result.createdDate);
                $('#submittedDateAddressReview').html(result.createdDate);
                $('#confirmationNumberAddress').html(result.confirmation);
                $('#confirmationNumberAddressReview').html(result.confirmation);
                submitAPIAddressForm = true;
                if ($('#lawyerFirmNumber').val() != '000000' && $('#lawyerFirmNumber').val() != '980608')
                {
                    $('#newAppNoFirm').hide();
                    $('#newAppNoFirm').val('');
                }

                //replace email address in form

            }else {
                submitAPIAddressForm = false;
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

    return submitAPIAddressForm;
}

function getAddressJson() {
    var json = {};

    json.effectiveDate = $('#EffectiveDate').val();
    json.LSONumber = $('#hiddenLawID').val();
    json.firstName = $('#firstName').val();
    json.lastName = $('#lastName').val();
    json.homePhone = $('#homePhone').val();
    json.email = $('#email').val();
    json.mailingAddress1 = $('#mailingAddress1').val();
    json.mailingAddress2 = $('#mailingAddress2').val();
    json.mailingAddress3 = $('#mailingAddress3').val();
    json.city = $('#city').val();
    json.province = $('#province').val();
    json.provinceOther = $('#provinceOther').val();
    json.postalCode = $('#postalCode').val();

    return json;

}

function submitFirm()
{
    var submitAPIFirmForm = false;
    $.ajax({
        url: "/forms/submit/firm",
        type: "post",
        async: false,
        dataType: "json",
        data: $('#firmDetails :input').serialize(),
        success: function (result) {
            if (result.error == false)
            {
                $('#submittedDateFirm').html(result.createdDate);
                $('#confirmationNumberFirmDetails').html(result.confirmation);
                submitAPIFirmForm = true;
            }else {
                submitAPIFirmForm = false;
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

    return submitAPIFirmForm;
}

function validateAddressAPI() {
    var validAPIAddressForm = false;
    $.ajax({
        url: "/forms/validate/address",
        type: "post",
        async: false,
        dataType: "json",
        data: $('#addressDetails :input').serialize(),
        success: function (result) {
            if (result.error == false)
            {
                validAPIAddressForm = true;
            }else
            {
                for (var i=0; i<result.violations.length;i++)
                {
                    var errorElement = document.createElement('div');
                    errorElement.setAttribute('class', 'errorMessage');
                    errorElement.appendChild(document.createTextNode(result.violations[i].message));
                    var violationKey = result.violations[i].name.split('_');
                    if ($("input[data-id='" + violationKey[0] + "']").length > 0)
                    {
                        if ($("input[data-id='" + violationKey[0] + "']").hasClass('touchspin1'))
                        {
                            $("input[data-id='" + violationKey[0] + "']").addClass('radioError');
                            $("input[data-id='" + violationKey[0] + "']").parent().parent().after($(errorElement));
                        }else{
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

                    if (i == result.violations.length-1)
                    {
                        $('#' + $("select[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("input[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("div[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
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

    return validAPIAddressForm;

}

function validateAddress()
{
    $('.radioError').each(function(){
        $(this).removeClass('radioError');
    });

    $('.errorMessage').each(function(){
        $(this).remove();
    });

    var result = true;
    var msg = '';
    var tab;


    if(isValidDate($('#EffectiveDate').val()) && $('#EffectiveDate').val() !== '') {
        $('#EffectiveDate').val(moment($('#EffectiveDate').val()).format("MMM DD, YYYY"));
    } else {

        if($('#EffectiveDate').val() !== '') {
            var msg = 'Please enter a correctly formatted date as MMM DD, YYYY (or use the Calendar Selection feature).';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#EffectiveDate').parent().parent());

        }


        $('#EffectiveDate').parent().addClass('radioError');

        $('#addressTab').addClass('radioError');

        if(tab == null) {
            tab = $('#addressTab');
        }

        result = false;
    }

    if ($('#firstName').val() == '')
    {
        $('#firstName').parent().addClass('radioError');
        var msg = 'Please enter your first name';
        if ($('#addressReview').val() == 'true')
        {
            $('#addressTab').addClass('radioError');
            tab = $('#addressTab');
        }

        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#firstName').next().parent());

        result = false;
    }

    if ($('#lastName').val() == '')
    {
        $('#lastName').parent().addClass('radioError');
        var msg = 'Please enter your last name';
        if ($('#addressReview').val() == 'true')
        {
            $('#addressTab').addClass('radioError');
            tab = $('#addressTab');
        }

        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#lastName').next().parent());

        result = false;
    }

    if ($('#preferredMailingValue').text() == 'Home' || $('#preferredMailingValue').text() == 'home')
    {
        if ($('#city').val() == '')
        {
            $('#city').parent().addClass('radioError');
            var msg = 'Please enter your city';
            if ($('#addressReview').val() == 'true')
            {
                $('#addressTab').addClass('radioError');
                tab = $('#addressTab');
            }

            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#city').next().parent());

            result = false;
        }

        if ($('#province').chosen().val() == null || $('#province').chosen().val() == '')
        {
            $('#province').next().addClass('radioError');
            if ($('#addressReview').val() == 'true')
            {
                $('#addressTab').addClass('radioError');
                tab = $('#addressTab');
            }

            var msg = 'Please select your province\r\n';

            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#province').next().parent());

            result = false;
        }

        if ($('#postalCode').val() == '')
        {
            $('#postalCode').parent().addClass('radioError');
            var msg = 'Please enter your postal code';
            if ($('#addressReview').val() == 'true')
            {
                $('#addressTab').addClass('radioError');
                tab = $('#addressTab');
            }

            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#postalCode').next().parent());

            result = false;
        }

        if ($('#postalCode').val() !== '') {
            if (!validatePostalCode($('#postalCode').val(), $('#province').find('option:selected').val())) {
                $('#postalCode').parent().addClass('radioError');
                var msg = 'Please enter valid postal code for ' + $('#province').find('option:selected').text();
                if ($('#addressReview').val() == 'true')
                {
                    $('#addressTab').addClass('radioError');
                    tab = $('#addressTab');
                }

                var errorElement = document.createElement('div');
                errorElement.setAttribute('class', 'errorMessage');
                errorElement.appendChild(document.createTextNode(msg));
                $(errorElement).insertAfter($('#postalCode').next().parent());

                result = false;
            }

        }


        if ($('#mailingAddress1').val() == '')
        {
            $('#mailingAddress1').parent().addClass('radioError');
            var msg = 'Please enter your mailing address';
            if ($('#addressReview').val() == 'true')
            {
                $('#addressTab').addClass('radioError');
                tab = $('#addressTab');
            }

            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#mailingAddress1').next().parent());

            result = false;
        }
    }

    if ($('#email').val() == '')
    {
        $('#email').addClass('radioError');
        var msg = 'Please enter your email';
        if ($('#addressReview').val() == 'true')
        {
            $('#addressTab').addClass('radioError');
            tab = $('#addressTab');
        }

        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#email'));

        result = false;
    }else
    {
        if (!validateEmail($('#email').val()))
        {
            $('#email').parent().addClass('radioError');
            var msg = 'Please enter a valid email';
            if ($('#addressReview').val() == 'true')
            {
                $('#addressTab').addClass('radioError');
                tab = $('#addressTab');
            }

            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#email').next().parent());

            result = false;
        }
    }

    if ($('#EffectiveDate').val() == '')
    {
        $('#EffectiveDate').parent().addClass('radioError');
        var msg = 'Please enter the effective date';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#EffectiveDate').parent().parent());

        if ($('#addressReview').val() == 'true')
        {
            $('#addressTab').addClass('radioError');
            tab = $('#addressTab');
        }

        window.scrollTo(0,0);

        result = false;
    }

    if ($('#province').chosen().val() == 'Other' && $('#provinceOther').val() == '')
    {
        $('#provinceOther').addClass('radioError');
        if ($('#addressReview').val() == 'true')
        {
            $('#firmTab').addClass('radioError');
            tab = $('#firmTab');
        }

        var msg = 'Cannot be blank\r\n';

        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#provinceOther').parent());

        result = false;
    }

    return result;

}

function validateFirmAPI()
{
    var validAPIFirmForm = false;
    $.ajax({
        url: "/forms/validate/firm",
        type: "post",
        async: false,
        dataType: "json",
        data: $('#firmDetails :input').serialize(),
        success: function (result) {
            if (result.error == false)
            {
                validAPIFirmForm = true;
            }else
            {
                for (var i=0; i<result.violations.length;i++)
                {
                    var errorElement = document.createElement('div');
                    errorElement.setAttribute('class', 'errorMessage');
                    errorElement.appendChild(document.createTextNode(result.violations[i].message));
                    var violationKey = result.violations[i].name.split('_');
                    if ($("input[data-id='" + violationKey[0] + "']").length > 0)
                    {
                        if ($("input[data-id='" + violationKey[0] + "']").hasClass('touchspin1'))
                        {
                            $("input[data-id='" + violationKey[0] + "']").addClass('radioError');
                            $("input[data-id='" + violationKey[0] + "']").parent().parent().after($(errorElement));
                        }else{
                            $(errorElement).insertAfter("input[data-id='" + violationKey[0] + "']");
                            $("input[data-id='" + violationKey[0] + "']").addClass('radioError');
                        }

                        //find tab
                        $('#' + $("input[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').addClass('radioError');
                    }else if ($("select[data-id='" + violationKey[0] + "']").length > 0)
                    {
                        $("select[data-id='" + violationKey[0] + "']").next().addClass('radioError');
                        if (violationKey[0] == 'wsFirm.managingLawyer')
                        {
                            $("select[data-id='" + violationKey[0] + "']").parent().parent().next().after($(errorElement));
                        }else
                        {
                            $("select[data-id='" + violationKey[0] + "']").next().after($(errorElement));
                        }

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

                    if (i == result.violations.length-1)
                    {
                        $('#' + $("select[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("input[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
                        $('#' + $("div[data-id='" + violationKey[0] + "']").closest('.tab-pane').attr('id') + 'Tab').children().first().trigger('click');
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

    return validAPIFirmForm;

}

function validateFirm()
{
    $('.radioError').each(function(){
        $(this).removeClass('radioError');
        $('.errorMessage').each(function(){
            $(this).remove();
        });
    });

    var result = true;
    var msg = '';
    var tab;

    if(isValidDate($('#FirmEffectiveDate').val()) && $('#FirmEffectiveDate').val() !== '') {
        $('#FirmEffectiveDate').val(moment($('#FirmEffectiveDate').val()).format("MMM DD, YYYY"));

    } else {

        if($('#FirmEffectiveDate').val() !== ''){
            var msg = 'Please enter a correctly formatted date as MMM DD, YYYY (or use the Calendar Selection feature).';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#FirmEffectiveDate').parent().parent());
        }


        $('#FirmEffectiveDate').parent().addClass('radioError');

        $('#addressTab').addClass('radioError');

        if(tab == null) {
            tab = $('#addressTab');
        }

        result = false;
    }

    if ($('#firmName').val() == '')
    {
        $('#firmName').addClass('radioError');

        msg = 'Cannot be blank\r\n';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#firmName').parent());

        if ($('#addressReview').val() == 'true')
        {
            $('#firmTab').addClass('radioError');
            tab = $('#firmTab');
        }
        result = false;
    }


    if ($('#firmAddress1').val() == '')
    {
        $('#firmAddress1').addClass('radioError');

        msg = 'Cannot be blank\r\n';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#firmAddress1').parent());

        if ($('#addressReview').val() == 'true')
        {
            $('#firmTab').addClass('radioError');
            tab = $('#firmTab');
        }
        result = false;
    }


    if ($('#firmCity').val() == '')
    {
        $('#firmCity').addClass('radioError');

        msg = 'Cannot be blank\r\n';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#firmCity').parent());

        if ($('#addressReview').val() == 'true')
        {
            $('#firmTab').addClass('radioError');
            tab = $('#firmTab');
        }
        result = false;
    }

    if ($('#firmPostalCode').val() == '')
    {
        $('#firmPostalCode').addClass('radioError');

        msg = 'Cannot be blank\r\n';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#firmPostalCode').parent());

        if ($('#addressReview').val() == 'true')
        {
            $('#firmTab').addClass('radioError');
            tab = $('#firmTab');
        }
        result = false;
    }
    if ($('#FirmEffectiveDate').val() == '')
    {
        $('#FirmEffectiveDate').parent().addClass('radioError');
        if ($('#addressReview').val() == 'true')
        {
            $('#firmTab').addClass('radioError');
            tab = $('#firmTab');
        }

        msg = 'Please enter the effective date\r\n';

        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#FirmEffectiveDate').parent().parent());

        window.scrollTo(0,0);

        result = false;
    }

    if ($('#firmProvince').chosen().val() == null || $('#firmProvince').chosen().val() == '')
    {
        $('#firmProvince').next().addClass('radioError');
        if ($('#addressReview').val() == 'true')
        {
            $('#firmTab').addClass('radioError');
            tab = $('#firmTab');
        }

        msg = 'Cannot be blank\r\n';

        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#firmProvince').next().parent());

        result = false;
    }

    if ($('#firmProvince').chosen().val() == 'Other' && $('#firmProvinceOther').val() == '')
    {
        $('#firmProvinceOther').addClass('radioError');
        if ($('#addressReview').val() == 'true')
        {
            $('#firmTab').addClass('radioError');
            tab = $('#firmTab');
        }

        msg = 'Cannot be blank\r\n';

        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#firmProvinceOther').parent());

        result = false;
    }

    return result;
}

function checkMailing(){}
function cancelOfficeAdmin(){}
function cancelClaimsContact(){}
function cancelCPDContact(){}

function cancelFirm() {}

function cancelAddress()
{
    cancelFirm();
    $('#update-address-btn-break').show();
    toggleAddressDetails(false);
    $('#btnReviewAddressDetails').hide();
    $('#btnUpdateAddressDetails').show();
    $('#EffectiveDateContainer').hide();
    $('#btnSaveAddressDetails').hide();
    $('#btnContinueFromAddress').show();
    $('#btnCancelAddress').hide();
    $('#preferredMailingButtons').hide();

    $('#firstName').val($('#firstNameOriginal').val());
    $('#lawyerFirmNumber').val($('#lawyerFirmNumberOriginal').val());
    $('#laywerFirmName').val($('#lawyerFirmNameOriginal').val());
    $('#lastName').val($('#lastNameOriginal').val());
    $('#position').val($('#positionOriginal').val());
    $('#homePhone').val($('#homePhoneOriginal').val());
    $('#workPhone').val($('#workPhoneOriginal').val());
    $('#workPhoneExt').val($('#workPhoneExtOriginal').val());
    $('#addlPhone').val($('#addlPhoneOriginal').val());
    $('#faxNumber').val($('#faxNumberOriginal').val());
    $('#email').val($('#emailOriginal').val());
    $('#website').val($('#websiteOriginal').val());


    //set preferred
    if ($('#preferredMailingTypeOriginal').val() == 'Home' || $('#preferredMailingTypeOriginal').val() == 'home')
    {
        //show address details from user
        $('#mailingAddress1').val($('#mailingAddress1Value').val());
        $('#mailingAddress2').val($('#mailingAddress2Value').val());
        $('#mailingAddress3').val($('#mailingAddress3Value').val());
        $('#city').val($('#cityValue').val());
        $('#province').val($('#provinceValue').val());
        $('#postalCode').val($('#postalCodeValue').val());
        $('#mailingAddress1').prop('readonly', true);
        $('#mailingAddress2').prop('readonly', true);
        $('#mailingAddress3').prop('readonly', true);
        $('#city').prop('readonly', true);
        $('#province').prop('readonly', true);
        $('#postalCode').prop('readonly', true);
    }else
    {
        //show address details from firm
        $('#mailingAddress1').val($('#firmAddress1').val());
        $('#mailingAddress2').val($('#firmAddress2').val());
        $('#mailingAddress3').val($('#firmAddress3').val());
        $('#city').val($('#firmCity').val());
        $('#province').val($('#firmProvince').val());
        $('#postalCode').val($('#firmPostalCode').val());
        $('#mailingAddress1').prop('readonly', true);
        $('#mailingAddress2').prop('readonly', true);
        $('#mailingAddress3').prop('readonly', true);
        $('#city').prop('readonly', true);
        $('#province').prop('readonly', true);
        $('#postalCode').prop('readonly', true);
    }
}

function changeFirm(review)
{
    window.scrollTo(0,0);
    $('#FirmEffectiveDate').attr('style', 'border: 2px solid blue;');

    toggleFirmDetails(true);
    $('#btnUpdateFirm').hide();
    $('#btnSaveFirmDetails').show();
    $('#validNOPFirmContainer').show();
    $('#FirmEffectiveDateContainer').show();
    $('#btnCancelFirm').show();
    $('#btnContinueFromFirm').hide();

    if (review)
    {
        $('#btnReviewFirm').show();
        $('#btnSaveFirmDetails').hide();
    }else {}


}

function updateAddressDetails(review)
{
    window.scrollTo(0,0);
    $('#EffectiveDate').attr('style', 'border: 2px solid blue;')
    $('#update-address-btn-break').hide();

    if (review)
    {
        $('#update-address-btn-break').hide();
        toggleAddressDetails(true);
        $('#btnUpdateAddressDetails').hide();
        $('#btnReviewAddressDetails').show();
        $('#EffectiveDateContainer').show();
        $('#btnCancelAddress').show();
        $('#preferredMailingValue').hide();
        if ($('#preferredMailingValue').text() == 'Home')
        {
            $('#preferredMailingHome').trigger('click');
        }else if ($('#preferredMailingValue').text() == "Firm"){
            $('#preferredMailingFirm').trigger('click');
        }
    }else {
        toggleAddressDetails(true);
        $('#btnUpdateAddressDetails').hide();
        $('#btnContinueFromAddress').hide();
        $('#EffectiveDateContainer').show();
        $('#btnSaveAddressDetails').show();
        $('#btnCancelAddress').show();
        $('#preferredMailingValue').hide();
        if ($('#preferredMailingValue').text() == 'Home')
        {
            $('#preferredMailingHome').trigger('click');
        }else if ($('#preferredMailingValue').text() == "Firm"){
            $('#preferredMailingFirm').trigger('click');
        }
    }
}


function displayFirmReview() {
}

function firmGoBack(){

}


function saveFirmDetails(review) {

}

function saveAddressDetails(review)
{
    if(validateAddress() || review){
        if(validateAddressAPI() || review){
            if (submitAddress())
            {
                $('#update-address-btn-break').show();
                $('.actionLink').remove();
                $('#btnSaveAddressDetails').hide();
                $('#btnCancelAddress').hide();
                $('#btnCancelAddress').prop('readonly', true);

                $('#EffectiveDateContainer').hide();
                toggleAddressDetails(false);
                if ($('#province').chosen().val() == 'Other')
                {
                    $('#provinceReadOnly').val($('#provinceOther').val())
                }else {
                    $('#provinceReadOnly').val($('#province').chosen().val())
                }
                $('#preferredMailingButtons').hide();

                if (review)
                {
                    $('#review-address-loading  ').show();
                    $('#address-review').hide();
                    setTimeout(showAddressConfirmationReview, 2000);
                }else{
                    $('#addressLoading').show();
                    $('.address-details').hide();
                    setTimeout(showAddressConfirmation, 2000);
                }
            }else {
                window.location.href = '/error';
            }
        }
    }

}

function reviewGoBack(){
    $('.address-review').hide();
    $('.address-details').show();
    $('#btnCancelAddress').show();
    $('#btnReviewAddressDetails').show();
}

function showAddressConfirmation()
{
    $('.address-details').hide();
    $('#addressLoading').hide();
    $('#btnCancelAddress').hide();
    $('#addressConfirmation').fadeIn(500);
    $('#btnUpdateAddressDetails').hide();
    $('#btnContinueFromAddress').show();
}

function showAddressConfirmationReview()
{
    $('#review-address-loading').hide();
    $('#btnBackAddressDetails').hide();
    $('#review-address-confirmation').fadeIn(500);
    $('#btnSaveAddressDetails2').hide();

}

function showFirmConfirmation()
{}

function showFirmConfirmationReview()
{

}

function showValidNOPFirm()
{
    $('#validNOPFirm').fadeIn(500);
}

function selectFirm(firmNumber)
{

}

function toggleDetails(enabled)
{
    $('#primaryDetails').find('input').each(function()
    {
        $(this).prop('readonly', !enabled);
    });
    $('#secondaryDetails').find('input').each(function()
    {
        $(this).prop('readonly', !enabled);
    });
    $('#primaryDetailsAddress').find('input').each(function()
    {
        $(this).prop('readonly', !enabled);
    });
    $('#secondaryDetailsAddress').find('input').each(function()
    {
        $(this).prop('readonly', !enabled);
    });

    //Always keep this disabled
    $('#lawID').prop('readonly', true);
    $('#firmNumber').prop('readonly', true);
    $('#lawyerFirmNumber').prop('readonly', true);
    $('#laywerFirmName').prop('readonly', true);
}

function checkProvince()
{
    if ($('#province').chosen().val() == 'Other')
    {
        $('#provinceOtherContainer').show();
    }else
    {
        $('#provinceOtherContainer').hide();
    }

}

function checkFirmProvince()
{
    if ($('#firmProvince').chosen().val() == 'Other')
    {
        $('#firmProvinceOtherContainer').show();
    }else
    {
        $('#firmProvinceOtherContainer').hide();
    }

}

function toggleAddressDetails(enabled)
{

    if (enabled){
        $('#previewMailingLabel').hide();
    }else{
        $('#previewMailingLabel').show();
    }

    if (enabled)
    {
        $('#province').show();
        $('#province').val($('#provinceValue').val());
        $('#province').chosen({ placeholder_text_single: 'Select'});
        $('#province').chosen().trigger('chosen:updated');
        // $('#province').hide();
        // $('#province_chosen').show();
        $('#provinceReadOnly').hide();
        if ($('#provinceValue').val() == 'Other')
        {
            $('#provinceOtherContainer').show();
        }
    }else{
        $('#province').hide();
        $('#province_chosen').hide();
        $('#provinceReadOnly').show();
        $('#provinceOtherContainer').hide();
        $('#provinceReadOnly').val($('#provinceValue').val());
    }


    $('#primaryDetailsAddress').find('input').each(function()
    {
        $(this).prop('readonly', !enabled);
    });
    $('#secondaryDetailsAddress').find('input').each(function()
    {
        $(this).prop('readonly', !enabled);
    });

    //Always keep this disabled
    $('#lawID').prop('readonly', true);
    $('#firmNumber').prop('readonly', true);
    $('#lawyerFirmNumber').prop('readonly', true);
    $('#firmName').prop('readonly', true);
    $('#laywerFirmName').prop('readonly', true);
}

function lawyerDetails()
{

}

function toggleFirmDetails(enabled, saved) {}

function setNOP()
{
    if ($('#firmNatureOfLawPractice').chosen().val() == null)
    {
        $('#nopReadOnly').text('None');
    }else{
        if ($('#firmNatureOfLawPractice').chosen().val() != null && $('#firmNatureOfLawPractice').chosen().val().length > 0 && Array.isArray($('#firmNatureOfLawPractice').chosen().val()))
        {
            var chosenValueString = "";
            for (var c=0; c<=$('#firmNatureOfLawPractice').chosen().val().length; c++)
            {
                if ($('option[value="' + $('#firmNatureOfLawPractice').chosen().val()[c] + '"]').html() !== undefined)
                {
                    chosenValueString += $('option[value="' + $('#firmNatureOfLawPractice').chosen().val()[c] + '"]').html() + "<br/>";
                }
            }
            $('#nopReadOnly').html(chosenValueString);
        }
    }

}

function showSearch()
{
    $('.firmDetails').remove();
    $('.firmIndex').remove();
    $('.selectFirm').remove();

    $('#searchResults').hide();
    $('#firmSearchTab').show();
    $('#firmSearchTab').children().first().trigger('click');
    $('#firmSearchTab').trigger('click');
}

function showPreviewLabel()
{
    $('#mailingLabelTab').show();
    $('#mailingLabelTab').children().first().trigger('click');
    $('#mailingLabelTab').trigger('click');
}

function displayAddressReview() {

    if (validateAddress() && validateAddressAPI())
    {
        $('#review-effective-date').text($('#EffectiveDate').val());
        $('#review-law-id').text($('#lawID').val());
        $('#review-first-name').text($('#firstName').val());
        $('#review-last-name').text($('#lastName').val());
        $('#review-position').text($('#position').val());
        $('#review-home-phone').text($('#homePhone').val());
        $('#review-work-phone').text($('#workPhone').val());
        $('#review-addl-phone').text($('#addlPhone').val());
        $('#review-fax-number').text($('#faxNumber').val());
        $('#review-email').text($('#email').val());
        $('#review-website').text($('#website').val());
        $('#review-law-firm-number').text($('#lawyerFirmNumber').val());
        $('#review-law-firm-name').text($('#laywerFirmName').val());
        if($('#preferredMailingHome').is(':checked')){
            $('#review-preferred-mailing').text("Home");
        } else {
            $('#review-preferred-mailing').text("Firm");
        }
        $('#review-mailing-address-1').text($('#mailingAddress1').val());
        $('#review-mailing-address-2').text($('#mailingAddress2').val());
        $('#review-mailing-address-3').text($('#mailingAddress3').val());
        $('#review-city').text($('#city').val());
        $('#review-province').text($('#province').val());
        $('#review-postal-code').text($('#postalCode').val());

        $('.address-details').hide();
        $('.address-review').show();
        $('#btnCancelAddress').hide();
        $('#btnReviewAddressDetails').hide();
    }
    else
    {
        return false;
    }

}

$(document).ready(function() {

    $('#province').val($('#provinceValue').val());
    $('#province').trigger('chosen:updated');
    $('#provinceReadOnly').val($('#provinceValue').val());

    $('#provinceOther').val($('#provinceValue').val());
    if ($('#province').chosen().val() == null)
    {
        $('#province').val('Other').trigger('chosen:updated');
        $('#provinceOtherContainer').show();
    }
    $('#province_chosen').hide();

    $('#firmNatureOfLawPractice').chosen({ placeholder_text_single: 'Select an option'});
    $('#firmNatureOfLawPractice').val($('#firmNatureOfLawPracticeHidden').val());
    $('#firmNatureOfLawPractice').trigger("chosen:updated");

    toggleFirmDetails(false);

    $('#EffectiveDate').datepicker({'format': 'M dd, yyyy', 'startDate': startOfPreviousYear(), 'endDate': endOfRenewalYear(), 'forceParse' : false});
    $('#FirmEffectiveDate').datepicker({'format': 'M dd, yyyy', 'startDate': startOfPreviousYear(), 'endDate': endOfRenewalYear(), 'forceParse' : false});

    $('#EffectiveDate').datepicker('setDate', $('#EffectiveDate').datepicker('getDate'));
    $('#FirmEffectiveDate').datepicker('setDate', $('#FirmEffectiveDate').datepicker('getDate'));

    $('#firmNumberSearch').keyup(function(e){
        if ($(this).val() != '')
        {
            $('#firmNameSearch').val('');
            $('#firmNameSearch').prop('readonly', true);
            $('#firmNameSearch').attr('placeholder', '');
        }else {
            $('#firmNameSearch').prop('readonly', false);
            $('#firmNameSearch').prop('placeholder', 'Search by firm name')
        }

        if (e.keyCode == 13)
        {
            searchFirm();
        }
    });

    $('#firmNameSearch').keyup(function(e){
        if ($(this).val() != '')
        {
            $('#firmNumberSearch').val('');
            $('#firmNumberSearch').prop('readonly', true);
            $('#firmNumberSearch').attr('placeholder', '');
        }else {
            $('#firmNumberSearch').prop('readonly', false);
            $('#firmNumberSearch').attr('placeholder', 'Search by firm number');
        }
        if (e.keyCode == 13)
        {
            searchFirm();
        }
    });

    //populate values
    $('.myAddressTab').click(function(e){
        $('.myAddressTab').removeClass('active');
        $(this).addClass('active');
        if ($(this).attr('id') == 'mailingLabelTab') {
            $('#mailingLabelAddress1').hide();
            $('#mailingLabelAddress2').hide();
            $('#mailingLabelAddress3').hide();

            if ($('#preferredMailingValue').text() == 'Home' || $('#preferredMailingValue').text() == 'home') {
                $('#mailingLabelName').text($('#firstName').val() + ' '  + $('#lastName').val());
                $('#mailingLabelAddress1').text($('#mailingAddress1').val());
                $('#mailingLabelAddress1').show();
                if ($('#mailingAddress2').val() != '')
                {
                    $('#mailingLabelAddress2').text($('#mailingAddress2').val());
                    $('#mailingLabelAddress2').show();
                }
                if ($('#mailingAddress3').val() != '')
                {
                    $('#mailingLabelAddress3').text($('#mailingAddress3').val());
                    $('#mailingLabelAddress3').show();
                }
                $('#mailingLabelCity').text($('#city').val() + '   ' + $('#province').val() + '   ' + $('#postalCode').val());
            } else {
                $('#mailingLabelName').text($('#firstName').val() + ' ' + $('#lastName').val());
                if ($('#firmName').val() != ($('#firstName').val() + ' ' + $('#lastName').val())) {
                    $('#mailingLabelAddress1').show();
                    $('#mailingLabelAddress1').text($('#firmName').val());
                }
                $('#mailingLabelAddress2').text($('#firmAddress1').val());
                $('#mailingLabelAddress2').show();
                $('#mailingLabelCity').text($('#firmCity').val() + '   ' + $('#firmProvince').val() + '   ' + $('#firmPostalCode').val());
            }
        }
    });

    //populate values
    $('.myInfoTab').click(function(e){
        $('.myInfoTab').removeClass('active');
        $(this).addClass('active');
        if ($(this).attr('id') == 'addressTab')
        {
            $('#addressDetails').fadeIn(500);
            $('#searchDetails').hide();
            $('#firmDetails').hide();
            $('#mailingLabelDetails').hide();

            if ($('#addressConfirmation').is(':visible'))
            {
                $('#addressConfirmation').hide();
                $('#addressDetails').show();
                $('.address-details').show();
                $('#btnUpdateAddressDetails').show();
            }
        }else if ($(this).attr('id') == 'firmTab')
        {
            $('#addressDetails').hide();
            $('#searchDetails').hide();
            $('#firmDetails').fadeIn(500);
            $('#mailingLabelDetails').hide();

            if ($('#firmConfirmation').is(':visible'))
            {
                $('#firmConfirmation').hide();
                $('#firmDetails').show();
                $('#firm-details').show();
                $('#btnUpdateFirm').show();
            }
        }else if ($(this).attr('id') == 'firmSearchTab')
        {
            $('#searchDetails').fadeIn(500);
            $('#addressDetails').hide();
            $('#firmDetails').hide();
            $('#mailingLabelDetails').hide();
        }
        else if ($(this).attr('id') == 'mailingLabelTab') {
            $('#searchDetails').hide();
            $('#addressDetails').hide();
            $('#firmDetails').hide();
            $('#mailingLabelDetails').fadeIn(500);

            $('#mailingLabelAddress1').hide();
            $('#mailingLabelAddress2').hide();
            $('#mailingLabelAddress3').hide();

            if ($('#preferredMailingValue').text() == 'Home' || $('#preferredMailingValue').text() == 'home') {
                $('#mailingLabelName').text($('#firstName').val() + ' '  + $('#lastName').val());
                $('#mailingLabelAddress1').text($('#mailingAddress1').val());
                $('#mailingLabelAddress1').show();
                if ($('#mailingAddress2').val() != '')
                {
                    $('#mailingLabelAddress2').text($('#mailingAddress2').val());
                    $('#mailingLabelAddress2').show();
                }
                if ($('#mailingAddress3').val() != '')
                {
                    $('#mailingLabelAddress3').text($('#mailingAddress3').val());
                    $('#mailingLabelAddress3').show();
                }
                $('#mailingLabelCity').text($('#city').val() + '   ' + $('#province').val() + '   ' + $('#postalCode').val());
            } else {
                $('#mailingLabelName').text($('#firstName').val() + ' ' + $('#lastName').val());
                if ($('#firmName').val() != ($('#firstName').val() + ' ' + $('#lastName').val())) {
                    $('#mailingLabelAddress1').show();
                    $('#mailingLabelAddress1').text($('#firmName').val());
                }
                $('#mailingLabelAddress2').text($('#firmAddress1').val());
                $('#mailingLabelAddress2').show();

                if ($('#firmAddress2').val() != '')
                {
                    $('#mailingLabelAddress3').text($('#firmAddress2').val());
                    $('#mailingLabelAddress3').show();
                }
                if ($('#firmAddress3').val() != '')
                {
                    $('#mailingLabelAddress4').text($('#firmAddress3').val());
                    $('#mailingLabelAddress4').show();
                }
                $('#mailingLabelCity').text($('#firmCity').val() + '   ' + $('#firmProvince').val() + '   ' + $('#firmPostalCode').val());
            }
        }
    });


    $('.myInfoTab, .myAddressTab, .menuLink, .iropTabs').mousedown(function(e){

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


        if ($('#btnSaveAddressDetails').is(':visible') || $('#btnReviewAddressDetails').is(':visible'))
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
                            cancelAddress();
                            e.preventDefault();
                            $(elementClicked).children().first().trigger('click');
                            $(elementClicked).trigger('click');
                        }else{
                            e.preventDefault();
                        }

                    }
                }
            );
        }else if ($('#btnSaveFirmDetails').is(':visible') || $('#btnReviewFirm').is(':visible'))
        {
            toggleFirmDetails(false);
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
                            e.preventDefault();
                            //$(elementClicked).children().first().trigger('click');
                            //$(elementClicked).trigger('click');
                        }else{
                            e.preventDefault();
                        }

                    }
                }
            );
        }
    });


    toggleDetails(false);

});

function isValidDate(date) {
    return moment(date, ['MMM DD, YYYY', "MM/DD/YYYY", "M/DD/YYYY", "MMMM DD, YYYY", "MMMM D, YYYY", "MMM D, YYYY", "MM-DD-YYYY", "MM-D-YYYY", "MM/D/YYYY", "M-DD-YYYY", "M-D-YYYY", "M/D/YYYY",
        "M.DD.YYY", "MM.DD.YYYY", "M.D.YYYY", "MM.D.YYYY"], true).format() !== 'Invalid date';
}

$(document).ready(function(){
    $('#EffectiveDate').on('blur', function(){
        if(isValidDate($(this).val())) {
            $(this).val(moment($(this).val()).format("MMM DD, YYYY"));
        }
    });

    $('#FirmEffectiveDate').on('blur', function(){
        if(isValidDate($(this).val())) {
            $(this).val(moment($(this).val()).format("MMM DD, YYYY"));
        }
    });

    $('#EffectiveDate').keydown(function(e){
        e.preventDefault();
    })

});

function validatePostalCode(postalCode, province) {
    
    var postalCodeFirstLetter = postalCode.toUpperCase().trim().charAt(0);
    var ontarioLetters = ["K", "L", "N", "P", "M"];
    var newfoundlandLetters = ["A"];
    var novaScotiaLetters = ["B"];
    var peiLetters = ["C"];
    var nbLetters = ["E"];
    var quebecLetters = ["G", "H", "J"];
    var manitobaLetters = ["R"];
    var saskLetters = ["S"];
    var albertaLetters = ["T"];
    var bcLetters = ["V"];
    var nwTerritoriesLetters = ["X"];
    var yukonLetters = ["Y"];
    var invalidLetters = ["D", "F", "I", "O", "Q", "U"];
    var invalidLetter = false;
    var arrayLength = invalidLetters.length;

    while(arrayLength--) {
        if (postalCode.indexOf(invalidLetters[arrayLength]) != -1) {
            invalidLetter = true;
        }
    }

    if (province == "Other") {
        return true;
    } else if (province == "ON") {
        if ($.inArray(postalCodeFirstLetter, ontarioLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "AB") {
        if ($.inArray(postalCodeFirstLetter, albertaLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "BC") {
        if ($.inArray(postalCodeFirstLetter, bcLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "MB") {
        if ($.inArray(postalCodeFirstLetter, manitobaLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "NB") {
        if ($.inArray(postalCodeFirstLetter, nbLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "NF") {
        if ($.inArray(postalCodeFirstLetter, newfoundlandLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "NS") {
        if ($.inArray(postalCodeFirstLetter, novaScotiaLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "NV" || province == "NW") {
        if ($.inArray(postalCodeFirstLetter, nwTerritoriesLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "PEI") {
        if ($.inArray(postalCodeFirstLetter, peiLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "QC") {
        if ($.inArray(postalCodeFirstLetter, quebecLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "SK") {
        if ($.inArray(postalCodeFirstLetter, saskLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else if (province == "YK") {
        if ($.inArray(postalCodeFirstLetter, yukonLetters) > -1 && !invalidLetter) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
