console.log("here");
$(function(){
    addLinks();
});
function addLinks() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
  function(tab) {
    //console.log("here"); response.data
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
    function(response){
      var link = response.data;
      var a;
      for(i=0;i<link.length;i+=2){
        a = document.createElement('a');
        a.innerHTML = link[i];
        a.setAttribute("href","https://www.youtube.com" + link[i+1]);
        $('#text').append(a);
      }
      var hrefs = document.getElementsByTagName("a");
      console.log(hrefs.length);
      for (i=0; i<hrefs.length; ++i) {
        hrefs[i].addEventListener('click', openLink);
      }
    });
  });
}


function openLink() {
    var href = this.href;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.update(tab.id, {url: href});
    });
}

