// Show popup
function showPopup() {
    document.getElementById("videoPopup").style.display = "block";
    document.querySelector(".overlay").style.display = "block";
}

// Hide popup
function hidePopup() {
    document.getElementById("videoPopup").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
}
function togglePopup() { 
    const popup = document.querySelector('.popup'); 
    if (popup.style.bottom === '0px') { popup.style.bottom = '-100%'; }
    else { popup.style.bottom = '0'; }
}