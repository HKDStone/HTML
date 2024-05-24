function selectfile(files){                             // 先從input(type="file")擷取使用者上傳的檔案 this.files
    const names = document.getElementById('names');     // 
    const sel = document.getElementById('sel');         // 擷取顯示的框架
    const totalsize = document.getElementById('size');  // 
    var list = [];                                      // 建立空清單，此變數是為了裝多的檔案名，它在輸出時會自動在檔名之間加上逗號
    var size = 0;                                       // 初始化大小變數
    for(var i = 0; i < files.length ; i++)              // 名稱跟大小運算迴圈
    {
        list.push(files[i].name);   // array.push(?string) be like
                                    // array = ["A"]
                                    // array.push("B")
                                    // array = ["A","B"]
        size += files[i].size;      // 把每個檔案大小加起來
    }
    names.innerHTML = list;         // 顯示所有檔名
    sel.innerHTML = files.length;   // 顯示所有檔案總數
    totalsize.innerHTML = (size/1024/1024).toFixed(3) + "MiB"+ // Byte 轉換成 Mib (1024B /1024) => 1KiB, (1024KiB / 1024) => 1 MiB
                         "(" + size + "bytes)"; // 顯示原Byte
    // p.s 
    //1KB  = 1,000 Byte
    //1MB  = 1,000 KB
    //1GB  = 1,000,000 KB
    //1TB  = 1,000,000,000 KB
    //1KiB = 1,024Byte
    //1MiB = 1,024KiB
    //1GiB = 1,024MiB = 1,048,576 KiB
    //1TiB = 1,024GiB = 1,073,741,824 KiB
}