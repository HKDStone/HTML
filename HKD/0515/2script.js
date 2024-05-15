var x = prompt("請輸入分數:")
if(x >= 80)
    document.write("甲等")
else if (x >= 60)
    document.write("乙等")
else
    document.write("丙等")
var y = prompt("輸入整數：")
var total = 0
for (let i = 1; i <= y; i++) {
    total += i
}
document.write("<br>1加到" + y + "=" + total)

var ans = Math.round(Math.random()*100)
alert("ans:" + ans)
console.log("ans:" + ans)
Num = [0,100]
do{
    p = prompt('輸入數字 ' + Num[0] + '- ' + Num[1] )
    if(p <= Num[0] || p >= Num[1])continue
    if(p > ans){
        alert('太大了，請重新輸入！')
        Num[1] = +p
    }
    else if (p < ans){
        alert('太小了，請重新輸入！')
        Num[0] = +p
    }
}while (p != ans)