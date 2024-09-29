let draw_mode = false;
let draw_style = "dots";
let size = 10;
const brush = {
    x: 0,
    y: 0
}
const last = {
    x: 0,
    y: 0
}

const buttons = {
    colour: document.querySelector("#colour"),
    reset: document.querySelector("#reset"),
    smooth: document.querySelector("#smooth"),
    dots: document.querySelector("#dots"),
}

const canvas = document.querySelector("#my_canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
context.strokeStyle = "black";
context.lineWidth = size;

canvas.addEventListener("mousedown",change_draw_mode);
canvas.addEventListener("mouseup",change_draw_mode);
canvas.addEventListener("mousemove",move_brush)
canvas.addEventListener("touchstart",touch_draw);
canvas.addEventListener("touchmove",touch_draw);
canvas.addEventListener("touchend",()=>{
    draw_mode = false;
});

buttons.reset.addEventListener("click",reset);
buttons.dots.addEventListener("click",dot_mode);
buttons.smooth.addEventListener("click",smooth_mode);

window.requestAnimationFrame(draw);

function reset() {
    context.reset();
}

function dot_mode() {
    draw_style = "dots";
}

function smooth_mode() {
    draw_style = "smooth";
}

function draw() {
    if (draw_mode) {
        if (draw_style === "smooth") {
            context.beginPath();
            context.moveTo(last.x, last.y);
            context.lineTo(brush.x, brush.y);
            context.stroke();
        } else if (draw_style === "dots")  {
            context.beginPath();
            context.arc(brush.x, brush.y, size, 0, 2 * Math.PI);
            context.fill();
        }        
    }

    window.requestAnimationFrame(draw);
}

function change_draw_mode(event) {
    draw_mode = !draw_mode;
    move_brush(event);
}

function move_brush(event) {
    event.preventDefault();
    last.x = brush.x;
    last.y = brush.y;
    brush.x = event.clientX;
    brush.y = event.clientY;

}

function touch_draw(event) {
    draw_mode = true;
    console.log(event);
    brush.x = event.touches[0].clientX;
    brush.y = event.touches[0].clientY;
}