const objCMR={  
    kurier:'LCL',
    plomba:'',
    nrRef:'',
    brama:'',
	data:'',
	kodkp:0,
    kraj:[{
        name:'',
        ilepalet:0,
        ilepaczek:0,
        printed:true
        
    }],
	
  }

let memoriesList = [];  ///array  for mem
let submitCalc = '';
const arrKrajSin=[
    ["BG SPEEDY CZWARTEK PIĄTEK","BG-CP"],
    ["BG SPEEDY SOBOTA-ŚRODA","BG-SS"],
    ["BG ECONT","BGecont"],
    // ["CH SWISSPOST","CH"],
    ["CZ ZAS PRAGA NEHVIZDY pn-czw","ZAS-PCZ"],
    ["CZ ZAS PT i ND (12:00)","ZAS-PN"],
    ["FR LA POSTE","FR"],
    ["GR GENIKI","GR"],
    ["ACS GR","GRacs"],
    ["HR GLS","HR"],
    ["HU GLS","HU"],
    ["HU FOX","HUfox"],
    ["IT BARTOLINI","ITbrt"],
    ["LT DPD","LT"],
    ["IT Inpost","ITinp"],
    ["Sameday RO","ROsd"],
    ["SI GLS","SI"],
    ["RO GLS","RO"],
    ["SK DPD Dolný Hričov","SK"],
    ["ZIL SK/ ZAS SK","SKzas"]
]
// ------------  kod ----------------------
function getAllKodKP(objCMR){
    let result = [];
    const item=objCMR.kraj;
    for( i=0; i<item.length;i++){
        if (item[i].name==='') continue;
        result.push(`${objCMR.data}/${item[i].name}/KP${Number(objCMR.kodkp)+i}`);
    }
    // return result.toString().replace(/,/g," ");
    return result;
}

function findKraj(a='',index=0) {
        const arrKrajSin=[
            ["BG SPEEDY CZWARTEK PIĄTEK","BG-CP"],
            ["BG SPEEDY SOBOTA-ŚRODA","BG-SS"],
            ["BG ECONT","BGecont"],
            // ["CH SWISSPOST","CH"],
            ["CZ ZAS PRAGA NEHVIZDY pn-czw","ZAS-PCZ"],
            ["CZ ZAS PT i ND (12:00)","ZAS-PN"],
            ["FR LA POSTE","FR"],
            ["GR GENIKI","GR"],
            ["ACS GR","GRacs"],
            ["HR GLS","HR"],
            ["HU GLS","HU"],
            ["HU FOX","HUfox"],
            ["IT BARTOLINI","ITbrt"],
            ["LT DPD","LT"],
            ["IT Inpost","ITinp"],
            ["Sameday RO","ROsd"],
            ["SI GLS","SI"],
            ["RO GLS","RO"],
            ["SK DPD Dolný Hričov","SK"],
            ["ZIL SK/ ZAS SK","SKzas"]
        ]

        let result = -1;
        for (let j = 0; j < arrKrajSin.length; j++){
            if (arrKrajSin[j][index] === a) result = j;
            }     
        // const indexKraj=findKraj(div_array[i].querySelector('#country').value);
        //const word =  result < 0 ?'':arrKrajSin[result][(1-Number(index))];
        return result < 0 ?'':arrKrajSin[result][(1-Number(index))];
}

function data1now(full=true){
    var currentTime = new Date();
    const timeZone = "Europe/Warsaw";
    const options = {timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentTime).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
    const formattsmall = new Intl.DateTimeFormat().format(currentTime);    
    return full?formattedDate:formattsmall
}

function isPresent(a,ansv=''){
    return a?a:ansv;
}

