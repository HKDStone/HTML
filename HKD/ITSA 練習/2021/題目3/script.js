var AllItem= [];
readCSVFile('itemprice.csv');
sessionStorage.clear();
if(sessionStorage.getItem("Drink_List") == null)sessionStorage.setItem("Drink_List","[]");
const Drink_amount  = document.getElementById('nums');
const Drink_size  = document.getElementById('size');
const Drink_sugar = document.getElementById('sugar');
const Drink_ice   = document.getElementById('ice');
const Drink_List  = document.getElementById('item');
const Drink_price = document.getElementById('price');
const Drink_total = document.getElementById('total');
const Buyer_name  = document.getElementById('name');
var   Last_Item   = [];

function readCSVFile(fileURL) {
    fetch(fileURL)
    .then(response => response.text())
    .then(csvData => {
        // Process the CSV data
        processData(csvData);
        update();
    })
    .catch(error => console.error('Error fetching CSV file:', error));
}
function processData(csvData) {
    // Parse CSV data (you can customize options based on your needs)
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');

    // Process each row
    for (let i = 1; i < rows.length; i++) {
    const currentRow = rows[i].split(',');
    AllItem.push(currentRow);
    // Process each cell in the row as needed
    //console.log('Row:', i, 'Data:', currentRow);
    }
}

function update(){
    Drink_ice.value   = 0;
    Drink_sugar.value = 0;
    Drink_List.innerHTML = '<option value="0">請選擇...</option>';
    for(var i = 0 ; i < AllItem.length ; i++)
    {
        if(+AllItem[i][1] == 0 && +AllItem[i][2] == 0) Drink_List.innerHTML += '<option disabled value="'+i+'">'+AllItem[i][0]+'</option>'
        else Drink_List.innerHTML += '<option disable value="'+i+'">'+AllItem[i][0]+'</option>'
    }
    var Buyed = JSON.parse(sessionStorage.getItem("Drink_List"));
    const Buyed_List = document.getElementById('Buyed_View');
    Buyed_List.innerHTML = "";
    var sum = 0;
    var asum= 0;
    document.getElementById('total1').innerHTML = "";
    for(var i = 0; i < Buyed.length ; i++)
    {
        var tmp = 
            '<tr> '+
            '<td><input type="checkbox" id="d'+i+'"></td>'+
            '<td>'+AllItem[Buyed[i][0]][0]+'</td>'+
            '<td>'+((AllItem[Buyed[i][0]].indexOf(Buyed[i][1].toString()) == -1)? "大":"中").toString()+'</td>'+
            '<td>'+Buyed[i][1]+'</td>'+
            '<td>'+Buyed[i][2]+'</td>'+
            '<td>'+Buyed[i][3]+'</td>'+
            '<td>'+Buyed[i][4]+'</td>'+
            '<td>'+Buyed[i][5]+'</td>'+
            '<td>'+Buyed[i][6]+'</td>'+
            '</tr>'
        Buyed_List.innerHTML += tmp;
        sum += Buyed[i][3];
        asum += Buyed[i][2];
        document.getElementById('total1').innerHTML = "總計："+asum+"份"+sum+"元";
    }
    update_content(0);
}

function update_price(item){
    Drink_price.innerHTML = item;
    update_total()
}
function update_content(item){
    item = +item
    if(item == 0)
    {
        Drink_size.innerHTML = "<option disabled>請選擇...</option>";
    }
    Drink_amount.disabled = false;
    Drink_size.disabled = false;
    Drink_sugar.disabled = false;
    Drink_ice.disabled = false;
    item = AllItem[item];
    Drink_amount.value = 1;
    var s = ""
    s += '<option value="0" >請選擇...</option>'
    if(!+item[1] == 0) s += '<option value="'+item[1]+'">中</option>';
    if(!+item[2] == 0) s += '<option value="'+item[2]+'">大</option>';
    Drink_size.innerHTML = s;
    Drink_price.innerHTML = Drink_size.value;
    update_total()
}
function update_total(){
    const nums = +Drink_amount.value;
    const price = +Drink_size.value
    Drink_total.innerHTML = price * nums;
}

function AddToList(){
    if(+Drink_List.value == 0 || +Drink_amount.value == 0 || 
       +Drink_size.value == 0 || +Drink_ice.value == 0    ||
       +Drink_sugar.value == 0)
    {
        alert("還有選項沒選");
        return;
    }
    if(+Buyer_name.value == 0)
    {
        alert("請輸入姓名");
        return;
    }
    Last_Item = 
    [
        +Drink_List.value,+Drink_size.value,
        +Drink_amount.value,+Drink_total.innerHTML,
        Drink_sugar.value,Drink_ice.value,Buyer_name.value
    
    ]
    var temp = JSON.parse(sessionStorage.getItem("Drink_List"));
    temp.push(Last_Item);
    sessionStorage.setItem("Drink_List", JSON.stringify(temp))
    update();
}

function Mult_Del(){
    var Buyed = JSON.parse(sessionStorage.getItem("Drink_List"));
    const Buyed_List = document.getElementById('Buyed_View');
    var list = []
    for(var i = 0 ; i < Buyed.length ; i++)
    {
        if(document.getElementById('d'+i).checked)
        {
            list.push(i);
        }
    }
    for(var i = 0 ; i < list.length ; i++)
    {
        Buyed.splice(list[i]-i,1);
    }
    sessionStorage.setItem("Drink_List", JSON.stringify(Buyed));
    update();
}

function doc_print() {
    var Buyed = JSON.parse(sessionStorage.getItem("Drink_List"));
    // 打開新的視窗，可以指定寬度、高度等屬性
    var print = window.open('', '_blank', 'width=550,height=300');
  
    // 向新的視窗中插入內容
    print.document.write('<html style="overflow-x: hidden;"><head><title>列印畫面</title><link rel="stylesheet" href="./style.css"></head><body>');
    print.document.write('<h2>訂購人：'+Buyed[0][6]+'</h3><br>');
    print.document.write('<table style="background-color: #fff; width:500px"><tbody>')
    print.document.write('<tr style="line-height: 3;"><td></td><td>品名</td><td>容量</td><td>單價</td><td>數量</td><td>金額</td><td>甜度</td><td>溫度</td></tr>');
    var sum = 0;
    for (let i = 0; i < Buyed.length; i++) {
        print.document.write(
        '<tr><td style="text-align: right;">'+(i+1)+'.</td>'+
        '<td>'+AllItem[Buyed[i][0]][0]+'</td>'+
        '<td>'+((AllItem[Buyed[i][0]].indexOf(Buyed[i][1].toString()) == -1)? "大":"中").toString()+'</td>'+
        '<td>'+Buyed[i][1]+'</td>'+
        '<td>'+Buyed[i][2]+'</td>'+
        '<td>'+Buyed[i][3]+'</td>'+
        '<td>'+Buyed[i][4]+'</td>'+
        '<td>'+Buyed[i][5]+'</td></tr>');
        sum += Buyed[i][3];
    }
    print.document.write('<tr><td colspan="2" style="line-height: 3;text-align: left">合計:'+Buyed.length+'份'+sum+'元</td></tr>')
    print.document.write('</tbody></table></body></html>');
    // 關閉文檔流，表示已經完成內容的輸入
    print.document.close();
    sessionStorage.setItem("Drink_List","[]");
    update();
  }