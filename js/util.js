export {getRandomPhotos,sortArray,debounceFunc};

function getRandom (a,b) {
    const lower=Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper=Math.floor(Math.max(Math.abs(a),Math.abs(b)));
    const result=Math.random()*(upper-lower+1)+lower;
    return Math.floor(result);
    };
function getRandomNumbers (startNumber,endNumber,totalNumber,noRepeat){
    let randomArray=[];
    const number=totalNumber;
    const beginN=startNumber;
    const endN=endNumber;
    if ((Math.abs(Math.abs(endN)-Math.abs(beginN))+1)<number){throw 'error'}
    for(let i=1;i<=number;i++) {
    let currentNumber=getRandom(beginN,endN);
    if (noRepeat){
    while (randomArray.includes(currentNumber)){currentNumber=getRandom(beginN,endN)}}
    randomArray.push(currentNumber);
    
     }
     return(randomArray);
    }
    function getRandomPhotos (length)  {
       let total=10;
        let randomIndex=getRandomNumbers (0,(length-1),total,true);
        
        return randomIndex;
    }
    function sortArray(myArr,selector){
        for (let i=0;i<myArr.length;i++){
        let maxNum=myArr[i];
        for (let j=i;j<myArr.length;j++){
        if (selector){if (myArr[j]>maxNum){maxNum=myArr[j];myArr[j]=myArr[i];myArr[i]=maxNum;}} else {
        if (myArr[j]<maxNum){maxNum=myArr[j];myArr[j]=myArr[i];myArr[i]=maxNum;}}}}
       // let myArr1=[];
        for (let i=0;i<myArr.length;i++){
            let current=myArr[i]; 
        }
        let myArr1=[];
        for(let i=0;i<myArr.length;i++){ 
        let currentNum=myArr[i];
        if (i==myArr.length-1) {myArr1.push(currentNum);break}
        for (let j=i+1;j<myArr.length;j++){
        if (currentNum==myArr[j]){continue} else {i=j-1;myArr1.push(currentNum);break}
        }
        }
        return myArr1;}	  
        function debounceFunc ( callback, delay ) {
            let timer;
            return function() {
                clearTimeout(timer);
                timer=setTimeout(callback, delay); 
            };
        }    
        
       
    