$(document).ready(function(){
    $('.clickable-calendar').click(function(){
        $(this).parent().siblings('input').datepicker('show');

    });
});
function checkMailing()
{
    setTimeout(_checkMailing, 200);
}

function _checkMailing()
{
    if (($('#preferredMailingFirm').parent().is(':visible') && $('#preferredMailingFirm').parent().hasClass('active')) || ($('#preferredMailingValue').is(':visible') && ($('#preferredMailingValue').text() == 'firm') || $('#preferredMailingValue').is(':visible') && $('#preferredMailingValue').text() == 'Firm'))
    {
        //show address details from firm
        $('#mailingAddress1').val($('#firmAddress1').val());
        $('#mailingAddress2').val($('#firmAddress2').val());
        $('#mailingAddress3').val($('#firmAddress3').val());
        $('#city').val($('#firmCity').val());
        $('#province').val($('#firmProvinceValue').val());
        $('#provinceReadOnly').val($('#firmProvinceValue').val());
        $('#provinceReadOnly').show();
        $('#provinceOther').val($('#firmProvinceValue').val());
        $('#province').trigger('chosen:updated');
        if ($('#province').chosen().val() == null)
        {
            $('#province').val('Other').trigger('chosen:updated');
        }

        $('#province_chosen').hide();
        $('#postalCode').val($('#firmPostalCode').val());
        $('#preferredMailingValue').text('Firm');
        $('#mailingAddress1').prop('readonly', true);
        $('#mailingAddress2').prop('readonly', true);
        $('#mailingAddress3').prop('readonly', true);
        $('#city').prop('readonly', true);
        $('#provinceOtherContainer').hide();
        $('#province').prop('readonly', true);
        $('#provinceOther').prop('readonly', true);
        $('#provinceReadOnly').prop('readonly', true);
        $('#province_chosen').prop('readonly', true);
        $('#postalCode').prop('readonly', true);
    }
    else
    {
        //show address details from user
        $('#mailingAddress1').val($('#mailingAddress1Value').val());
        $('#mailingAddress2').val($('#mailingAddress2Value').val());
        $('#mailingAddress3').val($('#mailingAddress3Value').val());
        $('#city').val($('#cityValue').val());
        $('#province').val($('#provinceValue').val());
        $('#province').trigger('chosen:updated');
        $('#provinceReadOnly').val($('#provinceValue').val());

        $('#provinceOther').val($('#provinceValue').val());
        if ($('#province').chosen().val() == null)
        {
            $('#province').val('Other').trigger('chosen:updated');
            $('#provinceOtherContainer').show();
        }

        if ($('#preferredMailingValue').is(':visible'))
        {
            $('#provinceReadOnly').show();
            $('#province_chosen').hide();
        }else {
            $('#provinceReadOnly').hide();
            $('#province_chosen').show();
        }

        $('#postalCode').val($('#postalCodeValue').val());
        $('#preferredMailingValue').text('Home');
        $('#mailingAddress1').prop('readonly', false);
        $('#mailingAddress2').prop('readonly', false);
        $('#mailingAddress3').prop('readonly', false);
        $('#city').prop('readonly', false);
        $('#provinceOther').prop('readonly', false);
        $('#province_chosen').prop('readonly', false);
        $('#province').prop('readonly', false);
        $('#postalCode').prop('readonly', false);
    }
}

