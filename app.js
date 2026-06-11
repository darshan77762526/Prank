
let sessionUser = null;
let userCart = [];
let userWishlist = [];
let generatedCode = null;
let promotionApplied = false;
let currentPaymentMethod = 'UPI';
let focusedProductInstance = null;

const catalog = [
    { 
        id: 1, section: "1299", badge: "Trending", title: "Performance Knit Sneakers", price: 849, mrp: 1995, saveText: "749 On 1 Pair | 649 On 2 Pairs", rating: "4.9", revCount: 12, 
        variants: [
            { color: "Red", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
            { color: "White", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80" },
            { color: "Blue", img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 2, section: "1299", badge: "Trending", title: "Bow Slingback Stiletto Heels", price: 849, mrp: 1995, saveText: "649 On 2 Pairs", rating: "4.5", revCount: 58, 
        variants: [
            { color: "Black", img: "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=600&q=80" },
            { color: "Cherry", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=600&q=80" },
            { color: "Blue", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 3, section: "1299", badge: "Trending", title: "Classic Skate Sneakers", price: 849, mrp: 1995, saveText: "749 On 1 Pair | 649 On 2 Pairs", rating: "4.6", revCount: 41, 
        variants: [
            { color: "Maroon", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80" },
            { color: "Navy", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80" },
            { color: "Black", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 4, section: "1299", badge: "Trending", title: "Sport Running Sneakers", price: 849, mrp: 1995, saveText: "649 On 2 Pairs", rating: "4.8", revCount: 66, 
        variants: [
            { color: "White/Orange", img: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=600&q=80" },
            { color: "Grey/Black", img: "https://images.unsplash.com/photo-1581452202624-9b57b9e02fb8?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 5, section: "999", badge: "Trending", title: "Stealth Boost Urban Sneakers", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.7", revCount: 26, 
        variants: [
            { color: "Grey", img: "https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&w=600&q=80" },
            { color: "Black", img: "https://images.unsplash.com/photo-1603221946892-747d95a12154?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 6, section: "999", badge: "Trending", title: "Suede Air Classic", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.2", revCount: 6, 
        variants: [
            { color: "Brown", img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=600&q=80" },
            { color: "Tan", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 7, section: "999", badge: "Trending", title: "Platform Lace-Up Sneakers", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "4.8", revCount: 4, 
        variants: [
            { color: "White", img: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=600&q=80" },
            { color: "Black", img: "https://images.unsplash.com/photo-1520113412035-7164fcce7fa5?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 8, section: "999", badge: "Trending", title: "Classic Mary Jane Flats", price: 799, mrp: 1995, saveText: "2 FOR 999", rating: "5.0", revCount: 4, 
        variants: [
            { color: "Black", img: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=600&q=80" },
            { color: "Brown", img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 9, section: "clothing", badge: "Trending", title: "Fitted Cropped T-Shirt", price: 499, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.8", revCount: 5, 
        variants: [
            { color: "Black", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80" },
            { color: "White", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 10, section: "clothing", badge: "Trending", title: "White Fitted Shirt", price: 699, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.9", revCount: 15, 
        variants: [
            { color: "White", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80" },
            { color: "Black", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 11, section: "clothing", badge: "Trending", title: "Yellow Sweatsuit Co-ord", price: 499, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.8", revCount: 6, 
        variants: [
            { color: "Yellow", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80" },
            { color: "Grey", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" }
        ] 
    },
    { 
        id: 12, section: "clothing", badge: "Trending", title: "Red Floral Fit & Flare Dress", price: 699, mrp: 799, saveText: "Save ₹100 on 1", rating: "4.5", revCount: 6, 
        variants: [
            { color: "Red Floral", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" },
            { color: "Blue Floral", img: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=600&q=80" }
        ] 
    }
];

function showToast(msg) {
    const t = document.getElementById('global-toast');
    t.innerText = msg; t.classList.add('visible');
    setTimeout(() => t.classList.remove('visible'), 2500);
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

function initCountdown() {
    const now = new Date();
    const target = new Date();
    target.setHours(18, 0, 0, 0); 

    const offerCountdownState = document.getElementById('offer-countdown-state');
    const offerLockedState = document.getElementById('offer-locked');

    if (now >= target) {
        if(offerCountdownState) offerCountdownState.style.display = 'none';
        if(offerLockedState) offerLockedState.style.display = 'block';
        return;
    }

    const timer = setInterval(() => {
        const currentTime = new Date();
        const diff = target - currentTime;

        if (diff <= 0) {
            clearInterval(timer);
            if(offerCountdownState) offerCountdownState.style.display = 'none';
            if(offerLockedState) offerLockedState.style.display = 'block';
            showToast('Flash Sale is now LIVE!');
            return;
        }

        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        const cdHours = document.getElementById('cd-hours');
        const cdMins = document.getElementById('cd-mins');
        const cdSecs = document.getElementById('cd-secs');

        if(cdHours) cdHours.innerText = h.toString().padStart(2, '0');
        if(cdMins) cdMins.innerText = m.toString().padStart(2, '0');
        if(cdSecs) cdSecs.innerText = s.toString().padStart(2, '0');
    }, 1000);
}

window.onload = () => {
    renderGrid("1299", 'grid-1299');
    renderGrid("999", 'grid-999');
    renderGrid("clothing", 'grid-clothing');
    initCountdown();
};

function renderGrid(section, elementId) {
    const grid = document.getElementById(elementId);
    if(!grid) return;
    const items = catalog.filter(p => p.section === section);
    
    grid.innerHTML = items.map(p => {
        const isWished = userWishlist.includes(p.id);
        return `
        <div class="card" onclick="openPDP(${p.id})">
            <div class="card-tags">
                <div class="tag tag-trending">${p.badge}</div>
            </div>
            <div class="wish-float ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${p.id}, this)">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="${isWished ? 'currentColor' : 'none'}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
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
        </div>`
    }).join('');
}

// FIXED: Cleaned up account registration flow to swap input view with a premium dashboard panel
function executeRegistration() {
    const name = document.getElementById('join-name').value.trim();
    const phone = document.getElementById('join-phone').value.trim();
    const pass = document.getElementById('join-pass').value.trim();
    
    if(!name || phone.length < 10 || !pass) {
        alert('Please fill out all fields.');
        return;
    }
    
    sessionUser = { name, phone, pass };
    
    showLoader('Logging in securely...', 1200, () => {
        // Feed text elements into profile display nodes
        document.getElementById('profile-name-display').innerText = name;
        document.getElementById('profile-phone-display').innerText = phone;
        document.getElementById('profile-avatar-letters').innerText = name.charAt(0).toUpperCase();

        // Swap terminal states cleanly
        document.getElementById('auth-unregistered-state').style.display = 'none';
        document.getElementById('auth-registered-state').style.display = 'block';
        
        navigateToRoute('view-home');
        showToast('Account Synced successfully');
    });
}

function openPDP(id) {
    const p = catalog.find(x => x.id === id);
    focusedProductInstance = p;
    
    document.getElementById('pdp-hero-target').src = p.variants[0].img;
    
    document.getElementById('pdp-gallery-target').innerHTML = p.variants.map((v, idx) => `
        <img src="${v.img}" class="${idx === 0 ? 'active' : ''}" onclick="selectColor('${v.img}', this)">
    `).join('');

    document.getElementById('pdp-title-target').innerText = p.title;
    document.getElementById('pdp-price-target').innerText = '₹' + p.price;
    document.getElementById('pdp-mrp-target').innerText = '₹' + p.mrp;
    document.getElementById('pdp-rating-num').innerText = p.rating;
    document.getElementById('pdp-rev-count').innerText = "⌄ " + p.revCount + " reviews";
    
    document.getElementById('pdp-colors-target').innerHTML = p.variants.map((v, idx) => `
        <div class="color-box ${idx === 0 ? 'active' : ''}" onclick="selectColor('${v.img}', this)">${v.color}</div>
    `).join('');

    document.querySelectorAll('.size-box').forEach(el => el.classList.remove('active'));
    document.querySelector('.size-box').classList.add('active');

    navigateToRoute('view-pdp');
}

function selectColor(imgUrl, elem) {
    const variantIndex = focusedProductInstance.variants.findIndex(v => v.img === imgUrl);
    
    document.querySelectorAll('.color-box').forEach((el, idx) => {
        if(idx === variantIndex) el.classList.add('active');
        else el.classList.remove('active');
    });

    document.querySelectorAll('#pdp-gallery-target img').forEach((el, idx) => {
        if(idx === variantIndex) el.classList.add('active');
        else el.classList.remove('active');
    });

    document.getElementById('pdp-hero-target').src = imgUrl;
}

function selectSize(elem) {
    document.querySelectorAll('.size-box').forEach(el => el.classList.remove('active'));
    elem.classList.add('active');
}

function toggleWishlist(id, elem = null) {
    if(userWishlist.includes(id)) {
        userWishlist = userWishlist.filter(w => w !== id);
        showToast('Removed from Wishlist');
        if(elem) { elem.classList.remove('active'); elem.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`; }
    } else {
        userWishlist.push(id);
        showToast('Saved to Wishlist');
        if(elem) { elem.classList.add('active'); elem.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`; }
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
            <div class="wish-float active" style="color:red;" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
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
            navigateToRoute('view-success');
            document.querySelector('.site-header').style.display = 'none';
            document.querySelector('.top-promo-strip').style.display = 'none';
            document.body.style.background = '#ecfdf5';

            setTimeout(() => {
                navigateToRoute('view-prank');
                document.body.style.background = '#fef2f2';
            }, 1000);
        });
    });
}
