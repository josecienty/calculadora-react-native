import { useEffect, useRef, useState } from "react";

enum Operator {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '/'
}

export const useCalculator = () => {
    const [formula, setFormula] = useState<string>('');

    const [number, setNumber] = useState<string>('0');
    const [prevNumber, setPrevNumber] = useState<string>('0');

    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if (lastOperation.current) {
            const firstFromulaPart = formula.split(' ').at(0);
            setFormula(`${firstFromulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }

    }, [number])

    useEffect(() => {
        if (lastOperation.current)
            setPrevNumber('' + calculateSubResult())
    }, [formula])

    const buildNumber = (numberString: string) => {
        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            // Punto decimal
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            // Evaluar si es otro cero y hay un punto
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number);
            }

            //Si no hay un punto y es o
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }

            //Evitar el 0000000
            if (numberString === '0' && !number.includes('.')) return;
            return setNumber(number + numberString);
        }

        setNumber(number + numberString);

        return setPrevNumber('' + calculateSubResult());
    }

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0');
    }

    const deleteOperation = () => {
        let currentSign = '';
        let temporalNumber = '';

        if (number.includes('-')) {
            currentSign = '-';
            temporalNumber = number.substring(1);
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0, -1));
        }

        return setNumber('0');
    }

    const toogleSign = () => {
        if (number.includes('-')) return setNumber(number.replace('-', ''));
        setNumber('-' + number);
    }

    const setLastNumber = () => {
        calculateResult();
        
        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
        } else {
            setPrevNumber(number)
        }
        setNumber('0')
    }


    //Operations
    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const calculateResult = () => {

        const result = calculateSubResult();
        setFormula(`${result}`);

        lastOperation.current = undefined;
        setPrevNumber('0');
        setNumber(`${result}`);
    }

    const calculateSubResult = (): number => {
        const [firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if (isNaN(num2)) return num1;

        switch (operation) {
            case Operator.add:
                return num1 + num2;

            case Operator.subtract:
                return num1 - num2;

            case Operator.multiply:
                return num1 * num2;

            case Operator.divide:
                return num1 / num2;

            default:
                throw new Error('Syntax error - Eñatende');

        }
    }

    return {

        //Props
        number,
        prevNumber,
        formula,

        //Methods
        buildNumber,
        clean,
        deleteOperation,
        toogleSign,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateResult
    };
}