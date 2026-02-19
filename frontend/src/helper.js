export const toggleClass = (elSelector, className) => {
    let el = document.querySelector(elSelector);
    el.classList.toggle(className);
    
};

export const removeClass = (elSelector, className) => {
    let el=document.querySelector(elSelector);
    el.classList.remove(className);
    
};


export const api_based_url = import.meta.env.VITE_API_BASE_URL;
