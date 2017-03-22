
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection")
  {
    var a = document.getElementsByTagName("a");
    var i = 0;
    var len =0;
    var re = new RegExp("^['/watch']");
    for ( i=0 ; i<a.length;i++){
      if(re.test(a[i])){
        len+=1;
      }
    }
    var j = 0;
    var links=[];
    i=0;
    while(i<10 && i<len){
      var title = $("[href^='/watch']").eq(j).attr("title");
      if(title){
        console.log(title);
        links.push(title);
        var url = $("[href^='/watch']").eq(j).attr("href");
        console.log(url);
        links.push(url);
        i=i+1;
      }
      j=j+1;
    }
    console.log(links);
    sendResponse({data: links});
  }
});