function submitAddress()
{
    var submitAPIAddressForm = false;
    $.ajax({
        url: "/forms/submit/address",
        type: "post",
        async: false,
        dataType: "json",
        data: $('#addressDetails :input').serialize(),
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

function validateAddressAPI()
{
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
        msg = 'Please enter your first name';
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
        msg = 'Please enter your last name';
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
            msg = 'Please enter your city';
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

            msg = 'Please select your province\r\n';

            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#province').next().parent());

            result = false;
        }

        if ($('#postalCode').val() == '')
        {
            $('#postalCode').parent().addClass('radioError');
            msg = 'Please enter your postal code';
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
            msg = 'Please enter your mailing address';
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
        $('#email').parent().addClass('radioError');
        msg = 'Please enter your email';
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
    }else
    {
        if (!validateEmail($('#email').val()))
        {
            $('#email').parent().addClass('radioError');
            msg = 'Please enter a valid email';
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
        msg = msg + 'Please enter the effective date\r\n';
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

        msg = 'Cannot be blank\r\n';

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

function searchFirm()
{
    //clear out existing data
    $('#searchResults').empty();

    $('#searchResultsLoading').show();

    $.ajax({
        url: "/forms/firms/search",
        type: "get",
        dataType: "json",
        data: {'firmNumber': $('#firmNumberSearch').val(), 'searchTerm': $('#firmNameSearch').val()},
        success: function (result) {

            $('#searchResultsLoading').hide();

            var headerElement = document.createElement('h2');
            headerElement.appendChild(document.createTextNode('Search Results'));

            $('#searchResults').append(headerElement);

            for (var i=0;i<result.firms.length;i++)
            {
                if (result.firms[i] != null && result.firms[0].name != '')
                {
                    var element = document.createElement('div');
                    var firmName = document.createElement('div');
                    var firmNumber = document.createElement('div');
                    var firmAddress = document.createElement('div');
                    var firmCity = document.createElement('div');
                    var firmPhone= document.createElement('div');
                    var firmFax = document.createElement('div');

                    var firmNameValue = document.createTextNode(result.firms[i].name);
                    var firmNumberValue = document.createTextNode(result.firms[i].firmNumber);
                    var firmAddressValue = document.createTextNode(result.firms[i].address.line1);
                    var firmCityValue = document.createTextNode(result.firms[i].address.city + ', ' + result.firms[i].address.province + ' ' + result.firms[i].address.postalCode);
                    var firmPhoneNumber = '';
                    var firmFaxNumber = '';
                    for (var y=0; y < result.firms[i].contacts.length;y++)
                    {
                        if (result.firms[i].contacts[y].contactType == 'PHONE')
                        {
                            firmPhoneNumber = result.firms[i].contacts[y].value;
                        }
                        if (result.firms[i].contacts[y].contactType == 'FAX')
                        {
                            firmFaxNumber = result.firms[i].contacts[y].value;
                        }
                    }

                    var firmPhoneValue = document.createTextNode(firmPhoneNumber);
                    var firmFaxValue = document.createTextNode(firmFaxNumber);

                    firmName.appendChild(firmNameValue);
                    firmNumber.appendChild(firmNumberValue);
                    firmAddress.appendChild(firmAddressValue);
                    firmCity.appendChild(firmCityValue);
                    firmPhone.appendChild(firmPhoneValue);
                    firmFax.appendChild(firmFaxValue);

                    element.appendChild(firmName);
                    element.appendChild(firmNumber);
                    element.appendChild(firmAddress);
                    element.appendChild(firmCity);
                    element.appendChild(firmPhone);
                    element.appendChild(firmFax);

                    //index element
                    var indexElement = document.createElement('div');
                    indexElement.setAttribute('style', 'float: left; margin-right: 10px; font-weight: bold; clear: both;');
                    indexElement.setAttribute('class', 'firmIndex')
                    indexElement.innerText = (i + 1) + '.';

                    //style
                    if (result.firms.length > 5)
                    {
                        firmName.setAttribute('style', 'float: left; min-width: 200px; padding-right: 10px; font-weight: bold;')
                        firmNumber.setAttribute('style', 'float: left; min-width: 60px; padding-right: 10px;')
                        firmAddress.setAttribute('style', 'float: left; min-width: 200px; padding-right: 10px;')
                        firmCity.setAttribute('style', 'float: left; min-width: 100px; padding-right: 10px;')
                        firmPhone.setAttribute('style', 'float: left; min-width: 100px; padding-right: 10px;')
                        firmFax.setAttribute('style', 'float: left; min-width: 100px; padding-right: 10px; display: none;')

                        if (i % 2 == 0)
                        {
                            element.setAttribute('style', 'float: left; margin-bottom: 10px; background-color: #D2D3E0; width: 90%;');
                        }else
                        {
                            element.setAttribute('style', 'float: left; margin-bottom: 10px; background-color: #EEEEEE; width: 90%;');
                        }

                    }else
                    {
                        firmName.setAttribute('style', 'font-weight: bold;');
                        element.setAttribute('style', 'float: left; margin-bottom: 20px;');
                        element.setAttribute('class', 'firmDetails');
                    }

                    //button
                    var buttonElement = document.createElement('button');
                    buttonElement.setAttribute('style', 'cursor: pointer; float: right; margin-left: 20px; padding: 5px; line-height: 10px; font-size: 10px;');
                    buttonElement.setAttribute('class', 'btn btn-primary waves-effect waves-light selectFirm');
                    buttonElement.setAttribute('onclick', 'selectFirm("' + result.firms[i].firmNumber + '"); return false;');
                    buttonElement.innerHTML = "Select";

                    $('#searchResults').append(indexElement);

                    if (result.firms.length > 3)
                    {
                        $(element).append(buttonElement);
                        $('#searchResults').append(element);
                    }else{
                        $('#searchResults').append(element);
                        $('#searchResults').append(buttonElement);
                    }
                }else {
                    //No cresults
                    $('#searchResults').html('We\'re sorry, the firm name you entered is invalid. Please try again.');
                }
            }

            if (result.firms.length == 0 && $('#firmNameSearch').val() != '' )
            {
                $('#searchResults').html('We\'re sorry, the firm name you entered is invalid. Please try again.');
            }

            if (result.firms.length == 0 && $('#firmNumberSearch').val() != '' )
            {
                $('#searchResults').html('We\'re sorry, the firm number you entered is invalid. Please try again.');
            }
        },
        error: function (a, b, c) {
            if (a.status == 403)
            {
                window.location.href = '/timeout';
            }else {
                window.location.href = '/error';
            }

        }
    });

    $('#searchResults').fadeIn(500);

    return false;
}

function cancelOfficeAdmin(saved)
{
    if (!saved)
    {
        $('#firmOfficeAdminLSOSelect').val($('#firmOfficeAdminLSOOriginal').val());
        $('#firmOfficeAdminLSOSelect').trigger('chosen:updated');
        $('#firmOfficeAdminFirstName').val($('#firmOfficeAdminFirstNameOriginal').val());
        $('#firmOfficeAdminLastName').val($('#firmOfficeAdminLastNameOriginal').val());
        $('#firmOfficeAdminEmail').val($('#firmOfficeAdminEmailOriginal').val());
        $('#firmOfficeAdminTitle').val($('#firmOfficeAdminTitleOriginal').val());
    }

    if ($('#firmOfficeAdminNotProvided').length > 0)
    {
        if ($('#firmOfficeAdminFirstName').val() != '' && saved)
        {
            $('#firmOfficeAdminNotProvided').hide();
            $('#firmOfficeAdminContainer').show();
        }else {
            $('#firmOfficeAdminNotProvided').show();
            $('#firmOfficeAdminContainer').hide();
        }
    }

    $('#btnCancelOfficeAdmin').hide();

    $('#firmOfficeAdminFirstName').removeClass('highlight');
    $('#firmOfficeAdminLastName').removeClass('highlight');
    $('#firmOfficeAdminTitle').removeClass('highlight');
    $('#firmOfficeAdminEmail').removeClass('highlight');

    $('#firmOfficeAdminFirstName').prop('readonly', true);
    $('#firmOfficeAdminLastName').prop('readonly', true);
    $('#firmOfficeAdminTitle').prop('readonly', true);
    $('#firmOfficeAdminEmail').prop('readonly', true);

    //Firm office admin
    $('#firmOfficeAdminLSOSelect').hide();
    $('#firmOfficeAdminLSO').show();

    if ($('#firmOfficeAdminLSOSelect').chosen().val() != '--Select--' && $('#firmOfficeAdminLSOSelect').chosen().val() != '--No LSO--' && $('#firmOfficeAdminLSOSelect').chosen().val() != null)
    {
        $('#firmOfficeAdminLSO').val($('#firmOfficeAdminLSOSelect').chosen().val());
    }else{
        if ($('#firmOfficeAdminFirstName').val() != '')
        {
            $('#firmOfficeAdminLSO').val($('#firmOfficeAdminLSOOriginal').val());
        }else{
            $('#firmOfficeAdminLSO').val('');
        }
    }
    $('#firmOfficeAdminLSOSelect_chosen').hide();

}

function cancelClaimsContact(saved)
{
    if (!saved)
    {
        $('#firmClaimsContactLSOSelect').val($('#firmClaimsContactLSOOriginal').val());
        $('#firmClaimsContactLSOSelect').trigger('chosen:updated');
        $('#firmClaimsContactFirstName').val($('#firmClaimsContactFirstNameOriginal').val());
        $('#firmClaimsContactLastName').val($('#firmClaimsContactLastNameOriginal').val());
        $('#firmClaimsContactEmail').val($('#firmClaimsContactEmailOriginal').val());
        $('#firmClaimsContactTitle').val($('#firmClaimsContactTitleOriginal').val());
    }

    $('#btnCancelClaimsContact').hide();

    if ($('#firmClaimsContactNotProvided').length > 0)
    {
        if ($('#firmClaimsContactFirstName').val() != '' && saved)
        {
            $('#firmClaimsContactNotProvided').hide();
            $('#firmClaimsContactContainer').show();
        }else {
            $('#firmClaimsContactNotProvided').show();
            $('#firmClaimsContactContainer').hide();
        }
    }

    $('#firmClaimsContactFirstName').prop('readonly', true);
    $('#firmClaimsContactLastName').prop('readonly', true);
    $('#firmClaimsContactTitle').prop('readonly', true);
    $('#firmClaimsContactEmail').prop('readonly', true);

    $('#firmClaimsContactFirstName').removeClass('highlight');
    $('#firmClaimsContactLastName').removeClass('highlight');
    $('#firmClaimsContactTitle').removeClass('highlight');
    $('#firmClaimsContactEmail').removeClass('highlight');

    $('#firmClaimsContactLSOSelect').hide();
    $('#firmClaimsContactLSO').show();

    if ($('#firmClaimsContactLSOSelect').chosen().val() != '--Select--' && $('#firmClaimsContactLSOSelect').chosen().val() != '--No LSO--' && $('#firmClaimsContactLSOSelect').chosen().val() != null)
    {
        $('#firmClaimsContactLSO').val($('#firmClaimsContactLSOSelect').chosen().val());
    }else{
        if ($('#firmClaimsContactFirstName').val() != '')
        {
            $('#firmClaimsContactLSO').val($('#firmClaimsContactLSOOriginal').val());
        }else{
            $('#firmClaimsContactLSO').val('');
        }
    }
    $('#firmClaimsContactLSOSelect_chosen').hide();
}

function cancelCPDContact(saved)
{
    if (!saved)
    {
        $('#firmCPDContactLSOSelect').val($('#firmCPDContactLSOOriginal').val());
        $('#firmCPDContactLSOSelect').trigger('chosen:updated');
        $('#firmCPDContactFirstName').val($('#firmCPDContactFirstNameOriginal').val());
        $('#firmCPDContactLastName').val($('#firmCPDContactLastNameOriginal').val());
        $('#firmCPDContactEmail').val($('#firmCPDContactEmailOriginal').val());
        $('#firmCPDContactTitle').val($('#firmCPDContactTitleOriginal').val());
    }

    $('#btnCancelCPDContact').hide();

    if ($('#firmCPDContactNotProvided').length > 0)
    {
        if ($('#firmCPDContactFirstName').val() != '' && saved)
        {
            $('#firmCPDContactNotProvided').hide();
            $('#firmCPDContactContainer').show();
        }else {
            $('#firmCPDContactNotProvided').show();
            $('#firmCPDContactContainer').hide();
        }
    }

    $('#firmCPDContactFirstName').prop('readonly', true);
    $('#firmCPDContactLastName').prop('readonly', true);
    $('#firmCPDContactTitle').prop('readonly', true);
    $('#firmCPDContactEmail').prop('readonly', true);

    $('#firmCPDContactFirstName').removeClass('highlight');
    $('#firmCPDContactLastName').removeClass('highlight');
    $('#firmCPDContactTitle').removeClass('highlight');
    $('#firmCPDContactEmail').removeClass('highlight');

    $('#firmCPDContactLSOSelect').hide();
    $('#firmCPDContactLSO').show();

    if ($('#firmCPDContactLSOSelect').chosen().val() != '--Select--' && $('#firmCPDContactLSOSelect').chosen().val() != '--No LSO--' && $('#firmCPDContactLSOSelect').chosen().val() != null)
    {
        $('#firmCPDContactLSO').val($('#firmCPDContactLSOSelect').chosen().val());
    }else{
        if ($('#firmCPDContactFirstName').val() != '')
        {
            $('#firmCPDContactLSO').val($('#firmCPDContactLSOOriginal').val());
        }else{
            $('#firmCPDContactLSO').val('');
        }
    }
    $('#firmCPDContactLSOSelect_chosen').hide();

}

function cancelFirm()
{
    $('.radioError').each(function(){
        $(this).removeClass('radioError');
    });

    $('.errorMessage').each(function(){
        $(this).remove();
    });

    toggleFirmDetails(false);
    $('#btnUpdateFirm').show();
    $('#btnSaveFirmDetails').hide();
    $('#validNOPFirmContainer').hide();
    $('#btnCancelFirm').hide();
    $('#btnReviewFirm').hide();
    $('#btnContinueFromFirm').show();
    $('#FirmEffectiveDateContainer').hide();

    //set details back
    $('#firmManagingPartnerLSO').val($('#firmManagingPartnerLSOOriginal').val());
    $('#firmManagingPartnerFirstName').val($('#firmManagingPartnerFirstNameOriginal').val());
    $('#firmManagingPartnerLastName').val($('#firmManagingPartnerLastNameOriginal').val());
    $('#firmManagingPartnerEmail').val($('#firmManagingPartnerEmailOriginal').val());
    $('#firmManagingPartnerTitle').val($('#firmManagingPartnerTitleOriginal').val());

    cancelOfficeAdmin();

    cancelClaimsContact();

    cancelCPDContact();

    $('#firmName').val($('#firmNameOriginal').val());
    $('#firmAddress1').val($('#firmAddress1Original').val());
    $('#firmAddress2').val($('#firmAddress2Original').val());
    $('#firmAddress3').val($('#firmAddress3Original').val());
    $('#firmCity').val($('#firmCityOriginal').val());
    $('#firmProvince').val($('#firmProvinceOriginal').val());
    $('#firmPostalCode').val($('#firmPostalCodeOriginal').val());
    $('#firmPhoneNumber').val($('#firmPhoneNumberOriginal').val());
    $('#firmFaxNumber').val($('#firmFaxNumberOriginal').val());
    $('#firmEmail').val($('#firmEmailOriginal').val());
    $('#firmWebsite').val($('#firmWebsiteOriginal').val());

    $('#firmNatureOfLawPractice').val($('#firmNatureOfLawPracticeHidden').val());
    $('#firmNatureOfLawPractice').trigger('chosen:updated');
}

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
    $('#preferredMailingValue').show();
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
        $('#preferredMailingValue').text('Home');
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
        $('#preferredMailingValue').text('Firm');
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
        $('#preferredMailingButtons').show();
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
        $('#preferredMailingButtons').show();
        if ($('#preferredMailingValue').text() == 'Home')
        {
            $('#preferredMailingHome').trigger('click');
        }else if ($('#preferredMailingValue').text() == "Firm"){
            $('#preferredMailingFirm').trigger('click');
        }
    }
}


function displayFirmReview(){

    if(validateFirm()) {
        if(validateFirmAPI()) {
            $('#firm-review-effective-date').text($('#FirmEffectiveDate').val());
            $('#firm-review-firm-number').text($('#firmNumber').val());
            $('#firm-review-firm-name').text($('#firmName').val());
            $('#firm-review-address-one').text($('#firmAddress1').val());
            $('#firm-review-address-two').text($('#firmAddress2').val());
            $('#firm-review-address-three').text($('#firmAddress3').val());
            $('#firm-review-city').text($('#firmCity').val());
            $('#firm-review-province').text($('#firmProvince').find(":selected").text());
            $('#firm-review-postal-code').text($('#firmPostalCode').val());
            $('#firm-review-telephone').text($('#firmPhoneNumber').val());
            $('#firm-review-fax').text($('#firmFaxNumber').val());
            $('#firm-review-email').text($('#firmEmail').val());
            $('#firm-review-website').text($('#firmWebsite').val());



            /* Managing     firm-review-managing */
            if ($('#firmManagingPartnerFirstName').val() != '')
            {
                $('#firm-review-managing-lso').text($('#firmManagingPartnerLSOSelect').chosen().val());
                $('#firm-review-managing-first').text($('#firmManagingPartnerFirstName').val());
                $('#firm-review-managing-last').text($('#firmManagingPartnerLastName').val());
                $('#firm-review-managing-email').text($('#firmManagingPartnerEmail').val());
                $('#firm-review-managing-title').text($('#firmManagingPartnerTitle').val());
            }else {
                $('#firm-review-managing-first').text('Not yet provided');
            }

            /* Office Admin    firm-review-office */
            if ($('#firmOfficeAdminFirstName').val() != '')
            {
                $('#firm-review-office-lso').text($('#firmOfficeAdminLSOSelect').chosen().val());
                $('#firm-review-office-first').text($('#firmOfficeAdminFirstName').val());
                $('#firm-review-office-last').text($('#firmOfficeAdminLastName').val());
                $('#firm-review-office-email').text($('#firmOfficeAdminEmail').val());
                $('#firm-review-office-title').text($('#firmOfficeAdminTitle').val());
            }else {
                $('#firm-review-office-first').text('Not yet provided');
            }

            /* Claims admin     firm-review-claims  */
            if ($('#firmClaimsContactFirstName').val() != '')
            {
                $('#firm-review-claims-lso').text($('#firmClaimsContactLSOSelect').chosen().val());
                $('#firm-review-claims-first').text($('#firmClaimsContactFirstName').val());
                $('#firm-review-claims-last').text($('#firmClaimsContactLastName').val());
                $('#firm-review-claims-email').text($('#firmClaimsContactEmail').val());
                $('#firm-review-claims-title').text($('#firmClaimsContactTitle').val());
            }else
            {
                $('#firm-review-claims-first').text('Not yet provided');
            }

            /* CPD Contact      firm-review-cpd  */
            if ($('#firmCPDContactFirstName').val() != '')
            {
                $('#firm-review-cpd-lso').text($('#firmCPDContactLSOSelect').chosen().val());
                $('#firm-review-cpd-first').text($('#firmCPDContactFirstName').val());
                $('#firm-review-cpd-last').text($('#firmCPDContactLastName').val());
                $('#firm-review-cpd-email').text($('#firmCPDContactEmail').val());
                $('#firm-review-cpd-title').text($('#firmCPDContactTitle').val());
            }else {
                $('#firm-review-cpd-first').text('Not yet provided');
            }

            $('#firm-review-nop').text($('#nopReadOnly').text());

            $('#firm-details').hide();
            $('.review-firm-details').show();

            $('#btnFirmGoBack').show();
            $('#btnSaveFirmDetailsReview').show();

            $('#btnCancelFirm').hide();
            $('#btnReviewFirm').hide();

        } else {
            return false;
        }
    } else {
        return false;
    }


}

function firmGoBack(){
    $('.review-firm-details').hide();
    $('.firm-details').show();
    $('#firm-details').show();
    $('#btnFirmGoBack').hide();
    $('#btnReviewFirm').show();
    $('#btnCancelFirm').show();
    $('#btnSaveFirmDetailsReview').hide();
}


function saveFirmDetails(review)
{
    if ((validateFirm() && validateFirmAPI()) || review)
    {
        if (submitFirm())
        {
            $('#btnSaveFirmDetails').prop('readonly', true);
            $('#validNOPFirmContainer').hide();
            $('#btnCancelFirm').prop('readonly', true);

            $('#FirmEffectiveDateContainer').hide();
            toggleFirmDetails(false, true);
            if ($('#firmProvince').chosen().val() == 'Other')
            {
                $('#firmProvinceReadOnly').val($('#firmProvinceOther').val())
            }else {
                $('#firmProvinceReadOnly').val($('#firmProvince').chosen().val())
            }

            $('#btnSaveFirmDetails').hide();
            $('#btnCancelFirm').hide();

            if (!review)
            {
                $('#firmLoading').show();
                $('#firm-details').hide();
                setTimeout(showFirmConfirmation, 2000);
            }else {
                $('#firmLoadingReview').show();
                $('.review-firm-details').hide();
                $('#btnFirmGoBack').hide();
                $('#btnSaveFirmDetailsReview').hide();
                setTimeout(showFirmConfirmationReview, 2000);
            }
        }else
        {
            window.location.href = '/error';
        }
    }else {
        return false;
    }
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
               $('#preferredMailingValue').show();
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
{
    $('#firmLoading').hide();
    $('#btnCancelFirm').hide();
    $('#firmConfirmation').fadeIn(500);
    $('#btnUpdateFirm').hide();
    $('#btnSaveFirmDetails').hide();
    $('#validNOPFirmContainer').hide();
    $('#btnContinueFromFirm').show();
}

function showFirmConfirmationReview()
{
    $('#firmLoadingReview').hide();
    $('#btnCancelFirm').hide();
    $('#firmConfirmation').fadeIn(500);
    $('#btnUpdateFirm').hide();
    $('#btnSaveFirmDetailsReview').hide();
    $('#validNOPFirmContainer').hide();
}

function showValidNOPFirm()
{
    $('#validNOPFirm').fadeIn(500);
}

function selectFirm(firmNumber)
{
    $('#firmSearchTab').hide();
    $('#addressTab').children().first().trigger('click');
    $('#addressTab').trigger('click');
    updateAddressDetails();

    //get firm details
    var firm = getLawFirm(firmNumber);

    if (firm != null && firm != undefined)
    {
        //fill in new law firm details
        $('#lawyerFirmNumber').val(firm.firmNumber);
        $('#laywerFirmName').val(firm.name);
        $('#firmNumber').val(firm.firmNumber);
        $('#firmIdHidden').val(firm.firmNumber);
        $('#firmIdHidden').attr('value', firm.firmNumber);
        $('#firmName').val(firm.name);
        $('#firmCity').val(firm.address.city);
        $('#firmAddress1').val(firm.address.line1);
        $('#firmAddress2').val(firm.address.line2);
        $('#firmAddress3').val(firm.address.line3);
        $('#firmProvince').val(firm.address.province);
        $('#firmProvinceValue').val(firm.address.province);
        $('#firmPostalCode').val(firm.address.postalCode);
        $('#firmPhoneNumber').val(firm.phoneNumber);
        $('#firmFaxNumber').val(firm.faxNumber);
        $('#firmEmail').val(firm.email);
        $('#firmWebsite').val(firm.website);
        $('#firmManagingPartner').val(firm.managingPartner);
        $('#firmOfficeAdmin').val(firm.officeAdmin);
        $('#firmClaimsContact').val(firm.claimsContact);
        $('#firmCPDContact').val(firm.cpdcontact);
        $('#firmNatureOfLawPractice').val(firm.nop);
        $('#firmNatureOfLawPractice').trigger("chosen:updated");
    }

    return false;
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
        $('#province').hide();
        $('#province_chosen').show();
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

function toggleFirmDetails(enabled, saved)
{
    $('#primaryDetails').find('input').each(function()
    {
        $(this).prop('readonly', !enabled);
    });


    if (enabled)
    {
        $('#firmProvince').show();
        $('#firmProvince').val($('#firmProvinceValue').val());
        $('#firmProvince').chosen({ placeholder_text_single: 'Select'});
        $('#firmProvince').chosen().trigger('chosen:updated');
        $('#firmProvince').hide();
        $('#firmProvince_chosen').show();
        $('#firmProvinceReadOnly').hide();
        if ($('#firmProvinceValue').val() == 'Other')
        {
            $('#FirmProvinceOtherContainer').show();
        }
    }else{
        $('#firmProvince').hide();
        $('#firmProvince_chosen').hide();
        $('#firmProvinceReadOnly').show();
        $('#firmProvinceOtherContainer').hide();
        $('#firmProvinceReadOnly').val($('#firmProvinceValue').val());
    }

    $('#firmManagingPartnerLSO').prop('readonly', !enabled);
    $('#firmOfficeAdminLSO').prop('readonly', !enabled);
    $('#firmClaimsContactLSO').prop('readonly', !enabled);
    $('#firmCPDContactLSO').prop('readonly', !enabled);

    if (enabled == false) {
        $('#firmManagingPartnerFirstName').prop('readonly', !enabled);
        $('#firmManagingPartnerLastName').prop('readonly', !enabled);
        $('#firmManagingPartnerTitle').prop('readonly', !enabled);
        $('#firmManagingPartnerEmail').prop('readonly', !enabled);

        setNOP();
        $('#nopReadOnly').show();
        $('#firmNatureOfLawPractice_chosen').hide();

        //Firm managing partner
        if ($('#firmManagingPartnerNotProvided').length > 0)
        {
            if ($('#firmManagingPartnerFirstName').val() != '' && saved)
            {
                $('#firmManagingPartnerNotProvided').hide();
                $('#firmManagingPartnerContainer').show();
            }else {
                $('#firmManagingPartnerNotProvided').show();
                $('#firmManagingPartnerContainer').hide();
            }
        }

        $('#firmManagingPartnerLSOSelect').hide();
        $('#firmManagingPartnerLSO').show();
        if (!saved) {
            if ($('#firmManagingPartnerLSOSelect').chosen().val() != '--Select--' && $('#firmManagingPartnerLSOSelect').chosen().val() != '--No LSO--')
            {
                $('#firmManagingPartnerLSO').val($('#firmManagingPartnerLSOSelect').chosen().val());
            }else{
                if ($('#firmManagingPartnerFirstName').val() != '')
                {
                    $('#firmManagingPartnerLSO').val($('#firmManagingPartnerLSOOriginal').val());
                }else{
                    $('#firmManagingPartnerLSO').val('');
                }
            }
        } else {
            if ($('#firmManagingPartnerLSOSelect').chosen().val() != '--Select--' && $('#firmManagingPartnerLSOSelect').chosen().val() != '--No LSO--')
            {
                $('#firmManagingPartnerLSO').val($('#firmManagingPartnerLSOSelect').chosen().val());
            }else{
                if ($('#firmManagingPartnerFirstName').val() != '')
                {
                    $('#firmManagingPartnerLSO').val($('#firmManagingPartnerLSOOriginal').val());
                }else{
                    $('#firmManagingPartnerLSO').val('');
                }
            }
        }

        $('#firmManagingPartnerLSOSelect_chosen').hide();

        cancelOfficeAdmin(saved);

        cancelClaimsContact(saved);

        cancelCPDContact(saved);
    }else {
        $('#nopReadOnly').hide();

        //Firm managing partner
        $('#firmManagingPartnerContainer').show();
        $('#firmManagingPartnerNotProvided').hide();

        $('#firmManagingPartnerLSO').hide();
        $('#firmManagingPartnerLSOSelect').show();
        $('#firmManagingPartnerLSOSelect').chosen({ placeholder_text_single: 'Select'});
        $('#firmManagingPartnerLSOSelect').hide();
        $('#firmManagingPartnerLSOSelect_chosen').show();
        $('#firmManagingPartnerLSOSelect_chosen').attr('style', 'width: 100px;');

        if ($('#firmManagingPartnerLSOOriginal').val() == '')
        {
            $('#firmManagingPartnerLSOSelect').val('--No LSO--');
            $('#firmManagingPartnerLSOSelect').trigger('chosen:updated');
        }else
        {
            $('#firmManagingPartnerLSOSelect').val($('#firmManagingPartnerLSOOriginal').val());
            $('#firmManagingPartnerLSOSelect').trigger('chosen:updated');
        }

        //Firm office admin
        $('#firmOfficeAdminContainer').show();
        $('#firmOfficeAdminNotProvided').hide();

        $('#firmOfficeAdminLSO').hide();
        $('#firmOfficeAdminLSOSelect').show();
        $('#firmOfficeAdminLSOSelect').chosen({ placeholder_text_single: 'Select'});
        $('#firmOfficeAdminLSOSelect').hide();
        $('#firmOfficeAdminLSOSelect_chosen').show();
        $('#firmOfficeAdminLSOSelect_chosen').attr('style', 'width: 100px;');

        if ($('#firmOfficeAdminLSOOriginal').val() == '')
        {
            $('#firmOfficeAdminLSOSelect').val('--Select--');
            $('#firmOfficeAdminLSOSelect').trigger('chosen:updated');
            $('#firmOfficeAdminLSO').val('');
        }else if ($('#firmOfficeAdminLSOOriginal').val() == 'Non-lawyer')
        {
            $('#firmOfficeAdminLSOSelect').val('--No LSO--');
            $('#firmOfficeAdminLSO').val('Non-Lawyer');
            $('#firmOfficeAdminLSOSelect').trigger('chosen:updated');
        }
        else
        {
            $('#firmOfficeAdminLSOSelect').val($('#firmOfficeAdminLSOOriginal').val());
            $('#firmOfficeAdminLSOSelect').trigger('chosen:updated');
        }

        //Firm claims admin
        $('#firmClaimsContactContainer').show();
        $('#firmClaimsContactNotProvided').hide();

        $('#firmClaimsContactLSO').hide();
        $('#firmClaimsContactLSOSelect').show();
        $('#firmClaimsContactLSOSelect').chosen({ placeholder_text_single: 'Select'});
        $('#firmClaimsContactLSOSelect').hide();
        $('#firmClaimsContactLSOSelect_chosen').show();
        $('#firmClaimsContactLSOSelect_chosen').attr('style', 'width: 100px;');

        if ($('#firmClaimsContactLSOOriginal').val() == '')
        {
            $('#firmClaimsContactLSOSelect').val('--Select--');
            $('#firmClaimsContactLSOSelect').trigger('chosen:updated');
            $('#firmClaimsContactLSO').val('');
        }else  if ($('#firmClaimsContactLSOOriginal').val() == 'Non-lawyer')
        {
            $('#firmClaimsContactLSOSelect').val('--No LSO--');
            $('#firmClaimsContactLSO').val('Non-lawyer');
            $('#firmClaimsContactLSOSelect').trigger('chosen:updated');
        }else
        {
            $('#firmClaimsContactLSOSelect').val($('#firmClaimsContactLSOOriginal').val());
            $('#firmClaimsContactLSOSelect').trigger('chosen:updated');
        }

        //Firm CPD Contact
        $('#firmCPDContactContainer').show();
        $('#firmCPDContactNotProvided').hide();

        $('#firmCPDContactLSO').hide();
        $('#firmCPDContactLSOSelect').show();
        $('#firmCPDContactLSOSelect').chosen({ placeholder_text_single: 'Select'});
        $('#firmCPDContactLSOSelect_chosen').show();
        $('#firmCPDContactLSOSelect').hide();
        $('#firmCPDContactLSOSelect_chosen').attr('style', 'width: 100px;');

        if ($('#firmCPDContactLSOOriginal').val() == '')
        {
            $('#firmCPDContactLSOSelect').val('--Select--');
            $('#firmCPDContactLSOSelect').trigger('chosen:updated');
        }else if ($('#firmCPDContactLSOOriginal').val() == 'Non-lawyer')
        {
            $('#firmCPDContactLSOSelect').val('--No LSO--');
            $('#firmCPDContactLSO').val('Non-lawyer');
            $('#firmCPDContactLSOSelect').trigger('chosen:updated');
        }else
        {
            $('#firmCPDContactLSOSelect').val($('#firmCPDContactLSOOriginal').val());
            $('#firmCPDContactLSOSelect').trigger('chosen:updated');
        }

        $('#firmNatureOfLawPractice').chosen({ placeholder_text_single: 'Select an option'});
        $('#firmNatureOfLawPractice_chosen').show();
        $('#firmNatureOfLawPractice_chosen').attr('style', 'width: 500px;');
    }

    setNOP();

    //Always keep this disabled
    $('#lawID').prop('readonly', true);
    $('#firmNumber').prop('readonly', true);
    $('#lawyerFirmNumber').prop('readonly', true);
}

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
        $('#review-work-phone-ext').text($('#workPhoneExt').val());
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

    $('#firmNatureOfLawPractice').chosen({ placeholder_text_single: 'Select an option'});
    $('#firmNatureOfLawPractice').val($('#firmNatureOfLawPracticeHidden').val());
    $('#firmNatureOfLawPractice').trigger("chosen:updated");

    toggleFirmDetails(false);

    $('#firmManagingPartnerLSOSelect').change(function(){
        if ($('option:selected', this).attr('data-lsokey') == '--No LSO--')
        {
            $('#firmManagingPartnerLSO').val('Non-lawyer');
            $('#firmManagingPartnerLSO').show();
            $('#firmManagingPartnerLSOSelect_chosen').hide();
            $('#firmManagingPartnerFirstName').val('');
            $('#firmManagingPartnerLastName').val('');
            $('#firmManagingPartnerEmail').val('');
            $('#firmManagingPartnerTitle').val('');
            $('#firmManagingPartnerLSO').prop('readonly', false);
            $('#firmManagingPartnerFirstName').prop('readonly', false);
            $('#firmManagingPartnerLastName').prop('readonly', false);
            $('#firmManagingPartnerEmail').prop('readonly', false);
            $('#firmManagingPartnerTitle').prop('readonly', false);
        }else if ($('option:selected', this).attr('data-lsokey') == '--Select--'){
            $('#firmManagingPartnerLSO').val('');
            $('#firmManagingPartnerFirstName').val('');
            $('#firmManagingPartnerLastName').val('');
            $('#firmManagingPartnerEmail').val('');
            $('#firmManagingPartnerTitle').val('');
        }else {
            $('#firmManagingPartnerLSO').val($('option:selected', this).attr('data-lsokey'));
            $('#firmManagingPartnerFirstName').val($('option:selected', this).attr('data-firstname'));
            $('#firmManagingPartnerLastName').val($('option:selected', this).attr('data-lastname'));
            $('#firmManagingPartnerEmail').val($('option:selected', this).attr('data-email'));
            $('#firmManagingPartnerTitle').val($('option:selected', this).attr('data-title'));
            $('#firmManagingPartnerFirstName').prop('readonly', true);
            $('#firmManagingPartnerLastName').prop('readonly', true);
            $('#firmManagingPartnerEmail').prop('readonly', true);
            $('#firmManagingPartnerTitle').prop('readonly', true);
        }
    });

    $('#firmOfficeAdminLSOSelect').change(function(){
        if ($('option:selected', this).attr('data-lsokey') == '--No LSO--')
        {
            $('#btnCancelOfficeAdmin').show();
            $('#firmOfficeAdminFirstName').addClass('highlight');
            $('#firmOfficeAdminLastName').addClass('highlight');
            $('#firmOfficeAdminEmail').addClass('highlight');
            $('#firmOfficeAdminTitle').addClass('highlight');
            $('#firmOfficeAdminLSO').val('Non-lawyer');
            $('#firmOfficeAdminLSO').hide();
            $('#firmOfficeAdminLSOSelect_chosen').hide();
            $('#firmOfficeAdminFirstName').val('');
            $('#firmOfficeAdminLastName').val('');
            $('#firmOfficeAdminEmail').val('');
            $('#firmOfficeAdminTitle').val('');
            $('#firmOfficeAdminLSO').prop('readonly', false);
            $('#firmOfficeAdminFirstName').prop('readonly', false);
            $('#firmOfficeAdminLastName').prop('readonly', false);
            $('#firmOfficeAdminEmail').prop('readonly', false);
            $('#firmOfficeAdminTitle').prop('readonly', false);
        }else if ($('option:selected', this).attr('data-lsokey') == '--Select--'){
            $('#btnCancelOfficeAdmin').hide();
            $('#firmOfficeAdminLSO').hide();
            $('#firmOfficeAdminLSO').val('');
            $('#firmOfficeAdminFirstName').val('');
            $('#firmOfficeAdminLastName').val('');
            $('#firmOfficeAdminEmail').val('');
            $('#firmOfficeAdminTitle').val('');
        }else {
            $('#btnCancelOfficeAdmin').hide();
            $('#firmOfficeAdminLSO').hide();
            $('#firmOfficeAdminLSO').val($('option:selected', this).attr('data-lsokey'));
            $('#firmOfficeAdminFirstName').val($('option:selected', this).attr('data-firstname'));
            $('#firmOfficeAdminLastName').val($('option:selected', this).attr('data-lastname'));
            $('#firmOfficeAdminEmail').val($('option:selected', this).attr('data-email'));
            $('#firmOfficeAdminTitle').val($('option:selected', this).attr('data-title'));
            $('#firmOfficeAdminFirstName').prop('readonly', true);
            $('#firmOfficeAdminLastName').prop('readonly', true);
            $('#firmOfficeAdminEmail').prop('readonly', true);
            $('#firmOfficeAdminTitle').prop('readonly', true);
        }
    });


    $('#firmClaimsContactLSOSelect').change(function(){
        if ($('option:selected', this).attr('data-lsokey') == '--No LSO--')
        {
            $('#firmClaimsContactTitle').addClass('highlight');
            $('#firmClaimsContactFirstName').addClass('highlight');
            $('#firmClaimsContactLastName').addClass('highlight');
            $('#firmClaimsContactEmail').addClass('highlight');
            $('#btnCancelClaimsContact').show();
            $('#firmClaimsContactLSO').val('Non-lawyer');
            $('#firmClaimsContactLSO').hide();
            $('#firmClaimsContactLSOSelect_chosen').hide();
            $('#firmClaimsContactFirstName').val('');
            $('#firmClaimsContactLastName').val('');
            $('#firmClaimsContactEmail').val('');
            $('#firmClaimsContactTitle').val('');
            $('#firmClaimsContactLSO').prop('readonly', false);
            $('#firmClaimsContactFirstName').prop('readonly', false);
            $('#firmClaimsContactLastName').prop('readonly', false);
            $('#firmClaimsContactEmail').prop('readonly', false);
            $('#firmClaimsContactTitle').prop('readonly', false);
        }else if ($('option:selected', this).attr('data-lsokey') == '--Select--'){
            $('#btnCancelClaimsContact').hide();
            $('#firmClaimsContactLSO').hide();
            $('#firmClaimsContactLSO').val('');
            $('#firmClaimsContactFirstName').val('');
            $('#firmClaimsContactLastName').val('');
            $('#firmClaimsContactEmail').val('');
            $('#firmClaimsContactTitle').val('');
        }else {
            $('#btnCancelClaimsContact').hide();
            $('#firmClaimsContactLSO').hide();
            $('#firmClaimsContactLSO').val($('option:selected', this).attr('data-lsokey'));
            $('#firmClaimsContactFirstName').val($('option:selected', this).attr('data-firstname'));
            $('#firmClaimsContactLastName').val($('option:selected', this).attr('data-lastname'));
            $('#firmClaimsContactEmail').val($('option:selected', this).attr('data-email'));
            $('#firmClaimsContactTitle').val($('option:selected', this).attr('data-title'));
            $('#firmClaimsContactFirstName').prop('readonly', true);
            $('#firmClaimsContactLastName').prop('readonly', true);
            $('#firmClaimsContactEmail').prop('readonly', true);
            $('#firmClaimsContactTitle').prop('readonly', true);
        }
    });

    $('#firmCPDContactLSOSelect').change(function(){
        if ($('option:selected', this).attr('data-lsokey') == '--No LSO--')
        {
            $('#firmCPDContactFirstName').addClass('highlight');
            $('#firmCPDContactLastName').addClass('highlight');
            $('#firmCPDContactEmail').addClass('highlight');
            $('#firmCPDContactTitle').addClass('highlight');
            $('#btnCancelCPDContact').show();
            $('#firmCPDContactLSO').val('Non-lawyer');
            $('#firmCPDContactLSO').hide();
            $('#firmCPDContactLSOSelect_chosen').hide();
            $('#firmCPDContactFirstName').val('');
            $('#firmCPDContactLastName').val('');
            $('#firmCPDContactEmail').val('');
            $('#firmCPDContactTitle').val('');
            $('#firmCPDContactLSO').prop('readonly', false);
            $('#firmCPDContactFirstName').prop('readonly', false);
            $('#firmCPDContactLastName').prop('readonly', false);
            $('#firmCPDContactEmail').prop('readonly', false);
            $('#firmCPDContactTitle').prop('readonly', false);
        }else if ($('option:selected', this).attr('data-lsokey') == '--Select--'){
            $('#btnCancelCPDContact').hide();
            $('#firmCPDContactLSO').hide();
            $('#firmCPDContactLSO').val('');
            $('#firmCPDContactFirstName').val('');
            $('#firmCPDContactLastName').val('');
            $('#firmCPDContactEmail').val('');
            $('#firmCPDContactTitle').val('');
        }else {
            $('#btnCancelCPDContact').hide();
            $('#firmCPDContactLSO').hide();
            $('#firmCPDContactLSO').val($('option:selected', this).attr('data-lsokey'));
            $('#firmCPDContactFirstName').val($('option:selected', this).attr('data-firstname'));
            $('#firmCPDContactLastName').val($('option:selected', this).attr('data-lastname'));
            $('#firmCPDContactEmail').val($('option:selected', this).attr('data-email'));
            $('#firmCPDContactTitle').val($('option:selected', this).attr('data-title'));
            $('#firmCPDContactFirstName').prop('readonly', true);
            $('#firmCPDContactLastName').prop('readonly', true);
            $('#firmCPDContactEmail').prop('readonly', true);
            $('#firmCPDContactTitle').prop('readonly', true);
        }
    });

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


    $('.myInfoTab, .myAddressTab, .menuLink').mousedown(function(e){

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
                            //$(elementClicked).children().first().trigger('click');
                            //$(elementClicked).trigger('click');
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

    _checkMailing();

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
    var provinceValidated = true;
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
    if (province == "Other") {
        return true;
    } else if (province == "ON") {
        if ($.inArray(postalCodeFirstLetter, ontarioLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "AB") {
        if ($.inArray(postalCodeFirstLetter, albertaLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "BC") {
        if ($.inArray(postalCodeFirstLetter, bcLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "MB") {
        if ($.inArray(postalCodeFirstLetter, manitobaLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "NB") {
        if ($.inArray(postalCodeFirstLetter, nbLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "NF") {
        if ($.inArray(postalCodeFirstLetter, newfoundlandLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "NS") {
        if ($.inArray(postalCodeFirstLetter, novaScotiaLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "NV" || province == "NW") {
        if ($.inArray(postalCodeFirstLetter, nwTerritoriesLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "PEI") {
        if ($.inArray(postalCodeFirstLetter, peiLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "QC") {
        if ($.inArray(postalCodeFirstLetter, quebecLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "SK") {
        if ($.inArray(postalCodeFirstLetter, saskLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (province == "YK") {
        if ($.inArray(postalCodeFirstLetter, yukonLetters) > -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
