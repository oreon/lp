$(document).ready(function(){
    yearRegTest = /^[0-9]{4}$/;

    $('#authorization-sig').click(function(){
        $('#auth-sig').trigger('click');
    });

    $('#lawyerFirmNumber').parent().hide();
    $('#btnContinueFromAddress').text("Continue with IROP Application Form");

    $(function () {
        var token = _csrf_token;
        var header = "X-CSRF-TOKEN";
        $(document).ajaxSend(function(e, xhr, options) {
            xhr.setRequestHeader(header, token);
        });
    });

    $('#applicant-last-engage').datepicker({
        format : 'M dd, yyyy',
        startDate: startOfPreviousYear(),
        endDate: endOfRenewalYear(),
        forceParse : false
    });

    $('#estate-passing-date').datepicker({
        format : 'M dd, yyyy',
        startDate: startOfPreviousYear(),
        endDate: endOfRenewalYear(),
        forceParse : false
    });

    $('.questionHelp').click(function () {
        hidePopup(1); //TODO: Remove parameter
        $(this).parent().parent().find('.questionHelpText').fadeIn();
    });

    $('.iCheck-helper').click(function() {
        $(this).parent().find('input[name="paymentOption"]').trigger('click');
    });

    $('.clickable-calendar').click(function(){
        $(this).parent().siblings('input').datepicker('show');

    });

    $('#applicant-last-engage').keydown(function(e){
        e.preventDefault();
    });

    $('#BankingInstitution').on('change', function(e) {
        $('#bankingInstitution2').val($(this).val());
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

});

function showPopup(id) {
    hidePopup(1);
}

function hidePopup(id) {
    $('.questionHelpText').fadeOut();
}

function next(details) {
    saveForm();
    if (details) {
        toggleDetails(false);
        $('#btnUpdateDetails').prop('disabled', false);
        //TODO : Save details with another API call
    }

    $('#myTabedu1').find('li.active').next().children().first().trigger('click');
    window.scrollTo(0, 0);
}

function validate(){
    var result = true;
    var msg = '';
    var tab = null;

    $('.radioError').each(function () {
        $(this).removeClass('radioError');
        $('.errorMessage').each(function () {
            $(this).remove();
        });
    });

    if ($('#applicant-last-engage').val() == '') {
        var msg = 'Please enter the effective date';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#applicant-last-engage').parent());

        $('#applicantInfoTab').addClass('radioError');
        $('#applicant-last-engage').parent().addClass('radioError');

        if (tab == null) {
            tab = $('#applicantInfoTab');
        }

        result = false;
    }

    if (getNumberOfRowsFromTable($('#employment-table')) == 0) {
        var msg = 'Please provide past employment';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#employment-table'));

        $('#applicantInfoTab').addClass('radioError');
        $('#add-employment-toggle').addClass('radioError');

        if (tab == null) {
            tab = $('#applicantInfoTab');
        }

        result = false;
    }

    if ($('#applicant-years-in-law').val() == '') {
        var msg = 'Please provide number of years in practice';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#applicant-years-in-law').parent().parent());

        $('#applicantInfoTab').addClass('radioError');
        $('#applicant-years-in-law').parent().addClass('radioError');

        if (tab == null) {
            tab = $('#applicantInfoTab');
        }

        result = false;
    } else if (parseInt($('#applicant-years-in-law').val()) > 99) {
        var errorElement = getErrorElement(" Years practised must be an integer in the range of 0 to 99");
        $(errorElement).insertAfter($('#applicant-years-in-law').parent().parent());

        $('#applicantInfoTab').addClass('radioError');
        $('#applicant-years-in-law').parent().parent().addClass('radioError');

        if(tab == null) {
            tab = $('#applicantInfoTab');
        }

        result = false;
    }

    if ($('#real-estate-perc').val() == '') {
        var msg = 'Please provide real estate percentage';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#real-estate-perc').parent().parent());

        $('#applicantInfoTab').addClass('radioError');
        $('#real-estate-perc').parent().addClass('radioError');

        if (tab == null) {
            tab = $('#applicantInfoTab');
        }

        result = false;
    }

    if ($('#criminal-law-perc').val() == '') {
        var msg = 'Please provide criminal law percentage';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#criminal-law-perc').parent().parent());

        $('#applicantInfoTab').addClass('radioError');
        $('#criminal-law-perc').parent().addClass('radioError');

        if (tab == null) {
            tab = $('#criminal-law-perc');
        }

        result = false;
    }

    if ($('#criminal-law-perc').val() !== '' && $('#real-estate-perc').val() !== '') {
        var criminalLaw = parseInt($('#criminal-law-perc').val());
        var estateLaw = parseInt($('#real-estate-perc').val());
        var perc = criminalLaw + estateLaw;
        var criminalLawValidated = true;
        var estateLawValidated = true;

        if (criminalLaw > 100) {
            var errorElement = getErrorElement(" Percentage value must be in the range of 0 to 100");
            $(errorElement).insertAfter($('#criminal-law-perc').parent().parent());
            $('#criminal-law-perc').parent().addClass('radioError');
            result = false;
            if (tab == null) {
                tab = $('#applicantInfoTab');
            }

        }

        if (estateLaw > 100) {
            var errorElement = getErrorElement(" Percentage value must be in the range of 0 to 100");
            $(errorElement).insertAfter($('#real-estate-perc').parent().parent());

            $('#real-estate-perc').parent().addClass('radioError');
            estateLaw = false;
            result = false;

            if (tab == null) {
                tab = $('#applicantInfoTab');
            }
        }

        if (criminalLaw && estateLaw) {
            if (perc > 100) {
                var errorElement = getErrorElement("The combined percentage of real estate and criminal law must not exceed 100%");
                $(errorElement).insertAfter($('#criminal-law-perc').parent().parent());
                $('#applicantInfoTab').addClass('radioError');
                $('#criminal-law-perc').parent().addClass('radioError');
                $('#real-estate-perc').parent().addClass('radioError');

                if (tab == null) {
                    tab = $('#applicantInfoTab');
                }

                result = false;
            }
        }
    }

    if ($('#hours-devoted-practice').val() == '') {
        var msg = 'Please provide average hours per week spent in practice';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#hours-devoted-practice').parent().parent());

        $('#applicantInfoTab').addClass('radioError');
        $('#hours-devoted-practice').parent().addClass('radioError');

        if (tab == null) {
            tab = $('#applicantInfoTab');
        }

        result = false;
    } else if (parseInt($('#hours-devoted-practice').val()) > 168 || parseInt($('#hours-devoted-practice').val()) < 0) {
        var errorElement = getErrorElement("Hours per week must be in the range of 0 to 168");
        $(errorElement).insertAfter($('#hours-devoted-practice').parent().parent());
        $('#applicantInfoTab').addClass('radioError');
        $('#hours-devoted-practice').parent().addClass('radioError');

        if (tab == null) {
            tab = $('#applicantInfoTab');
        }

        result = false;
    }

    if ($('#limit-buy-up-none').is(':checked') == false && $('#limit-buy-up-500').is(':checked') == false && $('#limit-buy-up-1m').is(':checked') == false) {
        var msg = 'Please choose Buy-up amount';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('.limit-buyup-container'));

        $('#optionSelectionTab').addClass('radioError');
        $('.limit-buyup-container').addClass('radioError');

        if (tab == null) {
            tab = $('#optionSelectionTab');
        }

        result = false;
    }

    var coverageTerm5Checked = $('#coverage-term-5').is(':checked');
    var coverageTerm4Checked = $('#coverage-term-4').is(':checked');
    var coverageTerm3Checked = $('#coverage-term-3').is(':checked');
    var coverageTerm2Checked = $('#coverage-term-2').is(':checked');

    if(!coverageTerm5Checked && !coverageTerm4Checked && !coverageTerm3Checked && !coverageTerm2Checked) {
        var msg = 'Please choose a coverage term';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class','errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('.coverage-term-container'));

        $('#optionSelectionTab').addClass('radioError');
        $('.coverage-term-container').addClass('radioError');

        if (tab == null) {
            tab = $('#optionSelectionTab');
        }

        result = false;
    }

    var innocentNoneChecked = $('#innocent-buy-up-none').is(':checked');
    var innocent500Checked = $('#innocent-buy-up-500').is(':checked');
    var innocent1mChecked = $('#innocent-buy-up-1m').is(':checked');

    if (!innocentNoneChecked && !innocent500Checked && !innocent1mChecked) {
        var msg = 'Please select an Innocent Partner coverage sublimit option';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('.innocent-buyup-container'));

        $('#optionSelectionTab').addClass('radioError');
        $('.innocent-buyup-container').addClass('radioError');

        if (tab == null) {
            tab = $('#optionSelectionTab');
        }

        result = false;
    }



    if ($('#protection-respect-attorney-yes').is(':checked') == false && $('#protection-respect-attorney-no').is(':checked') == false) {

        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#protection-respect-attorney-yes').parent().parent());
        $('#optionSelectionTab').addClass('radioError');
        $('#protection-respect-attorney-yes').parent().parent().addClass('radioError');
        if (tab == null) {
            tab = $('#optionSelectionTab');
        }

            result = false;
        }

        if ($('#protection-respect-inter-yes').is(':checked') == false && $('#protection-respect-inter-no').is(':checked') == false) {
            var msg = 'Please select Yes or No';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#protection-respect-inter-yes').parent().parent());

            $('#optionSelectionTab').addClass('radioError');
            $('#protection-respect-inter-yes').parent().parent().addClass('radioError');

            if (tab == null) {
                tab = $('#optionSelectionTab');
            }

            result = false;
        }

        if ($('#protection-respect-estate-yes').is(':checked') == false && $('#protection-respect-estate-no').is(':checked') == false) {
            var msg = 'Please select Yes or No';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#protection-respect-estate-yes').parent().parent());

            $('#optionSelectionTab').addClass('radioError');
            $('#protection-respect-estate-yes').parent().parent().addClass('radioError');

            if (tab == null) {
                tab = $('#optionSelectionTab');
            }

            result = false;
        }

    if ($('#protection-respect-attorney-yes').is(':checked') && getNumberOfRowsFromTable($('#poa-table')) == 0) {
        var msg = 'Please provide appointment details';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#poa-table'));

        $('#optionSelectionTab').addClass('radioError');
        $('#poa-modal-toggle').addClass('radioError');

        if (tab == null) {
            tab = $('#optionSelectionTab');
        }

        result = false;
    }

    if (checkTableForNoWrittenNotice($('#poa-table'), "poa-row-wn") && $('#protection-respect-attorney-yes').is(':checked')) {
        if ($('#poa-wn-reason').val() == '') {
            var errorElement = getErrorElement("Please provide details");
            $(errorElement).insertAfter($('#poa-wn-reason'));
            $('#poa-wn-reason').addClass('radioError');

            $('#optionSelectionTab').addClass('radioError');

            if (tab == null) {
                tab = $('#optionSelectionTab');
            }

            result = false;
        }
    }

    if ($('#protection-respect-inter-yes').is(':checked') && getNumberOfRowsFromTable($('#inter-vevos-table')) == 0) {
        var msg = 'Please provide appointment details';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#inter-vevos-table'));

        $('#optionSelectionTab').addClass('radioError');
        $('#inter-vevos-modal-toggle').addClass('radioError');

        if (tab == null) {
            tab = $('#optionSelectionTab');
        }

        result = false;
    }

    if (checkTableForNoWrittenNotice($('#inter-vevos-table'), "iv-row-wn") && $('#protection-respect-inter-yes').is(':checked')) {
        if ($('#iv-wn-reason').val() == '') {
            var errorElement = getErrorElement("Please provide details");
            $(errorElement).insertAfter($('#iv-wn-reason'));
            $('#iv-wn-reason').addClass('radioError');

            $('#optionSelectionTab').addClass('radioError');

            if (tab == null) {
                tab = $('#optionSelectionTab');
            }

            result = false;
        }
    }

    if ($('#protection-respect-estate-yes').is(':checked') && getNumberOfRowsFromTable($('#estate-table')) == 0) {
        var msg = 'Please provide appointment details';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#estate-table'));

        $('#optionSelectionTab').addClass('radioError');
        $('#estate-modal-toggle').addClass('radioError');

        if (tab == null) {
            tab = $('#optionSelectionTab');
        }

        result = false;
    }

    if (checkTableForNoWrittenNotice($('#estate-table'), "estate-row-wn") && $('#protection-respect-estate-yes').is(':checked')) {
        if ($('#estate-wn-reason').val() == '') {
            var errorElement = getErrorElement("Please provide details");
            $(errorElement).insertAfter($('#estate-wn-reason'));
            $('#estate-wn-reason').addClass('radioError');

            $('#optionSelectionTab').addClass('radioError');

            if (tab == null) {
                tab = $('#optionSelectionTab');
            }

            result = false;
        }
    }

    if ($('#third-party-payor-yes').is(':checked') == false && $('#third-party-payor-no').is(':checked') == false) {
        var msg = 'Please select a third party option';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#third-party-payor-yes').parent().parent());

        $('#paymentTab').addClass('radioError');
        $('#third-party-payor-yes').parent().parent().addClass('radioError');

        if (tab == null) {
            tab = $('#paymentTab');
        }

        result = false;
    }


    var paymentOption = $('#payment-option').val();

    if (paymentOption == '') {
        var errorElement = getErrorElement("Please select a payment option");
        $(errorElement).insertAfter($('#payment-option-div'));
        $('#payment-option-div').addClass('radioError');
        $('#paymentTab').addClass('radioError');

        if (tab == null) {
            tab = $('#paymentTab');
        }

        result = false;
    }

    if (paymentOption !== '' && paymentOption !== 'AN CHEQUE' && paymentOption !== '1S CHEQUE') {
        if ($('#PPA_Check').is(':checked') == false) {
            var errorElement = getErrorElement("Please sign the payment declaration");
            $(errorElement).insertAfter($('#PPA_Check').parent().parent());
            $('#PPA_Check').parent().addClass('radioError');
            $('#paymentTab').addClass('radioError');

            if (tab == null) {
                tab = $('#paymentTab');
            }

            result = false;
        }
    }

    if (paymentOption == '1S EFT' || paymentOption == 'AN EFT') {
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
            if (tab == null) {
                tab = $('#paymentTab');
            }

            result = false;
        }

        if (isNaN($('#transitNumber').val())) {
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

        if ($('#accountNumber').val() == '') {
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
        if (isNaN($('#accountNumber').val())) {
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

    if ($('#claims-yes').is(':checked') == false && $('#claims-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#claims-yes').parent().parent());
        $('#claims-yes').parent().parent().addClass('radioError');
        $('#warrantyTab').addClass('radioError');

        if (tab == null) {
            tab = $('#warrantyTab');
        }

        result = false;
    }

    if ($('#auth-sig').is(':checked') == false) {
        var errorElement = getErrorElement("Please sign your warranty and signature declaration");
        $(errorElement).insertAfter($('#auth-sig').parent().parent());
        $('#auth-sig').parent().addClass('radioError');
        $('#warrantyTab').addClass('radioError');

        if (tab == null) {
            tab = $('#warrantyTab');
        }

        result = false;
    }

    if (!result) {
        showValidateErrors(tab, 'Please fill out all required fields');
    } else {
        $('#review-btn').attr('hidden', true);
        $('#submit-btn').removeAttr('hidden');
    }

    return result;
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

function getIropJson() {
    var json = {};

    json.userId = $('#username').val();

    json.applicantLastEngage = $('#applicant-last-engage').val();

    var employmentArray = [];

    $.each($('#employment-table').find('tr:not(:has(th))'), function(){
        var rowId = $(this).attr('id');
        var firmName = $(this).find('td[class="employment-row-firm-name"]').text();
        var position = $(this).find('td[class="employment-row-position"]').text();
        var years = $(this).find('td[class="employment-row-years"]').text().split(' To ');

        var employment = {"rowId" : rowId, "firmName" : firmName, "position" : position, "startYear" : years[0], "endYear" : years[1]};
        employmentArray.push(employment);
    });

    json.employment = employmentArray;

    json.yearsInLaw = $('#applicant-years-in-law').val();

    json.realEstatePerc = $('#real-estate-perc').val();
    json.criminalLawPerc = $('#criminal-law-perc').val();

    json.hoursDevotedPractice = $('#hours-devoted-practice').val();

    var coverageBuyUpOptions = [];

    if ($('#limit-buy-up-none').is(':checked'))
        coverageBuyUpOptions.push("NONE");

    if ($('#limit-buy-up-500').is(':checked'))
        coverageBuyUpOptions.push("500K");

    if ($('#limit-buy-up-1m').is(':checked'))
        coverageBuyUpOptions.push("1M");

    json.coverageBuyUp = coverageBuyUpOptions;

    var coverageTermOptions = [];

    if ($('#coverage-term-5').is(':checked'))
        coverageTermOptions.push("5Y");

    if ($('#coverage-term-4').is(':checked'))
        coverageTermOptions.push("4Y");

    if ($('#coverage-term-3').is(':checked'))
        coverageTermOptions.push("3Y");

    if ($('#coverage-term-2').is(':checked'))
        coverageTermOptions.push("2Y");

    json.coverageTerm = coverageTermOptions;

    var innocentBuyUpOptions = [];

    if ($('#innocent-buy-up-none').is(':checked'))
        innocentBuyUpOptions.push("NONE");

    if ($('#innocent-buy-up-500').is(':checked'))
        innocentBuyUpOptions.push("500K");

    if ($('#innocent-buy-up-1m').is(':checked'))
        innocentBuyUpOptions.push("1M");

    json.innocentBuyUp = innocentBuyUpOptions;


    json.protectionRespectAttorney = $('input:radio[name="protectionRespectAttorney"]:checked').val();

    poaArray = [];

    $.each($('#poa-table').find('tr:not(:has(th))'), function(){
        var rowId = $(this).attr('id');
        var clientName = $(this).find('td[class="poa-row-client-name"]').text();
        var appointmentMade = $(this).find('td[class="poa-row-appointment"]').text();
        var familyMemberShort = $(this).find('td[class="poa-row-family-member"]').text();
        var familyMember = false;
        if(familyMemberShort == "Yes") {
            familyMember = true;
        }

        var nature = $(this).find('td[class="poa-row-nature"]').text();
        var actingShort = $(this).find('td[class="poa-row-acting"]').text();
        var acting = false;
        if(actingShort == "Yes") {
            acting = true;
        }

        var duration = $(this).find('td[class="poa-row-duration"]').text();



        var writtenNoticeShort = $(this).find('td[class="poa-row-wn"]').text();
        var writtenNotice = false;
        if (writtenNoticeShort == "Yes") {
            writtenNotice = true;
        }


        var row = {"rowId" : rowId, "clientName" : clientName, "appointmentMade" : appointmentMade,
                    "familyMember" : familyMember, "nature" : nature, "acting" : acting,
                    "durationFrom" : (duration == '' ? '' : duration.split(' To ')[0]),
                    "durationTo" : (duration == '' ? '' : duration.split(' To ')[1]),
                    "writtenNotice" : writtenNotice};
        poaArray.push(row);
    });
    json.poaNoNotificationReason = (checkTableForNoWrittenNotice($('#poa-table'), "poa-row-wn") ? $('#poa-wn-reason').val() : "");

    json.poaAppointments = poaArray;

    json.protectionRespectInterVevo = $('input:radio[name="protectionRespectInter"]:checked').val();

    var ivArray = [];

    $.each($('#inter-vevos-table').find('tr:not(:has(th))'), function(){
        var rowId = $(this).attr('id');
        var clientName = $(this).find('td[class="iv-row-client-name"]').text();
        var appointmentMade = $(this).find('td[class="iv-row-appointment"]').text();
        var familyMemberShort = $(this).find('td[class="iv-row-family-member"]').text();
        var familyMember = false;
        if(familyMemberShort == "Yes") {
            familyMember = true;
        }
        var nature = $(this).find('td[class="iv-row-nature"]').text();
        var actingShort = $(this).find('td[class="iv-row-acting"]').text();
        var acting = false;
        if (actingShort == "Yes") {
            acting = true;
        }

        var duration = $(this).find('td[class="iv-row-duration"]').text();
        var writtenNoticeShort = $(this).find('td[class="iv-row-wn"]').text();
        var writtenNotice = false;
        if(writtenNoticeShort == "Yes") {
            writtenNotice =  true;
        }


        var row = {"rowId" : rowId, "clientName" : clientName, "appointmentMade" : appointmentMade, "familyMember" : familyMember, "nature" : nature, "acting" : acting,
                    "durationFrom" : (duration == '' ? "" : duration.split(" To ")[0]), "durationTo" : (duration == '' ? "" : duration.split(" To ")[1]), "writtenNotice" : writtenNotice};

        ivArray.push(row);
    });

    json.ivNoNotificationReason =(checkTableForNoWrittenNotice($('#inter-vevos-table'), "iv-row-wn") ? $('#iv-wn-reason').val() : "");

    json.ivAppointments = ivArray;


    json.protectionRespectEstate = $('input:radio[name="protectionRespectEstate"]:checked').val();

    var estateArray = [];

    $.each($('#estate-table').find('tr:not(:has(th))'), function(){
        var rowId = $(this).attr('id');
        var clientName = $(this).find('td[class="estate-row-client-name"]').text();
        var appointmentMade = $(this).find('td[class="estate-row-appointment"]').text();

        var familyMemberShort = $(this).find('td[class="estate-row-family-member"]').text();
        var familyMember = false;
        if (familyMemberShort == "Yes") {
            familyMember = true;
        }

        var estateAmount = $(this).find('td[class="estate-row-estate-amount"]').text();
        var passingDate = $(this).find('td[class="estate-row-passing"]').text();
        var actingShort = $(this).find('td[class="estate-row-acting"]').text();
        var acting = false;
        if(actingShort == "Yes") {
            acting = true;
        }

        var duration = $(this).find('td[class="estate-row-duration"]').text();
        var writtenNoticeShort = $(this).find('td[class="estate-row-wn"]').text();
        var writtenNotice = false;
        if(writtenNoticeShort == "Yes") {
            writtenNotice = true;
        }

        var row = {"rowId" : rowId, "clientName" : clientName, "appointmentMade" : appointmentMade, "familyMember" : familyMember,
            "estimatedValue" : estateAmount, "passingDate" : passingDate, "acting" : acting,
            "durationFrom" : (duration == '' ? "" : duration.split(' To ')[0]), "durationTo" : (duration == '' ? "" : duration.split(' To ')[1]),
            "writtenNotice" : writtenNotice};

        estateArray.push(row);

    });

    json.estateAppointments = estateArray;

    json.estateNoNotificationReason = (checkTableForNoWrittenNotice($('#estate-table'), "estate-row-wn") ? $('#estate-wn-reason').val() : "");

    json.thirdParty = $('input:radio[name="thirdPartyPayor"]:checked').val();

    json.paymentOption = $('#payment-option').val();

    if ($('#payment-option').val() == "1S EFT" || $('#payment-option').val() == "AN EFT") {
        json.bankingInstitution = $('#BankingInstitution option:selected').val();
        json.bankingInstitutionShort = $('#bankingInstitution2').val();
        json.transitNumber = $('#transitNumber').val();
        json.accountNumber = $('#accountNumber').val();
        json.nameOnAccount = $('#NameOnAccount').val();
    }


    json.awareOfClaims = $('input:radio[name="awareOfClaims"]:checked').val();

    json.comments = $('#comments').val();

    json.declaration = $('#auth-sig').is(':checked');
    json.ppaCheck = $('#PPA_Check').is(':checked');

    return json;

}

/* EMPLOYMENT HISTORY */
$(document).ready(function() {

    $('#add-employment-toggle').click(function(){
        $('#save-employment-btn').hide();
        $('#add-employment-btn').show();
        clearEmploymentValues();
        clearEmploymentValidation();
        $('#employment-modal').modal("show");
    });

    $('#add-employment-btn').click(function(){
        addEmployment();
    });

    $('#save-employment-btn').click(function(){
        saveEmployment();
    });

});

function addEmployment() {

    if (validateEmployment()) {
        var firmName = $('#employment-firm-name').val();
        var position = $('#employment-position').val();
        var startYear = $('#employment-from').val();
        var endYear = $('#employment-to').val();
        var nextId = getNextId($('#employment-table'));

        var row = "<tr id='" + nextId + "'>"
            + "<td class='employment-row-years'>" + startYear + " To " + endYear + "</td>"
            + "<td class='employment-row-firm-name'>" + firmName + "</td>"
            + "<td class='employment-row-position'>" + position + "</td>"
            + "<td class='employment-edit'><i class='table-row-edit employment-edit-row fa fa-edit'></i></td>"
            + "<td class='employment-delete'><i class='table-row-delete employment-delete-row fa fa-trash'></i></td></tr>";
            + "</tr>";

        $('#employment-table').append(row);

        $('#employment-table tr[id="' + nextId + '"] .employment-edit-row').click(function(){
            editEmployment(this);
        });

        $('#employment-table tr[id="' + nextId + '"] .employment-delete-row').click(function(){
            removeEmployment(this);
        });

        $('#employment-table-header').show();

        $('#employment-modal').modal('hide');
    }


}

function validateEmployment() {

    clearEmploymentValidation();

    var result = true;

    if ($('#employment-firm-name').val() == '') {
        var msg = 'Please provide firm name';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#employment-firm-name'));

        $('#employment-firm-name').addClass('radioError');

        result = false;
    }

    if ($('#employment-position').val() == '') {
        var msg = 'Please provide position';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class','errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#employment-position'));

        $('#employment-position').addClass('radioError');

        result = false;
    }

    if ($('#employment-from').val() == '' && $('#employment-to').val() == '') {
        var errorElement = getErrorElement("Please provide year(s) with above firm");
        errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
        $(errorElement).insertAfter($('#employment-from').parent());

        $('#employment-from').addClass('radioError');
        $('#employment-to').addClass('radioError');
        result = false;
    } else {
        if(!validateToFrom($('#employment-from'), $('#employment-to'), true)) {
            result = false;
        }
    }

    return result;
}

function editEmployment(el) {
    var row = $(el).parent().parent();
    var firmName = row.find('td[class="employment-row-firm-name"]').text();
    var position = row.find('td[class="employment-row-position"]').text();
    var years = row.find('td[class="employment-row-years"]').text().split(' To ');

    $('#employment-row-id-ref').val(row.attr('id'));
    $('#employment-firm-name').val(firmName);
    $('#employment-position').val(position);
    $('#employment-from').val(years[0]);
    $('#employment-to').val(years[1]);

    $('#add-employment-btn').hide();
    $('#save-employment-btn').show();

    $('#employment-modal').modal('show');

}

function saveEmployment() {
    var rowId = $('#employment-row-id-ref').val();
    var row = $('#employment-table tr[id="' + rowId + '"]');

    if(validateEmployment()) {
        var firmName = $('#employment-firm-name').val();
        var position = $('#employment-position').val();
        var startYear = $('#employment-from').val();
        var endYear = $('#employment-to').val();

        row.find('td[class="employment-row-firm-name"]').text(firmName);
        row.find('td[class="employment-row-position"]').text(position);
        row.find('td[class="employment-row-years"]').text(startYear + " To " + endYear);

        $('#employment-modal').modal('hide');
    }
}

function removeEmployment(el) {
    $(el).parent().parent().remove();

    if(getNumberOfRowsFromTable($('#employment-table')) == 0) {
        $('#employment-table-header').hide();
    }

}

function clearEmploymentValidation() {
    $('#employment-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#employment-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });
}

function clearEmploymentValues() {
    $('#employment-firm-name').val("");
    $('#employment-position').val("");
    $('#employment-from').val("");
    $('#employment-to').val("");
}
/* END OF EMPLOYMENT HISTORY */

/* POWER OF ATTORNEY APPOINTMENTS */
$(document).ready(function(){
    $('#poa-modal-toggle').click(function(){
        $('#save-poa-btn').hide();
        $('#add-poa-btn').show();
        clearPoaValues();
        clearModal("poa-modal");
        $('#poa-modal').modal('show');
    });

    $('#add-poa-btn').click(function(){
        addPoaAppointment();
    });

    $('#save-poa-btn').click(function(){
       savePoaAppointment();
    });

    $('input:radio[name="poaFamilyMember"]').change(function(){
        if ($(this).val() == "true") {
            $('.poa-family-member-info').show();
        } else {
            $('.poa-family-member-info').hide();
        }
    });

});

function addPoaAppointment() {
    if(validatePoaAppointment()) {
        var clientName = $('#poa-client-name').val();
        var appointmentMade = $('#poa-appointment-made').val();
        var familyMember = $('input:radio[name="poaFamilyMember"]:checked').val();
        var familyMemberShort = "";

        if (familyMember == "true") {
            familyMemberShort = "Yes";
        } else {
            familyMemberShort = "No";
        }

        var nature = $('#poa-nature').val();
        var durationFrom = $('#poa-from').val();
        var durationTo = $('#poa-to').val();
        var duration = "";

        if (durationFrom !== '' && durationTo !== '') {
            duration = durationFrom + " To " + durationTo;
        }

        var acting = $('input:radio[name="poaActing"]:checked').val();
        var actingShort = "";

        if (acting == "true") {
            actingShort = "Yes";
        } else {
            actingShort = "No";
        }

        var writtenNotice = $('input:radio[name="poaWrittenNotice"]:checked').val();
        var writtenNoticeShort = "";

        if (writtenNotice == "true") {
            writtenNoticeShort = "Yes";
        } else {
            writtenNoticeShort = "No";
            $('#poa-wn-info').show();
        }

        var nextId = getNextId($('#poa-table'));

        var row = "<tr id='" + nextId + "'>"
                    + "<td class='poa-row-client-name'>" + clientName + "</td>"
                    + "<td class='poa-row-appointment'>" + appointmentMade +"</td>"
                    + "<td class='poa-row-family-member'>" + familyMemberShort + "</td>"
                    + "<td class='poa-row-nature'>" + nature +"</td>"
                    + "<td class='poa-row-acting'>" + actingShort + "</td>"
                    + "<td class='poa-row-duration'>" + duration + "</td>"
                    + "<td class='poa-row-wn'>" + writtenNoticeShort + "</td>"
                    + "<td class='poa-row-edit-row'><i class='edit-row fa fa-edit'></i></td>"
                    + "<td class='poa-row-delete-row'><i class='delete-row fa fa-trash'></i></td>"
                    + "</tr>";

        $('#poa-table').append(row);


        $('#poa-table tr[id="' + nextId + '"] .poa-row-edit-row').click(function(){
            editPoa(this);
        });

        $('#poa-table tr[id="' + nextId + '"] .poa-row-delete-row').click(function(){
            removePoa(this);
        });

        $('#poa-table-header').show();

        $('#poa-modal').modal('hide');
    }
}

function validatePoaAppointment() {
    var result = true;

    clearModal("poa-modal");

    if ($('#poa-client-name').val() == '') {
        var msg = 'Please provide client name';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#poa-client-name'));

        $('#poa-client-name').addClass('radioError');

        result = false;
    }

    if ($('#poa-appointment-made').val() == '') {
        var msg = 'Please enter appointment';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#poa-appointment-made'));

        $('#poa-appointment-made').addClass('radioError');

        result = false;
    }

    if ($('#poa-family-member-yes').is(':checked') == false && $('#poa-family-member-no').is(':checked') == false) {
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#poa-family-member-yes').parent().parent());

        $('#poa-family-member-yes').parent().parent().addClass('radioError');

        result = false;
    }

    if ($('#poa-nature').val() == '') {
        var msg = 'Please provide nature of POA';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#poa-nature'));

        $('#poa-nature').addClass('radioError');

        result = false;
    }

    if ($('#poa-acting-yes').is(':checked') == false && $('#poa-acting-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#poa-acting-yes').parent().parent());

        $('#poa-acting-yes').parent().parent().addClass('radioError');
        result = false;
    }

    if ($('#poa-from').val().length > 0 || $('#poa-to').val().length > 0) {
        if (!validateToFrom($('#poa-from'), $('#poa-to'), false)) {
            result = false;
        }
    }

    if ($('#poa-written-notice-yes').is(':checked') == false && $('#poa-written-notice-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#poa-written-notice-yes').parent().parent());

        $('#poa-written-notice-yes').parent().parent().addClass('radioError');
        result = false;
    }

    return result;
}

function editPoa(el) {
    clearModal("poa-modal");
    var row = $(el).parent();

    var clientName = row.find('td[class="poa-row-client-name"]').text();
    var appointmentMade = row.find('td[class="poa-row-appointment"]').text();
    var familyMemberShort = row.find('td[class="poa-row-family-member"]').text();
    var nature = row.find('td[class="poa-row-nature"]').text();
    var duration = row.find('td[class="poa-row-duration"]').text();

    if (duration !== '') {
        var durations = duration.split(" To ");
        $('#poa-from').val(durations[0]);
        $('#poa-to').val(durations[1]);
    } else {
        $('#poa-from').val("");
        $('#poa-to').val("");
    }


    var actingShort = row.find('td[class="poa-row-acting"]').text();

    if (actingShort == "Yes") {
        $('#poa-acting-yes').trigger('click');
    } else {
        $('#poa-acting-no').trigger('click');
    }

    var writtenNotice = row.find('td[class="poa-row-wn"]').text();

    if (writtenNotice == "Yes") {
        $('#poa-written-notice-yes').trigger('click');
    } else {
        $('#poa-written-notice-no').trigger('click');
    }


    $('#poa-row-id-ref').val(row.attr('id'));
    $('#poa-client-name').val(clientName);
    $('#poa-appointment-made').val(appointmentMade);

    if (familyMemberShort == 'Yes') {
        $('#poa-family-member-yes').trigger('click');
    } else {
        $('#poa-family-member-no').trigger('click');
    }

    $('#poa-nature').val(nature);


    $('#add-poa-btn').hide();
    $('#save-poa-btn').show();

    $('#poa-modal').modal('show');



}

function savePoaAppointment() {
    var rowId = $('#poa-row-id-ref').val();
    var row = $('#poa-table tr[id="' + rowId + '"]');

    if (validatePoaAppointment()) {
        var clientName = $('#poa-client-name').val();
        var appointmentMade = $('#poa-appointment-made').val();
        var familyMember = $('input:radio[name="poaFamilyMember"]:checked').val();
        var familyMemberShort = "";

        if (familyMember == "true") {
            familyMemberShort = "Yes";
        } else {
            familyMemberShort = "No";
        }

        var acting = $('input:radio[name="poaActing"]:checked').val();
        var actingShort = "";

        if (acting == "true") {
            actingShort = "Yes";
        } else {
            actingShort = "No";
        }

        var writtenNotice = $('input:radio[name="poaWrittenNotice"]:checked').val();
        var writtenNoticeShort = "";

        if (writtenNotice == "true") {
            writtenNoticeShort = "Yes";
        } else {
            writtenNoticeShort = "No";
            $('#poa-wn-info').show();
        }

        var nature = $('#poa-nature').val();
        var durationFrom = $('#poa-from').val();
        var durationTo = $('#poa-to').val();
        var duration = "";

        if(durationFrom !== '' && durationTo !== '') {
            duration = durationFrom + " To " + durationTo;
        }

        row.find('td[class="poa-row-client-name"]').text(clientName);
        row.find('td[class="poa-row-appointment"]').text(appointmentMade);
        row.find('td[class="poa-row-family-member"]').text(familyMemberShort);
        row.find('td[class="poa-row-nature"]').text(nature);
        row.find('td[class="poa-row-acting"]').text(actingShort);
        row.find('td[class="poa-row-duration"]').text(duration);
        row.find('td[class="poa-row-wn"]').text(writtenNoticeShort);

        if (!checkTableForNoWrittenNotice($('#poa-table'), "poa-row-wn")) {
            $('#poa-wn-info').hide();
        }

        $('#poa-modal').modal('hide');
    }

}

function removePoa(el) {
    $(el).parent().remove();

    if(getNumberOfRowsFromTable($('#poa-table')) == 0) {
        $('#poa-table-header').hide();
    }

    if (!checkTableForNoWrittenNotice($('#poa-table'), "poa-row-wn")) {
        $('#poa-wn-info').hide();
    }
}

function clearPoaValues() {
    $('#poa-client-name').val("");
    $('#poa-appointment-made').val("");
    $('#poa-nature').val("");
    $.each($('#poa-modal input:radio'), function(){
        $(this).prop('checked', false);
        $(this).parent().removeClass('active');
    });

    $('#poa-from').val("");
    $('#poa-to').val("");
    $('.poa-family-member-info').hide();
}
/* END OF POWER OF ATTORNEY APPOINTMENTS */

/* INTER VEVO TRUST APPOINTMENTS */
$(document).ready(function(){
    $('#inter-vevos-modal-toggle').click(function(){
        clearInterVevoValues();
        clearModal('inter-vevos-modal');
        $('#save-iv-btn').hide();
        $('#add-iv-btn').show();
        $('#inter-vevos-modal').modal('show');
    });

    $('#add-iv-btn').click(function(){
       addInterVevos();
    });

    $('#save-iv-btn').click(function(){
       saveInterVevos();
    });

    $('input:radio[name="ivFamilyMember"]').change(function(){
        if ($(this).val() == "true") {
            $('.iv-family-member-info').show();
        } else {
            $('.iv-family-member-info').hide();
        }
    });

});

function validateInterVevos() {
    var result = true;

    clearModal("inter-vevos-modal");

    if ($('#iv-client-name').val() == '') {
        var errorElement = getErrorElement("Please provide client name");
        $(errorElement).insertAfter($('#iv-client-name'));
        $('#iv-client-name').addClass('radioError');
        result = false;
    }

    if ($('#iv-appointment-made').val() == '') {
        var errorElement = getErrorElement("Please provide appointment");
        $(errorElement).insertAfter($('#iv-appointment-made'));
        $('#iv-appointment-made').addClass('radioError');
        result = false;
    }

    if ($('#iv-family-member-yes').is(':checked') == false && $('#iv-family-member-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#iv-family-member').parent().parent());
        $('#iv-family-member-yes').parent().parent().addClass('radioError');
        result = false;
    }

    if ($('#iv-nature').val() == '') {
        var errorElement = getErrorElement("Please provide nature of trust");
        $(errorElement).insertAfter($('#iv-nature'));
        $('#iv-nature').addClass('radioError');
        result = false;
    }

    if ($('#iv-acting-yes').is(':checked') == false && $('#iv-acting-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#iv-acting-yes').parent().parent());
        $('#iv-acting-yes').parent().parent().addClass('radioError');
        result = false;
    }

    if ($('#iv-from').val().length > 0 || $('#iv-to').val().length > 0) {
        if (!validateToFrom($('#iv-from'), $('#iv-to'), false)) {
            result = false;
        }
    }

    if ($('#iv-written-notice-yes').is(':checked') == false && $('#iv-written-notice-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#iv-written-notice-yes').parent().parent());

        $('#iv-written-notice-yes').parent().parent().addClass('radioError');
        result = false;
    }

    return result;
}

