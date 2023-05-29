const objCMR={ // 
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

let memoriesList =[];  ///array  for mem

const arrKrajSin=[
    ["BG SPEEDY CZWARTEK PIĄTEK","BG-CP"],
    ["BG SPEEDY SOBOTA-ŚRODA","BG-SS"],
    ["BG ECONT","BG-ECONT"],
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
        result.push(`${objCMR.data}/${item[0].name}/KP${Number(objCMR.kodkp)+i}`);
    }
    // return result.toString().replace(/,/g," ");
    return result;
}

function findKraj(a='',index=0) {
        const arrKrajSin=[
            ["BG SPEEDY CZWARTEK PIĄTEK","BG-CP"],
            ["BG SPEEDY SOBOTA-ŚRODA","BG-SS"],
            ["BG ECONT","BG-ECONT"],
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

function saveInLocalStorage() {
	localStorage.setItem('memy', JSON.stringify(memoriesList))
}

function submitForm1(){
    var arrValues = [];
    var div_list = document.querySelectorAll('form'); // returns NodeList
    var div_array = Array.prototype.slice.call(div_list); // преобразует NodeList в Array
    const plomba = document.querySelector('#plomb-number').value;
    const nrRef = document.querySelector('#ref-auto').value;
    const brama = document.querySelector('#brama').value;

    const arrKrajSin=[
        ["BG SPEEDY CZWARTEK PIĄTEK","BG-CP"],
        ["BG SPEEDY SOBOTA-ŚRODA","BG-SS"],
        ["BG ECONT","BG-ECONT"],
        ["CH SWISSPOST","CH"],
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
        ["IT Inpost","LTinp"],
        ["Sameday RO","ROsd"],
        ["SI GLS","SI"],
        ["RO GLS","RO"],
        ["SK DPD Dolný Hričov","SK"],
        ["ZIL SK/ ZAS SK","SKzas"]
        ]
    function findKraj(a='') {
            let result = -1;
                for (let j = 0; j < arrKrajSin.length; j++){
                    if (arrKrajSin[j][0] === a) result = j;
                    }     
                return result;
    }
    //read all forms
    for(var i=0;i<div_array.length;i++){
        const indexKraj=findKraj(div_array[i].querySelector('#country').value);
        const word =  indexKraj < 0 ? '':arrKrajSin[indexKraj][1];
        // console.log(`${indexKraj}    ${word} `);    
        const ilePalet=div_array[i].querySelector('#pallet-quantity').value;
        const ilePaczek=div_array[i].querySelector('#box-quantity').value;
        const printed=div_array[i].querySelector('#print').checked;
        arrValues.push([word,ilePalet,ilePaczek,printed]);
    }
    let kodKP=2469;
    var parametry = 'prmPlomba='+plomba+'&prmnrRef='+nrRef+'&kodKP='+kodKP+'&prmKrajs='+ arrValues.toString();
    window.open("/resources/collector.html?" + parametry);
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
    //  console.log(arrTemp);
    //  console.log(arrKKP);
    
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
    // new  obj  for save in mem
    const newMem={
        id: Date.now(),
        name: data1now(),
        memy: myObjParm
    }
    // console.log(newMem.memy.kraj)
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
    let parametry = new URLSearchParams();
    let parJson= JSON.stringify(myObjParm);
    parametry.append('prm',parJson);
    window.open("./resources/collector.html?" + parametry);
	document.querySelector('#kwit').innerHTML=getAllKodKP(myObjParm).toString().replace(/,/g," ");
    addNewMemories(myObjParm);
}

function removeForm(event){
	const komplet=event.target.closest('fieldset').childNodes[1].innerHTML;
	//console.log(komplet);
	if(window.confirm(`Вы точно хотите удалить этот комплект " ${komplet}"?`)){
	 const formToDelete = event.target.closest('form');
	 formToDelete.remove();
	}
	//let tmpSTR=event.target.parentElement.parentElement.childNodes[1].innerHTML;
	//const indxImg=Number(tmpSTR.split(' ')[1]);
	//console.log(indxImg);
	
	//console.dir(event.target.parentElement.parentElement);
	
}

function cloneForm() {
    // форма
    var form = document.forms[0];
    // клонируем
    var new_form = form.cloneNode(true);
    // new_form.querySelector('#country').value='';
    // new_form.querySelector('#box-quantity').value='';
    // new_form.querySelector('#pallet-quantity').value='';
    new_form.querySelector('#legenda').innerHTML='Komplet '+(document.forms.length);
   new_form.classList.remove("hidden");
    let inputs = new_form.querySelectorAll('input:not([type="checkbox"])');
    inputs.forEach(input => {
        input.value='';
        input.addEventListener('change', writeAnwer);
        });
     
    // родитель формы
    var parent = form.parentNode;
    // вставляем новую форму в родительский контейнер
    parent.appendChild(new_form);
	inputs=document.querySelectorAll('img');
	 inputs.forEach(img => {
        img.style.display='block';
        img.addEventListener('click',removeForm);
        });
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
    
    document.querySelector('#suma-palet').innerHTML='Palety ' + sumPalet;
    document.querySelector('#suma-korobok').innerHTML='Kartony ' + sumKorobok;
    document.querySelector('#strany').innerHTML=strany;
    
}

function  readingALLQuery(){
    let newObjQuery = Object.create(objCMR);
    newObjQuery.plomba = document.querySelector('#plomb-number').value;
    newObjQuery.nrRef = document.querySelector('#ref-auto').value;
    newObjQuery.brama = document.querySelector('#brama').value;
	let tt1=data1now().toString().split(" ")[1].toString();
	newObjQuery.kodkp = Number(tt1.replace(/:/g,''));
	newObjQuery.data = data1now(false);
	// read  all form
    let arrValues = [];
    let div_list = document.querySelectorAll('form'); // returns NodeList
    let div_array = Array.prototype.slice.call(div_list); // преобразует NodeList в Array
    
    for(var i=0;i<div_array.length;i++){
        // const indexKraj=findKraj(div_array[i].querySelector('#country').value);
        // const word =  indexKraj < 0 ?'':arrKrajSin[indexKraj][1];
        const word = findKraj(div_array[i].querySelector('#country').value);
        // console.log(word);    
        const ilePalet=div_array[i].querySelector('#pallet-quantity').value;
        const ilePaczek=div_array[i].querySelector('#box-quantity').value;
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
    } 


    document.querySelector('#forMemories').addEventListener('click',deleteMem);
    document.querySelector('#forMemories').addEventListener('click',selectTypMemoryVisial);

}

