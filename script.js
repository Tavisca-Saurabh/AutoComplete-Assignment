var Names = ["Ragul", "Rajpreet", "Pallvi", "Neha", "Ankita", "Raja", "Shreea", "Smriti", "Shrijeet", "Ayush", "Swapnil", "Nihit", "Bhargavi", "Anushka", "Swinal", "Utkarsh", "Saurabh", "Paarth", "Vishwas", "Mohit", "Gurbaksh", "Ashwarya"];
Names.sort();
var InputValue = document.getElementById("myInput");
var IsTrue = false,
    Focus = -1,
    Count = 0;
InputValue.addEventListener("input", AutoComplete);
InputValue.addEventListener("blur", RemoveList);
InputValue.addEventListener("focus", AutoComplete);

function AutoComplete() { //AutoComplete Search Bar
    document.addEventListener("blur", RemoveList, false);
    InputValue = document.getElementById("myInput");
    Count = 0;
    IsTrue = false;
    var val = this.value;
    if (val) {
        Focus = -1;
        document.getElementById("cross").style.visibility = "visible";
        if (!val) {
            document.getElementById("cross").style.visibility = "hidden";
        }
        RemoveList();
        outerDivElement = document.createElement("DIV");
        outerDivElement.setAttribute("id", "autocomplete-list");
        outerDivElement.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(outerDivElement);
        for (i = 0; i < Names.length; i++) {
            for (j = 0; j < Names[i].length; j++) {
                if (Names[i].substr(j, val.length).toUpperCase() == val.toUpperCase()) {
                    innerDivElement = document.createElement("DIV");
                    innerDivElement.innerHTML += Names[i].substr(0, j);
                    innerDivElement.innerHTML += "<strong>" + Names[i].substr(j, val.length) + "</strong>";
                    var LastPart = j + val.length;
                    innerDivElement.innerHTML += Names[i].substr(LastPart, Names[i].length);
                    innerDivElement.innerHTML += "<input type='hidden' value='" + Names[i] + "'>";
                    innerDivElement.addEventListener("click", function (e) {
                        InputValue.value = this.getElementsByTagName("input")[0].value;
                        RemoveList();
                    });
                    outerDivElement.appendChild(innerDivElement);
                    Count++;
                    IsTrue = true;
                    break;
                }
            }
        }
        if (!IsTrue) {
            innerDivElement = document.createElement("DIV");
            innerDivElement.innerHTML = "<strong>" + "No Data Found" + "</strong>";
            outerDivElement.appendChild(innerDivElement);
        }
        FirstActive();
    }
}
InputValue.addEventListener('keydown', function (event) {
    var key = event.keyCode;
    var x = document.getElementById("autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (key === 8) {
        RemoveList();
    } else if (key == 40) {
        if (Focus < x.length) {
            Focus++;
            addActive(x);
            document.getElementById("autocomplete-list").scrollBy(0, 39);
        }
    } else if (key == 38) {
        if (Focus != 0) {
            Focus--;
            addActive(x);
            document.getElementById("autocomplete-list").scrollBy(0, -39);
        }
    } else if (key == 13) {
        console.log("enter");
        event.preventDefault();
        if (Focus > -1) {
            if (x) x[Focus].click();
        }
    }
});

function RemoveList() {
    var CurrentList = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < CurrentList.length; i++) {
        CurrentList[i].parentNode.removeChild(CurrentList[i]);
    }
}

function FirstActive() {
    var x = document.getElementById("autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    Focus++;
    addActive(x);
}

function addActive(x) {
    if (x) {
        removeActive(x);
        if (Focus >= x.length)
            Focus--;
        if (Focus < 0) Focus = (x.length - 1);
        x[Focus].classList.add("autocomplete-active");
    }
}

function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
    }
}

function Clear() {
    InputValue.value = " ";
    document.getElementById("cross").style.visibility = "hidden";
}
