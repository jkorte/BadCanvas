let draw_mode = false;
const brush = {
    x: 0,
    y: 0
}

const buttons = {
    colour: document.querySelector("#colour"),
    reset: document.querySelector("#reset"),
}

const canvas = document.querySelector("#my_canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

canvas.addEventListener("mousedown",change_draw_mode);
canvas.addEventListener("mouseup",change_draw_mode);
canvas.addEventListener("mousemove",move_brush)
canvas.addEventListener("touchstart",touch_draw);
canvas.addEventListener("touchmove",touch_draw);
canvas.addEventListener("touchend",()=>{
    draw_mode = false;
});

buttons.reset.addEventListener("click",reset);
window.requestAnimationFrame(draw);

function reset() {
    context.reset();
}

function draw() {
    if (draw_mode) {
        context.beginPath();
        context.arc(brush.x, brush.y, 10, 0, 2 * Math.PI);
        context.fill();
    }

    window.requestAnimationFrame(draw);
}

function change_draw_mode(event) {
    draw_mode = !draw_mode;
    move_brush(event);
}

function move_brush(event) {
    event.preventDefault();
    brush.x = event.clientX;
    brush.y = event.clientY;
}

function touch_draw(event) {
    draw_mode = true;
    console.log(event);
    brush.x = event.touches[0].clientX;
    brush.y = event.touches[0].clientY;
}