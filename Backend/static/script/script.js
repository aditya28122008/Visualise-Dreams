const dropProf = ()=>{
    document.getElementById('profDrop').classList.toggle("-translate-y-96");
    document.getElementById('profileDown').classList.toggle("-rotate-180");
};
// document.addEventListener("DOMContentLoaded", ()=>{sideShow()})
const mobileSearch = ()=>{
    document.getElementById('searchClose').classList.toggle("opacity-0");
    document.getElementById('searchIco').classList.toggle("opacity-0");
    document.getElementById('searchFormMobile').classList.toggle("-translate-y-52");
};

const sideShow = ()=>{
    document.getElementById('sidebar').classList.toggle("-translate-x-full");
    document.getElementById('sideHamDiv1').classList.toggle("rotate-45");
    document.getElementById('sideHamDiv2').classList.toggle("-rotate-45");
    document.getElementById('sideHamDiv2').classList.toggle("my-1");
    document.getElementById('sideHamDiv2').classList.toggle("-my-[0.45rem]");
    document.getElementById('sideHamDiv3').classList.toggle("opacity-0");
    document.getElementById('quitSide').classList.toggle("translate-x-full");
};

const dismiss = (argu) => {
    argu.classList.add("hidden");
};

const toggleNav = (mainId, subId, buttonId) => {
    document.getElementById(mainId).classList.toggle("h-full");
    document.getElementById(mainId).classList.toggle("h-fit");
    document.getElementById(subId).classList.toggle("opacity-0");
    document.getElementById(subId).hidden = true;
    document.getElementById(buttonId).classList.toggle("-rotate-180");
};

// document.getElementById("").addEventListener("")
