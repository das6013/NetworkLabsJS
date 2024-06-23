const T = ["!", "+", "*", "(", ")", "a", "b"];
const N = ["A", "B", "T", "M"];

const Productions = {
    A: ["!B!"],
    B: ["T", "T+B"],
    T: ["M", "M*T"],
    M: ["a", "b", "(B)"]
};

/*const productionsNumbered = [
    {A: "!B!"},
    {B: "T"},
    {B: "T+B"},
    {T: "M"},
    {T: "M*T"},
    {M: "a"},
    {M: "b"},
    {M: "(B)"},
]

const Productions = {
    "B": ["B+T", "T"],
    "T": ["T*M", "M"],
    "M": ["a", "b"]
};
*/

const form = document.getElementById('upwardParser');
form.addEventListener('submit',(e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const omega = formData.get('input');
    const answer = upwardParser(omega);
    form.output.value=answer;
});

const upwardParser = (omega) => {
    console.log(1);
    const start = Object.keys(Productions)[0]; // начальный символ грамматики
    let productionsNumbered = [];
    for (const key in Productions) {
        const arr = [];
        for(let i=0; i<Productions[key].length;i++) {
            arr.push({[key]: Productions[key][i]})
        }
        productionsNumbered = [...productionsNumbered, ...arr];
    }

    const L1 = [];
    const L2 = [];
    let answer = [];
    let omegaIndex = 0;
    const stepOne = () => { // для НЕтермиала
        for (let i=0; i <L1.length; i++) {
            const find = productionsNumbered.findIndex(el => Object.values(el)[0] == L1.slice(i).join(''));
            if (find >= 0) {
                L1.splice(i, L1.length, Object.keys(productionsNumbered[find])[0]);
                L2.unshift(find+1);
                console.log(L1);
                //console.log(L2);
                stepOne();
                return;
            }
        }
        stepTwo();
    }
    
    const stepTwo = () => { // для терминала
        if (omegaIndex < omega.length) {
            L1.push(omega[omegaIndex]);
            L2.unshift("s");
            omegaIndex++;
            //console.log(L1);
            //console.log(L2);
            stepOne();
        }
        else stepThree();
    }

    const stepThree = () => { // анализ стека L1 и вывод результата
        if (L1[0] == start && L1.length == 1) {
            L2.forEach(el => {
                if (el != "s") answer.unshift(el);
            })
        }
        else {
            //console.log(L1[0], L1[L1.length-1], start);
            stepFour();}
    }
    
    const stepFour = () => {
        if (!(omegaIndex || L1.length)) {
            answer="Ошибка";
            return;
        }
        else if (L2[0] == "s") stepFiveD();
        else {
        const newConvolution = productionsNumbered.slice(L2[0]).find(el => Object.values(el)[0] == Object.values(productionsNumbered[L2[0]-1])[0]);
        if (newConvolution) stepFiveA(newConvolution);
        else if (omegaIndex == omega.length) stepFiveB();
        else stepFiveC();
        }
    }

    const stepFiveA = (el) => {
        L1.splice(L1.length - Object.keys(productionsNumbered[L2[0]-1])[0].length, L1.length, ...Object.keys(el)[0]);
        L2[0] = productionsNumbered.indexOf(el);
        //console.log(L1);
       // console.log(L2);
        stepOne();
    }

    const stepFiveB = () => {
        //console.log(productionsNumbered);
        L1.splice(L1.length - Object.keys(productionsNumbered[L2[0]-1])[0].length, L1.length, ...Object.values(productionsNumbered[L2[0]-1])[0]);
        L2.shift();
        //console.log(L1);
       // console.log(L2);
        stepFour();
    }

    const stepFiveC = (el) => {
        L1.splice(L1.length - Object.keys(productionsNumbered[L2[0]-1])[0].length, L1.length, ...Object.values(productionsNumbered[L2[0]-1])[0]);
        L2[0]="s";
        L1.push(omega[omegaIndex]);
        omegaIndex++;
       // console.log(L1);
        //console.log(L2);
        stepOne();
    }

    const stepFiveD = (el) => {
        //console.log(omegaIndex);
        if (omegaIndex) {
            L1.pop();
            L2.shift();
            omegaIndex--;
            //console.log(L1);
            //console.log(L2);
            stepFour();
        }
        else {
            //console.log(L1);
            //console.log(L2);
            answer="Ошибка";
            return;
        }
    }
    stepOne();
    return answer;
}
