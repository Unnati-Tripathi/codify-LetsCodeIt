export const toggleClass = (elSelector, className) => {
    let el = document.querySelector(elSelector);
    el.classList.toggle(className);
    
};

export const removeClass = (elSelector, className) => {
    let el=document.querySelector(elSelector);
    el.classList.remove(className);
    
};

export const api_based_url = "http://localhost:3000";
// export const api_based_url = "https://code-editor-n12w.onrender.com"
