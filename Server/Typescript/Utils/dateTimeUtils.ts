"use strict";

export function ConvertToWATime(newDate: Date): string { //SELF NOTE: Why not include this implemention in article.ts? Promote reusability and promote O in SOLID
    const tmpDate = new Date(newDate); //SELF NOTE: Why not just use newDate? Because that is mutable when if you set hours
    return tmpDate.toLocaleTimeString("en-AU", { timeZone: "Australia/Perth" });
}

export function ConvertToWADate(newDate: Date): string { //SELF NOTE: Why not include this implemention in article.ts? Promote reusability and promote O in SOLID
    const tmpDate = new Date(newDate); //SELF NOTE: Why not just use newDate? Because that is mutable when if you set hours
    const convertedDateString = new Intl.DateTimeFormat("en-AU", {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}).format(newDate);
    return convertedDateString;
}
