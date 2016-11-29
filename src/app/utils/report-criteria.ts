function isEmpty(s){   
    return ((s == null) || (s.length == 0))
}

 // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
export function isValidDate(dateString)
{
    var regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return !regex.test(dateString);
};

export function validate(inputElement): boolean{
    var validateResult = this.validateDate(inputElement);

    return validateResult;
}

export function warnInvalid(element, message: string): boolean{
    alert(message);
    element.focus();
    return false;
}    
    
export function validateDate(inputElement): boolean{

    var dateType = (<HTMLInputElement>inputElement.elements['dateType']).value; 

    if(dateType == "R"){
        return this.validateRunMonth(inputElement);
    }
    else if(dateType == "F"){
        return this.validateFinalMailDate(inputElement);
    }
}

export function validateFinalMailDate(inputElement){
    var fromDtElement = (<HTMLInputElement>inputElement.elements['fromDt']);
    var toDtElement = (<HTMLInputElement>inputElement.elements['toDt']);

    if( fromDtElement.value.length == 0 ) 
    {
        return this.warnInvalid(fromDtElement, "Please enter a final mail date.");
    }
    if( toDtElement.value.length == 0  ) 
    {
        return this.warnInvalid(toDtElement, "Please enter a final mail date.");
    }
    if(isValidDate(fromDtElement.value)){
        return this.warnInvalid(fromDtElement, "The date format at \"From:\" should be \"MM/DD/YYYY\".");
    }
    if(isValidDate(toDtElement.value)){
        return this.warnInvalid(toDtElement, "The date format at \"To:\" should be \"MM/DD/YYYY\".");
    }
    
    return true;
}

export function validateRunMonth(inputElement): boolean{

    var runMonthObj = (<HTMLSelectElement>inputElement.elements['runMonthSelect']);
    var runYearObj = (<HTMLSelectElement>inputElement.elements['runYearSelect']);

    if ( !this.validateSelectedRunMonth( inputElement, runMonthObj, runYearObj ) ){
        return false;
    }
    return true;

}

export function validateSelectedRunMonth( inputForm, runMonthObj, runYearObj ): boolean{

    var selectedRunMonth = runMonthObj.options[runMonthObj.selectedIndex].value;
    var selectedRunYear = runYearObj.options[runYearObj.selectedIndex].value;
    var selectedRunMonthYear = selectedRunMonth + '/' + selectedRunYear;
        
    if ( !this.validateRunMonthFormat( selectedRunMonthYear ) ){
        return this.warnInvalid ( runMonthObj, "Please enter a valid run month and run year.");
    }
        
    // Check 13 months.
    if ( !this.validateSearchBackTo13Months( inputForm, runMonthObj, runYearObj ) ){ 
        return this.warnInvalid ( runMonthObj, "RUN MONTH cannot be more than 13 months in the past");
    }
    var today = new Date();	
    if ( ( today.getFullYear() < selectedRunYear )
            || ( ( today.getFullYear() == selectedRunYear ) && ( ( today.getMonth() + 1 ) < selectedRunMonth ) ) ) {
        return this.warnInvalid ( runMonthObj, "Run Month cannot be in the future.");
    }
    return true;
}

// validates string run dates in format "MM/YYYY"
export function validateRunMonthFormat( s ){
    if (isEmpty(s) || s.length != 7)
        return false;
    else if (s.substring(2,3) != "/")
        return false;
    else{
        var varMon = s.substring(0,2);
        var varYr = s.substring(3,7);

        if ( !isInteger(varMon) || !isInteger(varYr) )
            return false;
        else
            return isIntegerInRange (varMon, 1, 12);
    }

}

export function validateSearchBackTo13Months( inputForm, runMonthObj, runYearObj ){
    var month13 = new Date();
    month13.setMonth( ( month13.getMonth() + 1 ) - 13 );
    var limitedMonth = month13.getMonth();
    var limitedYear = month13.getFullYear();
        
    var selectedFromMonth = runMonthObj.options[runMonthObj.selectedIndex].value;
    var selectedFromYear = runYearObj.options[runYearObj.selectedIndex].value;

    if ( ( limitedYear > selectedFromYear ) 
            || ( ( limitedYear == selectedFromYear ) && ( limitedMonth > selectedFromMonth ) ) ){
        return false;
    }

    return true;
}
function isDigit (c){   
    return ((c >= "0") && (c <= "9"))
}

function isInteger (s){   
    var i;
    if (isEmpty(s)) 
       return false;

    // Search through string's characters one by one
    // until we find a non-numeric character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (!isDigit(c)) return false;
    }

    // All characters are numbers.
    return true;
}

// isIntegerInRange (STRING s, INTEGER a, INTEGER b [, BOOLEAN emptyOK])
// 
// isIntegerInRange returns true if string s is an integer 
// within the range of integer arguments a and b, inclusive.
// 
// For explanation of optional argument emptyOK,
// see comments of function isInteger.


function isIntegerInRange (s, a, b){   
    if (isEmpty(s)) 
        return false;

    // Catch non-integer strings to avoid creating a NaN below,
    // which isn't available on JavaScript 1.0 for Windows.
    if (!isInteger(s)) return false;

    // Now, explicitly change the type to integer via parseInt
    // so that the comparison code below will work both on 
    // JavaScript 1.2 (which typechecks in equality comparisons)
    // and JavaScript 1.1 and before (which doesn't).
    var num = parseInt (s, 10);
    return ((num >= a) && (num <= b));
}