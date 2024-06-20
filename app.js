
document.getElementById('close-icon').addEventListener('click', function() {
  document.getElementById('top-bar').style.display = 'none';
});
let currentIndex = 0;

function updateCarousel() {
const wrapper = document.querySelector('.carousel-wrapper');
const cardWidth = document.querySelector('.product-card').offsetWidth;
wrapper.style.transform = `translateX(-${currentIndex * (cardWidth + 20)}px)`;
}

function nextCard() {
const totalCards = document.querySelectorAll('.product-card').length;
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
