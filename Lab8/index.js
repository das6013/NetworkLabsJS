Add = () => {
    inputDate = document.querySelector(".Inp").cloneNode(true);
    storeDate = document.querySelector("#Store");
    storeDate.appendChild(inputDate);
};

Save = (out) => {

    Out = document.querySelector("#" + out);
    inputDate1 = document.querySelectorAll(".input");
    inputDate2 = document.querySelectorAll(".input1");

    allDate = [];
    for (var i = 1; i < inputDate2.length; i++) {
        allDate.push(inputDate2[i].value + ":" + inputDate1[i].value)
    }
    console.log(JSON.stringify(allDate));
    allDate = JSON.stringify(allDate);
    allDate = '{' + allDate.slice(1, allDate.length - 1) + '}';
    Out.innerHTML = allDate;
};

Up1 = (me) => {
    prevDate = me.parentElement.previousElementSibling;
    if(prevDate)
    if (prevDate)
        me.parentElement.after(prevDate);
};

Down1 = (me) => {
    nextDate = me.parentElement.nextElementSibling;
    if(nextDate)

        me.parentElement.before(nextDate);
};

Del = (arg1) => {
    arg1.parentElement.remove()
};
