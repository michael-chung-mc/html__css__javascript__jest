function findFactor(argArrayNumbers)
{
    //onsole.log(`find-factor`);
    let answer = 0;
    let attempt = 1;
    let found = false;
    let breakpoint = 0;
    argArrayNumbers.forEach(num => {breakpoint = Math.max(num,breakpoint);});
    //console.log(`find-factor: ${breakpoint}`);
    while (attempt < breakpoint)
    {
        attempt+=1;
        found = true;
        //console.log(`find-factor: ${attempt}`);
        argArrayNumbers.forEach(num =>
        {
            if (num%attempt!=0)
            {
                found = false;
            }
        })
        if (found)
        {
            answer == attempt;
            break;
        }
    }
    return answer;
}