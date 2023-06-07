const API_KEY = "19d05f3d5dba43e89905ad91e7f0c7ee";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  binddata(data.articles);
}


function binddata(articles) {
    console.log(articles.length)
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML=''
    for (let article = 0; article < articles.length; article++) {
    
    if (articles[article].urlToImage){
        const date = new Date(articles[article].publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });
        
    var element = document.createElement("div");
    element.innerHTML=`
    
    <div class="card flex" id="template-news-card">
        <div class="logo-image">
            <img src="${articles[article].urlToImage}" alt="" class="news-img">
        </div>
        <div class="cardContent flex">
            <h4 class="news-title">${articles[article].title}</h4>
            <div class="source">${articles[article].source.name}  ${date}</div>
        <p class="news-desc">${articles[article].description}</p>
        </div>

    </div>
    `
    cardsContainer.appendChild(element);
  }
}
}

let curSelectedNav=null;
function onNavItemClick(query) {
    fetchNews(query);
    const navItem = document.getElementById(query);
    const search= document.getElementById("news-query-box");
    search.value="";
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navItem
    curSelectedNav?.classList.add("active");
    

}
const search_bt= document.getElementById("search-bt");
const search= document.getElementById("news-query-box");
// let query="";
search_bt.addEventListener('click', ()=>{
  
    const query=search.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;

})

const sidebar=document.querySelector(".sidebar");
const crosssidebar=document.querySelector(".cross-sidebar");
const ul_animation=document.querySelector(".navlinks");

sidebar.addEventListener('click', ()=>{
  ul_animation.style.display="block";
crosssidebar.style.display="block";
sidebar.style.display="none";
})
crosssidebar.addEventListener('click', ()=>{
    ul_animation.animate= "ani 1.3s ease";
    ul_animation.style.display="none";
  sidebar.style.display="block";
  crosssidebar.style.display="none";
  })