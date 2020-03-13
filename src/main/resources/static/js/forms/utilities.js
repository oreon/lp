$(document).ready(function(){

    $('.yes-no-toggle').click(function(){
        $(this).children('input').prop('checked', true);
    });

    $('.yn-toggle').click(function(){
        $(this).children('input').prop('checked', true);
    });

    $('#DateofPolicy').datepicker({
            format : 'M dd, yyyy',
            startDate: startOfPreviousYear(),
            endDate: endOfRenewalYear(),
            forceParse : false
    });







});