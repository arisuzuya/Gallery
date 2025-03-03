document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded - initializing gallery");

    addTabIndex();

    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    const originalText = mainImage.textContent;

    setTimeout(function() {
        thumbnails.forEach(function(thumbnail, index) {
            setTimeout(function() {
                thumbnail.style.opacity = '1';
            }, index * 100);
        });
    }, 300);

    thumbnails.forEach(function(thumbnail) {
        const img = new Image();
        img.src = thumbnail.src;

        thumbnail.addEventListener('mouseover', function() {
            upDate(this);
        });
        
        thumbnail.addEventListener('mouseleave', function() {
            undo();
        });

        thumbnail.addEventListener('focus', function() {
            upDate(this);
        });
        
        thumbnail.addEventListener('blur', function() {
            undo();
        });
      
        thumbnail.addEventListener('touchstart', function() {
            upDate(this);
        });
        
        thumbnail.addEventListener('touchend', function() {
        });
    });

    function addTabIndex() {
        console.log("Adding tabindex to images for keyboard navigation");

        const thumbnails = document.querySelectorAll('.thumbnail');

        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].setAttribute('tabindex', '0');
            thumbnails[i].style.opacity = '0';
            console.log(`Added tabindex to image ${i + 1}`);
        }
    }

    function upDate(previewPic) {
        console.log("Updating main image");
        console.log("Image source:", previewPic.src);
        console.log("Image alt text:", previewPic.alt);

        mainImage.classList.add('transitioning');

        mainImage.textContent = previewPic.alt;

        mainImage.style.backgroundImage = "url('" + previewPic.src + "')";
        
        mainImage.setAttribute('aria-label', previewPic.alt);
    }
    
    function undo() {
        console.log("Resetting main image");
        
        mainImage.textContent = originalText;
        
        mainImage.style.backgroundImage = "url('')";
        
        mainImage.removeAttribute('aria-label');
    }
});
