var cart = {
  hPdt:null, hItems:null, items:{}, iURL:"images/", currency:"₽", total:0,
  save:()=>localStorage.setItem("cart",JSON.stringify(cart.items)),
  load:()=>{cart.items=localStorage.getItem("cart"); cart.items=cart.items?JSON.parse(cart.items):{};},
  nuke:()=>{if(confirm("Очистить корзину?")){cart.items={};localStorage.removeItem("cart");cart.list();}},
  init:()=>{
    cart.hPdt=document.getElementById("cart-products");
    cart.hItems=document.getElementById("cart-items");
    cart.hPdt.innerHTML="";
    let template=document.getElementById("template-product").content,p,item;
    for(let id in products){
      p=products[id];
      item=template.cloneNode(true);
      item.querySelector(".p-img").src=cart.iURL+p.img;
      item.querySelector(".p-txt").innerHTML=`<div class="p-name">${p.name}</div><div class="p-desc">${p.desc}</div><div class="p-price">${cart.currency}${p.price}</div>`;
      item.querySelector(".p-add").onclick=()=>cart.add(id);
      cart.hPdt.appendChild(item);
    }
    cart.load(); cart.list();
  },
  list:()=>{
    cart.total=0; cart.hItems.innerHTML=""; let empty=true;
    for(let key in cart.items){ if(cart.items.hasOwnProperty(key)){empty=false; break;} }
    if(empty){ cart.hItems.innerHTML="Корзина пуста"; }
    else{
      let template=document.getElementById("template-cart").content,p;
      for(let id in cart.items){
        p=products[id]; item=template.cloneNode(true);
        item.querySelector(".c-del").onclick=()=>cart.remove(id);
        item.querySelector(".c-name").textContent=p.name;
        item.querySelector(".c-qty").value=cart.items[id];
        item.querySelector(".c-qty").onchange=function(){cart.change(id,this.value);};
        cart.hItems.appendChild(item); cart.total+=cart.items[id]*p.price;
      }
      item=document.createElement("div"); item.className="c-total"; item.id="c-total"; item.innerHTML=`TOTAL: ${cart.currency}${cart.total}`; cart.hItems.appendChild(item);
      item=document.getElementById("template-cart-checkout").content.cloneNode(true); cart.hItems.appendChild(item);
    }
    // обновление значка корзины
    let count=0; for(let id in cart.items){ count+=cart.items[id]; }
    document.getElementById("cart-count").textContent=count;
  },
  add:id=>{cart.items[id]=cart.items[id]?cart.items[id]+1:1; cart.save(); cart.list();},
  change:(id,qty)=>{if(qty<=0){delete cart.items[id];cart.save();cart.list();} else{cart.items[id]=Number(qty);cart.total=0;for(let pid in cart.items){cart.total+=cart.items[pid]*products[pid].price; document.getElementById("c-total").innerHTML=`TOTAL: ${cart.currency}${cart.total}`;}} },
  remove:id=>{delete cart.items[id];cart.save();cart.list();},
  checkout:()=>{alert("TO DO");}
};
window.addEventListener("DOMContentLoaded",cart.init);
