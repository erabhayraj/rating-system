var btn = document.getElementById("clickme");
save("null");
printStar(avgRating(0));
var words = ["good", "excellent", "osm", "nice", "best", "poor", "useless", "wastage", "bad"]
var degree = {
    "good": 3.5,
    "excellent": 5.0,
    "osm": 4.5,
    "nice": 4.0,
    "best": 5.0,
    "poor": 2.0,
    "useless": 1.0,
    "wastage": 0.5,
    "bad": 2.5
};

function calculate(mystr) {
    var sum = 0;
    var count = 0;
    words.forEach(element => {
        if (mystr.value.includes(element)) {
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
        newLine.innerHTML = element;
        var commentSection = document.getElementById("prevcomments");
        commentSection.prepend(newLine);
        var separator = document.createElement("hr");
        newLine.append(separator);
    });
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
    prev.push(mystr.value);
    print(prev);
    prev = JSON.stringify(prev);
    localStorage.setItem("comments", prev);
}
btn.addEventListener("click", function () {
    var mystr = document.getElementById("newcomment");
    calculate(mystr);
    mystr.value = "";
})

