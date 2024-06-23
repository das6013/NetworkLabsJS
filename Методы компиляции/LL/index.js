const T = ["!", "+", "*", "(", ")", "И"];
const N = ["A", "B", "B`", "T", "T`", "M"];

const Productions = {
    "A": [["!", "B", "!"]],
    "B": [["B`"]],
    "B`": [["B`", "+", "T"], ["T"]],
    "T": [["T`"]],
    "T`": [["T`", "*", "M"], ["M"]],
    "M": [["И"], ["(", "B", ")"]]
};
const Graf = {

};
const MaxLongPathVertex = {

}
const names = [];
const Compilation__2 = (e) => {
    e.preventDefault();
    const form = document.getElementById('downwardParser');
    const formData = new FormData(form);
    const omega = formData.get('input');
    const symbols = [...T, ...N];
    const str = strTransform(omega);
    let productionsNumbered = [];
    for (const key in Productions) {
        const arr = [];
        for(let i=0; i<Productions[key].length;i++) {
            arr.push({[key]: Productions[key][i]})
        }
        productionsNumbered = [...productionsNumbered, ...arr];
    }
    let answer = '';

    if (str[0] != '!' || str[str.length-1] != '!') answer = 'Ошибка';
    for (let i=0; i<str.length; i++) {
        if (T.indexOf(str[i]) < 0) answer = 'Ошибка';
    }

    if (answer != 'Ошибка') {
    const [L, R] = formLR();
    const Matrix = formMatrix(L, R, symbols);
    // const Matrix = [
    // ["<","<","=","","<"],
    // ["","",">","<","="],
    // ["<","",">","=",""],
    // ["","<",">","",""],
    // ["","","",">",">"],
    // ];
    // const Graf = {
    //     "F0 G2": [],
    //     "F1 G4": [["F0 G2"]],
    //     "F2 G3": [["F1 G4"],["F0 G2"]],
    //     "F3": [["F0 G2"]],
    //     "F4": [["F2 G3"],["F1 G4"]],
    //     "G0": [["F0 G2"],["F2 G3"]],
    //     "G1": [["F0 G2"],["F3"]]
    // }
    //const [F, G] = Functions(Matrix, symbols);
    //document.querySelector('.F__answer').textContent=F.join('');
    //document.querySelector('.G__answer').textContent=G.join('');
    console.log(Matrix);
    CreateVertex(Matrix);
    DrawGraf(Matrix);
    console.log(Graf);
    const matrixAdjac = MatrixAdjacency(Graf);
    printPathsInDAG(matrixAdjac)
    console.log(MaxLongPathVertex);
    const [F,G] = SplitVertex(MaxLongPathVertex);
    console.log("F: " + F);
    console.log("G: " + G);
    document.querySelector('.F__answer').textContent=F.join('');
    document.querySelector('.G__answer').textContent=G.join('');
    //CheckVertex(Graf);// проверка графа на цикличность
   // console.log("Not Cicl Graph: " + CheckCicl());
    //answer = simplePrecedence(Matrix, symbols, str);
}
    form.output.value=answer;
    //console.log(answer);
    function formLR () {
        const L = {};
        const R = {};
        for (const key in Productions) {
            let lefts = [];
            let rights = [];
            Productions[key].forEach(el => {
                lefts.push(el[0]);
                rights.push(el[el.length-1]);
            })
            L[key] = [...uniq_fast(lefts)];
            R[key] = [...uniq_fast(rights)];
        }

        let flag = symbols.length;
        while (flag) {
            for (const key in L) {
                let flag2 = true;
                L[key].forEach(el => {
                    if (!isTerm(el) && el != key && flag2) {
                        let arr = [...uniq_fast([...L[key], ...L[el]])];
                        if (arr.length == L[key].length) 
                        {
                            flag--; flag2=false;
                        } 
                        else L[key] = arr;
                    }
                })
                if (L[key].every(el => {isTerm(el) || el == key})) flag--;
            }
            for (const key in R) {
                let flag3 = true;
                R[key].forEach(el => {
                    if (!isTerm(el) && el != key && flag3) {
                        let arr = [...uniq_fast([...R[key], ...R[el]])];
                        if (arr.length == R[key].length) 
                        {
                            flag--; flag3=false;
                        } 
                        else R[key] = arr;
                    }
                })
            }
        }
        return [L, R];
    }

    function formMatrix (L, R, symbols) {
        let matr = new Array(symbols.length);

        for(let i=0;i<symbols.length;i++) matr[i] = new Array(symbols.length);
        for(let i=0;i<symbols.length;i++) {
            for(let j=0;j<symbols.length;j++) matr[i][j]=0;
        }
        
        productionsNumbered.forEach(el => {
            el = Object.values(el)[0];
            if (el.length > 1) {
                for (let j=1; j<el.length;j++) {
                    matr[symbols.indexOf(el[j-1])][symbols.indexOf(el[j])] = "=";
                }
            }

            for (let j=0;j<el.length-1;j++) {
                if (isTerm(el[j])) {
                    L[el[j+1]].forEach(elem => {
                        matr[symbols.indexOf(el[j])][symbols.indexOf(elem)] = "<";
                    })
                }
                else {
                    if (!isTerm(el[j+1])) {
                        R[el[j]].forEach(elem => {
                            L[el[j+1]].forEach(element => {
                                matr[symbols.indexOf(elem)][symbols.indexOf(element)] = ">";
                            })
                         })
                    }
                    else {
                        R[el[j]].forEach(elem => {
                            matr[symbols.indexOf(elem)][symbols.indexOf(el[j+1])] = ">";
                        })
                    }
                }
            }
        })
        return matr;
    }

    function SplitVertex(ob){
        const F = [];
        const G = [];
        for(let i=0;i<Object.keys(ob).length;i++){
            Object.keys(MaxLongPathVertex).forEach(el => {
                if(el.split(" ").indexOf(`F${i}`)>=0){
                    F.push(MaxLongPathVertex[el]);
                }
            });
        }
        for(let j=0;j<Object.keys(ob).length;j++){
            Object.keys(MaxLongPathVertex).forEach(el => {
                if(el.split(" ").indexOf(`G${j}`)>=0){
                    G.push(MaxLongPathVertex[el]);
                }
            });
        }
        return [F,G];
    }
    //функция построения матрицы смежности
    function MatrixAdjacency(graph){
        let nodes = Object.keys(graph); // получаем отсортированный список вершин графа
        let N = nodes.length; // количество вершин в графе
        let matrix = []; // пустая матрица смежности
        // инициализируем пустую матрицу смежности
        for (let i = 0; i < N; i++) {
            matrix[i] = [];
            for (let j = 0; j < N; j++) {
                matrix[i][j] = 0;
            }
        }
        // заполняем матрицу смежности
        for (let i = 0; i < N; i++) {
            let node = nodes[i];
            let neighbors = graph[node];
            if(neighbors.length!=0){
                for (let j = 0; j < neighbors.length; j++) {
                    let neighborIndex = nodes.indexOf(neighbors[j]);
                    if (neighborIndex != -1) {
                        //Graf[node].push(neighborIndex);
                        matrix[i][neighborIndex] = 1;
                    }
                }
            }
        }
        return matrix;
    }
    //функция нахождения длинного пути, для каждой вершины
    function findLongestPath(graph) {
        const n = graph.length; // количество вершин
        //const visited = new Array(n).fill(false); // массив для отслеживания посещенных вершин
        const longestPaths = new Array(n).fill(0); // массив для запоминания наибольших длин путей
        
        function dfs(node, pathLength, from) {
            //console.log(node, pathLength);
            //visited[node] = true;
            longestPaths[from] = Math.max(longestPaths[from], pathLength);
          
            // пройдемся по смежным вершинам, если они еще не были посещены
            for (let i = 0; i < n; i++) {
                if (graph[node][i]) {
                dfs(i, pathLength + 1, from);
                }
            }
            //visited[node] = false; // помечаем текущую вершину как непосещенную, чтобы можно было зайти в нее с других вершин
        }
        
        for (let i = 0; i < n; i++) {
            dfs(i, 0, i); // запускаем поиск в глубину для каждой вершины
        }
        for(let k=0;k<n;k++){
            MaxLongPathVertex[Object.keys(Graf)[k]]=longestPaths[k];
        }
        //return longestPaths;
        //return MaxLongPathVertex;
    }

    //функция удаления Fi в графе
    function DeleteF(i){
        Object.keys(Graf).forEach(el => {
            if(el.split(" ").indexOf(`F${i}`)>=0){
                        delete Graf[el];
                    }
        });
    }
    //функция проверки существования Gj в графе
    function CheckGG(i){
        let flag=false;
        Object.keys(Graf).forEach(els => {
            if(els.split(" ").indexOf(`G${i}`)>=0){
                flag=true;
            }
        });
        return flag;
    }
    //функция которая соединяет Fi с Fi, имеющие одинаковые Gj
    function CreateVertexG(i, j,el){
        Object.keys(Graf).forEach(els => {
            if(els.split(" ").indexOf(`G${j}`)>=0){
                        let s = els + ` F${i}`;
                        //console.log(Graf[el]);
                        delete Graf[el];
                        delete Graf[els];
                         //DeleteF(i);
                        Graf[s] = [];
                        return;
                    }
        });
    }
    //функция соединения вершин
    function СonnectionVertex(matr){
        for(let i=0;i<matr.length;i++){
            for(let j=0;j<matr.length;j++){
                    if(matr[i][j]=="="){
                        Graf[`F${i}`]=[];
                    }
            }
        }
        for(let i=0;i<matr.length;i++){
            for(let j=0;j<matr.length;j++){
                if(matr[i][j]=="="){
                    Object.keys(Graf).forEach(el => {
                        let str = el;
                        if(str.split(" ").indexOf(`F${i}`)>=0){
                            if(CheckGG(j)){
                                CreateVertexG(i, j,el);
                            }
                            else
                            {
                                let s=el + ` G${j}`;
                                delete Graf[el];
                                Graf[s] = [];
                            }
                        }
                    });
                }
            }
        }
    }
    //функция добавления остальных вершин, которые имеют пустоту( нуленые строки и столбцы)
    function AddRestVertex(matr){
        //Добавление остальных вершин Fi
        for(let i=0;i<matr.length;i++){
            let flagF = true;
            for(let j=0;j<matr.length;j++){
                if(matr[i][j]!=0){
                    flagF=false;
                }
            }
            if(flagF){
                Graf[`F${i}`]=[];
            }
        }
        //добавление остальных вершин Gj
        for(let j=0;j<matr.length;j++){
            let flagG = true;
            for(let i=0;i<matr.length;i++){
                if(matr[i][j]!=0){
                    flagG=false;
                }
            }
            if(flagG){
                Graf[`G${j}`]=[];
            }
        }
    }
    //функция создания и объединения всех вершин, в общий граф
    //(вершины, вершины которые соединили) + (вершины, которые не соединили) + (остальные вершины (которые имеют нуленые строки и столбцы))
    function CreateVertex(matr){
        СonnectionVertex(matr);
        for(let i=0;i<matr.length;i++){
            for(let j=0;j<matr.length;j++){
                let flag=0
                if(matr[i][j]=="<")
                {
                    Object.keys(Graf).forEach(e => {
                        if(e.indexOf(`G${j}`)>=0){
                            flag=1;
                        }
                    });
                    if(flag==0){
                        Graf[`G${j}`] = [];
                    }
                }
                else
                if(matr[i][j]==">")
                {
                    Object.keys(Graf).forEach(e => {
                        if(e.indexOf(`F${i}`)>=0)
                        {
                            flag=1;
                        }
                    });
                    if(flag==0){
                        Graf[`F${i}`] = [];
                    }
                }
            }
        }
        AddRestVertex(matr);
    }
    //проверка на сущестрование пути из вершины el (значения) в вершину е (ключ)
    function Check(e,el){
        let status = false;
        Object.values(Graf[e]).forEach(g => {
            if(el==g) status = true;
        });
        return status;
    }
    // рисование дуг для каждой вершины
    function DrawGraf(matr){
        let k=0;
        for(let i=0;i<matr.length;i++){
            k=0;
            for(let j=0;j<matr.length;j++){
                if(matr[i][j]=="<"){
                        Object.keys(Graf).forEach(e => {
                                if(e.split(" ").indexOf(`G${j}`)>=0)
                                {
                                    Object.keys(Graf).forEach(el => {
                                        if(el.split(" ").indexOf(`F${i}`)>=0 && !Check(e,el)) Graf[e].push(el);
                                    });
                                }

                        });
                }
                else
                if(matr[i][j]==">"){
                    Object.keys(Graf).forEach(e => {
                        if(e.split(" ").indexOf(`F${i}`)>=0)
                        {
                            Object.keys(Graf).forEach(el => {
                                if(el.split(" ").indexOf(`G${j}`)>=0 && !Check(e,el)) Graf[e].push(el);
                            });
                        }

                });
            }
            }
        }
    }
    // функция, которая удаляет связи между вершинами
    function CheckVertex(graf){
        const graf_ = graf;
        console.log(graf);
        Object.keys(graf_).forEach(el => {
            let keys = el;
            console.log(graf_);
                // if( Object.values(graf_[keys]).length==0)
                // {
                    Object.keys(graf_).forEach(ell => {
                        graf_[ell].forEach(e => {
                            if(e.indexOf(keys)>=0){
                                graf_[ell] = graf_[ell].filter(elem => elem!=e);
                                //Object.values(Graf[ell]) = filtered;
                            }

                        });
                    });
        });
        
    }
    //функция проверки графа на ацикличность
    function CheckCicl(){
        let flags=true;
        Object.keys(Graf).forEach(el =>{
            if(Object.values(Graf[el]).length!=0){
                flags=false;
            }
        });
        return flags;
    }
    //функция вывода путей для каждой вершины, если граф ацикличный
    function printPathsInDAG(matr){
        if(CheckCicl){
            findLongestPath(matr);
        }
        else
            answer='Ошибка';
    }

    function Functions(matr, symbols) {
        const n = symbols.length;
        let F = new Array(n);
        let G = new Array(n);
        for (let i=0; i<n; i++) {
            F[i]=1;
            G[i]=1;
        }
        let flag = true;
        let i=0;
        while (flag) {
            flag = false;
        for (let i=0; i<n; i++) {
            for (let j=0; j<n; j++) {
                if (matr[i][j] == '>' && F[i]<=G[j]) {
                    F[i]=G[j]+1;
                    flag = true;
                }
        }
    }
    for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
            if (matr[j][i] == '<' && F[j]>=G[i]) {
                G[i]=F[j]+1;
                flag = true;
            }
        }
    }  
    for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
            if (matr[i][j] == '=' && F[i]!=G[j]) {
                flag = true;
                const max = Math.max(F[i],G[j]);
                F[i]=max;
                G[j]=max;
            }
        }
    }
    for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
            if (matr[j][i] == '=' && F[j]!=G[i]) {
                flag = true;
                const max = Math.max(F[i],G[j]);
                F[i]=max;
                G[j]=max;
            }
        }
    }
    i++;
    }
    return [F, G];
}

    function simplePrecedence(matr, symbols, str) {
        console.log(matr);
        let L = [];
        let answer = '';
        L.push(str[0]);
        let i = 1;
        while (L.length) {
            //console.log(matr[symbols.indexOf(L[L.length-1])][symbols.indexOf(str[i])]);
            if (matr[symbols.indexOf(L[L.length-1])][symbols.indexOf(str[i])] == 0) {
                answer='Ошибка';
                L=[];
            }
            else if (matr[symbols.indexOf(L[L.length-1])][symbols.indexOf(str[i])] == '>' || (L.length && i == str.length)) {
                let j=L.length-1;
                if (j) 
                {
                    while (matr[symbols.indexOf(L[j-1])][symbols.indexOf(L[j])] != '<' && j>1) j--;
                    if (j==1 && matr[symbols.indexOf(L[j-1])][symbols.indexOf(L[j])] != '<') j--;
                }
                const m = productionsNumbered.find(el => {
                    return Object.values(el)[0].join('') == L.slice(j).join('')
                });
                if (m) {
                    L.splice(j, L.length, ...Object.keys(m)); // <-- свертка
                    answer += (productionsNumbered.indexOf(m)+1);
                }
                else L.pop();
            }
            else {
                L.push(str[i]);
                i++;
            }
            console.log(L);
            console.log(i);
        }
        return answer
    }

    function strTransform(omega) {
        let omegaNew = omega.replaceAll("a", "И");
        omegaNew = omegaNew.replaceAll("b", "И");
        omegaNew = omegaNew.replaceAll("c", "И");

        let str = [];
        for (let i=0; i<omegaNew.length; i++) {
            if (i+1 < omegaNew.length) {
                if (symbols.indexOf(omegaNew.slice(i,i+2)) >= 0) {
                    str.push(omegaNew.slice(i,i+2));
                    i++;
                }
                else str.push(omegaNew[i]);
            }
            else str.push(omegaNew[i]);
        }
        return str;
    }

    function isTerm(el) {
        if (T.indexOf(el) < 0) return false;
        else return true;
    }

    function uniq_fast(a) { // вспомогательная функция, исключает повторяющиеся элементы из массива
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for(var i = 0; i < len; i++) {
             var item = a[i];
             if(seen[item] !== 1) {
                   seen[item] = 1;
                   out[j++] = item;
             }
        }
        return out;
    }
}

const form = document.getElementById('downwardParser');
form.addEventListener('submit', Compilation__2)
