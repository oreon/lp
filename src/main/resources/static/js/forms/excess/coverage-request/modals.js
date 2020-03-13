$(document).ready(function () {
    yearRegTest = /^[0-9]{4}$/;


    $('#coverage-former-firm-modal-toggle').click(function () {
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
        $('#coverage-former-firm-province').val("ON");
        $('#coverage-former-firm-num-lawyers').val("");
        $('#coverage-former-firm-add-btn').show();
        $('#coverage-former-firm-save-btn').hide();
        $('#coverage-add-former-firm-modal').modal('show');

    });

    $('.coverage-former-firm-dissolved-toggle').click(function () {
        if ($(this).children('input').val() == 'true') {
            $('#coverage-former-firm-dissolved-yes').prop('checked', true);
            $('#coverage-former-firm-dissolved-no').prop('checked', false);
            $('.coverage-former-firm-dissolved-info').show();
        } else {
            $('#coverage-former-firm-from').val("");
            $('#coverage-former-firm-to').val("");
            $('#coverage-former-firm-num-lawyers').val("");
            $('.coverage-former-firm-dissolved-info').hide();
            $('#coverage-former-firm-dissolved-no').prop('checked', true);
            $('#coverage-former-firm-dissolved-yes').prop('checked', false);
        }

    });

    $('#coverage-man-firm-modal-toggle').click(function () {
        $('#coverage-add-man-modal .radioError').each(function () {
            $(this).removeClass('radioError');
            $('#coverage-add-man-modal .errorMessage').each(function () {
                $(this).remove();
            });
        });
        $('#coverage-add-man-modal input').val("");
        $('#coverage-man-add-to-list-btn').show();
        $('#coverage-man-save-changes-btn').hide();
        $('#coverage-add-man-modal').modal('show');
    });

    $('#coverage-man-letterhead-btn').click(function(){
       $('#man-company-letterhead').modal('show');
    });

    $('#coverage-former-firm-save-btn').click(function () {
        saveEditedFormerFirmRow();
    });


    /* QUESTION 8 */
    $('#coverage-former-firm-add-btn').click(function () {
        addCoverageFormerFirmToList();
    });

});

/* QUESTION 8 MODAL ADD HANDLE */

function addCoverageFormerFirmToList() {
    if (validateCoverageAddFormerFirm()) {
        var newId = getNextId($('.coverage-former-firm-info table'));

        var number = $('#coverage-former-firm-number').val();
        var name = $('#coverage-former-firm-name').val();
        var city = $('#coverage-former-firm-city').val();
        var province = $('#coverage-former-firm-province').find(':selected').text();
        var provinceShort = $('#coverage-former-firm-province').find(':selected').val();

        var dissolved = "";
        var dateSeperator = " To ";
        if ($('#coverage-former-firm-dissolved-yes').is(':checked')) {
            dissolved = "Yes";
        } else {
            dissolved = "No";
        }
        var avgNumLawyers = $('#coverage-former-firm-num-lawyers').find(':selected').val();
        var yearsInOperationFrom = $('#coverage-former-firm-from').val();
        var yearsInOperationTo = $('#coverage-former-firm-to').val();

        if (dissolved == "No") {
            dateSeperator = "N/A";
            avgNumLawyers = "N/A";
        }



        var newRow = "<tr id='" + newId  + "'><td class='coverage-former-firm-row-num'>" + number + "</td><td class='coverage-former-firm-row-name'>" + name + "</td><td class='coverage-former-firm-row-city'>" + city + "</td><td class='coverage-former-firm-row-prov'><span style='display:none'>" + provinceShort + "</span>" + province
            + "</td><td class='coverage-former-firm-row-dissolved'>" + dissolved + "</td><td class='coverage-former-firm-row-yio'>" + yearsInOperationFrom + dateSeperator + yearsInOperationTo + "</td><td class='coverage-former-firm-row-avg-lawyers'>" + avgNumLawyers
            + "</td><td class='review-edit-remove coverage-former-firm-row-edit-col'><i class=\"table-row-edit coverage-former-firm-edit-row fa fa-edit\"></i></td><td class='review-edit-remove'><i class=\"table-row-delete coverage-former-firm-delete-row fa fa-trash\"></i></td></tr>";


        $('.coverage-former-firm-info .table').append(newRow);



        $('.coverage-former-firm-info .table tr[id="' + newId + '"] .coverage-former-firm-edit-row').click(function () {
            editFormerFirmRow(this);
        });

        $('.coverage-former-firm-info .table tr[id="' + newId + '"] .coverage-former-firm-delete-row').click(function () {
            removeFormerFirmRow(this);
        });

        if(newId > 0) {
            $('#coverage-former-firm-table-header').show();
        }

        if (newId >= 10) {
            $('#coverage-former-firm-modal-toggle').attr('disabled', true);
        }

        $('#coverage-add-former-firm-modal').modal('hide');


    }

}

