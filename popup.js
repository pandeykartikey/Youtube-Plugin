chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    onLoad();
  });
onLoad();
function onLoad(){
  chrome.tabs.getSelected(null, function(tab) {
    var a = tab.url;
    var re = new RegExp("^['https://www.youtube.com']");
    if(a.indexOf("https://www.youtube.com")===0){
      localStorage.link= a;
      localStorage.link_temp=a;
      localStorage.id=tab.id;
      loadDoc();
    }
  }
  );
}

document.addEventListener('DOMContentLoaded', function() {
  loadDoc();
  });

function loadDoc(){
  var xhttp = new XMLHttpRequest();
  $("#text").html("");
  prev = document.getElementById("prev");
  prev.youtube_link=localStorage.prev_link; 
  prev.addEventListener('click',reload);
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      links = scrape(this.responseText);
      createDOM(links);
    }
  }
  if(localStorage.link!==undefined){
    if(localStorage.link.indexOf("https://www.youtube.com")===0){
      youtube_url=localStorage.link;
    }
    else{
      youtube_url="https://www.youtube.com";
    }
  }
  else{
    youtube_url="https://www.youtube.com";
  }
  xhttp.open("GET",youtube_url, true);
  xhttp.send();
  localStorage.link=localStorage.link_temp;
}

function scrape(response){
  var el = document.createElement( 'html' );
  el.innerHTML = response;
  var a = el.getElementsByTagName("a");
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
    var title = el.querySelectorAll('[href^="/watch"]')[j].getAttribute('title');
    if(title){
      links.push(title);
      var url = el.querySelectorAll('[href^="/watch"]')[j].getAttribute('href');
      links.push(url);
      i=i+1;
      }
    j=j+1;
    }
  return links;
}

function createDOM(links){  
  localStorage.next_link = links[1];
  next_song = document.getElementById("next");
  next_song.youtube_link=localStorage.next_link;
  next_song.addEventListener('click',reload);
  for(i=0;i<links.length;i+=2){
    var a = document.createElement('div');
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

function createTab(new_url){
  chrome.tabs.create({'url':new_url,active:false}, function(tab){
        localStorage.id=tab.id;
        chrome.tabs.update(parseInt(localStorage.id, 10),{active:true});
      });
}

function reload(evt){
  evt.preventDefault();
  new_url=evt.currentTarget.youtube_link;
  localStorage.prev_link = localStorage.link.substr(23);
  new_url="https://www.youtube.com"+new_url;
  if(localStorage.id===undefined){
    localStorage.link=new_url;
    localStorage.link_temp=new_url;
    createTab(new_url);
  }
  else{
  id=parseInt(localStorage.id, 10);
  localStorage.link=new_url;
  localStorage.link_temp=new_url;
  chrome.tabs.update( id , {"url":new_url},function(tab){
    if(tab === undefined){
      createTab(new_url);
    }
  });}
  evt.stopPropagation();
  loadDoc();
}
$('#search-bar').submit(function(evt) {
  evt.preventDefault();
  localStorage.link_temp=localStorage.link;
  localStorage.link="https://www.youtube.com/results?search_query="+$('#search').val();
  $('#search').val('');
  loadDoc();
});