function addInterVevos() {
    if (validateInterVevos()) {
        var clientName = $('#iv-client-name').val();
        var appointmentMade = $('#iv-appointment-made').val();
        var familyMember = $('input:radio[name="ivFamilyMember"]:checked').val();
        var familyMemberShort = "";

        if (familyMember == "true") {
            familyMemberShort = "Yes";
        } else {
            familyMemberShort = "No";
        }

        var nature = $('#iv-nature').val();
        var durationFrom = $('#iv-from').val();
        var durationTo = $('#iv-to').val();
        var duration = "";
        if (durationFrom !== '' && durationTo !== '') {
            duration = durationFrom + " To " + durationTo;
        }

        var acting = $('input:radio[name="ivActing"]:checked').val();
        var actingShort = "";

        if (acting == "true") {
            actingShort = "Yes";
        } else {
            actingShort = "No";
        }

        var writtenNotice = $('input:radio[name="ivWrittenNotice"]:checked').val();
        var writtenNoticeShort = "";

        if (writtenNotice == "true") {
            writtenNoticeShort = "Yes";
        } else {
            $('#iv-wn-info').show();
            writtenNoticeShort = "No";
        }

        var nextId = getNextId($('#inter-vevos-table'));

        var row = "<tr id='" + nextId + "'>"
                    + "<td class='iv-row-client-name'>" + clientName + "</td>"
                    + "<td class='iv-row-appointment'>" + appointmentMade + "</td>"
                    + "<td class='iv-row-family-member'>" + familyMemberShort + "</td>"
                    + "<td class='iv-row-nature'>" + nature + "</td>"
                    + "<td class='iv-row-acting'>" + actingShort + "</td>"
                    + "<td class='iv-row-duration'>" + duration + "</td>"
                    + "<td class='iv-row-wn'>" + writtenNoticeShort + "</td>"
                    + "<td class='iv-row-edit-row'><i class='edit-row fa fa-edit'></i></td>"
                    + "<td class='iv-row-delete-row'><i class='delete-row fa fa-trash'></i></td>"
                    + "</tr>";

        $('#inter-vevos-table').append(row);

        $('#inter-vevos-table tr[id="' + nextId + '"] .iv-row-edit-row').click(function(){
            editInterVevos(this);
        });

        $('#inter-vevos-table tr[id="' + nextId + '"] .iv-row-delete-row').click(function(){
            removeInterVevos(this);
        });

        $('#inter-vevos-table-header').show();

        $('#inter-vevos-modal').modal('hide');
    }
}

