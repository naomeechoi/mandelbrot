let left = -2;
let right = 1;
let top = 1;
let bottom = -1;

window.onload = function () {
    console.log("This is working");
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('mousedown', (event) => {
        //console.log(left);
        left = event.clientX + left /2;
        console.log(left);
        right = event.clientX + right/2;
        top = event.clientY + top/2;
        bottom = event.clientY + bottom/2;
        drawMandelbrot(canvas);
    });
    drawMandelbrot(canvas);
}


function drawMandelbrot(canvas_) {

    const context = canvas_.getContext("2d");
    let canvasImg = context.getImageData(0, 0, canvas_.width, canvas_.height);
    let canvasPixels = canvasImg.data;

    for(let i = 0; i < window.innerWidth; i++) {
        for(let j = 0; j < window.innerHeight; j++) {

            // x의 범위를 -2~1, y의 범위를 -1~1로 정규화
            
            let constX = (i / window.innerWidth) * (right - left) + left;
            let constY = (j / window.innerHeight) * (top - bottom) + bottom;

            let x = constX;
            let y = constY;
            const COLOR_LIMIT = 256;

            let count;
            for(count = 0; count < COLOR_LIMIT; count++) {
                let doubleX = x * x;
                let doubleY = y * y;

                if(doubleX + doubleY > 2 * 2) {
                    break;
                }

                let newX = doubleX - doubleY + constX;
                let newY = 2 * x * y + constY;
                x = newX;
                y = newY;
            }

            count = count % COLOR_LIMIT;
            let color = getColor(count);

            // draw pixel
            var idx = 4 * (j * window.innerWidth + i);
            
            canvasPixels[idx + 0] = color.r;
            canvasPixels[idx + 1] = color.g;
            canvasPixels[idx + 2] = color.b;
            canvasPixels[idx + 3] = COLOR_LIMIT - 1;  
        }
    }

    context.putImageData(canvasImg, 0, 0);
}

function getColor(count) {
    // Linear interpolation between two colors based on count value
    let color1 = { r: 50, g: 0, b: 0 };  // Start color (Red)
    let color2 = { r: 0, g: 30, b: 255 };  // End color (Blue)

    let ratio = count / Math.floor(Math.random() * 256);  // Calculate ratio based on count value
    let r = Math.round(color1.r * (1 - ratio) + color2.r * ratio);  // Linear interpolation for red component
    let g = Math.round(color1.g * (1 - ratio) + color2.g * ratio);  // Linear interpolation for green component
    let b = Math.round(color1.b * (1 - ratio) + color2.b * ratio);  // Linear interpolation for blue component

    return { r: r, g: g, b: b };
}

//https://day-think.tumblr.com/post/117957468851/html5-canvas-%ED%99%9C%EC%9A%A9-mandelbrot-set-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0