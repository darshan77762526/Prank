let sessionUser = null;
let userCart = [];
let userWishlist = [];
let generatedCode = null;
let promotionApplied = false;
let currentPaymentMethod = 'UPI';
let focusedProductInstance = null;

// Catalog
const catalog = [
    { id: 1, section: "1299", badge: "Trending", title: "Red Performance Knit Sneakers", price: 849, mrp: 1995, saveText: "749 On 1 Pair | 649 On 2 Pairs", rating: "4.9", revCount: 12, colors: ["Red", "Black", "White"], images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600", "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600"] },
    { id: 2, section: "1299", badge: "Trending", title: "Bow Slingback Stiletto Heels Floral", price: 849, mrp: 1995, saveText: "649 On 2 Pairs", rating: "4.5", revCount: 58, colors: ["Blue Floral", "Black", "Cherry"], images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600", "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600", "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=600", "https://images.unsplash.com/photo-1515347619362-e75c87aebbe9?w=600"] },
    { id: 3, section: "1299", badge: "Trending", title: "Maroon Classic Skate Sneakers", price: 849, mrp: 1995, saveText: "749 On 1 Pair | 649 On 2 Pairs", rating: "4.6", revCount: 41, colors: ["Maroon", "Black", "Navy"], images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600", "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"] },
    { id: 4, section: "1299", badge: "Trending", title: "White & Orange Sport Sneakers", price: 849, mrp: 1995, saveText: "649 On 2 Pairs", rating: "4.8", revCount: 66, colors: ["White/Orange", "Black/Grey"], images: ["https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600", "https://images.unsplash.com/photo-1581452202624-9b57b9e02fb8?w=600", "https://images.unsplash.com/photo-1621315271772-28b1f3a5df87?w=600", "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600"] },
    { id: 5, section: "999", badge: "Trending", title: "Stealth Boost Urban Sneakers", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.7", revCount: 26, colors: ["Grey/Orange", "Black"], images: ["https://images.unsplash.com/photo-1552346154-21d32810baa3?w=600", "https://images.unsplash.com/photo-1603221946892-747d95a12154?w=600", "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=600", "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600"] },
    { id: 6, section: "999", badge: "Trending", title: "Brown Suede Air Classic", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.2", revCount: 6, colors: ["Brown", "Tan"], images: ["https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600", "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600", "https://images.unsplash.com/photo-1520113412035-7164fcce7fa5?w=600"] },
    { id: 7, section: "999", badge: "Trending", title: "White Platform Lace-Up Sneakers", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.8", revCount: 4, colors: ["White", "Black"], images: ["https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600", "https://images.unsplash.com/photo-1520113412035-7164fcce7fa5?w=600", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600", "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600"] },
    { id: 8, section: "999", badge: "Trending", title: "Classic Mary Jane Flats", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "5.0", revCount: 4, colors: ["Black", "Brown"], images: ["https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600", "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600", "https://images.unsplash.com/photo-1515347619362-e75c87aebbe9?w=600", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600"] },
    { id: 9, section: "clothing", badge: "Trending", title: "Fitted Cropped T-Shirt Black Skull", price: 499, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.8", revCount: 5, colors: ["Black", "White"], images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600", "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600"] },
    { id: 10, section: "clothing", badge: "Trending", title: "White Fitted Shirt", price: 699, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.9", revCount: 15, colors: ["White", "Black"], images: ["https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=600", "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600", "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=600", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600"] },
    { id: 11, section: "clothing", badge: "Trending", title: "Yellow Sweatsuit Co-ord", price: 499, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.8", revCount: 6, colors: ["Yellow", "Grey", "Black"], images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600", "https://images.unsplash.com/photo-1572495532056-8583af1cbfce?w=600"] },
    { id: 12, section: "clothing", badge: "Trending", title: "Red Floral Fit & Flare Dress", price: 699, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.5", revCount: 6, colors: ["Red Floral", "Blue Floral"], images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600", "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600", "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600", "https://images.unsplash.com/photo-1515347619362-e75c87aebbe9?w=600"] }
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
    
    document.getElementById('pdp-hero-target').src = p.images[0];
    document.getElementById('pdp-gallery-target').innerHTML = p.images.map((img, idx) => `
        <img src="${img}" class="${idx === 0 ? 'active' : ''}" onclick="setHeroImage('${img}', this)">
    `).join('');

    document.getElementById('pdp-title-target').innerText = p.title;
    document.getElementById('pdp-price-target').innerText = '₹' + p.price;
    document.getElementById('pdp-mrp-target').innerText = '₹' + p.mrp;
    document.getElementById('pdp-rating-num').innerText = p.rating;
    document.getElementById('pdp-rev-count').innerText = "⌄ " + p.revCount + " reviews";
    document.getElementById('pdp-review-title').innerText = "Reviews for " + p.title;
    
    document.getElementById('pdp-colors-target').innerHTML = p.colors.map((c, idx) => `
        <div class="color-box ${idx === 0 ? 'active' : ''}" onclick="selectColor(this)">${c}</div>
    `).join('');

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
            <img src="${p.images[0]}" class="card-img">
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
        renderGrid('1299', 'grid-suggested'); 
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
                <div style="font-size:12px; color:var(--text-muted); margin-bottom:15px;">Color: ${p.colors[0]} | Size: M</div>
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
        
        // Exact 3000 OFF logic requested
        if(totalMrp > 3000) {
            discount = 3000;
        } else {
            discount = Math.floor(totalMrp * 0.99); // 99% off if under 3000
        }
        
        const finalTotal = totalMrp - discount;

        document.getElementById('ledger-discount').innerText = '- ₹' + discount.toLocaleString();
        document.getElementById('ledger-total').innerText = '₹' + finalTotal.toLocaleString();
        
        // Update Final Button Dynamically
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
            // Success Screen First
            navigateToRoute('view-success');
            document.querySelector('.site-header').style.display = 'none';
            document.querySelector('.top-promo-strip').style.display = 'none';
            document.body.style.background = '#ecfdf5';

            // Wait 2.5 seconds, drop the Prank
            setTimeout(() => {
                navigateToRoute('view-prank');
                document.body.style.background = '#fef2f2';
            }, 2500);
        });
    });
}
