export function leftPadNum(number, target): string{
    var output = number + '';
    while (output.length < target) {
        output = '0' + output;
    }
    return output;
}

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

export function getBaseUrl(): any{
    return window.location.origin+'/'+getAppCfg().CONTEXT_ROOT;
}

export function formatDate(dateObj,format)
{
    if(dateObj != null){
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var curr_date = dateObj.getDate();
        var curr_month = dateObj.getMonth();
        curr_month = curr_month + 1;
        var curr_year = dateObj.getFullYear();
        var curr_min = dateObj.getMinutes();
        var curr_hr= dateObj.getHours();
        var curr_sc= dateObj.getSeconds();
        if(curr_month.toString().length == 1)
        curr_month = '0' + curr_month;      
        if(curr_date.toString().length == 1)
        curr_date = '0' + curr_date;
        if(curr_hr.toString().length == 1)
        curr_hr = '0' + curr_hr;
        if(curr_min.toString().length == 1)
        curr_min = '0' + curr_min;

        if(format == "dd-mm-yyyy"){
            return curr_date + "-"+curr_month+ "-"+curr_year;       
        }
        else if(format == "yyyy-mm-dd"){
            return curr_year + "-"+curr_month+ "-"+curr_date;       
        }
        else if(format == "dd/mm/yyyy"){
            return curr_date + "/"+curr_month+ "/"+curr_year;       
        }
        else if(format == "MM/dd/yyyy HH:mm:ss"){
            return curr_month+"/"+curr_date +"/"+curr_year+ " "+curr_hr+":"+curr_min+":"+curr_sc;       
        }
        else if(format == "yyyymmddhhmmss" ){ 
            return (new Date(Date.now()-(dateObj).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace(/[^0-9]/g, "");
        }
    }else{
        return null;
    }
}

export function parseStringToDate(dateString: string): Date {
	if (dateString) {
		return new Date(dateString);
	} else {
		return null;
	}
}