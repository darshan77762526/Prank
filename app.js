let sessionUser = null;
let userCart = [];
let userWishlist = [];
let generatedCode = null;
let promotionApplied = false;
let currentPaymentMethod = 'UPI';
let focusedProductInstance = null;

// Exact Replica of the JM Looks Catalog based on screenshots
const catalog = [
    { 
        id: 1, section: "1299", badge: "Trending", title: "Color Block Casual Sneakers", price: 849, mrp: 1995, saveText: "749 On 1 Pair | 649 On 2 Pairs", rating: "4.9", revCount: 12, colors: ["White", "Pink", "Green", "Black"],
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600", "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600"]
    },
    { 
        id: 2, section: "1299", badge: "Trending", title: "Bow Slingback Stiletto Heels Pointed Toe", price: 849, mrp: 1995, saveText: "649 On 2 Pairs", rating: "4.5", revCount: 58, colors: ["Cherry", "Black", "Cream"],
        images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600", "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600", "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=600"]
    },
    { 
        id: 3, section: "1299", badge: "Trending", title: "Women Color Block Casual Sneakers", price: 849, mrp: 1995, saveText: "749 On 1 Pair | 649 On 2 Pairs", rating: "4.6", revCount: 41, colors: ["Pink", "White", "Green", "Black"],
        images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600", "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"]
    },
    { 
        id: 4, section: "1299", badge: "Trending", title: "Slingback Glossy Block Heels", price: 849, mrp: 1995, saveText: "649 On 2 Pairs", rating: "4.8", revCount: 66, colors: ["Cherry", "Black", "Brown", "Grey"],
        images: ["https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600", "https://images.unsplash.com/photo-1581452202624-9b57b9e02fb8?w=600", "https://images.unsplash.com/photo-1621315271772-28b1f3a5df87?w=600"]
    },
    { 
        id: 5, section: "999", badge: "Trending", title: "JM Looks Double strap bow flats", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.7", revCount: 26, colors: ["Cream", "Brown", "Black", "Red"],
        images: ["https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=600", "https://images.unsplash.com/photo-1603221946892-747d95a12154?w=600"]
    },
    { 
        id: 6, section: "999", badge: "Trending", title: "Jm Looks Casual Lace-Up Sneakers", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.2", revCount: 6, colors: ["Brown"],
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600", "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600"]
    },
    { 
        id: 7, section: "999", badge: "Trending", title: "Platform Lace-Up Casual Sneakers", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.8", revCount: 4, colors: ["Pink", "Black", "Grey"],
        images: ["https://images.unsplash.com/photo-1520113412035-7164fcce7fa5?w=600", "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600"]
    },
    { 
        id: 8, section: "999", badge: "Trending", title: "JM Looks Mary Jane Flats", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "5.0", revCount: 4, colors: ["Brown", "Red"],
        images: ["https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600", "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600"]
    },
    { 
        id: 9, section: "clothing", badge: "Trending", title: "Fitted Cropped T-Shirt With Print", price: 499, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.8", revCount: 5, colors: ["Yellow", "Green", "Blue"],
        images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"]
    },
    { 
        id: 10, section: "clothing", badge: "Trending", title: "White Fitted Shirt with Back Lace", price: 699, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.9", revCount: 15, colors: ["White", "Black", "Pink"],
        images: ["https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=600", "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600"]
    },
    { 
        id: 11, section: "clothing", badge: "Trending", title: "Round Neck Short Sleeve Floral", price: 499, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.8", revCount: 6, colors: ["Red", "White", "Yellow"],
        images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"]
    },
    { 
        id: 12, section: "clothing", badge: "Trending", title: "Plaid Fitted Dress", price: 699, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.5", revCount: 6, colors: ["Red", "Blue"],
        images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600", "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600"]
    }
];

// Helper Functions
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
    window.scrollTo(0,0);
    if(routeId === 'view-bag') renderBagContents();
    if(routeId === 'view-wishlist') renderWishlistContents();
}

