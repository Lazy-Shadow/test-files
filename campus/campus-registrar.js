const products = [
    {
        id: 1,
        title: "ID Card Holder with Lanyard",
        price: "₱432.00",
        condition: "New",
        conditionClass: "bg-info",
        image: "https://via.placeholder.com/250/dc3545/ffffff?text=ID",
        seller: "Alex J. (Junior)",
        description: "Clear plastic ID card holder with detachable lanyard. Perfect for campus ID cards. Includes a badge reel for easy access."
    },
    {
        id: 2,
        title: "Academic Planner",
        price: "₱810.00",
        condition: "Used - Excellent",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/ffc107/ffffff?text=Planner",
        seller: "Sarah M. (Senior)",
        description: "Academic planner with monthly and weekly views. Runs from August to May. Minor wear on cover but pages are clean. Great for staying organized."
    },
    {
        id: 3,
        title: "Wall Calendar 2024",
        price: "₱540.00",
        condition: "Used - Good",
        conditionClass: "bg-warning",
        image: "https://via.placeholder.com/250/28a745/ffffff?text=Calendar",
        seller: "Mike T. (Grad Student)",
        description: "2024 wall calendar with large grids. Perfect for tracking class schedules, exams, and deadlines. Mounting hook included."
    },
    {
        id: 4,
        title: "Address Stamp",
        price: "₱648.00",
        condition: "Used - Fair",
        conditionClass: "bg-danger",
        image: "https://via.placeholder.com/250/17a2b8/ffffff?text=Stamp",
        seller: "Emily R. (Freshman)",
        description: "Self-inking address stamp. Customized with name and address. Ink pad is slightly worn but still works. Great for addressing envelopes."
    },
    {
        id: 5,
        title: "Plastic Clipboard",
        price: "₱270.00",
        condition: "Used - Like New",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/6f42c1/ffffff?text=Clipboard",
        seller: "Chris L. (Sophomore)",
        description: "Plastic clipboard with low profile clip. Durable and lightweight. Perfect for carrying papers to class. Minor scuffs on surface."
    },
    {
        id: 6,
        title: "Business Envelopes (50 Pack)",
        price: "₱432.00",
        condition: "New",
        conditionClass: "bg-info",
        image: "https://via.placeholder.com/250/e83e8c/ffffff?text=Envelope",
        seller: "Jessica W. (Senior)",
        description: "50-pack of #10 business envelopes. White with gummed flap. Perfect for sending letters, applications, or forms. Brand new in box."
    },
    {
        id: 7,
        title: "Address Labels",
        price: "₱324.00",
        condition: "Used - Good",
        conditionClass: "bg-warning",
        image: "https://via.placeholder.com/250/dc3545/ffffff?text=Label",
        seller: "David K. (Junior)",
        description: "Sheet of 30 address labels. Customized with name and address. Removable adhesive. Perfect for addressing envelopes and packages."
    },
    {
        id: 8,
        title: "File Folder Set",
        price: "₱378.00",
        condition: "Used - Excellent",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/ffc107/ffffff?text=Folder",
        seller: "Lisa M. (Sophomore)",
        description: "Set of 10 colored file folders. Perfect for organizing paperwork by class or subject. Includes labels for each folder. Minimal wear."
    }
];

let currentProduct = null;

document.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        currentProduct = products[index];
        showProductModal(currentProduct);
    });
});

function showProductModal(product) {
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductTitle').textContent = product.title;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalProductSeller').textContent = product.seller;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('cartPrice').textContent = '- ' + product.price;
    document.getElementById('buyPrice').textContent = '- ' + product.price;
    
    const conditionBadge = document.getElementById('modalProductCondition');
    conditionBadge.textContent = product.condition;
    conditionBadge.className = 'badge mb-2 ' + product.conditionClass + ' bg-opacity-10 text-' + product.conditionClass.replace('bg-', '');
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

