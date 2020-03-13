$(document).ready(function(){

    $('input:radio[name="coverageFormerFirm"]').change(function() {
        if($(this).val() == 'true') {
            $('.coverage-former-firm-info').show();
        } else {
            $('.coverage-former-firm-info').hide();
        }
    });

    $('input:radio[name="coverageRequestManCompany"]').change(function(){
        if($(this).val() == 'true') {
            $('.coverage-man-info').show();
        } else {
            $('.coverage-man-info').hide();
        }
    });

    $('input:radio[name="coverageInsureCounsel"]').change(function(){
        if($(this).val() == 'true') {
            $('.coverage-counsel-info').show();
        } else {
            $('.coverage-counsel-info').hide();
        }
    });

    $('input:radio[name="coverageBuyUp"]').change(function(){
        if($(this).val() == 'true') {
            $('.coverage-buyup-info').hide();
        } else {
            $('.coverage-buyup-info').show();
        }
    });

    $('#coverage-buy-up-sig').click(function(){
      $('#coverage-buy-up-dec').trigger('click');
    });

    $('#dateofpolicycal').click(function(){
        $('#DateofPolicy').datepicker('show');

    });

});