function checkEmptyFieldsForm(objAllForms={isEmpty:true}){
    // если передан пустой объект , то аварийное завершение
    if (objAllForms.isEmpty) return -1;
    let result=false;//  если нет пустых полей - ответ false
    
    const arr = objAllForms.kraj;
    // проверк  если вообще 
    if (arr.length<1) {
        window.alert(`не заполнены данные`);
        result = true;
        // window.close();
    }
    // показать сообщение где пустые поля
    arr.forEach((a,index)=>{
        if(a.name===''||a.name===' ') {
            window.alert(`В комплекте ${index+1} не указана страна`);
            // window.close();
            result = true;
        }
        if(a.ilepaczek<1) {
            window.alert(`В комплекте ${index+1} не указана количество пачек`);
            // window.close();
            result = true;
        }
    })
    return result;
}

function saveInLocalStorage() {
	localStorage.setItem('memy', JSON.stringify(memoriesList))
}

function testcmr(){
    const myObjParm = readingALLQuery();
//    for()
}

function findBrama(brama='',str=''){
    if (brama===''&&str==='')return '';
    let result='';
    if(brama===''){
        const startIndex = str.indexOf("BR");
        if (startIndex !== -1) {
        const endIndex = str.indexOf("_", startIndex + 2);
        result = endIndex !== -1 ? str.substring(startIndex + 2, endIndex) : str.substring(startIndex + 2);
        }
    } else result=brama;
    return result;
}

function writeOBJtoCMR(queryKray){
	//if(queryKray.kraj[0].ilepaczek<1||queryKray.kraj[0].ilepalet<1){
    //  window.alert("не указано кол-во палет или пачек");
    //  window.close();
   // }

    let strTmp=isPresent(queryKray.nrRef).replace(/\+/g, " ");
    document.querySelector("#nrref").innerHTML=strTmp;
    //document.querySelector("#plomba").innerHTML=isPresent(queryKray.plomba);
    //document.querySelector("#brama").innerHTML=isPresent(queryKray.brama);
	document.querySelector("#plomba").innerHTML=' ';
    document.querySelector("#brama").innerHTML=' ';
	
    document.querySelector("#datafull").innerHTML=data1now();  
    document.querySelector("#datasmall").innerHTML=data1now(false);    
    document.querySelector("#waga").innerHTML=(queryKray.kraj[0].ilepaczek*1.3).toFixed(2);
    // strTmp = isPresent(queryKray.kraj[0].name).split("-")[0];
    // document.querySelector("#typ-palet1").innerHTML='econt BG';
    document.querySelector("#suma").innerHTML=queryKray.kraj[0].ilepaczek;
    document.querySelector("#ilekartonow1").innerHTML=queryKray.kraj[0].ilepaczek;
    document.querySelector("#ilepaletJed").innerHTML=queryKray.kraj[0].ilepalet;
    document.querySelector("#ilepaletGayL").innerHTML=queryKray.kraj[0].ilepalet;
}

