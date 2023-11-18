const getRandom =(a,b)=>{
    const lower=Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper=Math.floor(Math.max(Math.abs(a),Math.abs(b)));
    const result=Math.random()*(upper-lower+1)+lower;
    return Math.floor(result);
    };
        function megaRandomizer (startNumber,endNumber,totalNumber,noRepeat){
    let randomArray=[];
    const number=totalNumber;
    const beginN=startNumber;
    const endN=endNumber;
    if ((Math.abs(Math.abs(endN)-Math.abs(beginN))+1)<number){throw 'error'}
    for(i=1;i<=number;i++) {
    let currentNumber=getRandom(beginN,endN);
    if (noRepeat){
    while (randomArray.includes(currentNumber)){currentNumber=getRandom(beginN,endN)}}
    randomArray.push(currentNumber);
    
     }
     return(randomArray);
    }
    function MessagesMaker (iterator){
    this.id=commentId[iterator-1];
    this.avatar='img/avatar-'+getRandom(1,6)+'.svg';
    this.message=messages[getRandom(0,messages.length-1)];
    this.name=names[getRandom(0,names.length-1)];
    return this;
    }
    function PhotosMaker (id,url,description,likes,comments)
    {this.id=id;
    this.url=url;
    this.description=description;
    this.likes=likes;
    this.comments=comments;
    return this;}
    let id=[]; let urlNumbers=[];let commentId=[];let photosData=[];
    let names=['Хулио','Варвара','Полиграф','Фритц','Коля','Вова','Ангела','Вероника','Клубника','Зайка','Себастиан','Негоро','Алла Пугачева','София Ротару','Филипп','Серёга','Луис Альберто',];
    let messages=['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',];
    let descriptions=['пейзаж','кошки','люди','насекомые','на природе','с высоты птичьего помёта','спорт','автогонки','свадьба',];
    
    // Сколько образцов создать
    let numbersToCreate=25;

    id=megaRandomizer(1,numbersToCreate,numbersToCreate,true);
    commentId=megaRandomizer(1,800,numbersToCreate,true);
    
        for (i=1;i<=numbersToCreate;i++){
        
        let currentComment=new MessagesMaker(i);
        let currentPhotoData=new PhotosMaker(id[i-1],'photos/'+getRandom(1,25)+'.jpg',descriptions[getRandom(0,descriptions.length-1)],getRandom(15,200),currentComment);
        photosData.push(currentPhotoData);
    console.table(photosData[i-1]);
        }
        // Сгенерированные данные занёс в массив photosData