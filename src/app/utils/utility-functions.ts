export function leftPadNum(number, target): string{
    var output = number + '';
    while (output.length < target) {
        output = '0' + output;
    }
    return output;
}

 // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
export function isValidDate(dateString)
{
    var regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return !regex.test(dateString);
};

export function getCookie(cname) {
    if (cname == "web_session_id" && appCfg.env.ENV == "LOCAL")
    {
        return "12345";
    }
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

declare var appCfg:any;

export function getAppCfg(): any{
    return appCfg.env;
}