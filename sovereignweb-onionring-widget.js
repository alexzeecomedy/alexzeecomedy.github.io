var tag=document.getElementById(ringID);for(i=0,thisSite=window.location.href,thisIndex=null;i<sites.length;i++)if(thisSite.startsWith(sites[i])){thisIndex=i;break}function randomSite(){(otherSites=sites.slice()).splice(thisIndex,1),randomIndex=Math.floor(Math.random()*otherSites.length),location.href=otherSites[randomIndex]}null==thisIndex?tag.insertAdjacentHTML("afterbegin",`
<table>
  <tr>
    <td>This site isn't part of the ${ringName} yet. You should talk to the manager to have your site added to the list!</td>
  </tr>
</table>
  `):(previousIndex=thisIndex-1<0?sites.length-1:thisIndex-1,nextIndex=thisIndex+1>=sites.length?0:thisIndex+1,indexText="",useIndex&&(indexText=`<a href='${indexPage}'>index</a> | `),randomText="",useRandom&&(randomText="<a href='javascript:void(0)' onclick='randomSite()'>random</a> | "),tag.insertAdjacentHTML("afterbegin",`
<div style="display: inline-block; width: fit-content; margin: 0 auto; border: 1px solid transparent;">
  <table cellspacing="0" style="border-spacing: 0; border-collapse: collapse;">
    <tr>
      <td class="webring-prev" style="padding: 0; vertical-align: middle; text-align: center;">
        <a href="${sites[previousIndex]}">
          <img src="https://i.imgur.com/ECXoNjS.gif" style="display: block; max-width: 100%; height: auto;">
        </a>
      </td>
      <td class="webring-info" style="padding: 0; vertical-align: middle; text-align: center;">
        <a href="https://sovereignweb.thecozy.cat/join/">
          <img src="https://i.imgur.com/6FDxe32.gif" style="display: block; max-width: 100%; height: auto;">
        </a>
      </td>
      <td class="webring-next" style="padding: 0; vertical-align: middle; text-align: center;">
        <a href="${sites[nextIndex]}">
          <img src="https://i.imgur.com/IqW5Bz0.gif" style="display: block; max-width: 100%; height: auto;">
        </a>
      </td>
    </tr>
  </table>
</div>

  `));