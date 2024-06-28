 
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
let startX, currentX, lastX, isDraggings = false, velocity = 0, animationFrame;

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

    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${Index * itemWidth}px)`;
}

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    isDraggings = true;
    lastX = startX;
    cancelAnimationFrame(animationFrame);
    const carousel = document.querySelector('.kataloqCarusel');
    carousel.style.transition = 'none';
}

function handleTouchMove(e) {
    if (!isDraggings) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - lastX;
    lastX = currentX;
    const carousel = document.querySelector('.kataloqCarusel');
    const transformMatrix = new WebKitCSSMatrix(getComputedStyle(carousel).transform);
    carousel.style.transform = `translateX(${transformMatrix.m41 + deltaX}px)`;
    velocity = deltaX;
}

function handleTouchEnd() {
    isDraggings = false;
    inertiaScroll();
}

function handleMouseDown(e) {
    startX = e.clientX;
    isDraggings = true;
    lastX = startX;
    cancelAnimationFrame(animationFrame);
    const carousel = document.querySelector('.kataloqCarusel');
    carousel.style.transition = 'none';
}

function handleMouseMove(e) {
    if (!isDraggings) return;
    currentX = e.clientX;
    const deltaX = currentX - lastX;
    lastX = currentX;
    const carousel = document.querySelector('.kataloqCarusel');
    const transformMatrix = new WebKitCSSMatrix(getComputedStyle(carousel).transform);
    carousel.style.transform = `translateX(${transformMatrix.m41 + deltaX}px)`;
    velocity = deltaX;
}

function handleMouseUp() {
    isDraggings = false;
    inertiaScroll();
}

function inertiaScroll() {
    const carousel = document.querySelector('.kataloqCarusel');
    let transformMatrix = new WebKitCSSMatrix(getComputedStyle(carousel).transform);
    let currentX = transformMatrix.m41;
    const deceleration = 0.95;

    function animate() {
        velocity *= deceleration;
        currentX += velocity;
        carousel.style.transform = `translateX(${currentX}px)`;
        if (Math.abs(velocity) > 0.5) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            snapToNearest();
        }
    }
    animate();
}

function snapToNearest() {
    const carousel = document.querySelector('.kataloqCarusel');
    const items = document.querySelectorAll('.carousel-items');
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight) * 2;
    const transformMatrix = new WebKitCSSMatrix(getComputedStyle(carousel).transform);
    let currentX = transformMatrix.m41;
    Index = Math.round(-currentX / itemWidth);
    const visibleItemsCount = Math.floor(document.querySelector('.kataloq').offsetWidth / itemWidth);
    const maxIndex = items.length - visibleItemsCount;

    if (Index < 0) {
        Index = 0;
    } else if (Index > maxIndex) {
        Index = maxIndex;
    }

    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${Index * itemWidth}px)`;
}

const carouselElement = document.getElementById('carousel');
carouselElement.addEventListener('touchstart', handleTouchStart);
carouselElement.addEventListener('touchmove', handleTouchMove);
carouselElement.addEventListener('touchend', handleTouchEnd);
carouselElement.addEventListener('mousedown', handleMouseDown);
carouselElement.addEventListener('mousemove', handleMouseMove);
carouselElement.addEventListener('mouseup', handleMouseUp);
carouselElement.addEventListener('mouseleave', handleMouseUp);
// sebet 
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebarlar');
    const isOpen = cartSidebar.style.right === '0px';
    cartSidebar.style.right = isOpen ? '-400px' : '0px';
}
document.addEventListener('DOMContentLoaded', () => {
    const cartSidebar = document.getElementById('cart-sidebarlar');
    const cartCount = document.getElementById('cart-countlar');
    const totalPriceElement = document.getElementById('total-pricelar');
    const cartItemsContainer = document.querySelector('.cart-itemslar');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    document.querySelectorAll('.add-to-cartlar').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productCard = event.target.closest('.product-cardlar');
        const productId = productCard.dataset.id;
        const productName = productCard.dataset.name;
        const productPrice = parseFloat(productCard.dataset.price);
        const productImage = productCard.dataset.image;

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        updateCart();
        toggleCart(true);  // Səbəti avtomatik açmaq üçün true parametri ilə çağırırıq
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCount.textContent = cart.length;
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price} AZN</p>
                </div>
                <div class="cart-item-actions">
                    <button class="decrease-quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                    <button class="remove-item">🗑️</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.increase-quantity').addEventListener('click', () => changeQuantity(item.id, 1));
            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => changeQuantity(item.id, -1));
            cartItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function changeQuantity(productId, change) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity += change;
            if (product.quantity <= 0) {
                removeFromCart(productId);
            } else {
                updateCart();
            }
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function toggleCart(forceOpen = false) {
        const isOpen = cartSidebar.style.right === '0px';
        if (forceOpen || !isOpen) {
            cartSidebar.style.right = '0px';
        } else {
            cartSidebar.style.right = '-400px';
        }
    }
});   
// like 
document.getElementById('openFavorites').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('favoritesPagex').classList.add('show');
});

document.getElementById('closeFavorites').addEventListener('click', function() {
    document.getElementById('favoritesPagex').classList.remove('show');
});

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavoriteCount();
renderFavorites();

document.querySelectorAll('.like-iconx').forEach(function(icon) {
    const card = icon.closest('.product-cardx');
    const name = card.getAttribute('data-namex');
    const isFavorited = favorites.some(fav => fav.name === name);

    if (isFavorited) {
        icon.classList.add('filled');
    }

    icon.addEventListener('click', function() {
        const name = card.getAttribute('data-namex');
        const price = card.getAttribute('data-pricex');
        const image = card.getAttribute('data-imagex');

        if (icon.classList.contains('filled')) {
            favorites = favorites.filter(fav => fav.name !== name);
            icon.classList.remove('filled');
        } else {
            favorites.push({ name, price, image });
            icon.classList.add('filled');
            showNotification();
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteCount();
        renderFavorites();
    });
});

function updateFavoriteCount() {
    const favoriteCountElement = document.querySelector('.favorites .count');
    favoriteCountElement.textContent = favorites.length;
}

function renderFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    favorites.forEach(function(fav) {
        const listItem = document.createElement('div');
        listItem.classList.add('favorites-list-item');

        listItem.innerHTML = `
            <img src="${fav.image}" alt="${fav.name}">
            <div class="product-infox">
                <p class="product-pricex">${fav.price}</p>
                <p class="product-namex">${fav.name}</p>
                <p class="add-to-cart">Səbətə əlavə et</p>
                <span class="remove-icon">&times;</span>
            </div>
        `;

        // Remove icon click event
        listItem.querySelector('.remove-icon').addEventListener('click', function() {
            favorites = favorites.filter(f => f.name !== fav.name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
            updateFavoriteCount();
        });

        favoritesList.appendChild(listItem);
    });
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');

    setTimeout(function() {
        notification.classList.remove('show');
    }, 3000);
}