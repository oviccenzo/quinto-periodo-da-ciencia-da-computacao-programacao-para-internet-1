document.getElementById("btn1").onclick = function () {
    document.getElementById("img1").setAttribute("src", "https://www.w3schools.com/js/pic_bulbon.gif")
}

document.getElementById("btn2").onclick = function (){
    document.getElementById("img1").setAttribute("src", "https://www.w3schools.com/js/pic_bulboff.gif")
}

document.getElementById("btn2").addEventListener("focus", function () {
    this.style.backgroundColor = "red";
})

document.getElementById("input1").addEventListener("blur", function () {
    this.style.backgroundColor = "blue";
})

document.getElementById("input2").addEventListener("change", function () {
    var valor = this.value;
    //var valor = getElementById("input2").value;
    var msg = `Valor ${valor}`;
    document.getElementById("legenda2").innerHTML = msg;
    document.getElementById("input1").value = valor;
})

document.getElementById("item3").addEventListener("mousemove", function () {
    this.style.backgroundColor = "greenyellow";
})

document.getElementById("item3").addEventListener("mousemove", function () {
    var x = event.x - this.offsetLeft;
    var y = event.y - this.offsetTop;
    var msg = `${x}, ${y}`;
    this.innerHTML = msg;
})