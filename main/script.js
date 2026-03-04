document.addEventListener('DOMContentLoaded', function() {
    const cartCountEl = document.getElementById('cartCount');
    const cartIcon = document.getElementById('cartIcon');
    let cartCount = 0;

    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            alert('Cart clicked! Current items: ' + cartCount);
        });
    }

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            cartCount++;
            cartCountEl.textContent = cartCount;
        });
    });

    function updateTimer() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const diff = endOfDay - now;
        if (diff <= 0) return;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const timerBoxes = document.querySelectorAll('.time-box');
        if (timerBoxes.length >= 3) {
            timerBoxes[0].textContent = String(hours).padStart(2, '0');
            timerBoxes[1].textContent = String(minutes).padStart(2, '0');
            timerBoxes[2].textContent = String(seconds).padStart(2, '0');
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});
