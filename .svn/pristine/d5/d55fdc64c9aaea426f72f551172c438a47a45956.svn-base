$(document).ready(function(){
     yearRegTest = /^[0-9]{4}$/;


    $('#other-purchased-coverage-toggle').click(function(){

        $('#other-purchased-coverage-modal input').val("");
        $('#other-purchased-coverage-com-name').val("");
        $('#other-purchased-coverage-other').val("");

        $('#other-purchased-coverage-modal .radioError').each(function () {
            $(this).removeClass('radioError');
            $('#other-purchased-coverage-modal .errorMessage').each(function () {
                $(this).remove();
            });
        });

        $('#other-purchased-coverage-com-name-other').hide();

        $('#other-purchased-coverage-add-to-list-btn').show();
        $('#other-purchased-coverage-save-changes-btn').hide();
        $('#other-purchased-coverage-modal').modal('show');
    });

    $('#other-purchased-coverage-add-to-list-btn').click(function(){
        addOtherPurchaseCoverage();
    });

    $('#other-purchased-coverage-save-changes-btn').click(function(){
        saveOtherPurchasedCoverageRow(this);
    });

    $('#other-purchased-coverage-com-name').change(function(){
       var selected = $(this).find(':selected').val();
       if(selected == 'OTHER') {
           $('#other-purchased-coverage-com-name-other').show();
       } else {
           $('#other-purchased-coverage-com-name-other').hide();
       }
    });

});

function addOtherPurchaseCoverage(){
    if(validateOtherPurchaseCoverageForm()) {

        var insuranceCompanyName = "";
        var insuranceCompanyVal = "";
        if ($('#other-purchased-coverage-com-name').val() == 'OTHER') {
            insuranceCompanyName = $('#other-purchased-coverage-other').val();
            insuranceCompanyVal = 'OTHER';
        } else {
            insuranceCompanyVal = $('#other-purchased-coverage-com-name').find(':selected').val();
            insuranceCompanyName = $('#other-purchased-coverage-com-name').find(':selected').text();
        }

        var millionPerClaim = $('#other-purchased-coverage-claim').val();
        var millionPerAgg = $('#other-purchased-coverage-agg').val();
        var from = $('#other-purchased-coverage-from').val();
        var to = $('#other-purchased-coverage-to').val();
        var lawFirm = $('#other-purchased-coverage-name').val();

        var nextId = getNextId($('.other-purchased-coverage-info .table'));

        var newRow = '<tr id="' + nextId  + '"><td class="other-purchased-coverage-row-name"><span class="other-purchased-coverage-row-name-val" style="display:none">' + insuranceCompanyVal + '</span><span class="other-purchased-coverage-row-name-span">' + insuranceCompanyName + '</span></td><td class="other-purchased-coverage-row-limits-claim">' + millionPerClaim + ' Million</td><td class="other-purchased-coverage-row-limits-agg">' + millionPerAgg +' Million</td>' +
            '<td class="other-purchased-coverage-row-yio">' + from + ' To ' + to + '</td><td class="other-purchased-coverage-row-lawfirm">' + lawFirm + '</td><td class="review-edit-remove"><i class=\"table-row-edit other-purchased-coverage-edit-row fa fa-edit\"></i></td>' +
            '<td class="review-edit-remove"><i class=\"table-row-delete other-purchased-coverage-delete-row fa fa-trash\"></i></td></tr>';

        $('.other-purchased-coverage-info .table').append(newRow);

        if(getNumberOfRowsFromTable($('.other-purchased-coverage-info .table')) > 0) {
            $('#other-purchased-coverage-table-header').show();
        }



        $('tr[id="' + nextId + '"] .other-purchased-coverage-edit-row').click(function(){
            editOtherPurchasedCoverageRow(this);
        });

        $('tr[id="' + nextId + '"] .other-purchased-coverage-delete-row').click(function(){
            removeOtherPurchasedCoverageRow(this);
        });

        if(getNumberOfRowsFromTable($('.other-purchased-coverage-info .table')) >= 10) {
            $('#other-purchased-coverage-toggle').attr('disabled', true);
        }

        $('#other-purchased-coverage-table-header').show();
        $('#other-purchased-coverage-modal').modal('hide');
    }
}

