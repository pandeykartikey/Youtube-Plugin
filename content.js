/*$(function(){
    //addLinks();
    chrome.tabs.getSelected(null, function(tab) {
    console.log(tab.url +" "+ tab.id);
    a = tab.url;
    var re = new RegExp("^['https://www.youtube.com']");
    if(a.indexOf("https://www.youtube.com")==0){
      console.log("here");
      localStorage.link= a;
      localStorage.id=tab.id;
    }
});
});
*/
/*chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
  function(tab) {
chrome.tabs.sendMessage(tab[0].id, {method: "getURL"});});*/
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'getURL'
});
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
