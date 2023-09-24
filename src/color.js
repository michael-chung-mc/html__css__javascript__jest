function color ()
{
    function gradient(startRGB, endRGB, step)
    {
        let r = endRGB.red - startRGB.red;
        let g = endRGB.green - startRGB.green;
        let b = endRGB.blue - startRGB.blue;
        r = (r * step) + startRGB.red;
        g = (g * step) + startRGB.green;
        b = (b * step) + startRGB.blue;
        return {r,g,b};
    }
    function getRGB()
    {
        let r = parseInt(Math.random()*255 + 1);
        let g = parseInt(Math.random()*255 + 1);
        let b = parseInt(Math.random()*255 + 1);
        return {red:r,green:g,blue:b};
    }
    return {
        gradient,
        getRGB,
    }
}