 
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    const wrapper = document.querySelector('.carousel-wrapper');
    const cardWidth = document.querySelector('.product-card').offsetWidth;
    const totalCards = document.querySelectorAll('.product-card').length;

    function updateCarousel() {
        wrapper.style.transform = `translateX(-${currentIndex * (cardWidth + 20)}px)`;
    }

    function nextCard() {
        if (currentIndex < totalCards - 3) { // 3 cards are visible
            currentIndex++;
            updateCarousel();
        }
    }

    function prevCard() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    wrapper.addEventListener('mousedown', touchStart);
    wrapper.addEventListener('mouseup', touchEnd);
    wrapper.addEventListener('mouseleave', touchEnd);
    wrapper.addEventListener('mousemove', touchMove);
    wrapper.addEventListener('touchstart', touchStart);
    wrapper.addEventListener('touchend', touchEnd);
    wrapper.addEventListener('touchmove', touchMove);

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < totalCards - 3) {
            currentIndex++;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }

        setPositionByIndex();
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        wrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -(cardWidth + 20);
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
document.getElementById('close-icon').addEventListener('click', function() {
  document.getElementById('top-bar').style.display = 'none';
});


// Corusel
let Index = 0;

function scrollCarousel(direction) {
    const carousel = document.querySelector('.kataloqCarusel');
    const items = document.querySelectorAll('.carousel-items');
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight) * 2; // Including margins
    const visibleItemsCount = Math.floor(document.querySelector('.kataloq').offsetWidth / itemWidth);
    const maxIndex = items.length - visibleItemsCount;

    Index += direction;

    if (Index < 0) {
        Index = 0;
    } else if (Index > maxIndex) {
        Index = maxIndex;
    }

    carousel.style.transform = `translateX(-${Index * itemWidth}px)`;
}
