
function resetEffects() {
let effectsItems=['effects__preview--chrome','effects__preview--sepia',
'effects__preview--marvin','effects__preview--phobos','effects__preview--heat',];
let previewImg=document.querySelector('.img-upload__preview').firstElementChild;

effectsItems.forEach((element)=>{
  if (previewImg.classList.contains(element)){
    previewImg.classList.remove(element);console.log('removed class-- '+element);
  }

});

}
let scaleControlValue;let scaleNumber;
function resetScale () {scaleControlValue=document.querySelector('.scale__control--value');
scaleControlValue.value='100%';scaleNumber='';
document.querySelector('.img-upload__preview').firstElementChild.style.transform='scale(1)';

}
 let inpChange=document.querySelector('#upload-file');
  let myBody= document.querySelectorAll('body');
  inpChange.addEventListener('change',onChangeFunc);
   function onChangeFunc (e) {
    resetScale();resetEffects();sliderStyleSelect ('');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
  
   myBody[0].classList.add('modal-open');
  }

   document.addEventListener('keydown',(e)=> {
if (e.key==='Escape'){document.querySelector('.img-upload__overlay').classList.add('hidden');
myBody[0].classList.remove('modal-open');inpChange.value='';

 }})
   
 document.querySelector('#upload-cancel').addEventListener('click',(()=>{
  document.querySelector('.img-upload__overlay').classList.add('hidden');
 myBody[0].classList.remove('modal-open');
 }))
 let plusScaleButton=document.querySelector('.scale__control--bigger');
let minusScasleButton=document.querySelector('.scale__control--smaller');
scaleControlValue=document.querySelector('.scale__control--value');
 scaleNumber='';
let scaleCurrent=scaleControlValue.value;
plusScaleButton.addEventListener('click',(()=>{
 scaleNumber='';scaleCurrent=scaleControlValue.value;
  for (let i=0;i<(scaleCurrent.length-1);i++){
    scaleNumber=scaleNumber+scaleCurrent[i]
  }
scaleNumber=parseInt(scaleNumber);
scaleNumber+=25;
if (scaleNumber>100){scaleNumber=100;}
scaleControlValue.value=scaleNumber+'%';

let previewImg=document.querySelector('.img-upload__preview').firstElementChild;

//previewImg.classList.add('effects__preview--marvin');
previewImg.style.transform='scale'+'('+scaleNumber/100+')';
}))
minusScasleButton.addEventListener('click',(()=>{
  scaleNumber='';scaleCurrent=scaleControlValue.value;
  for (let i=0;i<(scaleCurrent.length-1);i++){
    scaleNumber=scaleNumber+scaleCurrent[i]
  } 
  scaleNumber=parseInt(scaleNumber);
scaleNumber-=25;
if (scaleNumber<25){scaleNumber=25;}
scaleControlValue.value=scaleNumber+'%';

let previewImg=document.querySelector('.img-upload__preview').firstElementChild;

previewImg.style.transform='scale'+'('+scaleNumber/100+')'; 
}))
function createSlider (min,max,step,start) {
  const sliderElement=document.querySelector('.effect-level__slider');
sliderElement.id='slider-fit';
noUiSlider.create(sliderElement,{
  connect: 'lower',
  step: step,
  range: {
      min: min,
      max: max,
  },
  start: start,
});
}

function deleteFilter () { let previewImg=document.querySelector('.img-upload__preview').firstElementChild;
if (previewImg.style.filter){
  previewImg.style.removeProperty('filter'); }}

function sliderStyleSelect (effectStyle){
 
  switch (effectStyle) {
      case '' :
          deleteFilter () ; 
         document.querySelector('#effect-none').checked=true;
          sliderElement.style.display='none';
          break;
      case 'effects__preview--sepia' :
          sliderElement.noUiSlider.destroy();
          deleteFilter () ;
          createSlider (0,1,0.1,1);
          sliderElement.noUiSlider.on('set',effectProcessing);
          break;
      case 'effects__preview--marvin' :
          sliderElement.noUiSlider.destroy();
          deleteFilter () ;
          createSlider (0,100,1,100);
          sliderElement.noUiSlider.on('set',effectProcessing);
          break;
      case 'effects__preview--phobos' :
          sliderElement.noUiSlider.destroy();
          createSlider (0,3,0.1,3);
          sliderElement.noUiSlider.on('set',effectProcessing);
          break;
      case 'effects__preview--chrome' :
          sliderElement.noUiSlider.destroy();
          deleteFilter () ;
          createSlider (0,1,0.1,1);
          sliderElement.noUiSlider.on('set',effectProcessing);
          break;
      case 'effects__preview--heat'   :
          sliderElement.noUiSlider.destroy();
          deleteFilter () ;
          createSlider (1,3,0.1,3);
          sliderElement.noUiSlider.on('set',effectProcessing);
          break;  
  }
}
function eventAdder (element,classToAdd) {element.addEventListener('click',((e)=>{resetEffects();
  let previewImg=document.querySelector('.img-upload__preview').firstElementChild;
  sliderStyleSelect (classToAdd);
  previewImg.classList.add(classToAdd);sliderElement.noUiSlider.set(100);
  sliderElement.style.display='flex';}))}
let effectNonButton=document.querySelector('#effect-none');
let effectChromeButton=document.querySelector('#effect-chrome');
let effectSepiaButton=document.querySelector('#effect-sepia');
let effectMarvinButton=document.querySelector('#effect-marvin');
let effectPhobosButton=document.querySelector('#effect-phobos');
let effectHeatButton=document.querySelector('#effect-heat');
effectNonButton.addEventListener('click',((e)=>{resetEffects();
  classToAdd=''; sliderStyleSelect (classToAdd); 
  sliderElement.style.display='none'; }))
eventAdder(effectSepiaButton,'effects__preview--sepia');
eventAdder(effectMarvinButton,'effects__preview--marvin');
eventAdder(effectPhobosButton,'effects__preview--phobos');
eventAdder(effectChromeButton,'effects__preview--chrome');
eventAdder(effectHeatButton,'effects__preview--heat');
function effectProcessing (){let sliderCurrent=sliderElement.noUiSlider.get();
  let previewImg=document.querySelector('.img-upload__preview').firstElementChild;
  let effectsItems=['effects__preview--chrome','effects__preview--sepia',
 'effects__preview--marvin','effects__preview--phobos','effects__preview--heat',];
 let j=false;
 effectsItems.forEach((element)=>{
     if (previewImg.classList.contains(element)){j=true;console.log(element+' --текущий класс')
 switch (element) {
    case 'effects__preview--sepia' :
   previewImg.style.filter = 'sepia('+sliderCurrent+')';
   break;
   case 'effects__preview--chrome' :
     previewImg.style.filter = 'grayscale('+sliderCurrent+')'; 
     break;
     case 'effects__preview--marvin' :
         previewImg.style.filter = 'invert('+sliderCurrent+'%)'; 
         break;
         case 'effects__preview--phobos' :
             previewImg.style.filter = 'blur('+sliderCurrent+'px)'; 
             break;
             case 'effects__preview--heat' :
                 previewImg.style.filter = 'brightness('+sliderCurrent+')'; 
                 break;
 }
 }  
        }
     )
     if (j===false) {console.log('это-оригинал')}
 }
 const sliderElement=document.querySelector('.effect-level__slider');
 sliderElement.id='slider-fit';
 noUiSlider.create(sliderElement,{
     connect: 'lower',
     range: {
         min: 0,
         max: 100,
     },
     start: 100,
 });
 sliderElement.noUiSlider.on('set',effectProcessing);
 sliderElement.style.display='none';
 