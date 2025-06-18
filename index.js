const moment = require("moment");

// 3)
let dateOne = moment([2019, 3, 17]);
let dateTwo = moment([2021, 6, 17]);
let result = dateTwo.diff(dateOne, "days");
console.log(result);
