function reloj(){
    let now = new Date();
    
    let hours   = now.getHours()   < 10 ? "0"+now.getHours()   : now.getHours();
    let minutes = now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes();
    let seconds = now.getSeconds() < 10 ? "0"+now.getSeconds() : now.getSeconds();
    let hms = document.getElementById("hora");
    hms.innerHTML = hours + " : " + minutes + " : " + seconds;
}
setInterval(reloj, 1000);

function crear(){
    let div = document.createElement("div");
    let reloj = document.createElement("output");
    div.appendChild(reloj)
    document.body.appendChild(div)

    div.id = "time-display"
    reloj.id = "hora";
    reloj.textContent = "00 : 00 : 00"
    // div.style.position = "absolute";
    // div.style.left = "20px";
    // div.style.right = "20px";
    // div.style.marginBottom = "20px";
    // div.style.fontSize = "2.5rem";
    // div.style.color = "#fff";
    // div.style.background = "linear-gradient(90deg, #1e90ff, #00bcd4)";
    // div.style.padding = "15px 30px";
    // div.style.borderRadius = "12px";
    // div.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    // div.style.fontWeight = "bold";
    // div.style.letterSpacing = "1px";
    // div.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
    // div.style.border = "2px solid rgba(255, 255, 255, 0.2)";
    // div.style.userSelect ="none";

    // reloj.style.color = "#000000";
    // reloj.style.fontWeight = "bold";
    // reloj.style.textTransform = "uppercase";
    // reloj.style.backgroundColor = "#fff";
}
crear();
