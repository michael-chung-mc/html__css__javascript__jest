import React, {useState} from 'react'

export function QuestionAdd () {
    const [guess, setGuess] = useState("");
    const [numeratorX, setNumeratorX] = useState(50);
    const [denominatorX, setDenominatorX] = useState(50);
    const [numeratorY, setNumeratorY] = useState(50);
    const [denominatorY, setDenominatorY] = useState(50);
    const [operator, setOperator] = useState('+');
    const [precision, setPrecision] = useState('f');
    const [answer, setAnswer] = useState(2);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [score, setScore] = useState(0);

    const operators = ['+','-','*','/'];
    const precisions = ['i','d','f'];

    function generateQuestion()
    {
        const roll = Math.random() * 100;
        const newOperator = operators[Math.floor(roll/25)];
        // int or float or fractional arithmetic operation
        const format = precisions[Math.floor(roll/33)];
        let nx = Math.random()*(max-min);
        let dx = Math.random()*(max-min);
        let ny = Math.random()*(max-min);
        let dy = Math.random()*(max-min);
        // parse based on operator to avoid too difficult questions
        if (newOperator == "/" && nx < ny)
        {
            const tmp = nx;
            nx = ny;
            ny = tmp;
        }
        else if (newOperator == "*")
        {
            while (nx > 20 && ny > 20)
            {
                ny=ny/10;
            }
        }
        //format values based on precision of question
        if (format == precisions[2])
        {
            nx = Math.floor(nx);
            ny = Math.floor(ny);
            dx = Math.floor(dx);
            dy = Math.floor(dy);
        }
        else if (format == precisions[1])
        {
            nx = nx.toFixed(2);
            ny = ny.toFixed(2);
            dx = 1;
            dy = 1;
        }
        else if (format == precisions[0])
        {
            nx = Math.floor(nx);
            ny = Math.floor(ny);
            dx = 1;
            dy = 1;
        }
        //set state
        setOperator(newOperator);
        setNumeratorX(nx);
        setDenominatorX(dx);
        setNumeratorY(ny);
        setDenominatorY(dy);
        setPrecision(format);
        if (newOperator==operators[0])
        {
            setAnswer((nx*dy)+(ny*dx));
        }
        else if (newOperator==operators[1])
        {
            setAnswer((nx*dy)-(ny*dx));
        }
        else if (newOperator==operators[2])
        {
            setAnswer((nx*dy)*(ny*dx));
        }
        else if(newOperator==operators[3])
        {
            setAnswer((nx*dy)/(ny*dx));
        }
    };
    function checkFloat(x,y)
    {
        // 3 digit precision
        return Math.abs(x-y) < 0.01;
    }
    function handleInput(input)
    {
        if (checkFloat(answer,input))
        {
            generateQuestion();
            setGuess("");
            setScore(score+1);
        }
        else
        {
            setGuess(input);
        }
    };
    function handleMin(input)
    {
        if (input < max)
        {
            setMin(input);
        }
    }
    function handleMax(input)
    {
        if (input > min)
        {
            setMax(input);
        }
    }
    // render
    return (
        <>
            <title>Arithmetic Speed Drill</title>
            <section>Operand Range:
                <input value={min} onChange={(e)=>handleMin(e.target.value)}></input>
                and
                <input value={max} onChange={(e)=>handleMax(e.target.value)}></input>
            </section>
            <section>Score: {score}</section>
            <section>
                {
                    precision == precisions[2] ? numeratorX+'/'+denominatorX+' '+operator+' '+numeratorY+'/'+denominatorY
                    :  numeratorX+' '+operator+' '+numeratorY
                }
            </section>
            <section>{answer}</section>
            <input value={guess} onChange={(e)=>handleInput(e.target.value)}></input>
        </>
    );
};

export default QuestionAdd;