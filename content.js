
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection")
  {
    var len=$("[href^='/watch']").length;
    var i = 0;
    var j = 0;
    var links=[];
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
  } else
    sendResponse({}); // snub them.
});
