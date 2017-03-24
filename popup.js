console.log("here");
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
      chrome.tabs.getSelected(null, function(tab) {
    console.log(tab.url +" "+ tab.id);
    a = tab.url;
    var re = new RegExp("^['https://www.youtube.com']");
    if(a.indexOf("https://www.youtube.com")==0){
      console.log("here");
      localStorage.link= a;
      localStorage.id=tab.id;
      loadDoc();
    }})});

document.addEventListener('DOMContentLoaded', function() {
  loadDoc();
  });

function loadDoc(){
  var xhttp = new XMLHttpRequest();
  console.log("here");
  $("#text").html("");
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
        a = document.createElement('div');
        img = document.createElement('img');
        img.setAttribute('src','https://i.ytimg.com/vi/'+links[i+1].substring(9,20)+'/hqdefault.jpg?custom=true&w=168&h=94&stc=true&jpg444=true&jpgq=90&sp=67&sigh=EYsEqqKBqs3v7HCe7bhrXXWBRuc');
        a.append(img);
        p =document.createElement('p');
        p.innerHTML = links[i];
        a.append(p);
        a.youtube_link=links[i+1];
        a.addEventListener('click',reload);
        $('#text').append(a);
        $('#text').append('<hr/>');
        }
      }
    }
  if(localStorage.link.indexOf("https://www.youtube.com")==0){
    youtube_url=localStorage.link;
    }
  else{
    youtube_url="https://www.youtube.com";
    }
  console.log(youtube_url);
  xhttp.open("GET",youtube_url, true);
  xhttp.send();
}

function reload(evt){
  evt.preventDefault();
  new_url=evt.currentTarget.youtube_link;
  new_url="https://www.youtube.com"+new_url;
  console.log(new_url);
  id=parseInt(localStorage.id);
  localStorage.link=new_url;
  chrome.tabs.update( id , {"url":new_url});
  loadDoc();
}