function renderMemoriesHTML(ObjParm,together=true){
    // const memories = document.querySelector('#forMemories');
    const idMem = ObjParm.id;
    const arrTemp=ObjParm.memy.kraj;
    const arrKKP= getAllKodKP(ObjParm.memy);
    
    // header 
    let memHTML1 = `
            <div class="otvety" id="${idMem}">
                <p># ${ObjParm.name}</p>
                <div id="rbut">
                    <input type="radio" id="together" name="${idMem}" value="together" data-action="together" ${together?'checked':''}>
                    <label for="together" ><- Razem</label>
                    <label for="separate">Oprócz -></label>
                    <input type="radio" id="separate" name="${idMem}" value="separate" data-action="separate" ${together?'':'checked'}>
                </div>`;
    // default  or if selected  together  
    let sumPalet =  0;
    let sumKorobok = 0;
    let strany='';
    for (item of arrTemp){
        if (item.name==='') continue;
        sumKorobok += Number( item.ilepaczek);
        sumPalet += Number(item.ilepalet);
        const str=item.name==='BG-ECONT'?'BGecont':item.name.split('-')[0];
        strany += `${str} - ${item.ilepalet} `;
    }
    let memHTML2 = `<div id="typMemoryVisial">  
                        <p id="kwit">${getAllKodKP(ObjParm.memy).toString().replace(/,/g," ")}</p>
                        <p>Suma palet : ${sumPalet}</p>
                        <p>Suma korobok : ${sumKorobok}</p>
                        <p>${strany}</p>
                    </div>`;
    /// if selected "separeted"
    if (!together) {  
                        memHTML2 = `<div id="typMemoryVisial">`;
                        for (let i=0; i<arrTemp.length;i++){
                            memHTML2 +=`<p>${i+1}. ${arrTemp[i].name} - Pal: ${arrTemp[i].ilepalet} - Kart.: ${arrTemp[i].ilepaczek} - KodKP: ${arrKKP[i]}</p>`;
                        }               
                        // <p>Suma palet : ${sumPalet}</p>
                        //<p id="kwit">${arrKKP.toString().replace(/,/g," ")}</p>
                         memHTML2 +=`</div>`;
                    }
    // button remove
    let memHTML3 = `<button type="button" data-action="delete" class="btn-action">
                    <img src="./resources/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>`;   

    // const memHTML = memHTML1 + memHTML2 + memHTML3;
    // memories.insertAdjacentHTML('beforeend',memHTML);
    return memHTML1 + memHTML2 + memHTML3;
}

function selectTypMemoryVisial(event){
    // console.log(event.target.dataset.action)
    if (event.target.dataset.action !== 'separate'&&event.target.dataset.action !== 'together') return;

    //get parent div
    const nodeParent = event.target.closest('.otvety');

    // get id noda
    const idNodeParent = Number(nodeParent.id);

    // get element from array memow
    const mem = memoriesList.find(idmem => idmem.id === idNodeParent);
    
    const vybor = event.target.dataset.action === 'together' ? true:false;
    // get html code memsa
    let htmlCode=renderMemoriesHTML(mem,vybor);
    let endcut = htmlCode.length-6;  // cut  </div>  at the end
    let deli=htmlCode.indexOf('>')+1;//  cut  <div class="otvety" id="${idMem}">  at the beginning

     nodeParent.innerHTML=htmlCode.substring(deli,endcut);
}

function deleteMem(event){
    if (event.target.dataset.action !== 'delete') return;
    const parenNode = event.target.closest('.otvety');
    // get id noda
    const idNodeParent = Number(parenNode.id);
    
    // delete  in array 
    memoriesList = memoriesList.filter( mem => mem.id !== idNodeParent);

    // update  local store
    saveInLocalStorage();

    // remove from  screen
    parenNode.remove();
}

function addNewMemories(myObjParm){
    //check empty Kraj
    
    // new  obj  for save in mem
    const newMem={
        id: Date.now(),
        name: data1now(),
        memy: myObjParm
    }

    // add new memories in array memow
    memoriesList.push(newMem);

    // update  local storage
    saveInLocalStorage();

    // renderMemories(newMem);
    const memories = document.querySelector('#forMemories');
    memories.insertAdjacentHTML('beforeend', renderMemoriesHTML(newMem));
}

function submitForm(){
    const myObjParm = readingALLQuery();
    // проверяем на пустые поля, если есть красим в красный и отменяем открытия страницы для печати
    if (checkEmptyFieldsForm(myObjParm)){
        markGreenRed(false);
        return;
    }
    
	
    let parametry = new URLSearchParams();
    let parJson= JSON.stringify(myObjParm);
    
    parametry.append('prm',parJson);
    window.open("./resources/collector.html?" + parametry);
	document.querySelector('#kwit').innerHTML=getAllKodKP(myObjParm).toString().replace(/,/g," ");
    addNewMemories(myObjParm);
    clearAllInput();
	
}

