const n=document.createElement("div");n.id="flow-weaver-extension";document.body.appendChild(n);const o=document.createElement("button");o.textContent="Flow Weaver";o.style.cssText=`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10000;
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;o.addEventListener("click",()=>{const e=document.getElementById("flow-weaver-extension");e&&(e.style.display=e.style.display==="none"?"block":"none")});document.body.appendChild(o);chrome.runtime.onMessage.addListener((e,t,i)=>{e.type==="EXPORT_FLOW"?console.log("Exporting flow:",e.data):e.type==="IMPORT_FLOW"&&console.log("Importing flow:",e.data)});
