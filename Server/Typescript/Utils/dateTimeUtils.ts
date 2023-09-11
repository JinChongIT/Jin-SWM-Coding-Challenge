"use strict";

export function ConvertToWATime(newDate: Date): string { //SELF NOTE: Why not include this implemention in article.ts? Promote reusability and promote O in SOLID
    const tmpDate = new Date(newDate); 
    let convertedTime = tmpDate.toLocaleTimeString("en-AU", { timeZone: "Australia/Perth" });

    return AmPmUpper(convertedTime); //SELF NOTE: Why not just use newDate? Because that is mutable when if you set hours
}

export function ConvertToWADate(newDate: Date): string { //SELF NOTE: Why not include this implemention in article.ts? Promote reusability and promote O in SOLID
    const tmpDate = new Date(newDate); 
    const convertedDateString = new Intl.DateTimeFormat("en-AU", {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}).format(newDate);
    return convertedDateString; //SELF NOTE: Why not just use newDate? Because that is mutable when if you set hours
}

function AmPmUpper(newTime: string): string {
    
    if (newTime.length >= 2) {
        let lastTwoCharacters = newTime.slice(-2).toUpperCase();
        newTime = newTime.slice(0, -2) + lastTwoCharacters;
    }

    return newTime;
}
