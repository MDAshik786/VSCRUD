const currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();

if (day < 10) day = `0${day}`;
if (month < 10) month = `0${month}`;

export const currentDate1 = `${year}-${month}-${day}`;