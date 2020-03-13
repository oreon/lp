function hidePaymentAuth(value)
{
    $('#Instalment_Option').val(value);
    $('#creditAuth').hide();
    $('#bankingAuth').hide();
    $('#paymentAuth').hide();
    $('#paymentAuthorization').hide();
}

function showBankingAuth(value)
{
    $('#Instalment_Option').val(value);
    $('#creditAuth').hide();
    $('#bankingAuth').show();
    $('#paymentAuth').show();
    $('#paymentAuthorization').show();
}

function showCreditAuth(value)
{
    $('#Instalment_Option').val(value);
    $('#creditAuth').show();
    $('#paymentAuthorization').show();
    $('#bankingAuth').hide();
    $('#paymentAuth').hide();
}

$(document).ready(function(){
   $('#payment-ppa-sig').click(function(){
       if($(this).children('input').is(':checked')) {
           $(this).children('input').val(true);
       } else {
           $(this).children('input').val(false);
       }
   });

   $('#authorization-sig').click(function(){
      if($(this).children('input').is(':checked')) {
          $(this).children('input').val(true);
      } else {
          $(this).children('input').val(false);
      }
   });

   $('#BankingInstitution').change(function(){
      $('#bankingInstitution2').val($(this).find(':selected').val());
   });

   $('input[name="thirdPartyPayor"]').change(function(){
       if($(this).val() == 'true') {
           $('.third-party-blurb').show();
       } else {
           $('.third-party-blurb').hide();
       }
   })
});