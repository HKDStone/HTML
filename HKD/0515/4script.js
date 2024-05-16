function showMsg(s = "Hello", br = true){
    document.write(s)
    if(br)document.write("<br>")
}
function C2F(c){
    return c * 1.8 +32
}

const sum = function(a,b){
    return +a + +b
}
var sum2 = (a,b) => {
    return +a + +b
}
showMsg()
showMsg('world')
showMsg(sum(10,20))
showMsg(sum2(40,30))