function removeForm(event){
	const komplet=event.target.closest('fieldset').childNodes[1].innerHTML;
	//console.log(komplet);
	if(window.confirm(`Zdecydowanie chcesz usunąć ten komplet " ${komplet}"?`)){
	 const formToDelete = event.target.closest('form');
	 formToDelete.remove();
	}
	//let tmpSTR=event.target.parentElement.parentElement.childNodes[1].innerHTML;
	//const indxImg=Number(tmpSTR.split(' ')[1]);
	//console.log(indxImg);
	
	//console.dir(event.target.parentElement.parentElement);
	
}

function addMyEvent(parent,str,dellaj,tfunction){
    let inputs = parent.querySelectorAll(str);
    inputs.forEach(input => {
        input.value='';
        input.addEventListener(dellaj, tfunction);
        });
}

function cloneForm() {
    // форма
        var form = document.forms[0];
    // клонируем
        var new_form = form.cloneNode(true);
        new_form.querySelector('#legenda').innerHTML='Komplet '+(document.forms.length);
        new_form.classList.remove("hidden");
        new_form.name='Clone#'+document.forms.length;
    // добавляем прослущку onchange для input-ов в forme
        addMyEvent(new_form,'input:not([type="checkbox"])','change',writeAnwer);

    // addMyEvent  remove Formu
        addMyEvent(new_form,'#delete-form','click',removeForm);

    // if click  na calculator
        addMyEvent(new_form,'#calculator','click',calculator);
        addMyEvent(new_form,'#cancel','click',closeCalcModal);
    // родитель формы
    var parent = form.parentNode;

    // вставляем новую форму в родительский контейнер
    parent.appendChild(new_form);
}

function writeAnwer(){
    const allData=readingALLQuery();
    let sumPalet =  0;
    let sumKorobok = 0;
    let strany='';
    const arrTemp=allData.kraj;
    // console.log(allData);
    for (item of arrTemp){
        if (item.name==='') continue;
        sumKorobok += Number( item.ilepaczek);
        sumPalet += Number(item.ilepalet);
        const str=item.name==='BG-ECONT'?'BGecont':item.name.split('-')[0];
        strany += `${str} - ${item.ilepalet} `;
    }
    markGreenRed();
    document.querySelector('#suma-palet').innerHTML='Palety: ' + sumPalet;
    document.querySelector('#suma-korobok').innerHTML='Kartony: ' + sumKorobok;
    document.querySelector('#strany').innerHTML='Strany: '+strany;
}

function markGreenRed(chek=true){
    const artMain = document.querySelector('#formCreatCMR');
    let allInputy = artMain.querySelectorAll('input[type="text"], input[type="number"]');
    
    allInputy.forEach((item)=>{
        // console.log(item.id+"  = "+item.value);
        if (item.value ===''){
            item.classList.remove('no-empty-green');
            if (!chek) {

                item.classList.add('is-empty-red');
            }
        }else{
            item.classList.add('no-empty-green');
            item.classList.remove('is-empty-red');
        }
    });
}

function readingALLQuery(){
    let newObjQuery = Object.create(objCMR);
    newObjQuery.plomba = document.querySelector('#plomb-number').value;
    newObjQuery.nrRef = document.querySelector('#ref-auto').value;
    newObjQuery.brama = document.querySelector('#brama').value;
	let tt1=data1now().toString().split(" ")[1].toString();
	newObjQuery.kodkp = Number(tt1.replace(/:/g,''));
	newObjQuery.data = data1now(false);
	// read  all form
    let arrValues = [];
    let div_list = document.querySelectorAll('form'); // получаем все элементы Form
    let div_array = Array.prototype.slice.call(div_list); // преобразует в массив
    
    // перебираем массив с создание объектов для каждой формы
    for(var i=0;i<div_array.length;i++){
        // поверка и сокращенная запись страны
        const word = findKraj(div_array[i].querySelector('#country').value);
        const ilePalet=div_array[i].querySelector('#pallet-quantity').value;
        const ilePaczek=div_array[i].querySelector('#box-quantity').value;
        // проверяем будет печататься эта страна в итоговом результате
        const printed=div_array[i].querySelector('#print').checked;
        arrValues.push({
            name:word,
            ilepalet:ilePalet,
            ilepaczek:ilePaczek,
            printed:printed
        });
    }
    // console.log(arrValues);
     newObjQuery.kraj =  arrValues.filter(a=>{
		return !a.name=='';
	});
    return newObjQuery;
}
function clearAllInput(){
	const artMain = document.querySelector('#formCreatCMR');
    let allInputy = artMain.querySelectorAll('input[type="text"], input[type="number"]');
	allInputy.forEach((item)=>{item.value=''}
	);
	markGreenRed();
}
function calculator(event){
    if (event.target.id !== 'calculator') return;
    // console.dir(event.target);
    const parentNode = event.target.closest('span');
    const myDiv = parentNode.childNodes[3];
    submitCalc = myDiv;
    showCalcModal();
    markGreenRed();
 }