function editInterVevos(el) {
    clearModal("inter-vevos-modal");
    var row = $(el).parent();
    $('#iv-row-id-ref').val(row.attr('id'));

    var clientName = row.find('td[class="iv-row-client-name"]').text();
    var appointmentMade = row.find('td[class="iv-row-appointment"]').text();
    var familyMemberShort = row.find('td[class="iv-row-family-member"]').text();
    var nature = row.find('td[class="iv-row-nature"]').text();
    var acting = row.find('td[class="iv-row-acting"]').text();
    var actingShort = "";

    if (acting == "Yes") {
        $('#iv-acting-yes').trigger('click');
    } else {
        $('#iv-acting-no').trigger('click');
    }

    var duration = row.find('td[class="iv-row-duration"]').text();

    if (duration !== '') {
        var durations = duration.split(" To ");
        $('#iv-from').val(durations[0]);
        $('#iv-to').val(durations[1]);
    } else {
        $('#iv-from').val("");
        $('#iv-to').val("");
    }

    $('#iv-client-name').val(clientName);
    $('#iv-appointment-made').val(appointmentMade);

    if (familyMemberShort == "Yes") {
        $('#iv-family-member-yes').trigger('click');
    } else {
        $('#iv-family-member-no').trigger('click');
    }

    var actingShort = row.find('td[class="iv-row-acting"]').text();

    if (actingShort == "Yes") {
        $('#iv-acting-yes').prop('checked', true);
        $('#iv-acting-yes').parent().parent().addClass('active');
    } else {
        $('#iv-acting-no').prop('checked', true);
        $('#iv-acting-no').parent().parent().addClass('active');
    }


    var writtenNoticeShort = row.find('td[class="iv-row-wn"]').text();

    if (writtenNoticeShort == "Yes") {
        $('#iv-written-notice-yes').trigger('click');
    } else {
        $('#iv-written-notice-no').trigger('click');
    }

    $('#iv-nature').val(nature);

    $('#add-iv-btn').hide();
    $('#save-iv-btn').show();
    $('#inter-vevos-modal').modal('show');

}

