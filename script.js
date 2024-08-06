document.addEventListener('DOMContentLoaded', function() {
    var totalPages = document.querySelectorAll('.content').length;
    var flippedPages = 0;
    var contents = document.querySelectorAll('.content');
    var overlayLeft = document.querySelector('.overlay-left');
    var overlayRight = document.querySelector('.overlay-right');

    var existingBaseShadow = document.querySelectorAll('.content-shadow');
    var baseShadow = document.createElement('div');
    baseShadow.className = 'content-shadow';
    existingBaseShadow.forEach(baseShadow => baseShadow.remove());
    document.querySelector('.book-page').appendChild(baseShadow);
    

    function updatePage(pageIndex) {
        var content = contents[pageIndex];
        var pageTransform = content.style.transform;
        
        var overlayDynamic = document.createElement('div');
        overlayDynamic.className = 'overlay';
        document.querySelector('.book-page').appendChild(overlayDynamic);
        overlayDynamic.style.display = 'block';
        overlayDynamic.offsetHeight;
        
        

        if (pageTransform === 'rotateY(-180deg)') {
            overlayDynamic.className += ' overlay-dynamic-left';
            content.style.transform = 'rotateY(0deg)';
            flippedPages--;
            requestAnimationFrame(() => {
                overlayDynamic.style.transform = 'rotateY(0deg)';
            });
        } else {
            overlayDynamic.className += ' overlay-dynamic-right';
            content.style.transform = 'rotateY(-180deg)';
            flippedPages++;
            requestAnimationFrame(() => {
                overlayDynamic.style.transform = 'rotateY(-180deg)';
            });
        }

        overlayLeft.style.display = (pageIndex <= 0) ? 'none' : 'block';
        overlayRight.style.display = (pageIndex >= totalPages - 1) ? 'none' : 'block';

        

        var currentShadow = document.createElement('div');
        currentShadow.className = 'content-shadow';
        content.appendChild(currentShadow);
        currentShadow.style.boxShadow = '-7px 10px 15px 0 rgba(0, 0, 0, 0.07)';

        contents.forEach(function(item, index) {
            currentShadow.style.boxShadow = '7px 10px 15px 0 rgba(0, 0, 0, 0.07)';
            setTimeout(function() {
                item.style.zIndex = totalPages - Math.abs(index - flippedPages);
                var front = item.querySelector('.content-front');
                var back = item.querySelector('.content-back');
    
                if (item.style.transform === 'rotateY(-180deg)') {
                        front.style.display = 'none';
                        back.style.display = 'block';
                } else {
                        front.style.display = 'block';
                        back.style.display = 'none';
                }
            }, 500);
        });

        if(flippedPages==0){
            baseShadow.style.left='0%';
            baseShadow.style.width='100%';
        }else if(flippedPages==totalPages){
            baseShadow.style.left='-100%';
            baseShadow.style.width='100%';
        }
        setTimeout(function() {
            overlayLeft.style.display = 'none';
            overlayRight.style.display = 'none';
            overlayDynamic.style.display = 'none';
            document.querySelector('.book-page').removeChild(overlayDynamic);
            currentShadow.remove()
            if(flippedPages==1){
                baseShadow.style.left='-100%';
                baseShadow.style.width='200%';
            }else if(flippedPages==totalPages-1){
                baseShadow.style.left='-100%';
                baseShadow.style.width='200%';
            }else if(flippedPages>1&&flippedPages<totalPages-1){
                baseShadow.style.left='-100%';
                baseShadow.style.width='200%';
            }
        }, 1000);
    }
    
    
    contents.forEach(function(content, index) {
        content.style.zIndex = totalPages - index;
        content.addEventListener('click', function() {
            updatePage(index);
        });
    });
});

document.getElementById('switch-bar').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('body').classList.toggle('night-mode');
    const txt = document.getElementsByClassName('switch-txt');
    if (this.classList.contains('active')) {
        const audio = new Audio("audio/night.mp3");
        audio.play();
        txt[0].textContent = 'NIGHT MODE';
    } else {
        const audio = new Audio("audio/day.mp3");
        audio.play();
        txt[0].textContent = 'DAY MODE';
    }
});

document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

for (let i = 1; i <= 4; i++) {
    let txtElement = document.getElementById(`portfolio-txt_${i}`);
    let boxElement = document.getElementById(`portfolio-box_${i}`);
    let defaultBoxElement = document.getElementsByClassName(`portfolio-box-default`);
    if (txtElement && boxElement) {
        txtElement.addEventListener('mouseover', function() {
            boxElement.style.left = '0%';
            boxElement.style.top = '0%';
            defaultBoxElement[0].style.left = '-100%';
            for (let j = 1; j <= 4; j++) {
                let lastBoxElement = document.getElementById(`portfolio-box_${j}`);
                if (boxElement != lastBoxElement) {
                    var k=-30+1*j
                    lastBoxElement.style.left = k+'%';
                    lastBoxElement.style.top = k+'%';
                    let iframe = lastBoxElement.querySelector('iframe');
                    if (iframe) {
                        iframe.contentWindow.postMessage( '{"event":"command", "func":"pauseVideo", "args":""}', '*');
                    }
                }
            }
        });
    }
}



