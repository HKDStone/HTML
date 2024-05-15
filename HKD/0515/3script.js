var s = new Array("丁小雨","宜靜","阿福")
for (var i in s){
    document.write("i = " + i + " s[i] = " + s[i] + "<br>")
}
var t = 0
var i = 0
for( i = 0 ; i <= 10 ; i++){
    if( i == 3 ) break
    t += i
}
document.write(t + "<br>")
for(i=0,t=0; i <= 10 ; i++){
    if( i == 3 ) continue
    t += i
}
document.write(t)