function saveInterVevos() {
    var rowId = $('#iv-row-id-ref').val();
    var row = $('#inter-vevos-table tr[id="' + rowId + '"]');

    if (validateInterVevos()) {

        var clientName = $('#iv-client-name').val();
        var appointmentMade = $('#iv-appointment-made').val();
        var familyMember = $('input:radio[name="ivFamilyMember"]:checked').val();
        var familyMemberShort = "";
        if (familyMember == "true") {
            familyMemberShort = "Yes";
        } else {
            familyMemberShort = "No";
        }

        var acting = $('input:radio[name="ivActing"]:checked').val();
        var actingShort = "";

        if (acting == "true") {
            actingShort = "Yes";
        } else {
            actingShort = "No";
        }

        var nature = $('#iv-nature').val();
        var durationFrom = $('#iv-from').val();
        var durationTo = $('#iv-to').val();

        var duration = "";

        if(durationFrom !== '' && durationTo !== '') {
            duration = durationFrom + " To " + durationTo;
        }


        var writtenNotice = $('input:radio[name="ivWrittenNotice"]:checked').val();
        var writtenNoticeShort = "";

        if (writtenNotice == "true") {
            writtenNoticeShort = "Yes";
        } else {
            writtenNoticeShort = "No";
            $('#iv-wn-info').show();
        }

        row.find('td[class="iv-row-client-name"]').text(clientName);
        row.find('td[class="iv-row-appointment"]').text(appointmentMade);
        row.find('td[class="iv-row-family-member"]').text(familyMemberShort);
        row.find('td[class="iv-row-nature"]').text(nature);
        row.find('td[class="iv-row-acting"]').text(actingShort);
        row.find('td[class="iv-row-duration"]').text(duration);
        row.find('td[class="iv-row-wn"]').text(writtenNoticeShort);

        if (!checkTableForNoWrittenNotice($('#inter-vevos-table'), "iv-row-wn")) {
            $('#iv-wn-info').hide();
        }

        $('#inter-vevos-modal').modal('hide');
    }
}

