function changeGrid(buttonN) {
    let picContainer = document.getElementById("pic-container");
    let dogPic = document.getElementById("dog");
    let catPic = document.getElementById("cat");

    switch (buttonN) {
        case 1:
            picContainer.style = "grid-template-columns: 95% 5%;";
            catPic.style.visibility = "visible";
            dogPic.style.visibility = "hidden";
            catPic.style.width = "70%";
            break;

        case 2:
            picContainer.style = "grid-template-columns: 50% 50%;";
            catPic.style.visibility = "visible";
            dogPic.style.visibility = "visible";
            catPic.style.width = "310px";
            catPic.style.marginLeft = "15px";
            dogPic.style.width = "310px";
            break;

        case 3:
            picContainer.style = "grid-template-columns: 5% 95%;";
            catPic.style.visibility = "hidden";
            dogPic.style.visibility = "visible";
            dogPic.style.width = "70%";
            break;

        default:
            break;
    }
}
