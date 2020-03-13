$(document).ready(function(){

    $('#firm-assoc-modal-toggle').click(function(){
        $('#firm-assoc-add-btn').show();
        $('#firm-assoc-save-edit-btn').hide();

        $('#firm-assoc-add-modal .radioError').each(function () {
            $(this).removeClass('radioError');
            $('#firm-assoc-add-modal .errorMessage').each(function () {
                $(this).remove();
            });
        });

        $('#firm-assoc-name').val("");
        $('#firm-assoc-address').val("");
        $('#firm-assoc-num-lawyers').val("");
        $('#related-firm-nop').val("");
        $('#firm-assoc-add-modal').modal('show');

    });

    $('#attach-your-letterhead-btn').click(function(){
       $('#your-firm-letterhead').modal('show');
    });

    $('#firm-assoc-add-btn').click(function(){
        addFirmRefer();
    });

    function addFirmRefer() {

        if(validateRelatedFirmForm()){
            var firmName = $('#firm-assoc-name').val();
            var firmAddress = $('#firm-assoc-address').val();
            var firmNop = $('#related-firm-nop option:selected').val();
            var firmNumLawyers = $('#firm-assoc-num-lawyers').val();
            var firmNopText = $('#related-firm-nop').find('option[value="' + firmNop + '"]').text();
            var nextId = getNextId($('.firm-assoc-other-info .table'));


            var tableRow = "<tr id='" + nextId + "'><td class='firm-refer-row-name'>" + firmName + "</td><td class='firm-refer-row-address'>" + firmAddress + "</td><td class='firm-refer-row-num-lawyers'>" + firmNumLawyers + "</td>" +
                "<td class='firm-refer-row-nop'><span style='display: none' class='firm-refer-row-nop-val'>" + firmNop + "</span>" + firmNopText
                + "</td><td class='review-edit-remove'><i class=\"table-row-edit firm-assoc-edit-row fa fa-edit\"></i></td><td class='review-edit-remove'><i class=\"table-row-delete firm-assoc-remove-row fa fa-trash\"></i></td></tr>";

            $('.firm-assoc-other-info .table').append(tableRow);

            if(getNumberOfRowsFromTable($('.firm-assoc-other-info .table')) < 2) {
                $('#firm-assoc-table-header').show();
            }

            if (getNumberOfRowsFromTable($('.firm-assoc-other-info .table')) >= 5)
                $('#firm-assoc-modal-toggle').attr("disabled", true);

            $('#firm-assoc-add-modal').modal('hide');

            $('.firm-assoc-edit-row').click(function(){
                editFirmAssocRow(this);
            });

            $('.firm-assoc-remove-row').click(function(){
                removeFirmAssocRow(this);
            });


        }

    }

    function validateRelatedFirmForm(){
        $('#firm-assoc-add-modal .radioError').each(function () {
            $(this).removeClass('radioError');
            $('#firm-assoc-add-modal .errorMessage').each(function () {
                $(this).remove();
            });
        });


        var validated = true;

        if($('#firm-assoc-name').val() == ""){
            $('#firm-assoc-name').addClass('radioError');
            var msg = 'Please provide a firm name';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#firm-assoc-name'));
            validated = false;
        }

        if($('#firm-assoc-address').val() == ""){
            $('#firm-assoc-address').addClass('radioError');
            var msg = 'Please provide an address';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#firm-assoc-address'));
            validated = false;
        }

        if($('#firm-assoc-num-lawyers').val() == ""){
            $('#firm-assoc-num-lawyers').parent().addClass('radioError');
            var msg = 'Please provide the number of lawyers';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.setAttribute("style", "width:250px;");
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#firm-assoc-num-lawyers').parent());
            validated = false;
        } else if (parseInt($('#firm-assoc-num-lawyers').val()) < 1) {
            $('#firm-assoc-num-lawyers').parent().addClass('radioError');
            var msg = 'Number of lawyers must be more than 0';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.setAttribute("style", "width:250px;");
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#firm-assoc-num-lawyers').parent());
            validated = false;
        }

        if ($('#related-firm-nop option:selected').val() == "" || $('#related-firm-nop option:selected').val() == null){

            $('#related-firm-nop').addClass('radioError');
            var msg = 'Please provide the nature of practice';
            var errorElement = document.createElement('div');
            errorElement.setAttribute('class', 'errorMessage');
            errorElement.appendChild(document.createTextNode(msg));
            $(errorElement).insertAfter($('#related-firm-nop'));
            validated = false;
        }

        return validated;

    }

    $('#firm-assoc-save-edit-btn').click(function(){
        saveEditedFirmAssocRow()
    });

    function saveEditedFirmAssocRow(){
        var rowId = $('#firm-assoc-row-id-ref').val();

        if(validateRelatedFirmForm()) {
            var row = $(".firm-assoc-other-info .table tr[id='" + rowId +"']");

            row.find("td[class='firm-refer-row-name']").text($('#firm-assoc-name').val());
            row.find("td[class='firm-refer-row-address']").text($('#firm-assoc-address').val());
            row.find("td[class='firm-refer-row-num-lawyers']").text($('#firm-assoc-num-lawyers').val());
            var nopRow = "<span style='display: none' class='firm-refer-row-nop-val'>" + $('#related-firm-nop option:selected').val() + "</span>" + $('#related-firm-nop option:selected').text();
            row.find("td[class='firm-refer-row-nop']").html(nopRow);
            $('#firm-assoc-add-modal').modal('hide');
        }
    }

    function editFirmAssocRow(el) {

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
        $('#related-firm-nop').val(row.find("td[class='firm-refer-row-nop'] span").text());
    }

    function removeFirmAssocRow(el) {

        var rowCtr = getNumberOfRowsFromTable($('.firm-assoc-other-info .table'));

        if(rowCtr == 0) {
            $('#firm-assoc-table-header').hide();
        }

        if(rowCtr < 5)
            $('#firm-assoc-modal-toggle').attr('disabled', false);

        $(el).parent().parent().remove();
    }
});

