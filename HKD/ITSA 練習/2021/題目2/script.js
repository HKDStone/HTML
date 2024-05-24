send.onclick = TodoAddEdit; // be like:
Alldel.onclick = AllDel;// <x onclick(TodoAddEdit())></x>
var List = [];
Update();

function Update(){
    if(localStorage.getItem("ToDo") == null)localStorage.setItem("ToDo","[]");      // 是否能在localstorage擷取到"ToDo"關鍵字(key)，如果不行則初始化"ToDo"
    else List = JSON.parse(localStorage.getItem("ToDo"));                           // 否則擷取"ToDo"並格式化成JSON格式
    
    if(List.length != 0)document.getElementById('Alldel').style.display = "flex";   // 如果 List 裡有東西 (Length != 0) 全部刪除鍵會顯示
    else document.getElementById('Alldel').style.display = "none";                  // 否則會消失
    
    const content = document.getElementById('content');
    content.innerHTML = "";
    
    List.forEach(function(value , index){
        content.innerHTML += '<div class="todo">' + 
                                '<label>'+value+'</label>' + 
                                '<div class="btns">' +
                                    '<button class="btn" onclick="edit('+index+')"><img style="width: 10px;" src="./image/edit.png"></button>' +
                                    '<button class="btn" onclick="del('+index+')">X</button>' +
                                '</div>' +
                             '</div>';
    });
    const sbtn = document.getElementById('send');

    if(sbtn.value == -1)sbtn.innerText = "送出";
    else sbtn.innerText = "編輯";
}

function TodoAddEdit()
{
    var ToDoNum = document.getElementById('send').value;   // 此處的 ToDoNum 是在判斷是否為修改項目 (-1 = add else = edit)
    const txt = document.getElementById('incontent');
    if(txt.value != '')                                    // 是否為空
    {
        if(ToDoNum == -1)                                  // 新增或修改
        {
            List.push(txt.value);                          // 用法請到 題目1
        }else
        {
            List[ToDoNum] = txt.value;
            document.getElementById('send').value = -1;    // 重製回新增模式
        }
        txt.value = "";                                    // 清空輸入欄
    }
    localStorage.setItem("ToDo",JSON.stringify(List));     // JSON.stringify 是把格式轉換為 localstorage 能辨別的格式
                                                           // 其實就是把 array 格式變成 string 格式
                                                           // ["123","125"] => '["123","125"]' 
    Update();
}

function AllDel()                                          // 全部刪除代辦清單
{
    localStorage.setItem("ToDo","[]");
    Update();
}

function del(value){                                       // 刪除某項(value)
    List.splice(value,1);                                  // splice(start, delcount)
                                                           // be like: array = ["A","B","C","D","E","F"]
                                                           // array.splice(1,3) => 他會移除掉項目array[1] ~ array[3]的項目
                                                           // array = ["A","E","F"]
    localStorage.setItem("ToDo",JSON.stringify(List));
    Update();
}

function edit(value){
    document.getElementById('send').value = value;              //把某項值代到button的值裡，以便function(ToDoAddEdit)處理
    document.getElementById('incontent').value = List[value];   //把某項值代到輸入欄，以便function(ToDoAddEdit)處理
    Update();
}