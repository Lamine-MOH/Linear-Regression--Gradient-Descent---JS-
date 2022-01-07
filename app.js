let data = [];

// add point on click //
const graph = document.querySelector(".graph");
graph.addEventListener("click", (e) => {
    let pos = e.target.getBoundingClientRect();
    let x = e.clientX - pos.left;
    let y = e.clientY - pos.top;

    // add the new point to the graph //
    let point = document.createElement("div");
    point.classList.add("point");
    point.style.left = x + "px";
    point.style.top = y + "px";

    graph.appendChild(point);
    //  //

    // add the new credent to the data var //
    x = Math.floor(x);
    y = Math.floor(
        window
            .getComputedStyle(graph)
            .getPropertyValue("height")
            .split("px")[0] - y
    );

    data.push({ x, y });
});
//  //

// the gradient decent calcining //
let theta_0 = 0;
let theta_1 = 1;

function gradientDecent() {
    let costSum_0 = 0;
    let costSum_1 = 0;

    let n = data.length;
    let learningRate = 0.000005;

    // calc the cost //
    for (let i = 0; i < n; i++) {
        let x = data[i].x;
        let y = data[i].y;

        let guess = theta_0 + theta_1 * x;
        let error = y - guess;

        costSum_0 += learningRate * 1000 * error;
        costSum_1 += (learningRate / n) * error * x;
    }
    //  //

    theta_0 += costSum_0;
    theta_1 += costSum_1;
}
//  //

// draw the function //
const line = document.querySelector(".graph .line");
function drawLine() {
    let x1 = 0;
    let y1 = theta_0 + theta_1 * x1;
    let x2 = window
        .getComputedStyle(graph)
        .getPropertyValue("width")
        .split("px")[0];
    let y2 = theta_0 + theta_1 * x2;

    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    let midX = (x1 + x2) / 2;
    let midY = (y1 + y2) / 2;

    let slopeInRadian = Math.atan2(y1 - y2, x1 - x2);
    let slopeInDegrees = (slopeInRadian * 180) / Math.PI;

    line.style.width = distance + "px";
    line.style.left = midX - distance / 2 + "px";
    line.style.bottom = midY + "px";
    line.style.transform = "rotate(" + -slopeInDegrees + "deg)";
}
drawLine();
//  //

// repeat the press //
setInterval(() => {
    if (data.length >= 2) {
        gradientDecent();
        drawLine();
    }
}, 10);
//  //

const result = document.querySelector(".fx");
setInterval(() => {
    result.innerHTML =
        "H(x)= " + theta_0.toFixed(2) + " + " + theta_1.toFixed(2) + " * x";
}, 500);