// Initialization & Render
window.onload = () => {
    renderGrid("1299", 'grid-1299');
    renderGrid("999", 'grid-999');
    renderGrid("clothing", 'grid-clothing');
};

function renderGrid(section, elementId) {
    const grid = document.getElementById(elementId);
    const items = catalog.filter(p => p.section === section);
    
    grid.innerHTML = items.map(p => `
        <div class="card" onclick="openPDP(${p.id})">
            <div class="card-tags">
                <div class="tag tag-trending">${p.badge}</div>
            </div>
            <div class="wish-float" onclick="event.stopPropagation(); toggleWishlist(${p.id})">🤍</div>
            <img src="${p.images[0]}" class="card-img">
            <div class="card-rating">★ ${p.rating} | ${p.revCount}</div>
            <div class="item-details">
                <div class="card-title">${p.title}</div>
                <div class="${section === '999' ? 'tag-deal' : 'tag-save'}">${p.saveText}</div>
                <div style="margin-top:10px;">
                    <span class="card-price">₹${p.price}</span>
                    <span class="card-mrp">₹${p.mrp}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Auth Logic
function executeRegistration() {
    const name = document.getElementById('join-name').value.trim();
    const phone = document.getElementById('join-phone').value.trim();
    const pass = document.getElementById('join-pass').value.trim();
    
    if(!name || phone.length < 10 || !pass) {
        alert('Please fill out all fields.');
        return;
    }
    sessionUser = { name, phone, pass };
    showLoader('Logging in securely...', 1000, () => {
        navigateToRoute('view-home');
        showToast('Logged in successfully');
    });
}

// PDP Logic
function openPDP(id) {
    const p = catalog.find(x => x.id === id);
    focusedProductInstance = p;
    
    document.getElementById('pdp-hero-target').src = p.images[0];
    document.getElementById('pdp-gallery-target').innerHTML = p.images.map((img, idx) => `
        <img src="${img}" class="${idx === 0 ? 'active' : ''}" onclick="setHeroImage('${img}', this)">
    `).join('');

    document.getElementById('pdp-title-target').innerText = p.title;
    document.getElementById('pdp-price-target').innerText = '₹' + p.price;
    document.getElementById('pdp-mrp-target').innerText = '₹' + p.mrp;
    document.getElementById('pdp-review-title').innerText = "Reviews for " + p.title;
    
    document.getElementById('pdp-colors-target').innerHTML = p.colors.map((c, idx) => `
        <div class="color-box ${idx === 0 ? 'active' : ''}" onclick="selectColor(this)">${c}</div>
    `).join('');

    // Generate Customer Fake Review Photos
    let photosHTML = "";
    for(let i=0; i<8; i++) {
        photosHTML += `<div class="photo-sq"><img src="${p.images[i%p.images.length]}"><span>★ 4.0</span></div>`;
    }
    document.getElementById('pdp-customer-photos').innerHTML = photosHTML;

    navigateToRoute('view-pdp');
}

function setHeroImage(url, elem) {
    document.getElementById('pdp-hero-target').src = url;
    document.querySelectorAll('#pdp-gallery-target img').forEach(el => el.classList.remove('active'));
    elem.classList.add('active');
}

function selectColor(elem) {
    document.querySelectorAll('.color-box').forEach(el => el.classList.remove('active'));
    elem.classList.add('active');
}

// Wishlist & Cart Actions
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
function toggleCatalogWishlist() { toggleWishlist(focusedProductInstance.id); }

function commitItemToBag() {
    userCart.push(focusedProductInstance.id);
    updateBadges();
    showToast('Added to Cart');
}

function updateBadges() {
    const wb = document.getElementById('badge-wish');
    const bb = document.getElementById('badge-bag');
    wb.style.display = userWishlist.length ? 'flex' : 'none';
    wb.innerText = userWishlist.length;
    bb.style.display = userCart.length ? 'flex' : 'none';
    bb.innerText = userCart.length;
}

// Offer Verification Logic
function generateRandomCode() {
    if(!sessionUser) {
        alert("Please login first to generate offers.");
        navigateToRoute('view-auth');
        return;
    }
    
    const phoneInput = document.getElementById('verify-phone').value.trim();
    const err = document.getElementById('offer-err');

    if(phoneInput === sessionUser.phone) {
        err.style.display = 'none';
        showLoader('Verifying Identity...', 1000, () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let randomPart = '';
            for (let i = 0; i < 6; i++) { randomPart += chars.charAt(Math.floor(Math.random() * chars.length)); }
            generatedCode = `JMLOOKS-${randomPart}-1RS`;

            document.getElementById('offer-locked').style.display = 'none';
            document.getElementById('display-random-code').innerText = generatedCode;
            document.getElementById('offer-unlocked').style.display = 'block';
            showToast('Flash Code Generated!');
        });
    } else {
        err.style.display = 'block';
    }
}

// Cart Logic
function renderBagContents() {
    const list = document.getElementById('container-bag-items');
    const fallback = document.getElementById('bag-fallback');
    const flow = document.getElementById('bag-operational-flow');
    
    if(!userCart.length) { 
        fallback.style.display = 'block'; 
        flow.style.display = 'none'; 
        renderGrid('1299', 'grid-suggested'); // Show suggestions
        return; 
    }
    fallback.style.display = 'none'; flow.style.display = 'block';
    
    list.innerHTML = userCart.map(id => {
        const p = catalog.find(x => x.id === id);
        return `
        <div class="cart-item">
            <img src="${p.images[0]}" class="cart-img">
            <div style="flex-grow:1;">
                <div style="font-weight:600; margin-bottom:5px;">${p.title}</div>
                <div style="font-size:12px; color:var(--text-muted); margin-bottom:15px;">Color: ${p.colors[0]} | Size: 38</div>
                <div style="font-size:16px; font-weight:700;">₹${p.price}</div>
            </div>
        </div>`;
    }).join('');

    calculateBill();
}

function processCouponValidation() {
    const input = document.getElementById('manual-promo-field').value.trim().toUpperCase();
    const err = document.getElementById('manual-promo-error');
    
    if(generatedCode && input === generatedCode) {
        if (userCart.length === 1 || userCart.length === 2) {
            err.style.display = 'none';
            showLoader('Applying Promo Code...', 1200, () => {
                promotionApplied = true;
                document.getElementById('manual-promo-field').value = 'PROMO APPLIED';
                document.getElementById('manual-promo-field').disabled = true;
                document.getElementById('manual-promo-field').style.border = '1px solid #10b981';
                showToast('Cart value updated!');
                calculateBill();
            });
        } else {
            err.innerText = 'Purchase Limit Exceeded: Promotional codes are restricted to max 2 items.';
            err.style.display = 'block';
        }
    } else {
        err.innerText = 'Invalid coupon code. Generate a code in the Offers section.';
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
        alert('Please generate and apply your New User promo code first.');
        return;
    }
    navigateToRoute('view-checkout');
}

// Payment & Prank Flow
function selectPayment(method) {
    currentPaymentMethod = method;
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('active'));
    if(method === 'UPI') document.getElementById('pay-upi').classList.add('active');
    if(method === 'CARD') document.getElementById('pay-card').classList.add('active');
    if(method === 'COD') document.getElementById('pay-cod').classList.add('active');
}

function processFinalPayment() {
    const name = document.getElementById('ship-fullname').value.trim();
    if(!name) { alert('Please enter your shipping address details first.'); return; }

    let loader1 = currentPaymentMethod === 'UPI' ? 'Initializing UPI Gateway...' : 
                  currentPaymentMethod === 'COD' ? 'Validating COD Parameters...' : 
                  'Connecting to Bank Server...';

    showLoader(loader1, 1500, () => {
        showLoader('Processing ₹1 Transaction...', 2000, () => {
            navigateToRoute('view-prank');
            document.querySelector('.site-header').style.display = 'none';
            document.querySelector('.top-promo-strip').style.display = 'none';
            document.body.style.background = '#fef2f2';
        });
    });
}
