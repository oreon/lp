$(document).ready(function(){

    $('input:radio[name="otherPurchasedCoverage"]').change(function() {
        if($(this).val() == 'true') {
            $('.other-purchased-coverage-info').show();
        } else {
            $('.other-purchased-coverage-info').hide();
        }
    });

    $('input:radio[name="otherPurchaseExtraCoverage"]').change(function(){
       if($(this).val() == 'true') {
           $('.other-purchase-extra-coverage-info').show();
       } else {
           $('.other-purchase-extra-coverage-info').hide();
       }
    });

    $('#related-letterhead-btn').click(function(){
        $('#related-firm-letterhead').modal('show');
    });

    $('input:radio[name="otherDenied"]').change(function(){
        if($(this).val() == 'true') {
            $('.other-denied-info').show()
        } else {
            $('.other-denied-info').hide()
        }
    });

});

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