function removeInterVevos(el) {
    $(el).parent().remove();

    if(getNumberOfRowsFromTable($('#inter-vevos-table')) == 0) {
        $('#inter-vevos-table-header').hide();
    }

    if(!checkTableForNoWrittenNotice($('#inter-vevos-table'), "iv-row-wn")) {
        $('#iv-wn-info').hide();
    }
}

function clearInterVevoValues() {
    $('#iv-client-name').val("");
    $('#iv-appointment-made').val("");
    $.each($('#inter-vevos-modal input:radio'), function(){
       $(this).prop('checked', false);
       $(this).parent().removeClass('active');
    });

    $('#iv-nature').val("");

    $('#iv-from').val("");
    $('#iv-to').val("");
    $('.iv-family-member-info').hide();
}
/* END OF INTER VEVOS APPOINTMENTS */

/* ESTATE TRUST APPOINTMENTS */
$(document).ready(function() {
    $('#estate-modal-toggle').click(function() {
        clearEstateValues();
        clearModal("estate-trust-modal");
        $('#add-estate-btn').show();
        $('#save-estate-btn').hide();
       $('#estate-trust-modal').modal('show');
    });

    $('#add-estate-btn').click(function() {
       addEstate();
    });

    $('#save-estate-btn').click(function(){
       saveEstate();
    });

    $('input:radio[name="estateFamilyMember"]').change(function(){
        if ($(this).val() == "true") {
            $('.estate-family-member-info').show();
        } else {
            $('.estate-family-member-info').hide();
        }
    });
});

