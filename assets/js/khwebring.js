var tag=document.getElementById(ringID);for(i=0,thisSite=window.location.href,thisIndex=null;i<sites.length;i++)if(thisSite.startsWith(sites[i])){thisIndex=i;break}function randomSite(){(otherSites=sites.slice()).splice(thisIndex,1),randomIndex=Math.floor(Math.random()*otherSites.length),location.href=otherSites[randomIndex]}null==thisIndex?tag.insertAdjacentHTML("afterbegin",`
<table>
  <tr>
    <td>
	<div style="width: 230px; height: 160px;">
	This site isn't part of the ${ringName} webring yet! It'll be added in soon :)
	</div>
	</td>
  </tr>
</table>
  `):(previousIndex=thisIndex-1<0?sites.length-1:thisIndex-1,nextIndex=thisIndex+1>=sites.length?0:thisIndex+1,indexText="",useIndex&&(indexText=`<a href='${indexPage}'><img src="https://cdn.jsdelivr.net/gh/alexzeecomedy/alexzeecomedy.github.io@main/assets/artwork/khlogo.png"></a> `),randomText="",useRandom&&(randomText="<a href='javascript:void(0)' onclick='randomSite()'>random</a> "),tag.insertAdjacentHTML("afterbegin",`
  <table>
    <tr>
      <td>
	 <center>
	  	  ${indexText}</br>
	  <a href='${sites[previousIndex]}'><img src="https://cdn.jsdelivr.net/gh/alexzeecomedy/alexzeecomedy.github.io@main/assets/artwork/arrowleft.png"></a>
<a href='${sites[nextIndex]}'><img src="https://cdn.jsdelivr.net/gh/alexzeecomedy/alexzeecomedy.github.io@main/assets/artwork/arrowright.png"></a></center>
    </td>
	</tr>
  </table>
  `));