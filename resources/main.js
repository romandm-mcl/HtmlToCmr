const objCMR={
    plomba:'',
    nrRef:'',
    brama:'',
	data:'',
	kodkp:0,
    kraj:[{
        name:'',
        ilepalet:0,
        ilepaczek:0,
        printed:true,
    }],
	getAllKodKP(){
		let result = [];
		const item=this.kraj;
		for( i=0; i<item.length;i++){
			if (item[i].name==='') continue;
			result.push(`${this.data}/${item[0].name}/KP${Number(this.kodkp)+i}`);
		}
		return result.toString().replace(/,/g," ");
	}
  }

let memoriesList =[];


// ------------  kod ----------------------
function renderMemories(ObjParm){
    const memories = document.querySelector('#forMemories');
    let sumPalet =  0;
    let sumKorobok = 0;
    let strany='';
    const idMem = Date.now();
    const arrTemp=ObjParm.kraj;
    // console.log(allData);
    for (item of arrTemp){
        if (item.name==='') continue;
        sumKorobok += Number( item.ilepaczek);
        sumPalet += Number(item.ilepalet);
        const str=item.name==='BG-ECONT'?'BGecont':item.name.split('-')[0];
        strany += `${str} - ${item.ilepalet} `;
    }
    let memHTML = `
            <div class="otvety" id="${idMem}">
                <div id="rbut">
                    <input type="radio" id="together" name="${idMem}" value="together" data-action="together" checked>
                    <label for="together" ><- Сумма</label>
                    <label for="separate">Порознь -></label>
                    <input type="radio" id="separate" name="${idMem}" value="separate" data-action="separate">
                </div>
                <div id="typMemoryVisial">
                    <p id="kwit">${ObjParm.getAllKodKP()}</p>
                    <p># ${ObjParm.fullData}</p>
                    <p>Suma palet : ${sumPalet}</p>
                    <p>Suma korobok : ${sumKorobok}</p>
                    <p>${strany}</p>
                </div>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./resources/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>`;
    memories.insertAdjacentHTML('beforeend',memHTML);
}

function selectTypMemoryVisial(event){
    // console.log(event.target.dataset.action)
    if (event.target.dataset.action !== 'separate'&&event.target.dataset.action !== 'together') return;
    
    const  nodeParent = event.target.closest('.otvety');
    let tmpNode = nodeParent.querySelector('#typMemoryVisial');
    // console.log(event.target.dataset.action);
    // tmpNode.remove();
    // tmpNode='';
    // if (event.target.dataset.action !== 'together'){
    //     tmpNode=`
    //     <div id="typMemoryVisial">
    //         <p>Suma palet</p>
    //         <p>Suma korobok</p>
    //         <p>Strany</p>
    //     </div>`;
    // } else
    // if (event.target.dataset.action !== 'separate'){
    //     tmpNode=`
    //     <div id="typMemoryVisial">
    //         <p>BG-9</p>
    //         <p>BG-9</p>
    //         <p>BG-9</p>
    //         <p>BG-9</p>
    //     </div>`;
    // }
    // nodeParent.insertAdjacentHTML('beforeend',tmpNode);
}

function deleteMem(event){
    if (event.target.dataset.action !== 'delete') return;
    const parenNode = event.target.closest('.otvety');
    parenNode.remove();
}

function submitForm(){
    const myObjParm = readingALLQuery();
    let parametry = new URLSearchParams();
    let parJson= JSON.stringify(myObjParm);
    parametry.append('prm',parJson);
    window.open("./resources/collector.html?" + parametry);
	document.querySelector('#kwit').innerHTML=myObjParm.getAllKodKP();
    renderMemories(myObjParm);
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
        console.log(word);    
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