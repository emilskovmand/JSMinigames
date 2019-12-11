var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function updateBG() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

var Me = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: window.innerHeight / 7
}
window.addEventListener('mousemove', (e) => {
    Me.x = e.clientX
    Me.y = e.clientY
})

function randonNumFrom(min = .3, max = 1) {
    return Math.random() * (max - min) + min
}

function Line(x1, y1, col = 'WHITE', x2 = Me.x, y2 = Me.y) {
    this.draw = function () {
        ctx.beginPath();
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineWidth = 1.4
        ctx.fill();
        ctx.strokeStyle = col
        ctx.stroke();
    }
    draw()
}


function Circle(x, y, dx, dy, radius, alpha) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.alpha = alpha;
    this.color = 'rgba(214, 159, 9, ' + this.alpha + ')';


    this.draw = function (rad = this.radius, style = 'transparent', col = this.color, ) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, Math.PI * 2, false)
        ctx.fillStyle = col
        ctx.fill()
        ctx.fillStyle = col
        ctx.strokeStyle = style
        ctx.stroke();
    }


    this.update = function () {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy
    }
}

var starTrail = [];

var circleArray = [];

for (let i = 0; i < window.innerWidth * 0.75; i++) {
    let x = Math.random() * (window.innerWidth - (window.innerHeight / 90) * 2) + window.innerHeight / 90;
    let y = Math.random() * (window.innerHeight - (window.innerHeight / 90) * 2) + window.innerHeight / 90;
    let dx = (Math.random() - 0.5) * .3;
    let dy = (Math.random() - 0.5) * .3;
    let radius = randonNumFrom(window.innerHeight / 200)
    let alpha = randonNumFrom()
    circleArray.push(new Circle(x, y, dx, dy, radius, alpha))
}

function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circleArray.length; i++) {

        if ((Me.x - Me.radius <= circleArray[i].x && Me.x + Me.radius >= circleArray[i].x) && (Me.y - Me.radius <= circleArray[i].y && Me.y + Me.radius >= circleArray[i].y)) {
            circleArray[i].draw(circleArray[i].radius * 1.63)
            Line(circleArray[i].x, circleArray[i].y, 'rgba(214, 159, 9, ' + (circleArray[i].alpha - .2) + ')');
        } else {
            circleArray[i].draw(circleArray[i].radius, '#f8f8f242', 'black')
        }
        circleArray[i].update()
    }
}

animate()

window.onresize = () => {
    updateBG()
}