function validateEstate() {
    var result = true;

    clearModal("estate-trust-modal");

    if ($('#estate-client-name').val() == '') {
        var errorElement = getErrorElement("Please provide client name");
        $(errorElement).insertAfter($('#estate-client-name'));

        $('#estate-client-name').addClass('radioError');
        result = false;
    }

    if ($('#estate-appointment-made').val() == '') {
        var errorElement = getErrorElement("Please provide appointment date");
        $(errorElement).insertAfter($('#estate-appointment-made'));

        $('#estate-appointment-made').addClass('radioError');
        result = false;
    }

    if ($('#estate-family-member-yes').is(':checked') == false && $('#estate-family-member-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#estate-family-member-yes').parent().parent());

        $('#estate-family-member-yes').parent().parent().addClass('radioError');
        result = false;
    }

    if ($('#estate-dollar-amount').val() == '') {
        var errorElement = getErrorElement("Please provide dollar amount");
        $(errorElement).insertAfter($('#estate-dollar-amount'));

        $('#estate-dollar-amount').addClass('radioError');
        result = false;
    }

    if ($('#estate-acting-yes').is(':checked') == false && $('#estate-acting-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#estate-acting-yes').parent().parent());

        $('#estate-acting-yes').parent().parent().addClass('radioError');
        result = false;
    }

    if ($('#estate-from').val().length > 0 || $('#estate-to').val().length > 0) {
        if (!validateToFrom($('#estate-from'), $('#estate-to'), false)) {
            result = false;
        }
    }


    if ($('#estate-written-notice-yes').is(':checked') == false && $('#estate-written-notice-no').is(':checked') == false) {
        var errorElement = getErrorElement("Please select Yes or No");
        $(errorElement).insertAfter($('#estate-written-notice-yes').parent().parent());

        $('#estate-written-notice-yes').parent().parent().addClass('radioError');
        result = false;
    }


    return result;
}

function addEstate() {
    if(validateEstate()) {
        var clientName = $('#estate-client-name').val();
        var appointmentMade = $('#estate-appointment-made').val();
        var familyMember = $('input:radio[name="estateFamilyMember"]:checked').val();
        var familyMemberShort = "";

        if (familyMember == "true") {
            familyMemberShort = "Yes";
        } else {
            familyMemberShort = "No";
        }

        var estateDollarAmount = $('#estate-dollar-amount').val();
        var passingDate = $('#estate-passing-date').val();
        var acting = $('input:radio[name="estateActing"]:checked').val();
        var actingShort = "";
        if (acting == "true") {
            actingShort = "Yes";
        } else {
            actingShort = "No";
        }


        var durationFrom = $('#estate-from').val();
        var durationTo = $('#estate-to').val();
        var duration = "";
        if (durationFrom !== '' && durationTo !== '') {
            duration = durationFrom + " To " + durationTo;
        }

        var writtenNotice = $('input:radio[name="estateWrittenNotice"]:checked').val();
        var writtenNoticeShort = "";

        if (writtenNotice == "true") {
            writtenNoticeShort = "Yes";
        } else {
            writtenNoticeShort = "No";
            $('#estate-wn-info').show();
        }

        var nextId = getNextId($('#estate-table'));

        var row = "<tr id='" + nextId + "'>"
                + "<td class='estate-row-client-name'>" + clientName + "</td>"
                + "<td class='estate-row-appointment'>" + appointmentMade + "</td>"
                + "<td class='estate-row-family-member'>" + familyMemberShort + "</td>"
                + "<td class='estate-row-estate-amount'>" + estateDollarAmount + "</td>"
                + "<td class='estate-row-passing'>" + passingDate + "</td>"
                + "<td class='estate-row-acting'>" + actingShort + "</td>"
                + "<td class='estate-row-duration'>" + duration + "</td>"
                + "<td class='estate-row-wn'>" + writtenNoticeShort + "</td>"
                + "<td class='estate-row-edit-row'><i class='edit-row fa fa-edit'></i></td>"
                + "<td class='estate-row-delete-row'><i class='delete-row fa fa-trash'></i></td>"
                + "</tr>";

        $('#estate-table').append(row);

        $('#estate-table-header').show();

        $('#estate-table tr[id="' + nextId + '"] .estate-row-edit-row').click(function(){
            editEstate(this);
        });

        $('#estate-table tr[id="' + nextId + '"] .estate-row-delete-row').click(function(){
            removeEstate(this);
        });

        $('#estate-trust-modal').modal('hide');
    }
}

function editEstate(el) {

    clearModal("estate-trust-modal");

    var row = $(el).parent();
    var rowId = row.attr('id');
    var clientName = row.find('td[class="estate-row-client-name"]').text();
    var appointmentMade = row.find('td[class="estate-row-appointment"]').text();
    var familyMemberShort = row.find('td[class="estate-row-family-member"]').text();
    var estateAmount = row.find('td[class="estate-row-estate-amount"]').text();
    var passingDate = row.find('td[class="estate-row-passing"]').text();
    var actingShort = row.find('td[class="estate-row-acting"]').text();

    var duration = row.find('td[class="estate-row-duration"]').text();

    if (duration !== '') {
        var durations = duration.split(" To ");
        $('#estate-from').val(durations[0]);
        $('#estate-to').val(durations[1]);
    } else {
        $('#estate-from').val("");
        $('#estate-to').val("");
    }

    var writtenNoticeShort = row.find('td[class="estate-row-wn"]').text();

    $('#estate-row-id-ref').val(rowId);

    $('#estate-client-name').val(clientName);
    $('#estate-appointment-made').val(appointmentMade);

    if (familyMemberShort == 'Yes') {
        $('#estate-family-member-yes').trigger('click');
    } else {
        $('#estate-family-member-no').trigger('click');
    }

    $('#estate-dollar-amount').val(estateAmount);

    $('#estate-passing-date').val(passingDate);

    if (actingShort == "Yes") {
        $('#estate-acting-yes').trigger('click');
    } else {
        $('#estate-acting-no').trigger('click');
    }

    if (writtenNoticeShort == "Yes") {
        $('#estate-written-notice-yes').trigger('click');
    } else {
        $('#estate-written-notice-no').trigger('click');
    }

    $('#add-estate-btn').hide();
    $('#save-estate-btn').show();
    $('#estate-trust-modal').modal('show');

}

function saveEstate(el) {
    var rowId = $('#estate-row-id-ref').val();
    var row = $('#estate-table tr[id="' + rowId + '"]');

    if (validateEstate()) {
        var clientName = $('#estate-client-name').val();
        var appointmentMade = $('#estate-appointment-made').val();
        var familyMember = $('input:radio[name="estateFamilyMember"]:checked').val();
        var familyMemberShort = "";

        if (familyMember == "true") {
            familyMemberShort = "Yes";
        } else {
            familyMemberShort = "No";
        }

        var estateAmount = $('#estate-dollar-amount').val();
        var passingDate = $('#estate-passing-date').val();
        var acting = $('input:radio[name="estateActing"]:checked').val();
        var actingShort = "";

        if (acting == "true") {
            actingShort = "Yes";
        } else {
            actingShort = "No";
            $('#estate-wn-reason').show();
        }


        var durationFrom = $('#estate-from').val();
        var durationTo = $('#estate-to').val();
        var duration = "";

        if(durationFrom !== '' && durationTo !== '') {
            duration = durationFrom + " To " + durationTo;
        }


        var writtenNotice = $('input:radio[name="estateWrittenNotice"]:checked').val();
        var writtenNoticeShort = "";

        if (writtenNotice == "true") {
            writtenNoticeShort = "Yes";
        } else {
            writtenNoticeShort = "No";
            $('#estate-wn-info').show();
        }

        row.find('td[class="estate-row-client-name"]').text(clientName);
        row.find('td[class="estate-row-appointment"]').text(appointmentMade);
        row.find('td[class="estate-row-family-member"]').text(familyMemberShort);
        row.find('td[class="estate-row-estate-amount"]').text(estateAmount);
        row.find('td[class="estate-row-passing"]').text(passingDate);
        row.find('td[class="estate-row-acting"]').text(actingShort);
        row.find('td[class="estate-row-duration"]').text(duration);
        row.find('td[class="estate-row-wn"]').text(writtenNoticeShort);

        if (!checkTableForNoWrittenNotice($('#estate-table'), "estate-row-wn")) {
            $('#estate-wn-info').hide();
        }

        $('#estate-trust-modal').modal('hide');

    }
}

function removeEstate(el) {
    $(el).parent().remove();

    if (getNumberOfRowsFromTable($('#estate-table')) < 1) {
        $('#estate-table-header').hide();
    }

    if (!checkTableForNoWrittenNotice($('#estate-table'), "estate-row-wn")) {
        $('#estate-wn-info').hide();
    }
}

function clearEstateValues() {
    $('#estate-client-name').val("");
    $('#estate-appointment-made').val("");
    $.each($('#estate-trust-modal input:radio'), function(){
        $(this).prop('checked', false);
        $(this).parent().removeClass('active');
    });

    $('#estate-dollar-amount').val("");
    $('#estate-confirmation-date').val("");
    $('#estate-from').val("");
    $('#estate-to').val("");
    $('#estate-passing-date').val("");
    $('.estate-family-member-info').hide();

}
/* END OF TRUST ESTATE APPOINTMENTS */


function setCheque(value) {
    $('#payment-option').val(value);
    $('#ppa-info').hide();
    $('#cc-info').hide();
    $('#credit-auth').hide();
}

function setPPA(value) {
    $('#payment-option').val(value);
    $('#ppa-info').show();
    $('#cc-info').show();
    $('#credit-auth').hide();
}

function setCC(value) {
    $('#payment-option').val(value);
    $('#ppa-info').hide();
    $('#cc-info').show();
    $('#credit-auth').show();
}

