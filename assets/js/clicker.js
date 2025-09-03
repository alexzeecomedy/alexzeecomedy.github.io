var tag=document.getElementById(ringID);for(i=0,thisSite=window.location.href,thisIndex=null;i<sites.length;i++)if(thisSite.startsWith(sites[i])){thisIndex=i;break}function randomSite(){(otherSites=sites.slice()).splice(thisIndex,1),randomIndex=Math.floor(Math.random()*otherSites.length),location.href=otherSites[randomIndex]}null==thisIndex?tag.insertAdjacentHTML("afterbegin",`
<table>
  <tr>
    <td>This site isn't part of ${ringName} yet. You should talk to the manager to have your site added to the list!</td>
  </tr>
</table>
  `):(previousIndex=thisIndex-1<0?sites.length-1:thisIndex-1,nextIndex=thisIndex+1>=sites.length?0:thisIndex+1,indexText="",useIndex&&(indexText=`<a href='${indexPage}'>index</a> | `),randomText="",useRandom&&(randomText="<a href='javascript:void(0)' onclick='randomSite()'>random</a> | "),tag.insertAdjacentHTML("afterbegin",`
    <div class="center">
      <div aria-describedby="previous" class='webring-prev'><div role="tooltip" id="previous" class='webring-info'>Previous</div><a href='${sites[previousIndex]}'>\xe2\x9d\xb0</a></div>
      <div aria-describedby="info" class="webring-img"><div role="tooltip" id="info" class='webring-info'>This site is part of ${ringName}</div></div>
      <div aria-describedby="next" class='webring-next'><div role="tooltip" id="next" class='webring-info'>Next</div><a href='${sites[nextIndex]}'>\xe2\x9d\xb1</a></div>
    </div>
    <div>
    <span class='webring-links'>
        ${randomText}
        ${indexText}
        <a href='https://insqueeration.neocities.org/webring/'>what is this?</a></span>
        </div>
  `));