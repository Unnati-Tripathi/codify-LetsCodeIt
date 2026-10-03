export const toggleClass = (elSelector, className) => {
    let el = document.querySelector(elSelector);
    el.classList.toggle(className);
    
};

export const removeClass = (elSelector, className) => {
    let el=document.querySelector(elSelector);
    el.classList.remove(className);
    
};


export const api_based_url = "https://codify-letscodeit-backend.onrender.com";
// export const api_based_url = "http://localhost:5000";