function showCalcModal(){
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    modal.style.display = 'block';
    overlay.style.display = 'block';
    body.style.overflow = 'hidden'; // Блокировка прокрутки страницы
    const tValue=(submitCalc.value===0||submitCalc.value==='')?'':submitCalc.value;
    document.getElementById('calc-input').value=tValue;
    modal.querySelector('#calc-input').focus();
    modal.addEventListener('click',clickOverlay);
    modal.addEventListener('keydown',clickKey);
}

function clickOverlay(event){
    if (event.target.id === 'modal') {
        closeCalcModal();
      }
}

function closeCalcModal(){
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    modal.style.display = 'none';
    overlay.style.display = 'none';
    body.style.overflow = 'auto'; // Разблокировка прокрутки страницы
    modal.removeEventListener('click',clickOverlay);
}

function clickKey(event){
    const modal = document.getElementById('modal');
    if (event.key === 'Enter' && modal.style.display === 'block') {
        submitModalCalc();
      }
      
}

function submitModalCalc(event){
    closeCalcModal();
    if(submitCalc==='')return
    const subCalc = document.getElementById('calc-input').value;
    const arrCalc= subCalc.toString().replace('=','').split('+');
    let sumCalc=0;
    for (let i = 0; i < arrCalc.length; i++) {
        const num = parseFloat(arrCalc[i]);
        if (!isNaN(num))  sumCalc += num;
      }
    // console.log(arrCalc);
    
    submitCalc.value=sumCalc;
    submitCalc.focus();
    markGreenRed();
    submitCalc='';
    
}

function navkurbuttonclick(event){
    const buttonclk=event.target.innerHTML;
    // " ".toLowerCase
    const curentButton = `cmr-${buttonclk.toLowerCase()}`;
    const sectionMain=document.querySelector('#main1');
    const artKurierow=sectionMain.querySelectorAll('article');
    // console.log(artKurierow);
    artKurierow.forEach((artItem)=>{
        artItem.classList.add('hidden');
        artItem.classList.remove('active');
        if(artItem.id===curentButton||artItem.id==='forMemories'){
            artItem.classList.remove('hidden');
            artItem.classList.add('active');
        }
    });
    
}
function startWork(){
    cloneForm();
    const memories = document.querySelector('#forMemories');
    if (localStorage.getItem('memy')){
        memoriesList = JSON.parse(localStorage.getItem('memy'));
        memoriesList.forEach(
            mems => {
                // console.log(mems);
                const htmlCode=renderMemoriesHTML(mems);
                // console.log(htmlCode);
                memories.insertAdjacentHTML('beforeend', htmlCode);   
            }
        );
        memories.classList.add('active');
    } 
    const ulMy = document.querySelector('.main-input');
    // addMyEvent(ulMy,'input','change',writeAnwer);
    const navbutton = document.querySelector('.nav-kurierow');
    addMyEvent(navbutton,'button','click',navkurbuttonclick);
    document.querySelector('#forMemories').addEventListener('click',deleteMem);
    document.querySelector('#forMemories').addEventListener('click',selectTypMemoryVisial);

}