/* QUESTION 8 MODAL ADD VALIDATION */
function validateCoverageAddFormerFirm() {

    $('#coverage-add-former-firm-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#coverage-add-former-firm-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });

    var result = true;

    if ($('#coverage-former-firm-name').val() == '') {
        var msg = 'Please provide a firm name';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-former-firm-name'));
        $('#coverage-former-firm-name').addClass('radioError');
        result = false;
    }

    if ($('#coverage-former-firm-city').val() == '') {
        var msg = 'Please provide a city';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-former-firm-city'));
        $('#coverage-former-firm-city').addClass('radioError');
        result = false;
    }

    if ($('#coverage-former-firm-province').find(':selected').val() == null) {
        var msg = 'Please provide a province';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-former-firm-province'));
        $('#coverage-former-firm-province').addClass('radioError');
        result = false;
    }

    if ($('#coverage-former-firm-dissolved-yes').is(':checked') == false && $('#coverage-former-firm-dissolved-no').is(':checked') == false) {
        var msg = 'Please select Yes or No';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-former-firm-dissolved-yes').parent().parent());
        $('#coverage-former-firm-dissolved-yes').parent().parent().addClass('radioError');
        result = false;
    }

    if ($('#coverage-former-firm-dissolved-yes').is(':checked')) {
        var formerValidate = true;
        if ($('#coverage-former-firm-from').val() == '') {
            var msg = 'Please provide a date';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#coverage-former-firm-from').parent());
            $('#coverage-former-firm-from').addClass('radioError');
            formerValidate = false;
            result = false;
        } else if (parseInt($('#coverage-former-firm-from').val()) > new Date().getFullYear() || parseInt($('#coverage-former-firm-from').val()) < 1980 || !yearRegTest.test($('#coverage-former-firm-from').val())) {
            var msg = 'Please select a year between 1980 and ' + new Date().getFullYear();
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#coverage-former-firm-from').parent());

            $('#coverage-former-firm-from').addClass('radioError');
            formerValidate = false;
            result = false;
        }

        if ($('#coverage-former-firm-to').val() == '') {
            if (formerValidate) {
                var msg = 'Please provide a date';
                var errorElement = document.createElement('div');
                errorElement.setAttribute('class', 'errorMessage');
                errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
                errorElement.appendChild(document.createTextNode(msg));
                $(errorElement).insertAfter($('#coverage-former-firm-from').parent());
            }

            $('#coverage-former-firm-to').addClass('radioError');
            result = false;
        } else if (parseInt($('#coverage-former-firm-to').val()) > new Date().getFullYear() || parseInt($('#coverage-former-firm-to').val()) < 1980 || !yearRegTest.test($('#coverage-former-firm-to').val())) {
            if(formerValidate) {
                var msg =  'Please select a year between 1980 and ' + new Date().getFullYear();
                var errorElement = document.createElement('div');
                errorElement.setAttribute('class', 'errorMessage');
                errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
                errorElement.appendChild(document.createTextNode(msg));
                $(errorElement).insertAfter($('#coverage-former-firm-to').parent());
            }

            $('#coverage-former-firm-to').addClass('radioError');
            result = false;
        }

        if ($('#coverage-former-firm-num-lawyers').find(':selected').val() == null) {
            var msg = 'Please provide the number of lawyers';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#coverage-former-firm-num-lawyers'));

            $('#coverage-former-firm-num-lawyers').addClass('radioError');
            result = false;
        }

    }

    return result;
}

function editFormerFirmRow(el) {
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

function saveEditedFormerFirmRow() {

    if (validateCoverageAddFormerFirm()) {
        var rowId = $('#coverage-former-firm-row-id-ref').val();

        var row = $('.coverage-former-firm-info .table tr[id="' + rowId + '"]');

        row.find('td[class="coverage-former-firm-row-num"]').text($('#coverage-former-firm-number').val());
        row.find('td[class="coverage-former-firm-row-name"]').text($('#coverage-former-firm-name').val());
        row.find('td[class="coverage-former-firm-row-city"]').text($('#coverage-former-firm-city').val());
        row.find('td[class="coverage-former-firm-row-prov"]').html("<span style='display:none'>" + $('#coverage-former-firm-province').find(':selected').val() + "</span>" + $('#coverage-former-firm-province').find(':selected').text());

        var dissolved = "";

        if ($('#coverage-former-firm-dissolved-yes').is(':checked')) {
            dissolved = "Yes";
        } else {
            dissolved = "No";
        }
        row.find('td[class="coverage-former-firm-row-dissolved"]').text(dissolved);

        if (dissolved == "No") {
            row.find('td[class="coverage-former-firm-row-yio"]').text("N/A");
            row.find('td[class="coverage-former-firm-row-avg-lawyers"]').text("N/A");
        } else {
            var from = $('#coverage-former-firm-from').val();
            var to = $('#coverage-former-firm-to').val();

            row.find('td[class="coverage-former-firm-row-yio"]').text(from + " To " + to);
            row.find('td[class="coverage-former-firm-row-avg-lawyers"]').text($('#coverage-former-firm-num-lawyers').val());

        }

        $('#coverage-add-former-firm-modal').modal('hide');


    }


}

function removeFormerFirmRow(el) {

    $(el).parent().parent().remove();

    var rowCtr = getNumberOfRowsFromTable($('.coverage-former-firm-info .table'));

    if (rowCtr < 10) {
        $('#coverage-former-firm-modal-toggle').attr('disabled', false);
    }

    if (rowCtr == 0) {
        $('#coverage-former-firm-table-header').hide();
    }

}

/* --------------------------------------------------------- QUESTION 9 ---------------------------------------------------------------------------------- */
$(document).ready(function () {

    $('#coverage-man-add-to-list-btn').click(function () {
        addCoverageManToList();
    });

    $('#coverage-man-save-changes-btn').click(function () {
        savedEditedManRow();
    });


});


/* QUERSTION 9 ADD HANDLE */
function addCoverageManToList() {
    if (validateCoverageAddMan()) {
        var firmName = $('#coverage-man-name').val();
        var firmYioFrom = $('#coverage-man-from').val();
        var firmYioTo = $('#coverage-man-to').val();
        var firmServices = $('#coverage-man-services').val();

        var newId = getNextId($('.coverage-man-info table'));
        var row = "<tr id='" + newId + "'><td class='coverage-man-row-name'>" + firmName + "</td><td class='coverage-man-row-yio'>" + firmYioFrom + " To " + firmYioTo + "</td><td style=\"max-width:750px;word-wrap:break-word;\" class='coverage-man-row-services'>" + firmServices
            + "</td><td class='review-edit-remove'><i class=\"table-row-edit coverage-man-edit-row fa fa-edit\"></i></td><td class='review-edit-remove'><i class=\"table-row-delete coverage-man-delete-row fa fa-trash\"></td></tr>";

        $('.coverage-man-info .table').append(row);

        $('.coverage-man-info .table tr[id="' + newId + '"] .coverage-man-edit-row').click(function () {
            editManRow(this);
        });

        $('.coverage-man-info .table tr[id="' + newId + '"] .coverage-man-delete-row').click(function () {
            removeManRow(this);
        });

        if(newId > 0)
            $('#coverage-man-firm-table-headers').show();

        if (newId >= 5) {
            $('#coverage-man-firm-modal-toggle').attr('disabled', true);
        }


        $('#coverage-add-man-modal').modal('hide');
    }

}

function validateCoverageAddMan() {

    $('#coverage-add-man-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#coverage-add-man-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });

    result = true;



    if ($('#coverage-man-name').val() == '') {
        var msg = 'Please provide a name';
        errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter('#coverage-man-name');
        $('#coverage-man-name').addClass('radioError');
        result = false;
    }

    var formerValidate = true;
    if ($('#coverage-man-from').val() == '') {
        var msg = 'Please provide a date';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-man-from').parent());
        $('#coverage-man-from').addClass('radioError');
        formerValidate = false;
        result = false;
    } else if (parseInt($('#coverage-man-from').val()) > new Date().getFullYear() || parseInt($('#coverage-man-from').val()) < 1980 || !yearRegTest.test($('#coverage-man-from').val())) {
        var msg = 'Please select a year between 1980 and ' + new Date().getFullYear();
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-man-from').parent());

        $('#coverage-man-from').addClass('radioError');
        formerValidate = false;
        result = false;
    }

    if ($('#coverage-man-to').val() == '') {
        if (formerValidate) {
            var msg = 'Please provide a date';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#coverage-man-from').parent());
        }

        $('#coverage-man-to').addClass('radioError');
        result = false;
    } else if (parseInt($('#coverage-man-to').val()) > new Date().getFullYear() || parseInt($('#coverage-man-to').val()) < 1980 || !yearRegTest.test($('#coverage-man-to').val())) {
        if(formerValidate) {
            var msg =  'Please select a year between 1980 and ' + new Date().getFullYear();
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#coverage-man-to').parent());
        }

        $('#coverage-man-to').addClass('radioError');
        result = false;
    }


    if($('#coverage-man-services').val() == '') {
        var msg = 'Please provide the services provided';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-man-services'));

        $('#coverage-man-services').addClass('radioError');

        result = false;
    }


    return result;

}

function removeManRow(el) {


    $(el).parent().parent().remove();
    var rowCtr = getNumberOfRowsFromTable($('.coverage-man-info .table'));

    if(rowCtr == 0) {
        $('#coverage-man-firm-table-headers').hide();
    }

    if (rowCtr < 5)
        $('#coverage-man-firm-modal-toggle').attr('disabled', false);
}

function editManRow(el) {
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

function savedEditedManRow() {
    if(validateCoverageAddMan()) {
        var rowId = $('#coverage-man-row-id-ref').val();

        var row = $('.coverage-man-info .table tr[id="' + rowId + '"]');

        row.find('td[class="coverage-man-row-name"]').text($('#coverage-man-name').val());
        row.find('td[class="coverage-man-row-yio"]').text($('#coverage-man-from').val() + " To " + $('#coverage-man-to').val());
        row.find('td[class="coverage-man-row-services"]').text($('#coverage-man-services').val());

        $('#coverage-add-man-modal').modal('hide');
    }


}

/* --------------------------------------------------------- QUESTION 10 --------------------------------------------------------------------------------- */

$(document).ready(function () {
    
    $('#coverage-insure-counsel-modal-toggle').click(function(){
        $('#coverage-add-counsel-modal .radioError').each(function () {
            $(this).removeClass('radioError');
            $('#coverage-add-counsel-modal .errorMessage').each(function () {
                $(this).remove();
            });
        });

        $('#coverage-add-counsel-modal input').val("");

        $('#coverage-add-counsel-modal').modal('show');
        $('#coverage-counsel-add-to-list-btn').show();
        $('#coverage-counsel-save-changes-btn').hide();
    });

    $('#coverage-counsel-add-to-list-btn').click(function(){
       addCoverageCounselToList();
    });

    $('#coverage-counsel-save-changes-btn').click(function(){
        saveEditedCounselRow();
    });
});

function addCoverageCounselToList() {
    if(validateCoverageAddCounsel()) {

        var nextId = getNextId($('.coverage-counsel-info table'));
        var lso = $('#coverage-counsel-lso').val();
        var name = $('#coverage-counsel-name').val();

        var newRow = '<tr id="' + nextId + '"><td class="coverage-counsel-row-lso">' + lso + '</td><td class="coverage-counsel-row-name">' + name
            + '</td><td class="review-edit-remove"><i class=\"table-row-edit coverage-counsel-edit-row fa fa-edit\"></i></td><td class="review-edit-remove"><i class=\"table-row-delete coverage-counsel-delete-row fa fa-trash\"></td></tr>';

        $('.coverage-counsel-info .table').append(newRow);

        $('.coverage-counsel-info .table tr[id="' + nextId + '"] .coverage-counsel-edit-row').click(function () {
            editCounselRow(this);
        });

        $('.coverage-counsel-info .table tr[id="' + nextId + '"] .coverage-counsel-delete-row').click(function () {
            removeCounselRow(this);
        });

        if(nextId > 0) {
            $('#coverage-insure-counsel-table-header').show();
        }

        if(nextId >= 10) {
            $('#coverage-insure-counsel-modal-toggle').attr('disabled', true);
        }

        $('#coverage-add-counsel-modal').modal('hide');



    }

}

function validateCoverageAddCounsel(){

    $('#coverage-add-counsel-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#coverage-add-counsel-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });

    var result = true;

    if($('#coverage-counsel-name').val() == '') {
        var msg = 'Please provide a name';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#coverage-counsel-name'));
        $('#coverage-counsel-name').addClass('radioError');

        result = false;
    }

    return result;
}

function editCounselRow(el){
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

function removeCounselRow(el){
    $(el).parent().parent().remove();

    var rowCtr = getNumberOfRowsFromTable($('.coverage-counsel-info .table'));

    if(rowCtr == 0) {
        $('#coverage-insure-counsel-table-header').hide();
    }

    if(rowCtr < 10) {
        $('#coverage-insure-counsel-modal-toggle').attr('disabled', false);
    }
}

function saveEditedCounselRow() {


    if(validateCoverageAddCounsel()) {

        var rowId = $('#coverage-counsel-row-id-ref').val();

        var row = $('.coverage-counsel-info .table tr[id="' + rowId + '"]');

        row.find('td[class="coverage-counsel-row-lso"]').text($('#coverage-counsel-lso').val());
        row.find('td[class="coverage-counsel-row-name"]').text($('#coverage-counsel-name').val());

        $('#coverage-add-counsel-modal').modal('hide');

    }
}

$(document).ready(function(){
   $('#coverage-buy-up-sig').click(function(){
      if($(this).children('input').is(':checked')) {
          $(this).children('input').val(true);
      } else {
          $(this).children('input').val(false);
      }
   });

   $('#DateofPolicy').change(function(){


       if(isValidDate($(this).val())) {
           var effectiveDate = moment($(this).val());
           var today = moment();

           var diff = effectiveDate.diff(today, 'days');

           if (parseInt(diff) < 60) {
                $('#effective-date-smart-container').show();
           } else {
               $('#effective-date-smart-container').hide();
           }
       } else {
           $('#effective-date-smart-container').hide();
       }





   });


});

function getNumberOfRowsFromTable(table) {
    return parseInt($(table).find('tr:not(:has(th))').length);
}

function getNextId(el) {
    var highest = 0;

    $.each($(el).find('tr:not(:has(th))'), function(index, value) {
        console.log($(value).attr('id'));
       if(parseInt($(value).attr('id')) > highest)
           highest = parseInt($(value).attr('id'));
    });

    return highest + 1;
}

function isValidDate(date) {
    return moment(date, ['MMM DD, YYYY', "MM/DD/YYYY", "M/DD/YYYY", "MMMM DD, YYYY", "MMMM D, YYYY", "MMM D, YYYY", "MM-DD-YYYY", "MM-D-YYYY", "MM/D/YYYY", "M-DD-YYYY", "M-D-YYYY", "M/D/YYYY",
        "M.DD.YYY", "MM.DD.YYYY", "M.D.YYYY", "MM.D.YYYY"], true).format() !== 'Invalid date';
}
