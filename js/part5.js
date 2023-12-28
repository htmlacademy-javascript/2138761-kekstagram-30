import {getRandomPhotos,sortArray,debounceFunc} from './util.js';

let photos=[];
let counter=0;let commentsCurrent;let commentsElement=[];
let addedChildrenCounter=0;
let loadedDataLength;

function sortRandom(){
    
    if (document.querySelector('#filter-default').classList.contains('img-filters__button--active')){
        document.querySelector('#filter-default').classList.remove('img-filters__button--active');
    }
    if (document.querySelector('#filter-discussed').classList.contains('img-filters__button--active')){
        document.querySelector('#filter-discussed').classList.remove('img-filters__button--active');  
    }
    document.querySelector('#filter-random').classList.add('img-filters__button--active');
    let randIndex=getRandomPhotos (loadedDataLength);
    
    
    for (let i=1;i<=addedChildrenCounter;i++){
        let pictureElements=document.querySelector('.pictures').lastElementChild ;
       
       pictureElements.remove();
    }
    addedChildrenCounter=0;
  
    for (let i=0;i<randIndex.length;i++){
        addedChildrenCounter++;
   document.querySelector('.pictures').append(createImg(randIndex[i]));}  
}
function sortDiscussed(){
    if (document.querySelector('#filter-random').classList.contains('img-filters__button--active')){
        document.querySelector('#filter-random').classList.remove('img-filters__button--active');
    }
    if (document.querySelector('#filter-default').classList.contains('img-filters__button--active')){
        document.querySelector('#filter-default').classList.remove('img-filters__button--active');  
    }  
    document.querySelector('#filter-discussed').classList.add('img-filters__button--active'); 
   let utilArray=[]; 
  for (let i=0;i<photos.length;i++){
    utilArray[i]=photos[i].comments.length;}
let utilArray1=sortArray(utilArray,true);

for (let i=1;i<=addedChildrenCounter;i++){
    let pictureElements=document.querySelector('.pictures').lastElementChild ;  
   pictureElements.remove();
}
addedChildrenCounter=0;
for (let i=0;i<utilArray1.length;i++){
for(let j=0;j<photos.length;j++){
    if(photos[j].comments.length==utilArray1[i]){
        addedChildrenCounter++;
        document.querySelector('.pictures').append(createImg(j));  
      }
            }
                 }
                      }
function sortDefault(){
    if (document.querySelector('#filter-random').classList.contains('img-filters__button--active')){
        document.querySelector('#filter-random').classList.remove('img-filters__button--active');
    }
    if (document.querySelector('#filter-discussed').classList.contains('img-filters__button--active')){
        document.querySelector('#filter-discussed').classList.remove('img-filters__button--active');  
    }  
    document.querySelector('#filter-default').classList.add('img-filters__button--active'); 
    for (let i=1;i<=addedChildrenCounter;i++){
        let pictureElements=document.querySelector('.pictures').lastElementChild ;
       
       pictureElements.remove();
    }
    picturesDownload();
}
function createImg(num){
   
    let pictureTemplate=document.querySelector('#picture');
	
	 let pictureCurrent=pictureTemplate.content.cloneNode(true);
	 pictureCurrent.querySelector('.picture__img').src=photos[num]['url'];
     pictureCurrent.querySelector('.picture__comments').textContent=photos[num].comments.length;
     pictureCurrent.querySelector('.picture__likes').textContent=photos[num]['likes'];
     pictureCurrent.querySelector('.picture__img').id=photos[num]['id'];
   
   
     return pictureCurrent;
}

document.querySelector('#filter-default').addEventListener('click',debounceFunc(sortDefault,500));

document.querySelector('#filter-discussed').addEventListener('click',debounceFunc(sortDiscussed,500));

document.querySelector('#filter-random').addEventListener('click', debounceFunc(sortRandom,500));

