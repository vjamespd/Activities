// script.js

document.addEventListener("DOMContentLoaded", function() {
    const largeImage = document.getElementById("large-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
  
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", function() {
        largeImage.src = this.src;
      });
  
      thumbnail.addEventListener("mouseover", function() {
        this.style.opacity = "0.7";
      });
  
      thumbnail.addEventListener("mouseleave", function() {
        this.style.opacity = "1";
      });
    });
  });
  