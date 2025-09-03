const tag=(e,t,r)=>`<style>
    a {
      color: inherit;
    }
    .octo-thorpe {
      display: inline;
      -webkit-appearance:none;
    }
    .octo-thorpe[open] {
      display: block;
    }

    .octo-thorpe summary {
      list-style: none;
      cursor: zoom-in;
      -webkit-appearance:none;
    }

    .octo-thorpe summary::-webkit-details-marker {
      display:none;
    }

    .octo-thorpe summary::before {
      padding-inline-end: 0.1em;
      content: "#";
      font-weight: bold;
      display: inline-block;
      transform: rotate(30deg);
    }
    .octo-thorpe[open] summary::before {
      transform: rotate(0);
    }

    .octo-thorpe p {
      padding: 0;
      margin: 0;
    }

    .octo-thorpe ul {
      padding: 0 0 1em 1em;
      margin: 0;
    }
  </style>
  <details class="octo-thorpe" data-o="${e}">
    <summary>${t}</summary>
    <article>
      …
    </article>
  </details>`,linkTemplate=e=>`<li>
    <a href="${e.uri}">
      ${e.title?e.title:e.uri}
    </a>
  </li>
`,serverTemplate=e=>t=>{let r=new URL(t.uri).origin;return`
    <section>
      <p>
        <b>
          <a
            rel="octo:octothorpes"
            href="${r}/~/${decodeURIComponent(e)}">
            ${r}
          </a>
        </b>
      </p>
      <ul>
        ${t.thorpes.map(linkTemplate).join(" ")}
      </ul>
    </section>
  `},script=document.querySelector('script[src*="tag.js"]'),plugins=script.dataset.plugins,preloadLink=document.querySelector('link[rel="preload"][as="fetch"]'),baseUrl=script.dataset.register+"?uri=",currentUrl=encodeURI(window.location.href),preloadHref=preloadLink.getAttribute("href");if("linkfill"===plugins)(console.log("do link fill"),preloadLink)?document.querySelectorAll('link[rel="preload"][as="fetch"]').forEach(e=>{let t=e.getAttribute("href");t&&""!==t.trim()?e.setAttribute("href",t+currentUrl):e.setAttribute("href",baseUrl+currentUrl)}):preloadLink.setAttribute("href",baseUrl+currentUrl);else{let e=document.createElementNS("http://www.w3.org/1999/XHTML/V10","link");e.setAttribute("rel","preload"),e.setAttribute("as","fetch"),e.setAttribute("href",preloadHref),document.head.appendChild(e)}const webhooks=script.dataset.register.replace(/\n/g,"").replace(/\t/g,"").replaceAll(" ","").split(",").map(e=>e.endsWith("/")?e.slice(0,-1):e),hydrate=async(e,t)=>{let r=`${(await Promise.allSettled((await Promise.allSettled(webhooks.map(async e=>await fetch(`${e}/~/${t}`)))).filter(e=>"fulfilled"===e.status).map(async e=>e.value.json()))).map(e=>e.value).map(serverTemplate(t))}`;[...e.querySelectorAll(`[data-o="${t}"] article`)].forEach(e=>e.innerHTML=r)},instantiate=e=>{let t=encodeURIComponent(e.getAttribute("href")||e.innerText.trim()),r=Array.from(e.attributes).filter(e=>e.name.startsWith("data-")).map(e=>({[e.name]:e.value})),a=e.innerText.trim(),i=document.createElement("span");i.innerHTML=tag(t,a);let l=e.attachShadow({mode:"open"});l.appendChild(i),hydrate(l,t,r)};customElements.define("octo-thorpe",class extends HTMLElement{constructor(){super(),document.addEventListener("DOMContentLoaded",e=>{encodeURIComponent(this.getAttribute("href")||this.innerText.trim())&&instantiate(this)})}connectedCallback(){encodeURIComponent(this.getAttribute("href")||this.innerText.trim()).length>0&&instantiate(this)}});