function loadFirmInformationLawyer() {
    var lso = $('#UserName').val();

    $.ajax({
        url : "/forms/excessform/firmDetailsLawyer",
        type : "get",
        dataType : "json",
        data : {"lso" : lso},
        success : function(result) {

            var firm = result.firm;
            var contacts = firm.contacts;
            var phoneNumber = "";
            var faxNumber = "";
            $.each(contacts, function(index, value){
                if(value.contactType == "PHONE") {
                    phoneNumber = value.value;

                }

                if(value.contactType == "FAX") {
                    faxNumber = value.value;

                }
            });
            $('#excess-firm-details-number').text("A" + result.firm.firmNumber);
            $('#excess-firm-details-name').text(result.firm.name);
            $('#excess-firm-date').text((result.firm.effectiveDate == '' ? "" : "Effective Date: " + result.firm.effectiveDate));
            var addressJson = result.firm.address;
            $('#excess-firm-details-address1').text(addressJson.line1);
            $('#excess-firm-details-address2').text(addressJson.line2);
            $('#excess-firm-details-address3').text(addressJson.line3);
            $('#excess-firm-details-city').text(addressJson.city + ", " + addressJson.province + " " + addressJson.postalCode);
            $('#excess-firm-details-phone').text(phoneNumber);
            $('#excess-firm-details-fax').text(faxNumber);

            $('.excess-firm-details-lawyer').show();

        },
        error : function(err) {
            console.log(err);

            return null;
        }

    });

}

