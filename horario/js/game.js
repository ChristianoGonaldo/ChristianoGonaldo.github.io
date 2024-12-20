class Bola {
    static id = 1;
    constructor(x, y, radius, color, dx, dy) {
        this.id = Bola.id++;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    move() {
        this.x += this.dx / 2;
        this.y += this.dy;
    }

    checkCollision(canvasWidth, canvasHeight, addBolaCallback) {
        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
            document.querySelector('#game').style.border = '2px solid ' + this.getRandomColor();
        }
        
        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
            
            const randomRGB = () => Math.floor(Math.random() * 256);
            const shadowColor = `rgba(${randomRGB()}, ${randomRGB()}, ${randomRGB()}, 0.9)`;
            const shadowColor2 = `rgba(${randomRGB()}, ${randomRGB()}, ${randomRGB()}, 0.7)`;
            const shadowColor3 = `rgba(${randomRGB()}, ${randomRGB()}, ${randomRGB()}, 0.5)`;

            document.querySelector("#game").style.boxShadow = `
                0 4px 10px ${shadowColor}, 
                0 0 25px ${shadowColor2}, 
                0 0 50px ${shadowColor3}`;
        }
    }

    getRandomColor() {
        return `hsl(${Math.random() * 360}, 100%, 60%)`;
    }
}

class Game {
    // constructor(maxBolas) {
    //     this.maxBolas = maxBolas;
    //     this.bolas = [];
    // }

    constructor(maxBolas, width, height) {
        this.maxBolas = maxBolas;
        this.width = width;
        this.height = height;
        this.bolas = [];
    }

    createTitle(text) {
        const title = document.createElement("h1");
        title.id = "title";
        title.textContent = text;
        title.style.display = "block";
        title.style.color = "white";
        title.style.userSelect = "none";
        document.body.appendChild(title);
    }

    createGameContainer() {
        const div = document.createElement('div');
        div.id = "game";
        document.body.appendChild(div);
    
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.background = "radial-gradient(circle, #00BFFF, #1E90FF, #000080)";
        div.style.border = '2px solid ' + this.getRandomColor();
        div.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 0, 0, 0.5), 0 0 50px rgba(255, 0, 0, 0.3)';
        div.style.overflow = 'hidden';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.zIndex = 99999;
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        document.getElementById('game').appendChild(canvas);
        return canvas;
    }

    getRandomColor() {
        return `hsl(${Math.random() * 360}, 100%, 60%)`;
    }

    getRandomDirection(min, max) {
        const value = Math.random() * (max - min) + min;
        return Math.random() < 0.5 ? value : -value;
    }

    addBola() {
        if (this.bolas.length >= this.maxBolas) {
            this.restartGame();
            return;
        }
        const newBola = new Bola(
            400, 400,
            randomNumber(5, 15),
            this.getRandomColor(),
            this.getRandomDirection(1, 5),
            this.getRandomDirection(1, 5)
        );
        this.bolas.push(newBola);
        console.log(newBola.id);
    }

    restartGame() {
        console.clear();
        this.bolas.length = 0;
        // this.addBola();
        this.startBolasUpdate();
    }

    gameLoop(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

        // Dibujar y mover todas las bolas
        for (const bola of this.bolas) {
            bola.draw(ctx);
            bola.move();
            bola.checkCollision(canvas.width, canvas.height);
        }

        requestAnimationFrame(() => this.gameLoop(canvas, ctx)); // Animar el bucle
    }

    init() {
        document.body.style.display = "flex";
        document.body.style.alignItems = "center";
        document.body.style.justifyContent = "center";
        document.body.style.flexDirection = "column";
        document.body.style.margin = "0";
        document.body.style.backgroundColor = "black";
        document.body.style.height = "100vh";
        
        // this.createTitle();
        this.createGameContainer();
        const canvas = this.createCanvas();
        const ctx = canvas.getContext('2d');

        // Crear la primera bola
        // this.addBola();
    
        canvas.addEventListener('click', () => {
            this.addBola(); // Crear una nueva bola al hacer clic
        });

        this.startBolasUpdate();
        this.gameLoop(canvas, ctx); // Iniciar el bucle de juego
    }
    updateBolas() {
        console.clear();
        this.bolas.length = 0;

        const now = new Date();
        const minutes = now.getMinutes();

        // Crea tantas bolas como minutos actuales
        for (let i = 1; i <= minutes; i++) {
            const bola = document.createElement("div");
            // console.log(i);
            this.addBola();
        }
        console.log(this.bolas);
    }
    
    startBolasUpdate() {
        // Actualiza las bolas inmediatamente
        this.updateBolas();
    
        // Calcula el tiempo restante para el próximo minuto
        const now = new Date();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        const timeToNextMinute = (60 - seconds) * 1000 - milliseconds;
    
        // Programa la primera actualización al inicio del próximo minuto
        setTimeout(() => {
            this.updateBolas();
            setInterval(() => this.updateBolas(), 60000); 
        }, timeToNextMinute);
    }
}

const game = new Game(61, 700, 700);

const horario = document.querySelector("table");
const time = document.querySelector("#time-display");

setTimeout(() => {
    const horarioStyle = window.getComputedStyle(horario);
    const displayStyle = horarioStyle.display;
    // const dragon = document.querySelector("svg");
    
    if (displayStyle === 'none' || displayStyle === '') {
        game.init();
        // dragon.style.display = "block";
        time.style.position = "static";
    } 
    // else {
    //     console.log("Desactivar dragon, poner el reloj como absolute y quitar el juego");
    //     // dragon.style.display = "block";
    //     time.style.position = "absolute";
    //     let gameContainer = document.getElementById("#game");
    //     if(gameContainer) gameContainer.remove();
    // }
}, 100);

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}