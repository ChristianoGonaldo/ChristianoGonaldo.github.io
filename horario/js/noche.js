let oscuro = true;
const btn = document.querySelector('.circle-btn');
btn.addEventListener('click', e => {
    let horas = document.querySelectorAll(".hora");
    let dias = document.querySelectorAll(".dia");
    let btn = document.querySelector("button");
    if (oscuro) {
        document.body.style.backgroundColor = "white";
        // document.querySelector("caption").style.color = "black";
        document.querySelector("table").style.border = "2px solid black";
        horas.forEach(hora => {
            if(!hora.classList.contains("highlight")) {
                hora.style.backgroundColor = "black"; 
                hora.style.color = "white";
            }
        });
        dias.forEach(dia => {
            if(!dia.classList.contains("highlight")) {
                dia.style.backgroundColor = "black"; 
                dia.style.color = "white";
            }
        });
        document.querySelector(".vacio").style.backgroundColor = "black";
        btn.style.backgroundColor = "black";
        btn.style.setProperty('--before-content', '"🌙"');
    } else {
        document.body.style.backgroundColor = "black";
        // document.querySelector("caption").style.color = "white";
        document.querySelector("table").style.border = "2px solid white";
        horas.forEach(hora => {
            if(!hora.classList.contains("highlight")){
                hora.style.backgroundColor = "white"; 
                hora.style.color = "black"}
        });
        dias.forEach(dia => {
            if(!dia.classList.contains("highlight")) {
                dia.style.backgroundColor = "white"; 
                dia.style.color = "black";
            }
        });
        document.querySelector(".vacio").style.backgroundColor = "white";
        btn.style.backgroundColor = "white";
        btn.style.setProperty('--before-content', '"🌞"');
    }
    oscuro =!oscuro;
});