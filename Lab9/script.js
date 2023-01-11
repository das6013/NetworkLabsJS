const valueText = document.querySelector('#monitor');
let button = document.querySelectorAll('.button');

let firstNumber;
let secondNumber;
let operation;

function addNumber(newNumber)
{
    let numberLength = valueText.textContent.length;

    if (valueText.textContent==0 && newNumber!="." && numberLength < 2)
     {
        valueText.textContent = newNumber;
    }

    else
    {
        valueText.textContent += newNumber;
    }
}

function addDot()
{
    if (valueText.textContent == "") {
        valueText.textContent = '0.';
    }

    if (!(valueText.textContent.includes('.'))) {
        valueText.textContent += '.';
    }
}

function addOperation(_operation)
{
    let value = Array.from(valueText.textContent).join("");

    firstNumber = value;
    valueText.textContent = '';

    operation = _operation;
}

function clearAll()
{
    valueText.textContent = '0';
    secondNumber = null;
    operation = null;
}

function backSpace()
 {
    let string = valueText.textContent;
        valueText.textContent = string.slice(0, -1);

}

function calculate()
 {
    if(!(operation == null)) {

        secondNumber = Array.from(valueText.textContent).join("");

        switch (operation) {
            case "+":
                res = Number(firstNumber) + Number(secondNumber);
                break;
            case "*":
                res = Number(firstNumber) * Number(secondNumber);
                break;
            case "/":
                res = Number(firstNumber) / Number(secondNumber);
                if (secondNumber==0)
                {
                  res="Zero div";
                }
                break;
            case "-":
                res = Number(firstNumber) - Number(secondNumber);
                break;
            default:
                break;
        }

        console.log(firstNumber, " ", secondNumber);
        valueText.innerHTML = res;

        secondNumber = null;
        operation = null;
    }
}
