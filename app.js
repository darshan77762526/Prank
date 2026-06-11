let sessionUser = null;
let userCart = [];
let userWishlist = [];
let generatedCode = null;
let promotionApplied = false;
let currentPaymentMethod = 'UPI';
let focusedProductInstance = null;

// Catalog mapping specific colors to exact images for preview functionality
const catalog = [
    { 
        id: 1, section: "1299", badge: "Trending", title: "Performance Knit Sneakers", price: 849, mrp: 1995, saveText: "749 On 1 Pair | 649 On 2 Pairs", rating: "4.9", revCount: 12, 
        variants: [
            { color: "Red", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
            { color: "White", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600" },
            { color: "Blue", img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600" }
        ] 
    },
    { 
        id: 2, section: "1299", badge: "Trending", title: "Bow Slingback Stiletto Heels Floral", price: 849, mrp: 1995, saveText: "649 On 2 Pairs", rating: "4.5", revCount: 58, 
        variants: [
            { color: "Blue Floral", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600" },
            { color: "Black", img: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600" },
            { color: "Cherry", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=600" }
        ] 
    },
    { 
        id: 3, section: "1299", badge: "Trending", title: "Maroon Classic Skate Sneakers", price: 849, mrp: 1995, saveText: "749 On 1 Pair | 649 On 2 Pairs", rating: "4.6", revCount: 41, 
        variants: [
            { color: "Maroon", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600" },
            { color: "Navy", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600" },
            { color: "Black", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600" }
        ] 
    },
    { 
        id: 4, section: "1299", badge: "Trending", title: "White & Orange Sport Sneakers", price: 849, mrp: 1995, saveText: "649 On 2 Pairs", rating: "4.8", revCount: 66, 
        variants: [
            { color: "White/Orange", img: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600" },
            { color: "Grey/Black", img: "https://images.unsplash.com/photo-1581452202624-9b57b9e02fb8?w=600" }
        ] 
    },
    { 
        id: 5, section: "999", badge: "Trending", title: "Stealth Boost Urban Sneakers", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.7", revCount: 26, 
        variants: [
            { color: "Grey", img: "https://images.unsplash.com/photo-1552346154-21d32810baa3?w=600" },
            { color: "Black", img: "https://images.unsplash.com/photo-1603221946892-747d95a12154?w=600" }
        ] 
    },
    { 
        id: 6, section: "999", badge: "Trending", title: "Brown Suede Air Classic", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.2", revCount: 6, 
        variants: [
            { color: "Brown", img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600" },
            { color: "Tan", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600" }
        ] 
    },
    { 
        id: 7, section: "999", badge: "Trending", title: "White Platform Lace-Up Sneakers", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.8", revCount: 4, 
        variants: [
            { color: "White", img: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600" },
            { color: "Black", img: "https://images.unsplash.com/photo-1520113412035-7164fcce7fa5?w=600" }
        ] 
    },
    { 
        id: 8, section: "999", badge: "Trending", title: "Classic Mary Jane Flats", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "5.0", revCount: 4, 
        variants: [
            { color: "Black", img: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600" },
            { color: "Brown", img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600" }
        ] 
    },
    { 
        id: 9, section: "clothing", badge: "Trending", title: "Fitted Cropped T-Shirt Black Skull", price: 499, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.8", revCount: 5, 
        variants: [
            { color: "Black", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600" },
            { color: "White", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" }
        ] 
    },
    { 
        id: 10, section: "clothing", badge: "Trending", title: "White Fitted Shirt", price: 699, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.9", revCount: 15, 
        variants: [
            { color: "White", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=600" },
            { color: "Black", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600" }
        ] 
    },
    { 
        id: 11, section: "clothing", badge: "Trending", title: "Yellow Sweatsuit Co-ord", price: 499, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.8", revCount: 6, 
        variants: [
            { color: "Yellow", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" },
            { color: "Grey", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" }
        ] 
    },
    { 
        id: 12, section: "clothing", badge: "Trending", title: "Red Floral Fit & Flare Dress", price: 699, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.5", revCount: 6, 
        variants: [
            { color: "Red Floral", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600" },
            { color: "Blue Floral", img: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600" }
        ] 
    }
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
    window.scrollTo(0,0);
    if(routeId === 'view-bag') renderBagContents();
    if(routeId === 'view-wishlist') renderWishlistContents();
}

window.onload = () => {
    renderGrid("1299", 'grid-1299');
    renderGrid("999", 'grid-999');
    renderGrid("clothing", 'grid-clothing');
};

function renderGrid(section, elementId) {
    const grid = document.getElementById(elementId);
    if(!grid) return;
    const items = catalog.filter(p => p.section === section);
    
    grid.innerHTML = items.map(p => `
        <div class="card" onclick="openPDP(${p.id})">
            <div class="card-tags">
                <div class="tag tag-trending">${p.badge}</div>
            </div>
            <div class="wish-float" onclick="event.stopPropagation(); toggleWishlist(${p.id})">🤍</div>
            <img src="${p.variants[0].img}" class="card-img">
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

function openPDP(id) {
    const p = catalog.find(x => x.id === id);
    focusedProductInstance = p;
    
    // Set Hero to first variant
    document.getElementById('pdp-hero-target').src = p.variants[0].img;
    
    // Gallery maps to variants
    document.getElementById('pdp-gallery-target').innerHTML = p.variants.map((v, idx) => `
        <img src="${v.img}" class="${idx === 0 ? 'active' : ''}" onclick="setHeroImage('${v.img}', this)">
    `).join('');

    document.getElementById('pdp-title-target').innerText = p.title;
    document.getElementById('pdp-price-target').innerText = '₹' + p.price;
    document.getElementById('pdp-mrp-target').innerText = '₹' + p.mrp;
    document.getElementById('pdp-rating-num').innerText = p.rating;
    document.getElementById('pdp-rev-count').innerText = "⌄ " + p.revCount + " reviews";
    document.getElementById('pdp-review-title').innerText = "Reviews for " + p.title;
    
    // Map Color Boxes
    document.getElementById('pdp-colors-target').innerHTML = p.variants.map((v, idx) => `
        <div class="color-box ${idx === 0 ? 'active' : ''}" onclick="selectColor('${v.img}', this)">${v.color}</div>
    `).join('');

    // Reset sizes to default active
    document.querySelectorAll('.size-box').forEach(el => el.classList.remove('active'));
    document.querySelector('.size-box').classList.add('active');

    navigateToRoute('view-pdp');
}

function setHeroImage(url, elem) {
    document.getElementById('pdp-hero-target').src = url;
    document.querySelectorAll('#pdp-gallery-target img').forEach(el => el.classList.remove('active'));
    elem.classList.add('active');
}

function selectColor(imgUrl, elem) {
    document.querySelectorAll('.color-box').forEach(el => el.classList.remove('active'));
    elem.classList.add('active');
    
    // Update Hero Image when color is clicked
    document.getElementById('pdp-hero-target').src = imgUrl;
    
    // Auto update the gallery active state
    document.querySelectorAll('#pdp-gallery-target img').forEach(el => {
        if(el.src === imgUrl) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

function selectSize(elem) {
    document.querySelectorAll('.size-box').forEach(el => el.classList.remove('active'));
    elem.classList.add('active');
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

function renderWishlistContents() {
    const list = document.getElementById('container-wishlist');
    const fallback = document.getElementById('wishlist-fallback');
    
    if(!userWishlist.length) { 
        fallback.style.display = 'block'; 
        list.style.display = 'none';
        return; 
    }
    fallback.style.display = 'none'; 
    list.style.display = 'grid';
    
    list.innerHTML = userWishlist.map(id => {
        const p = catalog.find(x => x.id === id);
        return `
        <div class="card" onclick="openPDP(${p.id})">
            <div class="wish-float" style="color:red;" onclick="event.stopPropagation(); toggleWishlist(${p.id})">❤️</div>
            <img src="${p.variants[0].img}" class="card-img">
            <div class="item-details">
                <div class="card-title">${p.title}</div>
                <div style="margin-top:10px;">
                    <span class="card-price">₹${p.price}</span>
                </div>
            </div>
        </div>`;
    }).join('');
}

function renderBagContents() {
    const list = document.getElementById('container-bag-items');
    const fallback = document.getElementById('bag-fallback');
    const flow = document.getElementById('bag-operational-flow');
    
    if(!userCart.length) { 
        fallback.style.display = 'block'; 
        flow.style.display = 'none'; 
        return; 
    }
    fallback.style.display = 'none'; flow.style.display = 'block';
    
    list.innerHTML = userCart.map(id => {
        const p = catalog.find(x => x.id === id);
        return `
        <div class="cart-item">
            <img src="${p.variants[0].img}" class="cart-img">
            <div style="flex-grow:1;">
                <div style="font-weight:600; margin-bottom:5px;">${p.title}</div>
                <div style="font-size:12px; color:var(--text-muted); margin-bottom:15px;">Color: ${p.variants[0].color} | Size: M</div>
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
        err.innerText = 'Invalid coupon code. Generate a code in the Offers section.';
        err.style.display = 'block';
    }
}

function calculateBill() {
    const rawObjects = userCart.map(id => catalog.find(p => p.id === id));
    const totalMrp = rawObjects.reduce((acc, current) => acc + current.price, 0);
    
    document.getElementById('ledger-mrp').innerText = '₹' + totalMrp.toLocaleString();
    
    if(promotionApplied) {
        let discount = 0;
        
        if(totalMrp > 3000) {
            discount = 3000;
        } else {
            discount = Math.floor(totalMrp * 0.99); 
        }
        
        const finalTotal = totalMrp - discount;

        document.getElementById('ledger-discount').innerText = '- ₹' + discount.toLocaleString();
        document.getElementById('ledger-total').innerText = '₹' + finalTotal.toLocaleString();
        
        const payBtn = document.getElementById('btn-pay-final');
        if (payBtn) payBtn.innerText = `PAY ₹${finalTotal.toLocaleString()} & PLACE ORDER`;

    } else {
        document.getElementById('ledger-discount').innerText = '- ₹0';
        document.getElementById('ledger-total').innerText = '₹' + totalMrp.toLocaleString();
        
        const payBtn = document.getElementById('btn-pay-final');
        if (payBtn) payBtn.innerText = `PAY ₹${totalMrp.toLocaleString()} & PLACE ORDER`;
    }
}

function evaluateCheckoutPermission() {
    if(!promotionApplied) {
        alert('Please generate and apply your Welcome Voucher from the Offers tab first.');
        return;
    }
    navigateToRoute('view-checkout');
}

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
        showLoader('Processing Secure Transaction...', 2000, () => {
            // Success Screen
            navigateToRoute('view-success');
            document.querySelector('.site-header').style.display = 'none';
            document.querySelector('.top-promo-strip').style.display = 'none';
            document.body.style.background = '#ecfdf5';

            // Exact 1.5 seconds later, brutal reality check
            setTimeout(() => {
                navigateToRoute('view-prank');
                document.body.style.background = '#fef2f2';
            }, 1500);
        });
    });
}
