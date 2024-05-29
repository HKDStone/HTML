var b = document.getElementById('body');

// button0.onclick = showMsg2

// function showMsg(){
//     alert("clicked")
// }
// function showMsg2(){
//     alert("Hi")
// }

b.onblur = () => {
    document.title = '回來🥺'
}
b.onfocus = () => {
    document.title = '11210301'
}
var updateTime = () => {
    var D = new Date()
    var t_e = document.getElementById('time');
    t_e.innerText =` ${D.getFullYear()}-${(D.getMonth()+1).toString().padStart(2,'0')}-${D.getDate().toString().padStart(2,'0')} ${D.getHours().toString().padStart(2,'0')}:${D.getMinutes().toString().padStart(2,'0')}:${D.getSeconds().toString().padStart(2,'0')}.${D.getMilliseconds().toString().padEnd(3,'0')}`
}
var s = 1000;

updateTime()
var times = setInterval(updateTime, s)
button0.onclick = function(){
    clearInterval(times)
    s = +document.getElementById('setrate').value
    updateTime()
    times = setInterval(updateTime, s)
}