function validateOtherPurchaseCoverageForm(){

    $('#other-purchased-coverage-modal .radioError').each(function () {
        $(this).removeClass('radioError');
        $('#other-purchased-coverage-modal .errorMessage').each(function () {
            $(this).remove();
        });
    });

    var result = true;

    if ($('#other-purchased-coverage-com-name').find(':selected').val() == null)
    {
        var msg = 'Please select an excess insurer';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-purchased-coverage-com-name'));
        $('#other-purchased-coverage-com-name').addClass('radioError');
        result = false;
    }

    if ($('#other-purchased-coverage-com-name').find(':selected').val() == "OTHER" && $('#other-purchased-coverage-other').val() == '') {
        var msg = 'Please select an excess insurer';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-purchased-coverage-other'));
        $('#other-purchased-coverage-other').addClass('radioError');
        result = false;
    }

    if ($('#other-purchased-coverage-claim').val() == '' || parseInt($('#other-purchased-coverage-claim').val()) < 1) {
        $('#other-purchased-coverage-claim').parent().addClass('radioError');
        result = false;
    }

    if ($('#other-purchased-coverage-agg').val() == '' || parseInt($('#other-purchased-coverage-agg').val()) < 1) {
        $('#other-purchased-coverage-agg').parent().addClass('radioError');
        result = false;
    }

    var formerValidate = true;
    var toValidate = true;
    if ($('#other-purchased-coverage-from').val() == '') {
        var msg = 'Please provide a date';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-purchased-coverage-from').parent());
        $('#other-purchased-coverage-from').addClass('radioError');
        formerValidate = false;
        result = false;
    } else if (parseInt($('#other-purchased-coverage-from').val()) > moment().year() + 1 || parseInt($('#other-purchased-coverage-from').val()) < 1980 || !yearRegTest.test($('#other-purchased-coverage-from').val())) {
        var currentYear = moment().year() + 1;
        var msg = 'Please select a year between 1980 and ' + currentYear;
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-purchased-coverage-from').parent());

        $('#other-purchased-coverage-from').addClass('radioError');
        formerValidate = false;
        result = false;
    }


    if ($('#other-purchased-coverage-to').val() == '') {
        if (formerValidate) {
            var msg = 'Please provide a date';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#other-purchased-coverage-from').parent());
        }

        $('#other-purchased-coverage-to').addClass('radioError');
        toValidate = false;
        result = false;
    } else if (parseInt($('#other-purchased-coverage-to').val()) > moment().year() + 1 || parseInt($('#other-purchased-coverage-to').val()) < 1980 || !yearRegTest.test($('#other-purchased-coverage-to').val())) {
        if(formerValidate) {
            var currentYear = moment().year() + 1;
            var msg =  'Please select a year between 1980 and ' + currentYear;
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#other-purchased-coverage-to').parent());
        }

        $('#other-purchased-coverage-to').addClass('radioError');
        toValidate = false;

        result = false;
    }

    if (parseInt($('#other-purchased-coverage-from').val()) > parseInt($('#other-purchased-coverage-to').val())) {
        if (formerValidate && toValidate) {
            var errorElement = getErrorElement("Final year cannot be greater than the current year");
            errorElement.setAttribute('style', 'float:left;width:100%;margin-bottom:10px;');
            $(errorElement).insertAfter($('#other-purchased-coverage-from').parent());
        }

        $('#other-purchased-coverage-from').addClass('radioError');
        $('#other-purchased-coverage-to').addClass('radioError');
        result = false;
    }

    if($('#other-purchased-coverage-name').val() == '') {
        var msg = 'Please provide the name of the law firm';
        var errorElement = document.createElement('div');
        errorElement.setAttribute('class', 'errorMessage');
        errorElement.appendChild(document.createTextNode(msg));
        $(errorElement).insertAfter($('#other-purchased-coverage-name'));
        $('#other-purchased-coverage-name').addClass('radioError');

        result = false;
    }




    return result;
}

function editOtherPurchasedCoverageRow(el) {


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

function removeOtherPurchasedCoverageRow(el) {
    $(el).parent().parent().remove();


    var rowCtr = getNumberOfRowsFromTable($('.other-purchased-coverage-info .table'));

    if(rowCtr == 0) {
        $('#other-purchased-coverage-table-header').hide();
    }
}

function saveOtherPurchasedCoverageRow() {
    if(validateOtherPurchaseCoverageForm()) {
        var rowId = $('#other-purchased-coverage-row-id-ref').val();
        var row = $('.other-purchased-coverage-info .table tr[id="' + rowId + '"]');

        var insuranceCompanyName = "";
        var insuranceCompanyVal = "";
        if ($('#other-purchased-coverage-com-name').val() == 'OTHER') {
            insuranceCompanyName = $('#other-purchased-coverage-other').val();
            insuranceCompanyVal = 'OTHER';
        } else {
            insuranceCompanyVal = $('#other-purchased-coverage-com-name').find(':selected').val();
            insuranceCompanyName = $('#other-purchased-coverage-com-name').find(':selected').text();
        }

        row.find('span[class="other-purchased-coverage-row-name-val"]').text(insuranceCompanyVal);
        row.find('span[class="other-purchased-coverage-row-name-span"]').text(insuranceCompanyName);
        row.find('td[class="other-purchased-coverage-row-other"]').text($('#other-purchased-coverage-other').val());
        row.find('td[class="other-purchased-coverage-row-limits-claim"]').text($('#other-purchased-coverage-claim').val() + " Million");
        row.find('td[class="other-purchased-coverage-row-limits-agg"]').text($('#other-purchased-coverage-agg').val() + " Million");
        row.find('td[class="other-purchased-coverage-row-yio"]').text($('#other-purchased-coverage-from').val() + " To " + $('#other-purchased-coverage-to').val());
        row.find('td[class="other-purchased-coverage-row-lawfirm"]').text($('#other-purchased-coverage-name').val());

        $('#other-purchased-coverage-modal').modal('hide');


    }
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