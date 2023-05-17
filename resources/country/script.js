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
function findKraj(a='',index=0) {
        let result = -1;
        for (let j = 0; j < arrKrajSin.length; j++){
            if (arrKrajSin[j][index] === a) result = j;
            }     
        return result;
    }

function data1now(full=true){
    var currentTime = new Date();
    const timeZone = "Europe/Warsaw";
    const options = {timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentTime).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
    const formattsmall = new Intl.DateTimeFormat().format(currentTime);    
    return full?formattedDate:formattsmall
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
        const indexKraj=findKraj(div_array[i].querySelector('#country').value);
        const word =  indexKraj < 0 ?'':arrKrajSin[indexKraj][1];
        // console.log(`${indexKraj}    ${word} `);    
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
    // console.log(newObjQuery.kraj)
    // newObjQuery.kraj = 
    // newObjQuery.ilepalet = 
    // newObjQuery.ilepaczek =

    return newObjQuery;
}

function isPresent(a,ansv=''){
    return a?a:ansv;
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
function submitForm(){
    const myObjParm = readingALLQuery();
    let parametry = new URLSearchParams();
    let parJson= JSON.stringify(myObjParm);
    parametry.append('prm',parJson);
    window.open("./resources/collector.html?" + parametry);
	document.querySelector('#kwit').innerHTML=myObjParm.getAllKodKP();
		
}

function testcmr(){
    const myObjParm = readingALLQuery();
    let parametry = new URLSearchParams();
    let parJson= JSON.stringify(myObjParm);
    parametry.append('prm',parJson)
    // console.log(parametry.toString());
    // console.log(parJson);
    window.open("./resources/country/dodatekLCL.html?" + parametry.toString());
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