function loadFirmInformationFirm() {

    var firmId = $('#UserName').val();

    $.ajax({
        url : "/forms/excessform/firmDetailsFirm",
        type : "get",
        dataType : "json",
        data : {"firmId" : firmId},
        success : function(result) {
            console.log(result);
            var firm = result.firm;
            var contacts = firm.contacts;
            var phoneNumber = "";
            var faxNumber = "";
            $.each(contacts, function(index, value){
                if(value.contactType == "PHONE")
                    phoneNumber = value.value;

                if(value.contactType == "FAX")
                    faxNumber = value.value;
            });

                $('#excess-firm-details-number').text(result.firm.firmNumber);
                $('#excess-firm-details-name').text(result.firm.name);
                var addressJson = result.firm.address;
                $('#excess-firm-details-address1').text(addressJson.line1);
                $('#excess-firm-details-address2').text(addressJson.line2);
                $('#excess-firm-details-address3').text(addressJson.line3);
                $('#excess-firm-details-city').text(addressJson.city + ", " + addressJson.province + " " + addressJson.postalCode);
                $('#excess-firm-details-phone').text(phoneNumber);
                $('#excess-firm-details-fax').text(faxNumber);

                $('.excess-firm-details-lawyer').show();
        },
        error : function(err) {
            console.log(err);
            return null;
        }

    });
}

$(document).ready(function(){

    var userType = $('#user-type').val();

    if(userType == 'Lawyer') {
        loadFirmInformationLawyer();
    } else if (userType == 'Firm') {
        loadFirmInformationFirm();
    }






});


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

$(document).ready(function(){
   $('.applicant-letterhead-with-view').change(function(){

      if($(this).val() == '') {
          $(this).parent().parent().find('td[class="applicant-letterhead-delete-td"] > i').hide();
      } else {
          var fileSize = this.files[0].size;
          if(parseInt(fileSize) > 1500000) {
             $(this).parent().parent().find('td[class="applicant-letterhead-warning-td"] > a').show();
          } else {
              $(this).parent().parent().find('td[class="applicant-letterhead-warning-td"] > a').hide();
          }
          $(this).parent().parent().find('td[class="applicant-letterhead-delete-td"] > i').show();
      }
   });


   $('.related-letterhead-with-view').change(function(){
      if ($(this).val() == '') {
          $(this).parent().parent().find('td[class="related-letterhead-delete-td"] > i').hide();
      } else {
          var fileSize = this.files[0].size;
          if(parseInt(fileSize) > 1500000) {
              $(this).parent().parent().find('td[class="related-letterhead-warning-td"] > a').show();
          } else {
              $(this).parent().parent().find('td[class="related-letterhead-warning-td"] > a').hide();
          }
          $(this).parent().parent().find('td[class="related-letterhead-delete-td"] > i').show();
      }
   });

    $('.man-company-letterhead-with-view').change(function(){
        if ($(this).val() == '') {
            $(this).parent().parent().find('td[class="man-company-letterhead-delete-td"] > i').hide();
        } else {
            var fileSize = this.files[0].size;
            if(parseInt(fileSize) > 1500000) {
                $(this).parent().parent().find('td[class="man-company-letterhead-warning-td"] > a').show();
            } else {
                $(this).parent().parent().find('td[class="man-company-letterhead-warning-td"] > a').hide();
            }
            $(this).parent().parent().find('td[class="man-company-letterhead-delete-td"] > i').show();
        }
    });




});

function removeApplicantLetterhead(row, el) {
    $(el).parent().parent().find('input[class="applicant-letterhead-with-view"]').val("");
    $(el).parent().parent().find('td[class="applicant-letterhead-warning-td"] > a').hide();
    $(el).hide();
    $('#applicant-letterheads-list-' + row).text("");
    $('#applicant-letterheads-list-' + row).hide();
}

function removeRelatedLetterhead(row, el) {
    $(el).parent().parent().find('input[class="related-letterhead-with-view"]').val("");
    $(el).parent().parent().find('td[class="related-letterhead-warning-td"] > a').hide();
    $(el).hide();
    $('#applicant-former-firm-letterheads-list-' + row).text("");
    $('#applicant-former-firm-letterheads-list-' + row).hide();
}

function removeManCompanyLetterhead(row, el) {
    $(el).parent().parent().find('input[class="man-company-letterhead-with-view"]').val("");
    $(el).parent().parent().find('td[class="man-company-letterhead-warning-td"] > a').hide();
    $(el).hide();
    $('#man-company-letterheads-list-' + row).text("");
    $('#man-company-letterheads-list-' + row).hide();
}