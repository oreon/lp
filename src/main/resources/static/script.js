
function hidePopup()
{
    $('.questionHelpText').hide();
}

function todayDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function startOfPreviousYear()
{
    d = new Date(new Date().getFullYear() - 1, 0 ,1);
    return d;
}

function endOfCurrentYear()
{
    d= new Date(new Date().getFullYear(), 11, 31);
    return d;
}

function endOfRenewalYear()
{
    d= new Date(new Date().getFullYear(), 11, 31);

    if (new Date().getMonth() >= 9)
    {
        d= new Date(new Date().getFullYear() + 1, 11, 31);
    }else
    {
        d= new Date(new Date().getFullYear(), 11, 31);
    }

    return d;
}

function getLawFirm(firmNumber)
{
    var firm = null;
    $.ajax({
        url: "/forms/firms/details",
        type: "get",
        async: false,
        dataType: "json",
        data: {'firmNumber': firmNumber},
        success: function (result) {
            firm = result.firm;
        },
        error: function (result) {
            firm = null;
        }
    });
    return firm;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(title, msg)
{
    Lobibox.alert(
        "warning",
        {
            msg: msg,
            modal: true,
            title: title
        }
    );

}