function resetReviewForm() {
    selectedRating = 0;
    updateStars(0);
    document.querySelector('.rating-text').textContent = 'Click to rate';
}

let selectedRating = 0;

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-rating');
        updateStars(selectedRating);
    });
    
    star.addEventListener('mouseenter', function() {
        const rating = this.getAttribute('data-rating');
        updateStars(rating);
    });
});

document.querySelector('.star-rating').addEventListener('mouseleave', function() {
    updateStars(selectedRating);
});

function updateStars(rating) {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.style.color = '#ffc107';
        } else {
            star.classList.remove('active');
            star.style.color = '#dee2e6';
        }
    });
    const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    document.querySelector('.rating-text').textContent = ratingTexts[rating] || 'Click to rate';
}

function openMyOrdersModal() {
    const modal = new bootstrap.Modal(document.getElementById('myOrdersModal'));
    modal.show();
}

function showReceivedModalForOrder(title, price, image) {
    document.getElementById('receivedProductImage').src = image;
    document.getElementById('receivedProductTitle').textContent = title;
    document.getElementById('receivedProductPrice').textContent = price;
    resetReceivedReview();
    
    // Hide the orders modal first to ensure rating modal appears on top
    const ordersModal = bootstrap.Modal.getInstance(document.getElementById('myOrdersModal'));
    if (ordersModal) {
        ordersModal.hide();
    }
    
    // Show the rating modal after a short delay to ensure proper stacking
    setTimeout(() => {
        const modal = new bootstrap.Modal(document.getElementById('receivedModal'));
        modal.show();
    }, 300);
}

function showReceivedModal() {
    if (currentProduct) {
        document.getElementById('receivedProductImage').src = currentProduct.image;
        document.getElementById('receivedProductTitle').textContent = currentProduct.title;
        document.getElementById('receivedProductPrice').textContent = currentProduct.price;
    } else {
        document.getElementById('receivedProductImage').src = "https://via.placeholder.com/250/28a745/ffffff?text=Product";
        document.getElementById('receivedProductTitle').textContent = "Organic Chemistry Textbook";
        document.getElementById('receivedProductPrice').textContent = "₱1,350.00";
    }
    resetReceivedReview();
    const modal = new bootstrap.Modal(document.getElementById('receivedModal'));
    modal.show();
}

function previewReceivedImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('receivedPreviewImage');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function submitReceivedReview() {
    const feedback = document.getElementById('receivedFeedback').value;
    const reviewImage = document.getElementById('receivedPreviewImage');
    
    if (selectedRating === 0) {
        alert('Please select a star rating!');
        return;
    }
    if (!feedback.trim()) {
        alert('Please write your feedback!');
        return;
    }
    
    alert('Thank you for your review!\nRating: ' + selectedRating + ' star(s)\nFeedback: ' + feedback);
    const modal = bootstrap.Modal.getInstance(document.getElementById('receivedModal'));
    modal.hide();
}

function resetReceivedReview() {
    selectedRating = 0;
    updateStars(0);
    document.getElementById('receivedFeedback').value = '';
    document.getElementById('receivedPreviewImage').style.display = 'none';
    document.getElementById('receivedPreviewImage').src = '';
    document.getElementById('receivedReviewImage').value = '';
    document.querySelector('.rating-text').textContent = 'Click to rate';
}

function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    chatPopup.classList.toggle('show');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        const sentMessage = document.createElement('div');
        sentMessage.className = 'message sent';
        sentMessage.innerHTML = '<div class="message-content">' + message + '</div>';
        chatMessages.appendChild(sentMessage);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            const reply = document.createElement('div');
            reply.className = 'message received';
            reply.innerHTML = '<div class="message-content">Thanks for your message! Yes, the item is still available. Would you like to meet at the library for pickup?</div>';
            chatMessages.appendChild(reply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function addToCart() {
    alert('Item added to cart!');
}

function buyNow() {
    alert('Proceeding to checkout!');
}