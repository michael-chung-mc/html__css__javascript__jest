function Canvas()
{
    let depth;
    let canvas;
    let width;
    let height;
    let ctx;
    let image;
    let pixels;
    function reset (w, h) {
        let content = document.getElementById("content");
        if (content.firstChild)
        {
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }
        else
        {
            canvas = document.createElement("canvas");
            content.appendChild(canvas);
        }
        width = w;
        height = h;
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        ctx.createImageData(width, height);
        image = ctx.getImageData(0,0,width,height);
        pixels = image.data;
    }
    function setDepth(x)
    {
        depth = x;
    }
    function setPixel(x, y, r, g, b, a)
    {
        var offsetIndex = (x+y*width) * 4;
        pixels[offsetIndex] = r;
        pixels[offsetIndex+1] = g;
        pixels[offsetIndex+2] = b;
        pixels[offsetIndex+3] = a;
    }
    function setPixelArray(i, r, g, b, a)
    {
        var offsetIndex = i * 4;
        pixels[offsetIndex] = r;
        pixels[offsetIndex+1] = g;
        pixels[offsetIndex+2] = b;
        pixels[offsetIndex+3] = a;
    }
    function display()
    {
        ctx.putImageData(image,0,0);
    }
    return {
        reset,
        setPixel,
        setPixelArray,
        setDepth,
        display,
    }
}

function Main () {
    let cvs = Canvas();
    let alpha = 255;
    function init () {
        const inputElement = document.getElementById("input");
        inputElement.addEventListener("change", handleFiles, false);
    }
    function compareString(x, y)
    {
        if (x.length != y.length)
        {
            return false;
        }
        for (let i = 0; i < x.length; i++)
        {
            if (x.charCodeAt(i) != y.charCodeAt(i))
            {
                return false;
            }
        }
        return true;
    }
    function parsePPM (data) {
        if (data === NaN || data === null)
        {
            throw new Error("Null PPM data");
        }
        let lines = data.split('\n');
        let headerLength = 0;
        for (let i = 0; i < lines.length; i++)
        {
            //console.log(lines[i]);
            if (i == 0 && !compareString(lines[i].trim(),"P3"))
            {
                console.log(`unsupported ppm header version <${lines[i]}>`);
                return;
            }
            else if (i == 1)
            {
                let dimensions = lines[i].trim().split(/\s/);
                let width = parseInt(dimensions[0].trim());
                let height = parseInt(dimensions[1].trim());
                if (width == NaN || height == NaN)
                {
                    throw new Error(`incorrect ppm header dimensions <${lines[i]}>`);
                }
                cvs.reset(width, height);
            }
            else if (i == 2)
            {
                let colorDepth = parseInt(lines[i].trim());
                if (colorDepth == NaN)
                {
                    throw new Error(`incorrect ppm header color <${lines[i]}>`);
                }
                cvs.setDepth(colorDepth);
                headerLength += lines[i].length+1;
                break;
            }
            headerLength += lines[i].length+1;
        }
        let colors = data.substring(headerLength);
        //console.log(colors);
        let concat = colors.replace(/\s+/g, ' ');
        //console.log(concat);
        let split = concat.split(/\s/);
        //console.log(split);
        let index = 0;
        while (index < split.length)
        {
            let r = split[index];
            let g = split[index+1];
            let b = split[index+2];
            cvs.setPixelArray(index/3, r, g, b, alpha);
            //console.log(`${index}=${index/3}==(${r},${g},${b},${alpha})`)
            index += 3;
        }
        cvs.display();
    }
    function handleFiles() {
        const fileList = this.files;
        let file = fileList[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => { 
            try { parsePPM(reader.result);}
            catch (e) { console.error(e)};
        }
    }
    return {
        init,
    }
};

let main = Main()
main.init();