document.querySelector('.comments-loader').addEventListener('click',(e)=>{
    document.querySelector('.social__comments').replaceChildren();
    for (let i=1;i<=5;i++)  {
        counter++;

        if (counter==commentsElement.length){
            if (!document.querySelector('.comments-loader').classList.contains('hidden')) {
             document.querySelector('.comments-loader').classList.add('hidden')}
             document.querySelector('.social__comment-shown-count').textContent=counter;
        }  
     if (counter>commentsElement.length){
       if (!document.querySelector('.comments-loader').classList.contains('hidden')) {
        document.querySelector('.comments-loader').classList.add('hidden')}
        counter--;
        document.querySelector('.social__comment-shown-count').textContent=counter;
        return;
       }
     
       document.querySelector('.social__comments').append(commentsElement[counter-1]);
     }
     document.querySelector('.social__comment-shown-count').textContent=counter; 
})
function commentsCreate(comments){
    counter=0;
    if (comments.length==0){document.querySelector('.social__comments').replaceChildren();
    document.querySelector('.social__comment-shown-count').textContent='0';
    document.querySelector('.comments-loader').classList.add('hidden');
    return}
    document.querySelector('.social__comments').replaceChildren();

    for (let i=0;i<comments.length;i++){
        let liNew=document.createElement('li');
        let pNew=document.createElement('p');
       let imgNew=document.createElement('img');
       imgNew.src=comments[i].avatar;
        liNew.classList.add('social__comment');
        pNew.classList.add('social__text');
        pNew.textContent=comments[i].message;
        imgNew.alt='Аватар комментатора фотографии';
        imgNew.style.width='35px';
        imgNew.style.height='35px';
        liNew.append(imgNew,pNew);
        commentsElement.push(liNew);}  

    if (comments.length<=5){
        document.querySelector('.comments-loader').classList.add('hidden');
        document.querySelector('.social__comment-shown-count').textContent=comments.length;
        for (let i=0;i<comments.length;i++) {counter++;
        document.querySelector('.social__comments').append(commentsElement[i]);}
    }
    if (comments.length>5) {
        counter=0;
        if (document.querySelector('.comments-loader').classList.contains('hidden')){
        document.querySelector('.comments-loader').classList.remove('hidden');}
        for (let i=0;i<5;i++){counter++;
            document.querySelector('.social__comments').append(commentsElement[i]);
        }
        document.querySelector('.social__comment-shown-count').textContent=counter;
    }
}

       

	function picturesDownload () {fetch('https://30.javascript.pages.academy/kekstagram/data')
     .then((res)=>{
        if (res.ok){console.log(res.status);return res.json();} else {
		 let downloadErrorTemplate=document.querySelector('#data-error');
		 let downloadErrorClone=downloadErrorTemplate.content.cloneNode(true);
		 document.querySelectorAll('body')[0].append(downloadErrorClone);
		 setTimeout(()=>{document.querySelectorAll('body')[0].lastElementChild.remove()},5000)
	 }
    })
	 .then((data)=>{ photos=structuredClone(data);
         loadedDataLength=photos.length;
        addedChildrenCounter=0;
    
     
     document.querySelector('.img-filters').classList.remove('img-filters--inactive');
	for(let i=0;i<photos.length;i++){
        addedChildrenCounter++;
     document.querySelector('.pictures').append(createImg(i));} 
	 })
     .catch((error)=>{ let downloadErrorTemplate=document.querySelector('#data-error');
     let downloadErrorClone=downloadErrorTemplate.content.cloneNode(true);
     document.querySelectorAll('body')[0].append(downloadErrorClone);
     setTimeout(()=>{document.querySelectorAll('body')[0].lastElementChild.remove()},5000)
 });
}
  picturesDownload();
	document.querySelector('.pictures').addEventListener('click',(e)=>{
        if (!e.target.classList.contains('picture__img')){
            return;} 
        document.querySelector('.big-picture__img').firstElementChild.src=e.target.src;
        document.querySelector('.big-picture__img').firstElementChild.id=e.target.id;
      
        document.querySelectorAll('body')[0].classList.add('modal-open');
        document.querySelector('.big-picture').classList.remove('hidden');
        
       for (let i=0;i<photos.length;i++) {
        if(document.querySelector('.big-picture__img').firstElementChild.id==photos[i]['id']){
            document.querySelector('.social__comment-total-count').textContent=photos[i].comments.length;
            document.querySelector('.likes-count').textContent=photos[i].likes;
            document.querySelector('.social__caption').textContent=photos[i].description;
            commentsCurrent=photos[i].comments;
            commentsElement=[];
           commentsCreate(commentsCurrent);
        }
       }
    }); 
    document.querySelector('.big-picture__cancel').addEventListener('click',(e)=>{
        document.querySelectorAll('body')[0].classList.remove('modal-open');
        document.querySelector('.big-picture').classList.add('hidden');   
    });