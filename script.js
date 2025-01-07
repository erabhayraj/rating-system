var btn = document.getElementById("clickme");
save("null");
printStar(avgRating(0));
var words = [
    "good",
    "excellent",
    "osm",
    "nice",
    "best",
    "poor",
    "useless",
    "wastage",
    "bad",
    "pleasant",
    "decent",
    "satisfactory",
    "fine",
    "worthwhile",
    "enjoyable",
    "acceptable",
    "favorable",
    "great",
    "impressive",
    "delightful",
    "pleasing",
    "commendable",
    "amazing",
    "outstanding",
    "superb",
    "exceptional",
    "perfect",
    "incredible",
    "phenomenal",
    "extraordinary",
    "flawless",
    "mediocre",
    "unremarkable",
    "unimpressive",
    "underwhelming",
    "disappointing",
    "unsatisfactory",
    "inadequate",
    "lacking",
    "subpar",
    "bad",
    "unpleasant",
    "deficient",
    "dismal",
    "inferior",
    "terrible",
    "awful",
    "horrible",
    "atrocious",
    "appalling",
    "abysmal",
    "disastrous",
    "horrendous",
    "unbearable",
    "catastrophic",
    "fantastic",
    "wonderful",
    "inspiring",
    "superior",
    "remarkable",
    "unbelievable",
    "fabulous",
    "extraordinary",
    "insufficient",
    "lackluster",
    "substandard",
    "unacceptable",
    "unimpressive",
    "regrettable",
    "lamentable",
    "deficient",
    "suboptimal",
    "weak"
];
var degree = {
    "good": 3.5,
    "excellent": 5.0,
    "osm": 4.5,
    "nice": 4.0,
    "best": 5.0,
    "poor": 2.0,
    "useless": 1.0,
    "wastage": 0.5,
    "bad": 2.5,
    "pleasant": 3.0,
    "decent": 3.0,
    "satisfactory": 3.0,
    "fine": 3.0,
    "worthwhile": 3.5,
    "enjoyable": 4.0,
    "acceptable": 3.0,
    "favorable": 3.5,
    "great": 4.0,
    "impressive": 4.0,
    "delightful": 4.0,
    "pleasing": 4.0,
    "commendable": 4.0,
    "amazing": 4.5,
    "outstanding": 4.5,
    "superb": 4.5,
    "exceptional": 4.5,
    "perfect": 5.0,
    "incredible": 5.0,
    "phenomenal": 5.0,
    "extraordinary": 5.0,
    "flawless": 5.0,
    "mediocre": 2.0,
    "unremarkable": 2.0,
    "unimpressive": 2.0,
    "underwhelming": 2.0,
    "disappointing": 2.5,
    "unsatisfactory": 2.5,
    "inadequate": 2.5,
    "lacking": 2.5,
    "subpar": 2.5,
    "bad": 2.5,
    "unpleasant": 2.5,
    "deficient": 2.5,
    "dismal": 3.0,
    "inferior": 3.0,
    "terrible": 3.5,
    "awful": 3.5,
    "horrible": 3.5,
    "atrocious": 3.5,
    "appalling": 3.5,
    "abysmal": 4.0,
    "disastrous": 4.0,
    "horrendous": 4.0,
    "unbearable": 4.5,
    "catastrophic": 5.0,
    "fantastic": 4.5,
    "wonderful": 4.5,
    "inspiring": 4.5,
    "superior": 4.0,
    "outstanding": 4.5,
    "remarkable": 4.0,
    "incredible": 5.0,
    "unbelievable": 5.0,
    "fabulous": 4.5,
    "extraordinary": 5.0,
    "mediocre": 2.0,
    "poor": 2.0,
    "insufficient": 2.5,
    "lackluster": 2.0,
    "substandard": 2.5,
    "unacceptable": 2.5,
    "unimpressive": 2.0,
    "regrettable": 2.5,
    "disappointing": 2.5,
    "lamentable": 2.5,
    "deficient": 3.0,
    "suboptimal": 2.5,
    "weak": 2.5
};

function calculate(mystr) {
    mystr=mystr.value;
    mystr = mystr.toLowerCase();
    var sum = 0;
    var count = 0;
    words.forEach(element => {
        if (mystr.includes(element)) {
            count++;
            sum = sum + Number(degree[element]);
        }
    });
    if(sum!==0)
    sum = sum / count;
    sum = avgRating(sum)
    printStar(sum);
    save(mystr);
}
function print(mystr) {
    var showlist = document.getElementById("prevcomments");
    showlist.innerHTML="";
    mystr.forEach(element => {
        var newLine = document.createElement("p");
        newLine.setAttribute("class", "lastcomment");
        element = capitalizeFirstLetter(element);
        newLine.innerHTML = element;
        var commentSection = document.getElementById("prevcomments");
        commentSection.prepend(newLine);
        var separator = document.createElement("hr");
        newLine.append(separator);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function printStar(sum) {
    sum = Math.round(sum);
    var counter = 1;
    for (counter = 1; counter <= 5; counter++) {
        var rating = document.querySelector(`#rating :nth-child(${counter + 1})`);
        var star = document.createElement("span");
        star.setAttribute("class", "fa fa-star");
        star.style.fontSize = "2em"
        if (counter <= sum)
            star.classList.add("checked");
        rating.replaceWith(star);
    }
}

function avgRating(sum) {
    var prevRecords = localStorage.getItem("Records");
    if (prevRecords === null){
        prevRecords = [];
        if(sum===0)
        return 5;
    }
    else
        prevRecords = JSON.parse(prevRecords)
    if(sum!=0)
    prevRecords.push(sum);
    var avgRate = 0;
    prevRecords.forEach(element => {
        avgRate = avgRate + element;
    });
    avgRate = avgRate / prevRecords.length;
    prevRecords = JSON.stringify(prevRecords);
    localStorage.setItem("Records", prevRecords);
    return avgRate;
}

function save(mystr){
    var prev = localStorage.getItem("comments");
    if (prev === null)
        prev = [];
    else
        prev = JSON.parse(prev);
    if(mystr!=="null")
    prev.push(mystr);
    print(prev);
    prev = JSON.stringify(prev);
    localStorage.setItem("comments", prev);
}
btn.addEventListener("click", function () {
    var mystr = document.getElementById("newcomment");
    calculate(mystr);
    mystr.value = "";
})




