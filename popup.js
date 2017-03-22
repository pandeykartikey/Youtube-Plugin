console.log("here");
$(function(){
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

document.addEventListener('DOMContentLoaded', function() {
    console.log("here");
    var link = document.getElementById('link');
    document.getElementById('link').addEventListener('click', loadDoc);
  });

function loadDoc(){
  var xhttp = new XMLHttpRequest();
  console.log("here");
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementsByTagName("div").innerHTML =this.responseText;
      var el = document.createElement( 'html' );
      el.innerHTML =this.responseText;
      console.log(el.getElementsByTagName("a"));
      var a = el.getElementsByTagName("a");
      var i = 0;
      var len =0;
      console.log(a.length);
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
        var title = el.querySelectorAll('[href^="/watch"]')[j].getAttribute('title');
        if(title){
          console.log(title);
          links.push(title);
          var url = el.querySelectorAll('[href^="/watch"]')[j].getAttribute('href');
          console.log(url);
          links.push(url);
          i=i+1;
          }
        j=j+1;
        }
      console.log(links);
      console.log("here");
      var a;
      for(i=0;i<links.length;i+=2){
        a = document.createElement('a');
        a.innerHTML = links[i];
        //a.setAttribute("href","https://www.youtube.com" + links[i+1]);
        //addEventListener('click', loadDoc)
        a.addEventListener('click',function(){
                             var newVar = links[i+1];
                             reload(newVar);
                         });
        $('#text').append(a);
        }
      var hrefs = document.getElementsByTagName("a");
      console.log(hrefs.length);
      for (i=0; i<hrefs.length; ++i) {
        hrefs[i].addEventListener('click', openLink);
        }
      }
    }
  if(localStorage.link.indexOf("https://www.youtube.com")==0){
    youtube_url=localStorage.link;
    }
  else{
    youtube_url="https://www.youtube.com";
    }
  xhttp.open("GET",youtube_url, true);
  xhttp.send();
}
/*function addLinks() {
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
}*/

function reload(new_url){
  new_url="https://www.youtube.com"+new_url;
  console.log(new_url);
  chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
      chrome.tabs.update(parseInt(localStorage.id), {url:new_url});
});
}
function openLink() {
    var href = this.href;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.update(tab.id, {url: href});
    });
}