function getNumberOfRowsFromTable(table) {
    return parseInt($(table).find('tr:not(:has(th))').length);
}

function getNextId(el) {
    var highest = 0;

    $.each($(el).find('tr:not(:has(th))'), function(index, value) {
        if(parseInt($(value).attr('id')) > highest)
            highest = parseInt($(value).attr('id'));
    });

    return highest + 1;
}

function getErrorElement(msg) {
    var errorElement = document.createElement('div');
    errorElement.setAttribute('class', 'errorMessage');
    errorElement.appendChild(document.createTextNode(msg));
    return errorElement;
}

function clearModal(modal) {
    $('#'+ modal + ' .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#' + modal + ' .errorMessage').each(function () {
            $(this).remove();
        });
    });
}

function review() {
    saveForm();
    var result = validate();
    if(result){
        if (1) //client side
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
            $('#payment-options').show();
            $(':checkbox').attr('disabled', true);
            $("input:checkbox:not(:checked)").parent().parent().hide();
            $('#printIcon').show();
            $('#validNOPText').hide();
            $('.actionLink').remove();
            $('#checkVolumeBillings').hide();
            $('#addressConfirmation').hide();
            $('.address-details').show();
            $('#firmConfirmation').hide();



            window.scrollTo(0,0);
            var paymentElement = document.createElement('div');
            paymentElement.setAttribute('class', 'readOnlyInput');
            var paymentSelection = '';
            var paymentOption = $('#payment-option').val();
            if (paymentOption == 'AN CHEQUE') {
                paymentSelection = "Annual payments by cheque";
                $('#creditButton').hide();

                $('#submitButton').show();
            } else if (paymentOption == 'AN EFT') {
                $('#cc-info').show();
                paymentSelection = "Annual payments by pre-authorized transfer";
                $('#creditButton').hide();
                $('#submitButton').show();
            } else if (paymentOption == 'AN CREDIT CARD') {
                paymentSelection = "Annual payments by credit card";
                $('#creditButton').show();
                $('#submitButton').hide();
            } else if (paymentOption == '1S CHEQUE') {
                paymentSelection = "Lump sum payments by cheque";
                $('#creditButton').hide();
                $('#submitButton').show();
            } else if (paymentOption == '1S EFT') {
                paymentSelection = "Lump sum payments by pre-authorized transfer";
                $('#creditButton').hide();
                $('#submitButton').show();
            } else if (paymentOption == '1S CREDIT CARD') {
                paymentSelection = "Lump sum payments by credit card";
                $('#creditButton').show();
                $('#submitButton').hide();
            }

            $(paymentElement).html(paymentSelection);
            $('#payment-option-review').append(paymentElement);

            $('#payment-option-div').hide();

            $('.review-edit-remove').hide();
            $('.estate-row-delete-row').hide();
            $('.estate-row-edit-row').hide();
            $('.poa-row-delete-row').hide();
            $('.poa-row-edit-row').hide();
            $('.iv-row-delete-row').hide();
            $('.iv-row-edit-row').hide();
            $('.employment-delete-row').hide();
            $('.employment-edit-row').hide();

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
        }
        $('#province_chosen').hide();

        $('#preferredMailingValue').hide();
        $('#BankingInstitution_chosen').hide();
        $('.banking-info-review').show();
        $('#bankingInstitution2').hide();
        $('.review-green-label').addClass('review-green readOnlyInput');
        $('table').find('tr:not(:has(th))').addClass('review-green');
        $('.review-hide-check').parent().hide();
        $('#review-coverage-limit-title').show();
        $('#provinceReadOnly').next().hide();
        $('.table-header-with-btn').hide();

        if(checkTableForFamily($('#poa-table'), "poa-row-family-member")){
            var errorElement = getErrorElement("No coverage for family members available");
            $(errorElement).insertAfter($('#poa-table'));
        }

        if(checkTableForFamily($('#inter-vevos-table'), "iv-row-family-member")) {
            var errorElement = getErrorElement("No coverage for family members available");
            $(errorElement).insertAfter($('#inter-vevos-table'));
        }

        if(checkTableForFamily($('#estate-table'), "estate-row-family-member")) {
            var errorElement = getErrorElement("No coverage for family members available");
            $(errorElement).insertAfter($('#estate-table'));
        }

        //remove instructions in comments.
        $('.comments-area div.questionInstructions').hide();


    }
    return false;
}

function submitForm() {
    if (confirm('Are you sure you have printed a copy of the form?')) {

        $('#submitButton').attr('disabled', true);
        var json = getIropJson();
        $.ajax({
            url: "/forms/submit/irop",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(json),
            success: function (result) {
                if(result == null) {
                    window.location.href = "/error";
                } else {
                    if (result.error == true) {
                        window.location.href = "/error";
                    } else {
                        $('#formIntro').show();
                        $('#iropForm').hide();
                        $('#confirmation').show();
                        $('#confirmationNumber').html(result.confirmation);
                        $('#submittedDate').html(result.createdDate);
                        $('#helpContainer').hide();
                        $('#efilingInfo').show();
                        $('.formReview').hide();
                    }
                }



            },
            error: function (e) {
                console.log(e);

                alert('Unable to submit form. Contact system admin');
            }
        });
    }
}

function submitCC() {
    window.location = '/moneris?custid=' + $('#UserName').val() + '_IROP' + '&fromform=iropform';
}

function cancel() {
    window.location.href="/forms/iropform";
}

function reviseForm() {
    window.location.href="/forms/iropform";
}

function saveForm() {
    var json = getIropJson();
    $.ajax({
        url: "/forms/save/irop",
        type: "post",
        contentType : "application/json",
        dataType: "json",
        data: JSON.stringify(json),
        success: function (result) {
            return true;
        },
        error: function (a, b, c) {

            return false;
        }
    });
}

$(document).ready(function() {
   $('.iropTabs').click(function() {
      saveForm();
   });

   populateForm();
});

