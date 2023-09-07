function Canvas()
{
    let canvas;
    let width;
    let height;
    // let canvas = document.createElement("canvas");
    // let canvasWidth = canvas.width;
    // let canvasHeight = canvas.height;
    let ctx;
    //let ctx = canvas.getContext("2d");
    let image;
    let pixels;
    //let id = ctx.getImageData(0,0, canvasWidth, canvasHeight);
    function reset (w, h) {
        canvas = document.createElement("canvas");
        width = w;
        height = h;
        ctx = canvas.getContext("2d");
        ctx.createImageData(width, height);
        image = ctx.getImageData(0,0,width,height);
        pixels = image.data;
        document.getElementById("content").appendChild(canvas);
    }
    function setPixel(x, y, r, g, b, a)
    {
        var offsetIndex = (x+y*width) * 4;
        pixels[offsetIndex] = r;
        pixels[offsetIndex+1] = g;
        pixels[offsetIndex+2] = b;
        pixels[offsetIndex+3] = a;
    }
    function putPixels()
    {
        reset(100,100);
        var r = 100;
        var g = 0;
        var b = 0;
        var a = 255;
        for (let i = 0; i < width; i++)
        {
            for (let j =0; j < height;j++)
            {
                setPixel(i,j,r,g,b,a);
            }
        }
        ctx.putImageData(image,0,0);
        //console.log(image);
    }
    return {
        putPixels,
    }
}

Canvas().putPixels();