let sessionUser = null;
let userCart = [];
let userWishlist = [];
let generatedCode = null;
let promotionApplied = false;

const catalog = [
    { id: 1, brand: "AJ LUXE", title: "Black Oversized Drop Shoulder Tee", price: 1499, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { id: 2, brand: "PROJECT X", title: "Grey Minimalist Trainers", price: 3499, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 3, brand: "DENIM CO.", title: "Washed Trucker Jacket", price: 4199, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
    { id: 4, brand: "AJ LUXE", title: "White Textured Polo", price: 1899, img: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400" },
    { id: 5, brand: "STREETWEAR", title: "Utility Cargo Pants", price: 2899, img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400" },
    { id: 6, brand: "CHRONOS", title: "Matte Black Chronograph", price: 6500, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    { id: 7, brand: "STUDIO", title: "Premium Loopback Hoodie", price: 2999, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { id: 8, brand: "OPTIX", title: "Polarized Aviator Sunglasses", price: 1800, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400" }
];

function showToast(msg) {
    const t = document.getElementById('global-toast');
    t.innerText = msg; t.classList.add('visible');
    setTimeout(() => t.classList.remove('visible'), 2000);
}

function showLoader(msg, time, cb) {
    document.getElementById('loader-message').innerText = msg;
    document.getElementById('global-loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('global-loader').style.display = 'none';
        if(cb) cb();
    }, time);
}

function navigateToRoute(routeId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(routeId).classList.add('active');
    
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    if(routeId === 'view-home') document.getElementById('tab-home').classList.add('active');
    if(routeId === 'view-offers') document.getElementById('tab-offers').classList.add('active');
    if(routeId === 'view-wishlist') document.getElementById('tab-wish').classList.add('active');
    if(routeId === 'view-bag') document.getElementById('tab-bag').classList.add('active');
    
    window.scrollTo(0,0);
    if(routeId === 'view-bag') renderBagContents();
    if(routeId === 'view-wishlist') renderWishlistContents();
}

function executeRegistration() {
    const name = document.getElementById('join-name').value.trim();
    const phone = document.getElementById('join-phone').value.trim();
    const pass = document.getElementById('join-pass').value.trim();
    
    if(!name || phone.length < 10 || !pass) {
        alert('Please fill out all fields to create your account.');
        return;
    }

    sessionUser = { name, phone, pass };
    showLoader('Creating Account...', 1500, () => {
        document.getElementById('navigation-bar').style.display = 'flex';
        populateStore();
        navigateToRoute('view-home');
    });
}

function populateStore() {
    const grid = document.getElementById('container-products');
    grid.innerHTML = catalog.map(p => `
        <div class="item-card">
            <img src="${p.img}" class="item-img">
            <div class="item-details">
                <div class="item-brand">${p.brand}</div>
                <div class="item-title">${p.title}</div>
                <div class="item-price">₹${p.price.toLocaleString()}</div>
            </div>
            <div class="item-actions">
                <div class="action-btn wish" onclick="toggleWishlist(${p.id})">🤍 WISH</div>
                <div class="action-btn" onclick="addToBag(${p.id})">🛒 BAG</div>
            </div>
        </div>
    `).join('');
}

function toggleWishlist(id) {
    if(userWishlist.includes(id)) {
        userWishlist = userWishlist.filter(w => w !== id);
        showToast('Removed from Wishlist');
    } else {
        userWishlist.push(id);
        showToast('Saved to Wishlist');
    }
    updateBadges();
}

function addToBag(id) {
    userCart.push(id);
    updateBadges();
    showToast('Added to Bag');
}

function updateBadges() {
    const wb = document.getElementById('badge-wish');
    const bb = document.getElementById('badge-bag');
    wb.style.display = userWishlist.length ? 'flex' : 'none';
    wb.innerText = userWishlist.length;
    bb.style.display = userCart.length ? 'flex' : 'none';
    bb.innerText = userCart.length;
}

function generateRandomCode() {
    const phoneInput = document.getElementById('verify-phone').value.trim();
    const err = document.getElementById('offer-err');

    if(phoneInput === sessionUser.phone) {
        err.style.display = 'none';
        showLoader('Verifying Identity...', 1500, () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let randomPart = '';
            for (let i = 0; i < 6; i++) {
                randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            generatedCode = `LUXE-${randomPart}-1RS`;

            document.getElementById('offer-locked').style.display = 'none';
            document.getElementById('display-random-code').innerText = generatedCode;
            document.getElementById('offer-unlocked').style.display = 'block';
            showToast('Code Generated!');
        });
    } else {
        err.style.display = 'block';
    }
}

function renderWishlistContents() {
    const list = document.getElementById('container-wishlist');
    const fallback = document.getElementById('wishlist-fallback');
    if(!userWishlist.length) { fallback.style.display = 'block'; list.innerHTML = ''; return; }
    fallback.style.display = 'none';
    
    list.innerHTML = userWishlist.map(id => {
        const p = catalog.find(x => x.id === id);
        return `
        <div class="line-item">
            <img src="${p.img}" class="line-img">
            <div class="line-info">
                <div class="item-brand" style="margin-bottom:5px;">${p.brand}</div>
                <div class="item-title" style="font-weight:600; white-space:normal; margin-bottom:5px;">${p.title}</div>
                <div class="item-price">₹${p.price.toLocaleString()}</div>
                <button class="btn-prime" style="padding:10px; margin-top:10px; font-size:12px; width:fit-content;" onclick="addToBag(${p.id})">MOVE TO BAG</button>
            </div>
        </div>`;
    }).join('');
}

function renderBagContents() {
    const list = document.getElementById('container-bag-items');
    const fallback = document.getElementById('bag-fallback');
    const flow = document.getElementById('bag-operational-flow');
    
    if(!userCart.length) { fallback.style.display = 'block'; flow.style.display = 'none'; return; }
    fallback.style.display = 'none'; flow.style.display = 'block';
    
    list.innerHTML = userCart.map(id => {
        const p = catalog.find(x => x.id === id);
        return `
        <div class="line-item">
            <img src="${p.img}" class="line-img">
            <div class="line-info">
                <div class="item-brand" style="margin-bottom:5px;">${p.brand}</div>
                <div class="item-title" style="font-weight:600; white-space:normal; margin-bottom:5px;">${p.title}</div>
                <div style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">Qty: 1</div>
                <div class="item-price">₹${p.price.toLocaleString()}</div>
            </div>
        </div>`;
    }).join('');

    calculateBill();
}

/* COMPONENT PROTECTION LAYER: Validates that cart length is strictly 1 or 2 items */
function processCouponValidation() {
    const input = document.getElementById('manual-promo-field').value.trim().toUpperCase();
    const err = document.getElementById('manual-promo-error');
    
    if(generatedCode && input === generatedCode) {
        // Checking if user has exactly 1 or 2 products in cart
        if (userCart.length === 1 || userCart.length === 2) {
            err.style.display = 'none';
            showLoader('Validating Promo Code...', 1500, () => {
                promotionApplied = true;
                document.getElementById('manual-promo-field').value = 'PROMO APPLIED';
                document.getElementById('manual-promo-field').disabled = true;
                document.getElementById('manual-promo-field').style.color = 'var(--success)';
                document.getElementById('manual-promo-field').style.fontWeight = 'bold';
                showToast('Discount Applied!');
                calculateBill();
            });
        } else {
            // Cart constraint failed (3 or more items)
            err.innerText = 'Limit Exceeded: Promotional codes are restricted to a maximum of 2 items per customer session.';
            err.style.display = 'block';
        }
    } else {
        err.innerText = 'Invalid or expired coupon code.';
        err.style.display = 'block';
    }
}

function calculateBill() {
    const rawObjects = userCart.map(id => catalog.find(p => p.id === id));
    const totalMrp = rawObjects.reduce((acc, current) => acc + current.price, 0);
    
    document.getElementById('ledger-mrp').innerText = '₹' + totalMrp.toLocaleString();
    
    if(promotionApplied) {
        const discount = totalMrp - 1; 
        document.getElementById('ledger-discount').innerText = '- ₹' + discount.toLocaleString();
        document.getElementById('ledger-total').innerText = '₹1';
    } else {
        document.getElementById('ledger-discount').innerText = '- ₹0';
        document.getElementById('ledger-total').innerText = '₹' + totalMrp.toLocaleString();
    }
}

function evaluateCheckoutPermission() {
    if(!promotionApplied) {
        alert('Please generate your code from the Offers tab and apply it here first.');
        return;
    }
    navigateToRoute('view-shipping');
}

function executeFinalOrderPipeline() {
    const name = document.getElementById('ship-fullname').value.trim();
    const city = document.getElementById('ship-city').value.trim();
    
    if(!name || !city) {
        alert('Please complete your delivery address details.');
        return;
    }

    showLoader('Securing Payment Gateway...', 1500, () => {
        showLoader('Processing ₹1 Transaction...', 2000, () => {
            document.getElementById('navigation-bar').style.display = 'none';
            navigateToRoute('view-prank');
            document.body.style.background = '#fef2f2';
        });
    });
}
