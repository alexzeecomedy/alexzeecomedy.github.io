var tag=document.getElementById(ringID);for(i=0,thisSite=window.location.href,thisIndex=null;i<sites.length;i++)if(thisSite.startsWith(sites[i])){thisIndex=i;break}function randomSite(){(otherSites=sites.slice()).splice(thisIndex,1),randomIndex=Math.floor(Math.random()*otherSites.length),location.href=otherSites[randomIndex]}null==thisIndex?tag.insertAdjacentHTML("afterbegin",`
<table>
  <tr>
    <td>This site isn't part of the ${ringName} webring yet. Please email the webring manager!</td>
  </tr>
</table>
  `):(previousIndex=thisIndex-1<0?sites.length-1:thisIndex-1,nextIndex=thisIndex+1>=sites.length?0:thisIndex+1,indexText="",useIndex&&(indexText=`<a href='${indexPage}'>index</a> | `),randomText="",useRandom&&(randomText="<a href='javascript:void(0)' onclick='randomSite()'>random</a> | "),tag.insertAdjacentHTML("afterbegin",`
      <div class="webring-content">
          <!-- Previous button -->
          <a class="webring-prev" href="${sites[previousIndex]}">
              <img src="https://milkyway.moe/onlinewire/previous.gif" alt="Previous">
          </a>
          
          <!-- Central logo -->
          <a class="webring-info" href="${indexPage}"><img src="https://cdn.jsdelivr.net/gh/alexzeecomedy/alexzeecomedy.github.io@main/assets/artwork/lime_logo.webp" alt="Center Logo">
          
          <!-- Next button -->
          <a class="webring-next" href="${sites[nextIndex]}">
              <img src="https://milkyway.moe/onlinewire/next.gif" alt="Next">
          </a>
      </div>

          <!-- Links and description -->
          <div class="webring-links">
            This site is part of the ${ringName} webring
              <br>
              ${randomText}
          <a href="https://garlic.garden/onionring/">what is this?</a>
      </div>
  `));