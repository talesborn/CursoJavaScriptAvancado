
var list = [
    {desc:'arroz', quant:'1', valor:'5.40'},
    {desc:'cerveja', quant:'12', valor:'1.99'},
    {desc:'carne', quant:'1', valor:'15.00'}
];

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].valor * list[key].quant;
    }
    document.getElementById('totalValue').innerHTML = formatValue(total);
}

function setList(list){
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>'
    for(var key in list){
        table += '<tr><td>'+formatDesc(list[key].desc)+'</td><td>'+formatQuant(list[key].quant)+'</td><td>'+formatValue(list[key].valor)+'</td><td><button onclick="setUpdate('+key+');">Edit</button> | <button onclick="deleteData('+key+');">Delete</button></td></tr>'
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatQuant(quant){
    return parseInt(quant);
}

function formatValue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".",",");
    str = 'R$ '+str;
    return str;
}

function addData(){
    if(!validation()){
        return;
    }
    var desc = document.getElementById('desc').value;
    var quant = document.getElementById('quant').value;
    var valor = document.getElementById('valor').value;

    resetForm();
    list.unshift({desc,quant,valor});
    setList(list);
}

function setUpdate(id){
    var obj = list[id];
    document.getElementById('desc').value = obj.desc;
    document.getElementById('quant').value = obj.quant;
    document.getElementById('valor').value = obj.valor;
    document.getElementById('btnUpdate').style.display = 'inline-block';
    document.getElementById('btnAdd').style.display = 'none';

    document.getElementById('inputIDUpdate').innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'"/>';
}

function resetForm(){
    document.getElementById('desc').value = '';
    document.getElementById('quant').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnAdd').style.display = 'inline-block';

    document.getElementById('inputIDUpdate').innerHTML = '';
    document.getElementById('errors').style.display = 'none';
}

function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById('idUpdate').value;
    var desc = document.getElementById('desc').value;
    var quant = document.getElementById('quant').value;
    var valor = document.getElementById('valor').value;

    list[id] = {desc,quant,valor};
    resetForm();
    setList(list);
}

function deleteData(id){
    if(confirm('Tem certeza que quer deletar esse registro?')){
        if(id === list.length - 1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id+1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

function validation(){
    var desc = document.getElementById('desc').value;
    var quant = document.getElementById('quant').value;
    var valor = document.getElementById('valor').value;
    var errors = '';

    if(desc === ''){
        errors += '<p> Preencha a Descrição</p>';
    }
    if(quant === ''){
        errors += '<p> Preencha a Quantidade</p>';
    }else if(quant != parseInt(quant)){
        errors += '<p> Preencha uma Quantidade válida</p>';
    }
    if(valor === ''){
        errors += '<p> Preencha o Valor</p>';
    }else if(valor != parseFloat(valor)){
        errors += '<p> Preencha um Valor válida</p>';
    }

    if(errors != ""){
        document.getElementById('errors').style.display = 'block';
        document.getElementById('errors').style.backgroundColor = 'rgba(85,85,85,0.3)';
        document.getElementById('errors').style.color = 'white';
        document.getElementById('errors').style.padding = '10px';
        document.getElementById('errors').style.borderRadius = '13px';
        document.getElementById('errors').innerHTML = "<h3>Erros:</h3>"+ errors;
        return 0;
    }else{
        return 1;
    }
}

function deleteList(){
    if(confirm("Quer mesmo deletar essa lista?")){
        list = [];
        setList(list);
    }
}

function saveListStorage(list){
    var jsonString = JSON.stringify(list);
    localStorage.setItem('list', jsonString);
}

function initListStorage(){
    var testList = localStorage.getItem('list');
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();
