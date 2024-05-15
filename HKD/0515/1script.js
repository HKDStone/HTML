const PI = 3.14159265;
var radius = 15;
// PI = 4;
var area = radius * radius * PI;
// alert(Math.round(area,2))
document.write(Math.round(area*100)/100 + "<br>");
var X = prompt("輸入分數 (1 - 100)",60);
if( +X >= 60){
    document.write(X + "及格");
}else{
    document.write(X + "不及格");
}