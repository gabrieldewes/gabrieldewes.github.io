var guid=function(){var e=window.navigator,n=window.screen,t=e.mimeTypes.length;return t+=e.userAgent.replace(/\D+/g,""),t+=e.plugins.length,t+=n.height||"",(t+=n.width||"")+(n.pixelDepth||"")},setCookie=function(e,n,t){var i=new Date;i.setTime(i.getTime()+24*t*60*60*1e3);var o="expires="+i.toUTCString();document.cookie=e+"="+n+";"+o+";path=/"},getCookie=function(e){for(var n=e+"=",t=decodeURIComponent(document.cookie).split(";"),i=0;i<t.length;i++){for(var o=t[i];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(n))return o.substring(n.length,o.length)}return""},getState=function(){var e=guid(),n=window.innerWidth,t=window.innerHeight;return{guid:e,screenWidth:screen.width,screenHeight:screen.height,innerWidth:n,innerHeight:t,userAgent:navigator.userAgent,locale:window.navigator.userLanguage||window.navigator.language,localeDate:(new Date).toLocaleString(),parentState:null,event:null,target:null,origin:null,payload:null}},sendAjax=function(e){s=new XMLHttpRequest,s.onload=function(){},s.open("POST","https://dsc00.000webhostapp.com/ajax.php"),s.send(e)};!function(){var e=getCookie("_guid"),n=getState();""!==e?e!==n.guid&&(setCookie("_guid",n.guid),n.parentState=e):setCookie("_guid",n.guid),n.event="pageview",n.origin=document.referrer,n.payload=window.location.search;var t=JSON.stringify(n);sendAjax(t)}(),document.addEventListener("click",function(e){var n=(e=e||window.event).target.name,t=getState();t.event="click",t.target=n,sendAjax(JSON.stringify(t))},!1);