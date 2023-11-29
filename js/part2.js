
let inputValidity=[];let hashFocus;let commentsFocus;
let inpFields=document.querySelector('.img-upload__text');
let hashTags=inpFields.querySelector('.text__hashtags');
let comments=inpFields.querySelector('.text__description');
hashTags.addEventListener('focus',(e)=>{hashFocus=true;});
hashTags.addEventListener('blur',(e)=>{hashFocus=false;});
comments.addEventListener('focus',(e)=>{commentsFocus=true;});
comments.addEventListener('blur',(e)=>{commentsFocus=false;});

export {hashFocus,commentsFocus};

let customStyle = document.createElement('style');

customStyle.innerHTML = '.custom { border:3px solid red; }';
document.querySelectorAll('head')[0].appendChild(customStyle);


 
function setCustomValidity(data){
    if (!data[0]){hashTags.classList.add('custom');} else {
        if(hashTags.classList.contains('custom')){hashTags.classList.remove('custom')}
    }
    if (!data[1]){comments.classList.add('custom');} else {
        if(comments.classList.contains('custom')){comments.classList.remove('custom')}
    }

}  
function getRepeats(data){
    let repeatsYes;
    if (data.length==0) {return repeatsYes=false;}
    let repeats=[];
    let dataCopy=data.map((x)=>x);
    while (dataCopy.length!==0) {
     let counter=0; 
     let element=dataCopy[0];console.log(element);
     dataCopy.forEach((x)=>{if(x===element){counter++;console.log(counter)}})
     dataCopy=dataCopy.filter( (item)=> {
       return item !== element});
      console.log(repeats);
      repeats.push(counter);
      }
      for (let i=0;i<repeats.length;i++) {if (repeats[i]>1) {repeatsYes=true;return repeatsYes;}
      }
      return repeatsYes=false;
  }
  function charCodeCheck(str){
    let result=true;
    if ((str.length==1)||(str.length>20)) {inputValidity[0]=false;return;}
    for (let i=1;i<str.length;i++){if(
        ((str.charCodeAt(i)>=48)&&(str.charCodeAt(i)<=57))||
        ((str.charCodeAt(i)>=65)&&(str.charCodeAt(i)<=90))||
        ((str.charCodeAt(i)>=97)&&(str.charCodeAt(i)<=122))||
        ((str.charCodeAt(i)>=128)&&(str.charCodeAt(i)<=159))||
        ((str.charCodeAt(i)>=160)&&(str.charCodeAt(i)<=175))||
        ((str.charCodeAt(i)>=224)&&(str.datacharCodeAt(i)<=239))||
        str.charCodeAt(i)==240||str.charCodeAt(i)==241
        ){} else {result=false;}}
        if (result){return true} else {return false}
  }
function otherParametersCheck (data){
    if (data.length==0) {inputValidity[0]=true;return;}
   
    if (data.length>5) {inputValidity[0]=false;return;} else {
     data.forEach((element)=>{if(element.charCodeAt(0)!=35){inputValidity[0]=false;return;}
    else {if(charCodeCheck(element)){{inputValidity[0]=true}} else {inputValidity[0]=false}

    }}) ;  
    }
}
let submitButton=document.querySelector('.img-upload__submit');
submitButton.addEventListener('click',(e)=>{
   
    e.preventDefault();
  
    let hashArray=hashTags.value.split(' ');
    if (comments.value.length>140){inputValidity[1]=false;}else{inputValidity[1]=true;};
    hashArray=hashArray.filter((item)=> {
        return item !==''});
   for (let i=0;i<hashArray.length;i++) {
   let toLower=hashArray[i].toLowerCase();
   hashArray[i]=toLower;
   }
   let noRepeat=getRepeats(hashArray);
   if (noRepeat){inputValidity[0]=false;} else
   {otherParametersCheck(hashArray);
   console.log(inputValidity[0]);
} 
setCustomValidity(inputValidity);

if (inputValidity[0]==false||inputValidity[1]==false) {e.preventDefault();} else {
let formData=new FormData();
formData.append('hashtags', hashTags.value);
formData.append('description',comments.value);
//window.location.href='https://30.javascript.pages.academy/kekstagram/data';
//fetch('https://30.javascript.pages.academy/kekstagram',
//{method: 'POST',
//body: formData,})

//.then((response)=>{if(!response.ok){throw 'ОШИБКА'}});
}
})
