function reverseStr(str){
    let listOfChars = str.split('');
    let reverseListOfChars = listOfChars.reverse();
    let reverseStr = reverseListOfChars.join('');

    return reverseStr;   
}

function isPalindrome(str){
    let reverse = reverseStr(str);

    return str === reverse;
}

function convertDateToStr(date){
    let dateStr = { day : '',month : '',year : ''};

    if(date.day<10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month<10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date){
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return[ddmmyyyy , mmddyyyy , yyyymmdd ,ddmmyy, mmddyy,yymmdd ];
}

function checkPalindromeForAllDateformats(date){
    let listOfPalindrome = getAllDateFormats(date);

    let flag = false;

    for(let i=0;i<listOfPalindrome.length;i++){
        if(isPalindrome(listOfPalindrome[i])){
            flag = true;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return true;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}
function getNextDate(date){
    let day = date.day +1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }
            else{
                if(day > 28){
                    day =1;
                    month++;
                }
            }
        }
    
    else{
        if(day > daysInMonth[month -1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++; 
    }
    return{
        day:day,
        month:month,
        year:year
    };
}

function getNextPalindromeDate(date){
    let ctr = 0;
    let nextDate = getNextDate(date);

    while(1){
        ctr++;
        let isPalindrome = checkPalindromeForAllDateformats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr , nextDate];
}

function getPreviousDate(date){
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    
    if(day === 0){
        month--;
    
    if(month === 0){
        day = 31;
        month = 12;
        year--;
    }
    else if(month === 2){
        if(isLeapYear(year)){
                day = 29;
            }
            else{
                day = 28;
            }
        }
    else{
        day = daysInMonth[month-1];
    }
}
    return{
        day:day,
        month:month,
        year:year
    }
}

function getPreviousPalindromeDate(date){
    let ctr = 0;
    let previousDate = getPreviousDate(date);

    while(1){
        ctr++;
        let isPalindrome = checkPalindromeForAllDateformats(previousDate);
        if(isPalindrome){
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [ctr , previousDate];
}

let dateInp = document.querySelector('#date-inp');
let checkBtn = document.querySelector('#check-btn');
let showResult = document.querySelector('#show-result');


function clickHandler(){
    let bdayStr = dateInp.value;
    
    if(bdayStr !== ''){
        let listOfDate = bdayStr.split('-');
        let date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        }
        
        let isPalindrome = checkPalindromeForAllDateformats(date);

        if(isPalindrome){
            showResult.innerText = ' Yay ! Your Birhday is Palindrome';
        }
        else{
            let [ctr1,nextDate] = getNextPalindromeDate(date);
            let [ctr2,previousDate] = getPreviousPalindromeDate(date);

            if(ctr1<ctr2){
                showResult.innerText = `The Nearest Palindrome Date is ${nextDate.day}-${nextDate.month}-${nextDate.year} You Missed By ${ctr1} days`;
            }
            else{
                showResult.innerText = `The Nearest Palindrome Date is ${previousDate.day}-${previousDate.month}-${previousDate.year} You Missed By ${ctr2} days`;  
            }
        }
        
    }
}

checkBtn.addEventListener('click',clickHandler);