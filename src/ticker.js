function ticker ()
{
    let varDom;
    let varDoubleLimit;
    let varDoubleInterval;
    let varDateTimeNowExpected;
    let varDateTimeNow;
    let varDateTimeEnd;
    let varTimeout;
    let varTick = 0;

    function init (argTimerInterval, argDom) {
        varDoubleInterval = argTimerInterval;
        varDom = argDom;
        varTick = 0;
        if (varDom) varDom.innerHTML = 0;
    }
    function tick() {
        //console.log(`tick ${varTick}`);
        varDateTimeNow = Date.now();
        let varDoubleDelta =  varDateTimeNow - varDateTimeNowExpected;
        // if (varDoubleDelta > varDoubleInterval) {
        //     console.log("timer().step() >> skipped a step");
        // }
        if (varDateTimeNow >= varDateTimeEnd || varTick >= varDoubleLimit)
        {
            stop();
        }
        else
        {
            varTick +=1;
            if (varDom) varDom.innerHTML = varDoubleLimit - varTick;
            varDateTimeNowExpected += varDoubleInterval;
            if (varTimeout) { clearTimeout(varTimeout); }
            varTimeout = setTimeout(tick,Math.max(0,varDoubleInterval-varDoubleDelta));
        }
    }
    function start(argDoubleSeconds)
    {
        //console.log(`start ${varTick}`);
        varDoubleLimit = argDoubleSeconds;
        varDateTimeNow = Date.now();
        varDateTimeEnd = varDateTimeNow + argDoubleSeconds*1000;
        varDateTimeNowExpected = varDateTimeNow + varDoubleInterval;
        if (varTimeout) { clearTimeout(varTimeout); }
        varTimeout = setTimeout(tick,varDoubleInterval);
        varTick = 0;
        if (varDom) varDom.innerHTML = varDoubleLimit - varTick;
    }
    function stop()
    {
        //console.log(`stop ${varTick}`);
        if (varTimeout) { clearTimeout(varTimeout); }
        varTick = 0;
        if (varDom) varDom.innerHTML = varTick;
    }
    function getTick()
    {
        return varTick;
    }
    return {
        varTick,
        init,
        start,
        stop,
        getTick,
    }
}
