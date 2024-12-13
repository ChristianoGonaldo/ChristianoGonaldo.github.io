let intervals = [];
        function getIntervals() {
            const horaCells = document.querySelectorAll(".hora");
            intervals = Array.from(horaCells)
                .map(cell => cell.textContent.trim())
                .filter(text => text.includes("-"))
                .map(interval => {
                    const [start, end] = interval.split(" - ");
                    return { start, end };
                });
        }
        // const intervals = [
        //     { start: '08:30', end: '09:20' },
        //     { start: '09:25', end: '10:15' },
        //     { start: '10:20', end: '11:10' },
        //     { start: '11:10', end: '11:40' },
        //     { start: '11:40', end: '12:30' },
        //     { start: '12:35', end: '13:25' },
        //     { start: '13:30', end: '14:20' }
        // ];
        let confirmResult;
        function outTime() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let timeString = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;

            // IF PARA SI ES FIN DE SEMANA
            if (now.getDay() == 0 || now.getDay() == 6) {
                document.querySelector("table").style.display = "none";
                now.getDay() == 6 ? console.log("Es sabado") : console.log("Es domingo");
                // now.getDay() == 6 ? alert("Es sabado") : alert("Es domingo");
                return;
            }

            // SI NO ESTÁ EN HORARIO LECTIVO
            if (timeString <= intervals[0].start || timeString >= intervals[6].end) {
                document.querySelector('table').style.display = "none";
                // alert("No en horario lectivo");
                console.log("Fuera del horario lectivo");
                return;
            }

            let inInterval = false;
            for (let i = 0; i < intervals.length; i++) {
                if (timeString >= intervals[i].start && timeString < intervals[i].end) {
                    inInterval = true;
                    break;
                }
            }
            if (!inInterval) {
                if(confirmResult === undefined) confirmResult = window.confirm("¿Apagar el horario hasta que empiece la clase?");
                console.log(confirmResult);
                if (confirmResult) {document.querySelector('table').style.display = "none";}
            } else {
                document.querySelector('table').style.display = "table";
                document.querySelector("#time-display").style.position = "absolute";
                // document.querySelector("svg").style.display = "none";
            }
        }

        function day_highlight() {
            const now = new Date();
            const fecha = now.getDay();

            let dias = document.querySelectorAll(".dia");
            dias.forEach((dia, index) => {
                if (index === fecha - 1) dia.classList.add("highlight");
                else dia.classList.remove("highlight");
            });
        }

        function hour_highlight() {
            let hour = whatHour();
            if (hour === "NADA" ||hour === "break" || hour == 11) return;
            let tds = document.querySelectorAll(".hora");
            let celda = tds[hour];
            
            if (hour >= 0 && hour <= 6 && !isNaN(hour)) celda.classList.add("highlight");
        }
        // document.body.style.backgroundColor = "black";
        // document.body.style.opacity = "0.8";
        // document.body.style.backgroundImage = "linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777)";
        // document.body.style.backgroundSize = "78px 137px";
        // document.body.style.backgroundPosition = "0 0, 0 0, 39px 68px, 39px 68px, 0 0, 39px 68px";
        

        let clase = [];
        function class_highlight() {
            for (let elemento of clase) {
                elemento.classList.remove("clase_highlight");
            }
            clase.length = 0;
            const dias = [...document.querySelectorAll(".dia")];
            let dia = dias.findIndex(fecha => fecha.classList.contains("highlight"));
            const trs = document.querySelectorAll("tr");
            let hour = whatHour();
            if (hour == "break" ||hour == 11){
                // alert("Tomate un descanso");
                return
            };

            let tr;
            if (hour >= 0 || hour <= 6){ 
                // +1 porque pilla la primera tabla que es la cabecera.
                tr = trs[hour + 1];
                // alert(`Estás es ${tr.children[0].id} hora`); 
                console.log(`Estás en ${tr.children[0].id} hora`);
            }

            let celda;
            celda = (hour == 3) ? tr.children[1] : tr.children[dia + 1];

            celda.classList.add("clase_highlight");
            clase.push(celda);
        }

        // function whatHour(){
        //     const now = new Date();
        //     let hours = now.getHours() < 10 ? "0"+now.getHours() : now.getHours();
        //     let minutes = now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes();

        //     // const primera = (`${hours}:${minutes}` >= "08:30" && `${hours}:${minutes}` <= "09:20");
        //     // const segunda = (`${hours}:${minutes}` >= "09:25" && `${hours}:${minutes}` <= "10:15");
        //     // const tercera = (`${hours}:${minutes}` >= "10:20" && `${hours}:${minutes}` <= "11:10");
        //     // const recreo = (`${hours}:${minutes}` >= "11:15" && `${hours}:${minutes}` < "11:40");
        //     // const cuarta = (`${hours}:${minutes}` >= "11:40" && `${hours}:${minutes}` < "12:30");
        //     // const quinta = (`${hours}:${minutes}` >= "12:35" && `${hours}:${minutes}` < "13:25");
        //     // const sexta = (`${hours}:${minutes}` >= "13:30" && `${hours}:${minutes}` < "14:20");

        //          if (`${hours}:${minutes}` >= "08:30" && `${hours}:${minutes}` <= "09:20") return 0;
        //     else if (`${hours}:${minutes}` >= "09:25" && `${hours}:${minutes}` <= "10:15") return 1;
        //     else if (`${hours}:${minutes}` >= "10:20" && `${hours}:${minutes}` <= "11:10") return 2;
        //     else if (`${hours}:${minutes}` >= "11:15" && `${hours}:${minutes}` <= "11:40") return 3;
        //     else if (`${hours}:${minutes}` >= "11:40" && `${hours}:${minutes}` <= "12:30") return 4;
        //     else if (`${hours}:${minutes}` >= "12:35" && `${hours}:${minutes}` <= "13:25") return 5;
        //     else if (`${hours}:${minutes}` >= "13:30" && `${hours}:${minutes}` <= "14:20") return 6;
        //     else {return "ERROR"};
        // }
        document.querySelector("body").classList.add("magicpattern");
        // Para saber en que hora se encuentra.
        function whatHour() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let timeString = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;

            for (let i = 0; i < intervals.length; i++) {
                if (timeString >= intervals[i].start && timeString < intervals[i].end) {
                    if(timeString >= intervals[i].end && timeString <= intervals[i+1].start){
                        return "break";
                    }
                    return i;
                }
            }
            // Devuelve false si no esta en hora de clase.
            return 11;
        }

        // Junto todas las funciones para no hacer demasiadas llamadas al setInterval
        function update() {
            day_highlight();
            hour_highlight();
            class_highlight();
            outTime();
        }

        // Actualiza el tiempo dependiento de cuanto queda para el proximo minuto
        function timeUpdate() {
            const now = new Date();
            const seconds = now.getSeconds();
            const milliseconds = now.getMilliseconds();
            const timeToNextMinute = (60 - seconds) * 1000 - milliseconds;

            // Programar la actualización inicial al inicio del próximo minuto
            setTimeout(() => {
                update();
                setInterval(update, 60000);
            }, timeToNextMinute);
        }

        document.addEventListener('DOMContentLoaded', () => {
            // reloj();
            getIntervals();
            update();
            timeUpdate();
        });