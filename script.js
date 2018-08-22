var Names = ["Ragul", "Rajpreet", "Pallvi", "Neha", "Ankita", "Raja", "Shreea", "Smriti", "Shrijeet", "Ayush", "Swapnil", "Nihit", "Bhargavi", "Anushka", "Swinal", "Utkarsh", "Saurabh", "Paarth", "Vishwas", "Mohit", "Gurbaksh", "Ashwarya"];
Names.sort();
var InputValue = document.getElementById("myInput")
var IsTrue = false,Count = 0;
InputValue.addEventListener("input", function () {
    Count = 0;
    IsTrue = false;
    var val = this.value;
    if (!val) {
        return false;
        RemoveList();
    }
    RemoveList();
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < Names.length; i++) {
        for (j = 0; j < Names[i].length; j++) {
            if (Names[i].substr(j, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML += Names[i].substr(0, j);
                b.innerHTML += "<strong>" + Names[i].substr(j, val.length) + "</strong>";
                var LastPart = j + val.length;
                b.innerHTML += Names[i].substr(LastPart, Names[i].length);
                b.innerHTML += "<input type='hidden' value='" + Names[i] + "'>";
                b.addEventListener("click", function (e) {
                    InputValue.value = this.getElementsByTagName("input")[0].value;
                    RemoveList();
                });
                Count++;
                if (Count <= 5) {
                    a.appendChild(b);
                }
                IsTrue = true;
                break;
            }
        }
    }
    if (!IsTrue) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + "No Data Found" + "</strong>";
        a.appendChild(b);
    }

});
InputValue.addEventListener('keydown', function (event) {
    var key = event.key;
    if (key === "Backspace") {
        RemoveList();
        return false;
    }
});

function RemoveList() {
    var CurrentList = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < CurrentList.length; i++) {
        CurrentList[i].parentNode.removeChild(CurrentList[i]);
    }
}