function populateForm() {
    $.ajax({
        url: "/forms/details/iropform",
        type: "get",
        dataType: "json",
        data: $('#UserDetailsForm').serialize(),
        success: function (result) {
            if (result.found == true) {
                $('#applicant-last-engage').val(result.applicantLastEngage);

                $.each(result.employment, function(index, value) {
                      var row = "<tr id='" + value.rowId + "'>"
                        + "<td class='employment-row-years'>" + value.startYear + " To " + value.endYear + "</td>"
                        + "<td class='employment-row-firm-name'>" + value.firmName + "</td>"
                        + "<td class='employment-row-position'>" + value.position + "</td>"
                        + "<td class='employment-edit'><i class='table-row-edit employment-edit-row fa fa-edit'></i></td>"
                        + "<td class='employment-delete'><i class='table-row-delete employment-delete-row fa fa-trash'></i></td></tr>";
                    $('#employment-table').append(row);

                    $('#employment-table tr[id="' + value.rowId + '"] .employment-edit-row').click(function(){
                        editEmployment(this);
                    });

                    $('#employment-table tr[id="' + value.rowId + '"] .employment-delete-row').click(function(){
                        removeEmployment(this);
                    });

                });

                if (getNumberOfRowsFromTable($('#employment-table')) > 0) {
                    $('#employment-table-header').show();
                }

                $('#applicant-years-in-law').val(result.yearsInLaw);
                $('#real-estate-perc').val(result.realEstatePerc);
                $('#criminal-law-perc').val(result.criminalLawPerc);
                $('#hours-devoted-practice').val(result.hoursDevotedPractice);

                $.each(result.coverageBuyUp, function(index, value) {
                   if(value == "NONE") {
                       $('#limit-buy-up-none').parent().addClass('checked');
                       $('#limit-buy-up-none').prop('checked', true);
                   } else if (value == "500K") {
                       $('#limit-buy-up-500').parent().addClass('checked');
                       $('#limit-buy-up-500').prop('checked', true);
                   } else if (value == "1M") {
                       $('#limit-buy-up-1m').parent().addClass('checked');
                       $('#limit-buy-up-1m').prop('checked', true);
                   }
                });

                $.each(result.coverageTerm, function(index, value) {
                   if (value == "5Y") {
                       $('#coverage-term-5').parent().addClass('checked');
                       $('#coverage-term-5').prop('checked', true);
                   } else if (value == "4Y") {
                       $('#coverage-term-4').parent().addClass('checked');
                       $('#coverage-term-4').prop('checked', true);
                   } else if (value == "3Y") {
                       $('#coverage-term-3').parent().addClass('checked');
                       $('#coverage-term-3').prop('checked', true);
                   } else if (value == "2Y") {
                       $('#coverage-term-2').parent().addClass('checked');
                       $('#coverage-term-2').prop('checked', true);
                   }
                });

                $.each(result.innocentBuyUp, function(index, value) {
                   if (value == "NONE") {
                       $('#innocent-buy-up-none').parent().addClass('checked');
                       $('#innocent-buy-up-none').prop('checked', true);
                   } else if (value == "500K") {
                       $('#innocent-buy-up-500').parent().addClass('checked');
                       $('#innocent-buy-up-500').prop('checked', true);
                   } else if (value == "1M") {
                       $('#innocent-buy-up-1m').parent().addClass('checked');
                       $('#innocent-buy-up-1m').prop('checked', true);
                   }
                });


                if (result.protectionRespectAttorney == true) {
                    $('#protection-respect-attorney-yes').trigger('click');

                    $.each(result.poaAppointments, function(index, value) {
                        var durationFrom = value.durationFrom;
                        var durationTo = value.durationTo;
                        var duration = "";

                        if (durationFrom !== '' && durationTo !== '') {
                            duration = durationFrom + " To " + durationTo;
                        }

                        var row = "<tr id='" + value.rowId + "'>"
                            + "<td class='poa-row-client-name'>" + value.clientName + "</td>"
                            + "<td class='poa-row-appointment'>" + value.appointmentMade +"</td>"
                            + "<td class='poa-row-family-member'>" + (value.familyMember == true ? "Yes" : "No") + "</td>"
                            + "<td class='poa-row-nature'>" + value.nature +"</td>"
                            + "<td class='poa-row-acting'>" + (value.acting == true ? "Yes" : "No") + "</td>"
                            + "<td class='poa-row-duration'>" + duration + "</td>"
                            + "<td class='poa-row-wn'>" + (value.writtenNotice == true ? "Yes" : "No") + "</td>"
                            + "<td class='poa-row-edit-row'><i class='edit-row fa fa-edit'></i></td>"
                            + "<td class='poa-row-delete-row'><i class='delete-row fa fa-trash'></i></td>"
                            + "</tr>";

                        $('#poa-table').append(row);


                        if (!value.writtenNotice) {
                            $('#poa-wn-info').show();
                        }

                        $('#poa-table-header').show();

                        $('#poa-table tr[id="' + value.rowId + '"] .poa-row-edit-row').click(function(){
                            editPoa(this);
                        });

                        $('#poa-table tr[id="' + value.rowId + '"] .poa-row-delete-row').click(function(){
                            removePoa(this);
                        });



                    });

                    $('#poa-wn-reason').val(result.poaNoNotificationReason);
                } else if (result.protectionRespectAttorney == false) {
                    $('#protection-respect-attorney-no').trigger('click');
                }

                if (result.protectionRespectInterVevo == true) {
                    $('#protection-respect-inter-yes').trigger('click');

                    $.each(result.ivAppointments, function(index, value) {
                        var durationFrom = value.durationFrom;
                        var durationTo = value.durationTo;
                        var duration = "";

                        if (durationFrom !== '' && durationTo !== '') {
                            duration = durationFrom + " To " + durationTo;
                        }

                        var row = "<tr id='" + value.rowId + "'>"
                            + "<td class='iv-row-client-name'>" + value.clientName + "</td>"
                            + "<td class='iv-row-appointment'>" + value.appointmentMade + "</td>"
                            + "<td class='iv-row-family-member'>" + (value.familyMember == true ? "Yes" : "No") + "</td>"
                            + "<td class='iv-row-nature'>" + value.nature + "</td>"
                            + "<td class='iv-row-acting'>" + (value.acting == true ? "Yes" : "No") + "</td>"
                            + "<td class='iv-row-duration'>" + duration + "</td>"
                            + "<td class='iv-row-wn'>" + (value.writtenNotice == true ? "Yes" : "No") + "</td>"
                            + "<td class='iv-row-edit-row'><i class='edit-row fa fa-edit'></i></td>"
                            + "<td class='iv-row-delete-row'><i class='delete-row fa fa-trash'></i></td>"
                            + "</tr>";

                        $('#inter-vevos-table').append(row);


                        if (!value.writtenNotice) {
                            $('#iv-wn-info').show();
                        }

                        $('#inter-vevos-table-header').show();

                        $('#inter-vevos-table tr[id="' + value.rowId + '"] .iv-row-edit-row').click(function(){
                            editInterVevos(this);
                        });

                        $('#inter-vevos-table tr[id="' + value.rowId + '"] .iv-row-delete-row').click(function(){
                            removeInterVevos(this);
                        });
                    });

                    $('#iv-wn-reason').val(result.ivNoNotificationReason);
                } else if (result.protectionRespectInterVevo == false) {
                    $('#protection-respect-inter-no').trigger('click');
                }

                if (result.protectionRespectEstate == true) {

                    $.each(result.estateAppointments, function(index, value) {
                        var durationFrom = value.durationFrom;
                        var durationTo = value.durationTo;
                        var duration = "";

                        if (durationFrom !== '' && durationTo !== '') {
                            duration = durationFrom + " To " + durationTo;
                        }

                        var row = "<tr id='" + value.rowId + "'>"
                            + "<td class='estate-row-client-name'>" + value.clientName + "</td>"
                            + "<td class='estate-row-appointment'>" + value.appointmentMade + "</td>"
                            + "<td class='estate-row-family-member'>" + (value.familyMember == true ? "Yes" : "No") + "</td>"
                            + "<td class='estate-row-estate-amount'>" + value.estimatedValue + "</td>"
                            + "<td class='estate-row-passing'>" + value.passingDate + "</td>"
                            + "<td class='estate-row-acting'>" + (value.acting == true ? "Yes" : "No") + "</td>"
                            + "<td class='estate-row-duration'>" + duration + "</td>"
                            + "<td class='estate-row-wn'>" + (value.writtenNotice == true ? "Yes" : "No") + "</td>"
                            + "<td class='estate-row-edit-row'><i class='edit-row fa fa-edit'></i></td>"
                            + "<td class='estate-row-delete-row'><i class='delete-row fa fa-trash'></i></td>"
                            + "</tr>";

                        $('#estate-table').append(row);

                        if (!value.writtenNotice) {
                            $('#estate-wn-info').show();
                        }

                        $('#estate-table-header').show();

                        $('#estate-table tr[id="' + value.rowId + '"] .estate-row-edit-row').click(function(){
                            editEstate(this);
                        });

                        $('#estate-table tr[id="' + value.rowId + '"] .estate-row-delete-row').click(function(){
                            removeEstate(this);
                        });
                    });
                    $('#estate-wn-reason').val(result.estateNoNotificationReason);

                    $('#protection-respect-estate-yes').trigger('click');
                } else if (result.protectionRespectEstate == false) {
                    $('#protection-respect-estate-no').trigger('click');
                }

                if (result.thirdParty == true) {
                    $('#third-party-payor-yes').trigger('click');
                } else if (result.thirdParty == false) {
                    $('#third-party-payor-no').trigger('click');
                }

                switch (result.paymentOption) {
                    case "AN CHEQUE" :
                        $('#ANCHEQUE').parent().trigger('click');
                        $('#payment-option').val("AN CHEQUE");
                        break;
                    case "AN EFT" :
                        $('#ANEFT').parent().trigger('click');
                        $('#payment-option').val("AN EFT");
                        break;
                    case "AN CREDIT CARD" :
                        $('#ANCREDITCARD').parent().trigger('click');
                        $('#payment-option').val("AN CREDIT CARD");
                        break;
                    case "1S CHEQUE" :
                        $('#1SCHEQUE').parent().trigger('click');
                        $('#payment-option').val("1S CHEQUE");
                        break;
                    case "1S EFT" :
                        $('#1SEFT').parent().trigger('click');
                        $('#payment-option').val("1S EFT");
                        break;
                    case "1S CREDIT CARD" :
                        $('#1SCREDITCARD').parent().trigger('click');
                        $('#payment-option').val("1S CREDIT CARD");
                        break;
                    default :
                        break;
                }

                if (result.awareOfClaims == true) {
                    $('#claims-yes').trigger('click');
                } else if (result.awareOfClaims == false) {
                    $('#claims-no').trigger('click');
                }

                $('#comments').val(result.comments);

            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function checkTableForNoWrittenNotice(el, className) {
    var result = false;
    $.each($(el).find('tr:not(:has(th))'), function(index, value){
        var writtenNotice = $(this).find('td[class="' + className +'"]').text();
        if (writtenNotice == "No") {
            result = true;
        }
    });

    return result;
}

function checkTableForFamily(el, className) {
    var result = false;
    $.each($(el).find('tr:not(:has(th))'), function(index, value){
        var familyMember = $(this).find('td[class="' + className +'"]').text();
        if (familyMember == "Yes") {
            result = true;
        }
    });

    return result;
}

function validateToFrom(from, to, isFutureAllowed) {
    var result = true;

    var fromVal = $(from).val();
    var toVal = $(to).val();

    var fromEmpty = (fromVal == '');
    var fromFull = (fromVal.length == 4);
    var fromWithinRange = (parseInt(fromVal) <= moment().year());
    var toEmpty = (toVal == '');
    var toFull = (toVal.length == 4);
    var toWithinRange = (parseInt(toVal) <= moment().year());
    var isEndBeforeStart = (parseInt(fromVal) > parseInt(toVal));


    var durationValid = true;

    if (fromVal.length > 0 || toVal.length > 0) {
        /*NOT EMPTY*/

        if (!fromFull || !toFull) {

            if (!fromFull) {
                var errorElement = getErrorElement("Please provide a full 4 digit year");
                errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
                $(errorElement).insertAfter($(from).parent());

                $(from).addClass('radioError');
                result = false;

            }

            if (!toFull) {
                if (fromFull) {
                    var errorElement = getErrorElement("Please provide a full 4 digit year");
                    errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
                    $(errorElement).insertAfter($(from).parent());
                }

                $(to).addClass('radioError');
                result = false;

            }

            durationValid = false;

        }

        if (durationValid) {
            if (isEndBeforeStart) {
                var errorElement = getErrorElement("Start year cannot be greater than the final year");
                errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
                $(errorElement).insertAfter($(from).parent());

                $(from).addClass('radioError');
                $(to).addClass('radioError');
                durationValid = false;
                result = false;
            }
        }

        if (durationValid && isFutureAllowed) {
            if (!toWithinRange) {
                var errorElement = getErrorElement("Final year cannot be greater than current year");
                errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
                $(errorElement).insertAfter($(from).parent());
                $(to).addClass('radioError');

                durationValid = false;
                result = false;


            }
        }
    }

    return result;
}

function printForm() {
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

$(document).ready(function() {
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