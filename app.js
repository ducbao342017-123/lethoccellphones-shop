/* ==========================================================================
   LETHOCCELLPHONE'S - NETLIFY PROXY CLOUD SYNC ENGINE (v80.0.0)
   Token bảo mật trong Netlify ENV - không bao giờ lộ ra code
   ========================================================================== */

(function() {
  'use strict';

  var CURRENT_VERSION = "83.0.0";
  localStorage.setItem("lethoc_app_v", CURRENT_VERSION);

  // Netlify Function proxy - token ẩn trong server, không lộ ra client
  var SYNC_URL = "/.netlify/functions/sync";

  // SVG Fallback Data URI
  var SVG_FALLBACK = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%230e131f'/%3E%3Cpath d='M160 90h80a20 20 0 0 1 20 20v100a20 20 0 0 1-20 20h-80a20 20 0 0 1-20-20V110a20 20 0 0 1 20-20z' fill='none' stroke='%2306b6d4' stroke-width='4'/%3E%3Ccircle cx='200' cy='210' r='6' fill='%2306b6d4'/%3E%3Crect x='180' y='102' width='40' height='4' rx='2' fill='%2306b6d4'/%3E%3Ctext x='200' y='250' font-family='sans-serif' font-size='14' font-weight='bold' fill='%2394a3b8' text-anchor='middle'%3ELETHOCCELLPHONE'S%3C/text%3E%3C/svg%3E";

  // DEFAULT INITIAL PRODUCTS
  var DEFAULT_PRODUCTS = [
    {
      id: "prod-s21u",
      title: "s21U",
      category: "mobile",
      categoryName: "ĐIỆN THOẠI DI ĐỘNG",
      price: 6999999,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
      desc: "Likenew 99% - Màn 120Hz, Zoom 100x",
      badge: "Mới về",
      specs: ["Dynamic AMOLED 120Hz", "Camera 108MP Zoom 100x", "Pin 5000mAh", "Bảo hành 24T"]
    },
    {
      id: "prod-note20u",
      title: "Note20U5G",
      category: "mobile",
      categoryName: "ĐIỆN THOẠI DI ĐỘNG",
      price: 6500000,
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
      desc: "Likenew 99% - Bút S-Pen thần thánh",
      badge: "Hot",
      specs: ["Màn 6.9 inch 120Hz", "Bút S-Pen thần thánh", "Camera 108MP 8K", "Bảo hành 24T"]
    },
    {
      id: "prod-fold5",
      title: "Samsung Galaxy Z Fold 5",
      category: "mobile",
      categoryName: "ĐIỆN THOẠI DI ĐỘNG",
      price: 12500000,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80",
      desc: "Likenew 99% - Màn gập Flex cao cấp",
      badge: "Bán chạy",
      specs: ["Màn chính 7.6 inch Flex", "Snapdragon 8 Gen 2", "Kháng nước IPX8", "Bảo hành 24T"]
    }
  ];

  // DEFAULT TESTIMONIALS
  var DEFAULT_TESTIMONIALS = [
    {
      id: "test-1",
      name: "Trần Minh Hoàng",
      role: "Khách mua Note20U5G, Hà Nội",
      rating: 5,
      text: "Máy Note20U5G đẹp 99%, bút S-Pen mượt mà, màn 120Hz nét căng. Shop bọc hàng cẩn thận, giao hỏa tốc cực kỳ yên tâm.",
      avatar: "TH",
      color: "var(--accent-blue)"
    },
    {
      id: "test-2",
      name: "Nguyễn Minh Anh",
      role: "Khách mua s21U, TP.HCM",
      rating: 5,
      text: "Dịch vụ quá tuyệt vời! Đặt hàng s21U tầm 1 tiếng rưỡi là nhận tận nơi tại TP.HCM. Nhân viên gọi điện tư vấn bảo hành lịch sự.",
      avatar: "MA",
      color: "var(--accent-emerald)"
    },
    {
      id: "test-3",
      name: "Lê Khánh Duy",
      role: "Khách mua Fold 5, Đà Nẵng",
      rating: 5,
      text: "Galaxy Z Fold 5 gập khít đẹp hoàn hảo. Giá sỉ cực kỳ cạnh tranh, chính sách bảo hành 24 tháng siêu chu đáo.",
      avatar: "KD",
      color: "var(--accent-amber)"
    }
  ];

  // DEFAULT SETTINGS
  var DEFAULT_SETTINGS = {
    storeName: "LETHOCCELLPHONE'S",
    hotline: "0934338765",
    zalo: "0934338765",
    address: "Tầng 12, Tòa nhà Techno, Quận 1, TP. Hồ Chí Minh",
    password: "admin",
    credVisible: "show",
    cred1T: "100% Chính Hãng",
    cred1D: "Cam kết hoàn tiền gấp 10 lần...",
    cred2T: "Bảo Hành 12 Tháng",
    cred2D: "Chính sách bảo hành 12 tháng, lỗi 1 - đổi - 1 hoàn toàn mới trong 30 ngày đầu tiên.",
    cred3T: "Giao hàng toàn quốc",
    cred3D: "Giao hàng toàn quốc qua các hệ thống Giao hàng nhanh - ViettelPost - Bưu điện.",
    cred4T: "Hỗ Trợ Kỹ Thuật 24/7",
    cred4D: "Đội ngũ kỹ thuật tư vấn chuyên nghiệp, sẵn sàng giải đáp thắc mắc của khách hàng.",
    heroTag: "⚡ Trải nghiệm Không gian Công nghệ Hiện đại",
    heroTitle: "Nơi trải nghiệm Công nghệ<br><span>Mua sắm và Tận hưởng</span>",
    heroDesc: "Khám phá không gian công nghệ đỉnh cao và trải nghiệm mua sắm thoải mái với dịch vụ chăm sóc chu đáo.",
    heroImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
  };

  // State Management
  var state = {
    products: [],
    settings: DEFAULT_SETTINGS,
    testimonials: DEFAULT_TESTIMONIALS,
    orders: [],
    cart: [],
    activeCategory: "all",
    activeHeroTab: "new",
    isAdminLoggedIn: false
  };

  window.currentSpecsList = [];
  var _lastPushTime = 0;  // Timestamp of last local push – prevents sync from overwriting

  // Init Application
  function init() {
    loadLocalData();
    renderAll();
    setupEvents();
    syncFromCloudDB();
    
    // Automatically poll Cloud DB every 5 seconds to sync changes
    setInterval(syncFromCloudDB, 5000);
  }

  function loadLocalData() {
    try {
      var p = localStorage.getItem("lethoccellphone_products");
      state.products = p !== null ? JSON.parse(p) : DEFAULT_PRODUCTS;
      
      var s = localStorage.getItem("lethoccellphone_settings");
      state.settings = s !== null ? JSON.parse(s) : DEFAULT_SETTINGS;
      
      var t = localStorage.getItem("lethoccellphone_testimonials");
      state.testimonials = t !== null ? JSON.parse(t) : DEFAULT_TESTIMONIALS;

      var o = localStorage.getItem("lethoccellphone_orders");
      state.orders = o !== null ? JSON.parse(o) : [];

      var c = localStorage.getItem("lethoccellphone_cart");
      if (c) state.cart = JSON.parse(c);
    } catch(e) {
      state.products = DEFAULT_PRODUCTS;
      state.settings = DEFAULT_SETTINGS;
      state.testimonials = DEFAULT_TESTIMONIALS;
    }
  }

  function saveLocalData() {
    try {
      localStorage.setItem("lethoccellphone_products", JSON.stringify(state.products));
      localStorage.setItem("lethoccellphone_settings", JSON.stringify(state.settings));
      localStorage.setItem("lethoccellphone_testimonials", JSON.stringify(state.testimonials));
      localStorage.setItem("lethoccellphone_orders", JSON.stringify(state.orders));
    } catch(e) {}
    pushToCloudDB();
  }

  // PUSH TO CLOUD DATABASE (qua Netlify Function proxy)
  function pushToCloudDB() {
    var now = Date.now();
    _lastPushTime = now;   // Lock: chặn sync ghi đè 20 giây

    var payload = JSON.stringify({
      products: state.products,
      settings: state.settings,
      testimonials: state.testimonials,
      orders: state.orders,
      timestamp: now
    });

    fetch(SYNC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload
    }).then(function(res) {
      updateCloudBadge(res.ok);
    }).catch(function() {
      updateCloudBadge(false);
    });
  }

  // FETCH FROM CLOUD DATABASE (qua Netlify Function proxy - không bị cache)
  function syncFromCloudDB() {
    // Nếu vừa push local data, chờ 20s trước khi để cloud ghi đè
    if (Date.now() - _lastPushTime < 20000) return;

    fetch(SYNC_URL, { cache: "no-store" })
      .then(function(res) {
        if (!res.ok) throw new Error("Sync failed");
        return res.json();
      })
      .then(function(data) {
        if (data && data.products && Array.isArray(data.products)) {
          var cloudTs = data.timestamp || 0;
          if (cloudTs >= _lastPushTime) {
            state.products = data.products;
            if (data.settings) state.settings = data.settings;
            if (data.testimonials) state.testimonials = data.testimonials;
            if (data.orders) state.orders = data.orders;

            try {
              localStorage.setItem("lethoccellphone_products", JSON.stringify(state.products));
              localStorage.setItem("lethoccellphone_settings", JSON.stringify(state.settings));
              localStorage.setItem("lethoccellphone_testimonials", JSON.stringify(state.testimonials));
              localStorage.setItem("lethoccellphone_orders", JSON.stringify(state.orders));
            } catch(err) {}

            renderAllSafe();
          }
          updateCloudBadge(true);
        } else {
          pushToCloudDB();
        }
      })
      .catch(function() {
        updateCloudBadge(false);
      });
  }

  function updateCloudBadge(isSynced) {
    var badge = document.getElementById("cloud-sync-badge");
    if (!badge) return;
    if (isSynced) {
      badge.textContent = "🟢 Đã Đồng Bộ Cloud";
      badge.style.color = "#4ade80";
      badge.style.background = "rgba(74, 222, 128, 0.15)";
      badge.style.borderColor = "rgba(74, 222, 128, 0.4)";
    } else {
      badge.textContent = "🟡 Lưu máy cục bộ";
      badge.style.color = "#f59e0b";
      badge.style.background = "rgba(245, 158, 11, 0.15)";
      badge.style.borderColor = "rgba(245, 158, 11, 0.4)";
    }
  }

  function renderAll() {
    renderProducts();
    renderAdminProductsTable();
    renderTestimonials();
    renderAdminTestimonialsTable();
    renderAdminOrdersTable();
    applySettings();
    renderCart();
  }

  // renderAll nhưng KHÔNG reset form admin (dùng khi sync cloud)
  function renderAllSafe() {
    renderProducts();
    renderAdminProductsTable();
    renderTestimonials();
    renderAdminTestimonialsTable();
    renderAdminOrdersTable();
    applySettingsUI();  // Chỉ cập nhật giao diện công khai, KHÔNG reset form
    renderCart();
  }

  function applySettings() {
    applySettingsUI();
    applySettingsForm();
  }

  // Chỉ cập nhật giao diện công khai (logo, footer, hero, credibility...)
  // AN TOÀN để gọi bất cứ lúc nào kể cả khi admin modal đang mở
  function applySettingsUI() {
    var s = state.settings || DEFAULT_SETTINGS;
    var logo = document.getElementById("header-logo");
    if (logo) logo.innerHTML = (s.storeName || "LETHOCCELLPHONE'S").toUpperCase() + '<span>.</span>';

    var hotlineEl = document.getElementById("footer-hotline");
    if (hotlineEl) hotlineEl.textContent = "📞 Hotline: " + (s.hotline || "0934338765");

    var addressEl = document.getElementById("footer-address");
    if (addressEl) addressEl.textContent = "📍 Địa chỉ: " + (s.address || "TP. Hồ Chí Minh");

    var heroTag = document.getElementById("hero-tag-text");
    if (heroTag) heroTag.textContent = s.heroTag || "⚡ Trải nghiệm Không gian Công nghệ Hiện đại";

    var heroTitle = document.getElementById("hero-title-text");
    if (heroTitle) heroTitle.innerHTML = s.heroTitle || "Nơi trải nghiệm Công nghệ<br><span>Mua sắm và Tận hưởng</span>";

    var heroDesc = document.getElementById("hero-desc-text");
    if (heroDesc) heroDesc.textContent = s.heroDesc || "Khám phá không gian công nghệ đỉnh cao và trải nghiệm mua sắm thoải mái với dịch vụ chăm sóc chu đáo.";

    var heroImg = document.getElementById("hero-slide-img");
    if (heroImg) {
      heroImg.src = s.heroImage || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";
      heroImg.onerror = function() { this.src = SVG_FALLBACK; };
    }

    var credSection = document.getElementById("credibility");
    if (credSection) {
      credSection.style.display = s.credVisible === "hide" ? "none" : "block";
    }

    var c1t = document.getElementById("cred-title-1"); if (c1t) c1t.textContent = s.cred1T || "100% Chính Hãng";
    var c1d = document.getElementById("cred-desc-1"); if (c1d) c1d.textContent = s.cred1D || "Cam kết hoàn tiền gấp 10 lần...";
    var c2t = document.getElementById("cred-title-2"); if (c2t) c2t.textContent = s.cred2T || "Bảo Hành 12 Tháng";
    var c2d = document.getElementById("cred-desc-2"); if (c2d) c2d.textContent = s.cred2D || "Chính sách bảo hành 12 tháng...";
    var c3t = document.getElementById("cred-title-3"); if (c3t) c3t.textContent = s.cred3T || "Giao hàng toàn quốc";
    var c3d = document.getElementById("cred-desc-3"); if (c3d) c3d.textContent = s.cred3D || "Giao hàng toàn quốc qua các hệ thống...";
    var c4t = document.getElementById("cred-title-4"); if (c4t) c4t.textContent = s.cred4T || "Hỗ Trợ Kỹ Thuật 24/7";
    var c4d = document.getElementById("cred-desc-4"); if (c4d) c4d.textContent = s.cred4D || "Đội ngũ kỹ thuật tư vấn chuyên nghiệp...";

    var cleanHotline = (s.hotline || "0934338765").replace(/\s+/g, "");
    var cleanZalo = (s.zalo || "0934338765").replace(/\s+/g, "");

    var floatCall = document.getElementById("float-call-btn");
    if (floatCall) {
      floatCall.href = "tel:" + cleanHotline;
      var callSpan = floatCall.querySelector("span");
      if (callSpan) callSpan.textContent = "Hotline: " + (s.hotline || "0934338765");
    }

    var floatZalo = document.getElementById("float-zalo-btn");
    if (floatZalo) {
      floatZalo.href = "https://zalo.me/" + cleanZalo;
    }
  }

  // Chỉ cập nhật các ô input trong form admin settings
  // KHÔNG gọi hàm này khi đang sync cloud (để tránh xóa text đang gõ)
  function applySettingsForm() {
    var s = state.settings || DEFAULT_SETTINGS;
    var asStore = document.getElementById("as-storename"); if (asStore) asStore.value = s.storeName || "";
    var asHotline = document.getElementById("as-hotline"); if (asHotline) asHotline.value = s.hotline || "";
    var asZalo = document.getElementById("as-zalo"); if (asZalo) asZalo.value = s.zalo || "";
    var asAddress = document.getElementById("as-address"); if (asAddress) asAddress.value = s.address || "";
    var asPass = document.getElementById("as-password"); if (asPass) asPass.value = s.password || "admin";
    var asCredVis = document.getElementById("as-cred-visible"); if (asCredVis) asCredVis.value = s.credVisible || "show";

    var asC1T = document.getElementById("as-cred-title-1"); if (asC1T) asC1T.value = s.cred1T || "";
    var asC1D = document.getElementById("as-cred-desc-1"); if (asC1D) asC1D.value = s.cred1D || "";
    var asC2T = document.getElementById("as-cred-title-2"); if (asC2T) asC2T.value = s.cred2T || "";
    var asC2D = document.getElementById("as-cred-desc-2"); if (asC2D) asC2D.value = s.cred2D || "";
    var asC3T = document.getElementById("as-cred-title-3"); if (asC3T) asC3T.value = s.cred3T || "";
    var asC3D = document.getElementById("as-cred-desc-3"); if (asC3D) asC3D.value = s.cred3D || "";
    var asC4T = document.getElementById("as-cred-title-4"); if (asC4T) asC4T.value = s.cred4T || "";
    var asC4D = document.getElementById("as-cred-desc-4"); if (asC4D) asC4D.value = s.cred4D || "";

    var asHTag = document.getElementById("as-hero-tag"); if (asHTag) asHTag.value = s.heroTag || "";
    var asHTitle = document.getElementById("as-hero-title"); if (asHTitle) asHTitle.value = s.heroTitle || "";
    var asHDesc = document.getElementById("as-hero-desc"); if (asHDesc) asHDesc.value = s.heroDesc || "";
    var asHImg = document.getElementById("as-hero-image"); if (asHImg) asHImg.value = s.heroImage || "";
  }

  // Render Product Catalog
  function renderProducts() {
    var grid = document.getElementById("products-grid");
    if (!grid) return;
    grid.innerHTML = "";

    var filtered = state.products.filter(function(p) {
      if (state.activeCategory === "all") return true;
      return p.category === state.activeCategory;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem 0; font-size: 1rem;">Cửa hàng hiện chưa có sản phẩm nào. Bạn hãy vào <b>⚙️ Quản Trị</b> để thêm sản phẩm mới!</div>';
      return;
    }

    filtered.forEach(function(p) {
      var card = document.createElement("div");
      card.className = "product-card";
      var badgeHTML = p.badge ? '<span class="prod-badge-tag">' + p.badge + '</span>' : '';
      var imgSrc = p.image || SVG_FALLBACK;

      card.innerHTML = 
        badgeHTML +
        '<div class="prod-img-box" style="cursor: pointer;" onclick="openProductDetailDirectly(\'' + p.id + '\')">' +
          '<img src="' + imgSrc + '" alt="' + p.title + '" onerror="this.onerror=null; this.src=\'' + SVG_FALLBACK + '\';">' +
        '</div>' +
        '<div class="prod-category">' + (p.categoryName || p.category) + '</div>' +
        '<h3 class="prod-title" style="cursor: pointer;" onclick="openProductDetailDirectly(\'' + p.id + '\')">' + p.title + '</h3>' +
        '<p class="prod-desc">' + (p.desc || "") + '</p>' +
        '<div class="prod-price-row">' +
          '<div class="prod-price">' + formatVND(p.price) + '</div>' +
        '</div>' +
        '<div style="display: flex; gap: 0.5rem;">' +
          '<button class="btn btn-primary" onclick="openProductDetailDirectly(\'' + p.id + '\')" style="flex: 1; padding: 0.55rem; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Xem Chi Tiết</button>' +
          '<button class="btn btn-emerald" onclick="addToCartDirectly(\'' + p.id + '\')" style="padding: 0.55rem 0.75rem; font-size: 0.8rem;" title="Thêm vào giỏ hàng"><i class="fa-solid fa-cart-shopping"></i></button>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  // Render Customer Testimonials on Home Page
  function renderTestimonials() {
    var grid = document.getElementById("testimonials-grid");
    if (!grid) return;
    grid.innerHTML = "";

    state.testimonials.forEach(function(t) {
      var starsHTML = "";
      var count = t.rating || 5;
      for (var i = 0; i < count; i++) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
      }

      var card = document.createElement("div");
      card.className = "test-card";
      card.innerHTML = 
        '<div class="test-stars">' + starsHTML + '</div>' +
        '<p class="test-text">"' + t.text + '"</p>' +
        '<div class="test-author">' +
          '<div class="test-avatar" style="background: ' + (t.color || 'var(--accent-blue)') + ';">' + (t.avatar || 'KH') + '</div>' +
          '<div>' +
            '<h4 style="font-size: 0.95rem; font-weight: 700;">' + t.name + '</h4>' +
            '<span style="font-size: 0.78rem; color: var(--text-muted);">' + (t.role || 'Khách hàng') + '</span>' +
          '</div>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  // Render Admin Testimonials Table
  function renderAdminTestimonialsTable() {
    var tbody = document.getElementById("admin-testimonials-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    state.testimonials.forEach(function(t, idx) {
      var tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid var(--border-glass)";
      tr.innerHTML = 
        '<td style="padding: 0.75rem; font-weight: 700;">' + t.name + '</td>' +
        '<td style="padding: 0.75rem; color: var(--text-muted);">' + t.role + '</td>' +
        '<td style="padding: 0.75rem; color: var(--accent-amber);">' + t.rating + ' ⭐</td>' +
        '<td style="padding: 0.75rem; font-size: 0.85rem; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + t.text + '</td>' +
        '<td style="padding: 0.75rem; text-align: center;">' +
          '<button class="btn btn-secondary" onclick="deleteTestimonialDirectly(' + idx + ')" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; color: #f87171; border-color: #f87171;">Xóa</button>' +
        '</td>';
      tbody.appendChild(tr);
    });
  }

  // Render Cart Drawer
  function renderCart() {
    var list = document.getElementById("cart-items-list");
    var badge = document.getElementById("cart-count-badge");
    var totalEl = document.getElementById("cart-total-price");
    if (!list) return;

    list.innerHTML = "";
    var total = 0;
    var totalCount = 0;

    state.cart.forEach(function(item, idx) {
      total += (item.price * item.quantity);
      totalCount += item.quantity;

      var row = document.createElement("div");
      row.className = "cart-item-row";
      row.innerHTML = 
        '<img src="' + (item.image || SVG_FALLBACK) + '" class="cart-item-img" onerror="this.onerror=null; this.src=\'' + SVG_FALLBACK + '\';">' +
        '<div style="flex:1;">' +
          '<div style="font-weight:700; font-size:0.85rem;">' + item.title + '</div>' +
          '<div style="color:var(--accent-cyan); font-weight:800; font-size:0.85rem;">' + formatVND(item.price) + '</div>' +
          '<div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.3rem;">' +
            '<button type="button" onclick="updateCartQuantityDirectly(' + idx + ', -1)" style="padding:0.1rem 0.4rem; font-size:0.75rem; border-radius:4px; background:rgba(255,255,255,0.1); border:none; color:white; cursor:pointer;">-</button>' +
            '<span style="font-size:0.85rem; font-weight:700;">' + item.quantity + '</span>' +
            '<button type="button" onclick="updateCartQuantityDirectly(' + idx + ', 1)" style="padding:0.1rem 0.4rem; font-size:0.75rem; border-radius:4px; background:rgba(255,255,255,0.1); border:none; color:white; cursor:pointer;">+</button>' +
          '</div>' +
        '</div>' +
        '<button type="button" onclick="removeFromCartDirectly(' + idx + ')" style="background:none; border:none; color:#f87171; cursor:pointer; font-size:1.1rem;">×</button>';
      list.appendChild(row);
    });

    if (badge) badge.textContent = totalCount;
    if (totalEl) totalEl.textContent = formatVND(total);

    if (state.cart.length === 0) {
      list.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:3rem 0; font-size:0.9rem;">Giỏ hàng của bạn đang trống.</div>';
    }
  }

  // Render Admin Table
  function renderAdminProductsTable() {
    var tbody = document.getElementById("admin-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (state.products.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="padding: 2rem; text-align: center; color: var(--text-muted);">Chưa có sản phẩm nào trong danh sách. Hãy bấm "Thêm Sản Phẩm Mới" để đăng sản phẩm!</td></tr>';
      return;
    }

    state.products.forEach(function(p, idx) {
      var tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid var(--border-glass)";
      tr.innerHTML = 
        '<td style="padding: 0.75rem;"><img src="' + (p.image || SVG_FALLBACK) + '" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px;" onerror="this.onerror=null; this.src=\'' + SVG_FALLBACK + '\';"></td>' +
        '<td style="padding: 0.75rem; font-weight: 700;">' + p.title + '</td>' +
        '<td style="padding: 0.75rem; color: var(--text-muted);">' + (p.categoryName || p.category) + '</td>' +
        '<td style="padding: 0.75rem; font-weight: 700; color: var(--accent-cyan);">' + formatVND(p.price) + '</td>' +
        '<td style="padding: 0.75rem; text-align: center;">' +
          '<button class="btn btn-secondary" onclick="deleteProductDirectly(' + idx + ')" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; color: #f87171; border-color: #f87171;">Xóa</button>' +
        '</td>';
      tbody.appendChild(tr);
    });
  }

  function formatVND(val) {
    return (val || 0).toLocaleString("vi-VN") + " ₫";
  }

  // ADMIN PASSWORD SECURITY HANDLERS
  window.openAdminModalNow = function() {
    if (!state.isAdminLoggedIn) {
      var targetPass = (state.settings && state.settings.password) ? state.settings.password : "admin";
      var input = prompt("🔐 Vui lòng nhập Mật Khẩu Quản Trị Cửa Hàng (Mặc định: admin):");
      if (input === null) return;
      if (input.trim() === targetPass) {
        state.isAdminLoggedIn = true;
        alert("✅ Xác thực mật khẩu thành công! Chào mừng Quản Trị Viên.");
      } else {
        alert("❌ Sai mật khẩu quản trị! Vui lòng thử lại.");
        return;
      }
    }

    var modal = document.getElementById("admin-modal");
    if (modal) modal.classList.add("active");
  };

  window.closeAdminModalNow = function() {
    var modal = document.getElementById("admin-modal");
    if (modal) modal.classList.remove("active");
  };

  window.toggleCartDrawerDirectly = function() {
    var drawer = document.getElementById("cart-drawer-overlay");
    if (drawer) drawer.classList.toggle("active");
  };

  window.addToCartDirectly = function(id) {
    var p = state.products.find(function(item) { return item.id === id; });
    if (!p) return;

    var existingIndex = state.cart.findIndex(function(item) { return item.id === id; });
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        quantity: 1
      });
    }

    saveCart();
    window.toggleCartDrawerDirectly();
  };

  window.updateCartQuantityDirectly = function(idx, delta) {
    if (state.cart[idx]) {
      state.cart[idx].quantity += delta;
      if (state.cart[idx].quantity <= 0) {
        state.cart.splice(idx, 1);
      }
      saveCart();
    }
  };

  window.removeFromCartDirectly = function(idx) {
    state.cart.splice(idx, 1);
    saveCart();
  };

  window.clearCartDirectly = function() {
    state.cart = [];
    saveCart();
  };

  window.buyProductDirectly = function(id) {
    window.addToCartDirectly(id);
  };

  window.openCheckoutDirectly = function() {
    if (state.cart.length === 0) {
      alert("⚠️ Giỏ hàng của bạn đang trống! Hãy chọn sản phẩm trước.");
      return;
    }
    window.toggleCartDrawerDirectly();
    var checkoutModal = document.getElementById("checkout-modal");
    if (checkoutModal) checkoutModal.classList.add("active");
  };

  window.closeCheckoutModalDirectly = function() {
    var checkoutModal = document.getElementById("checkout-modal");
    if (checkoutModal) checkoutModal.classList.remove("active");
  };

  window.submitCheckoutFormDirectly = function(e) {
    if (e) e.preventDefault();
    var name = (document.getElementById("co-name") || {}).value;
    var phone = (document.getElementById("co-phone") || {}).value;
    var address = (document.getElementById("co-address") || {}).value;

    if (!name || !phone || !address) {
      alert("⚠️ Vui lòng nhập đầy đủ Tên, Số điện thoại và Địa chỉ giao hàng!");
      return false;
    }

    var total = state.cart.reduce(function(acc, item) { return acc + item.price * item.quantity; }, 0);
    var products = state.cart.map(function(item) { return item.title + " (SL: " + item.quantity + ")"; }).join(", ");

    var newOrder = {
      id: "order-" + Date.now(),
      name: name,
      phone: phone,
      address: address,
      products: products,
      total: total,
      dateStr: new Date().toLocaleString("vi-VN")
    };

    state.orders.unshift(newOrder);
    saveLocalData();
    renderAdminOrdersTable();

    // Reset form inputs
    var nameInput = document.getElementById("co-name");
    var phoneInput = document.getElementById("co-phone");
    var addrInput = document.getElementById("co-address");
    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";
    if (addrInput) addrInput.value = "";

    alert("🎉 ĐẶT HÀNG THÀNH CÔNG!\nCảm ơn khách hàng " + name + " (" + phone + "). Nhân viên cửa hàng sẽ gọi xác nhận giao hàng đến " + address + " trong 15 phút!");
    state.cart = [];
    saveCart();
    window.closeCheckoutModalDirectly();
    return false;
  };

  window.switchAdminTabDirectly = function(tab) {
    var tabs = ["list", "form", "settings", "testimonials", "orders"];
    tabs.forEach(function(t) {
      var btn = document.getElementById("tab-btn-" + t);
      var content = document.getElementById("tab-content-" + t);
      if (btn) btn.classList.toggle("active", t === tab);
      if (content) content.style.display = t === tab ? "block" : "none";
    });
  };

  window.filterCategoryDirectly = function(cat) {
    state.activeCategory = cat;
    document.querySelectorAll(".filter-btn").forEach(function(btn) {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === cat);
    });
    renderProducts();
  };

  window.switchHeroTabDirectly = function(tab) {
    state.activeHeroTab = tab;
    document.querySelectorAll(".hero-tab-btn").forEach(function(btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tab);
    });

    var filtered = state.products.filter(function(p) {
      if (tab === "new") return p.badge === "Mới về";
      if (tab === "coming") return p.badge === "Sắp Có";
      if (tab === "featured") return p.badge === "Bán chạy";
      if (tab === "hot") return p.badge === "Hot";
      return true;
    });

    var target = filtered[0] || state.products[0];
    if (target) {
      var titleEl = document.getElementById("hero-title-text");
      var descEl = document.getElementById("hero-desc-text");
      var imgEl = document.getElementById("hero-slide-img");
      if (titleEl) titleEl.innerHTML = target.title;
      if (descEl) descEl.textContent = target.desc;
      if (imgEl) {
        imgEl.src = target.image || SVG_FALLBACK;
        imgEl.onerror = function() { this.src = SVG_FALLBACK; };
      }
    }
  };

  window.triggerImageFilePickerDirectly = function() {
    var input = document.getElementById("ap-image-file");
    if (input) input.click();
  };

  window.triggerCameraCaptureDirectly = function() {
    var input = document.getElementById("ap-image-camera");
    if (input) input.click();
  };

  window.triggerHeroImageFilePickerDirectly = function() {
    var input = document.getElementById("as-hero-image-file");
    if (input) input.click();
  };

  window.triggerHeroCameraCaptureDirectly = function() {
    var input = document.getElementById("as-hero-image-camera");
    if (input) input.click();
  };

  window.handleImageFileUploadDirectly = function(input) {
    if (!input || !input.files || input.files.length === 0) return;
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var raw = e.target.result;
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement("canvas");
        var maxDim = 450;
        var w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
          else { w = Math.round((w * maxDim) / h); h = maxDim; }
        }
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        var base64 = canvas.toDataURL("image/jpeg", 0.75);

        var apImage = document.getElementById("ap-image");
        if (apImage) apImage.value = base64;

        var box = document.getElementById("ap-image-preview-container");
        if (box) {
          box.style.display = "block";
          box.innerHTML = '<div style="display:flex; align-items:center; gap:0.5rem; color:#60a5fa; font-weight:700; font-size:0.85rem;"><img src="' + base64 + '" style="height:50px; border-radius:6px;"> ✅ Đã nạp & nén ảnh sản phẩm thành công!</div>';
        }
        alert("🎉 Nạp ảnh sản phẩm thành công! Bấm 'Lưu Sản Phẩm' để đăng ngay.");
      };
      img.src = raw;
    };
    reader.readAsDataURL(file);
  };

  window.handleVideoFileUploadDirectly = function(input) {
    if (!input || !input.files || input.files.length === 0) return;
    var file = input.files[0];
    
    // Giới hạn 3.5MB tránh quá tải bộ nhớ đệm
    if (file.size > 3.5 * 1024 * 1024) {
      alert("❌ Video quá lớn! Vui lòng chọn video dưới 3.5MB để đảm bảo đồng bộ mượt mà.");
      input.value = "";
      return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      var base64 = e.target.result;
      var apVideo = document.getElementById("ap-video");
      if (apVideo) apVideo.value = base64;

      var box = document.getElementById("ap-video-preview-container");
      if (box) {
        box.style.display = "block";
        box.innerHTML = '<div style="display:flex; align-items:center; gap:0.5rem; color:#60a5fa; font-weight:700; font-size:0.85rem;"><i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ✅ Đã nạp video sản phẩm thành công!</div>';
      }
      alert("🎉 Nạp video sản phẩm từ thiết bị thành công!");
    };
    reader.readAsDataURL(file);
  };

  window.triggerVideoFilePickerDirectly = function() {
    var fileInput = document.getElementById("ap-video-file");
    if (fileInput) fileInput.click();
  };

  window.handleHeroImageFileUploadDirectly = function(input) {
    if (!input || !input.files || input.files.length === 0) return;
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var raw = e.target.result;
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement("canvas");
        var maxDim = 450;
        var w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
          else { w = Math.round((w * maxDim) / h); h = maxDim; }
        }
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        var base64 = canvas.toDataURL("image/jpeg", 0.75);

        var asImage = document.getElementById("as-hero-image");
        if (asImage) asImage.value = base64;

        var box = document.getElementById("as-hero-image-preview-container");
        if (box) {
          box.style.display = "block";
          box.innerHTML = '<div style="display:flex; align-items:center; gap:0.5rem; color:#60a5fa; font-weight:700; font-size:0.85rem;"><img src="' + base64 + '" style="height:50px; border-radius:6px;"> ✅ Đã nạp & nén ảnh Banner thành công!</div>';
        }
        alert("🎉 Nạp ảnh Banner thành công! Bấm 'Lưu Cấu Hình' để áp dụng.");
      };
      img.src = raw;
    };
    reader.readAsDataURL(file);
  };

  window.addSpecDirectly = function() {
    var input = document.getElementById("ap-spec-input");
    if (!input) return;
    var val = (input.value || "").trim();
    if (!val) return;
    window.currentSpecsList.push(val);
    input.value = "";
    renderSpecsChips();
  };

  window.removeSpecDirectly = function(idx) {
    window.currentSpecsList.splice(idx, 1);
    renderSpecsChips();
  };

  function renderSpecsChips() {
    var container = document.getElementById("form-specs-list");
    if (!container) return;
    container.innerHTML = "";
    window.currentSpecsList.forEach(function(spec, i) {
      var chip = document.createElement("span");
      chip.style.cssText = "display:inline-flex; align-items:center; gap:0.3rem; background:rgba(59,130,246,0.2); border:1px solid rgba(59,130,246,0.4); color:#60a5fa; padding:0.2rem 0.6rem; border-radius:12px; font-size:0.8rem; font-weight:600;";
      chip.innerHTML = spec + ' <button type="button" onclick="removeSpecDirectly(' + i + ')" style="background:none; border:none; color:#f87171; cursor:pointer; font-weight:bold;">×</button>';
      container.appendChild(chip);
    });
  }

  window.saveProductFormDirectly = function(e) {
    if (e) e.preventDefault();

    var title = (document.getElementById("ap-title") || {}).value;
    var cat = (document.getElementById("ap-category") || {}).value;
    var priceVal = (document.getElementById("ap-price") || {}).value;
    var image = (document.getElementById("ap-image") || {}).value;
    var desc = (document.getElementById("ap-desc") || {}).value;
    var badge = (document.getElementById("ap-badge") || {}).value || "Mới về";
    var video = (document.getElementById("ap-video") || {}).value || "";
    var gifts = (document.getElementById("ap-gifts") || {}).value || "";

    if (!title || !priceVal) {
      alert("⚠️ Vui lòng nhập Tên sản phẩm và Giá bán!");
      return false;
    }

    var price = parseInt(priceVal.toString().replace(/\D/g, ""), 10) || 0;
    var catNames = {
      mobile: "ĐIỆN THOẠI DI ĐỘNG",
      overear: "Tai nghe Over-Ear",
      earbuds: "Tai nghe Earbuds",
      speaker: "Loa Bluetooth",
      drone: "Drone - Flycam",
      camera: "Máy Ảnh",
      accessory: "Phụ Kiện",
      appliance: "Gia Dụng"
    };

    var newProd = {
      id: "prod-" + Date.now(),
      title: title,
      category: cat || "mobile",
      categoryName: catNames[cat] || "ĐIỆN THOẠI DI ĐỘNG",
      price: price,
      image: image || SVG_FALLBACK,
      desc: desc || "Likenew",
      badge: badge,
      video: video,
      gifts: gifts,
      specs: window.currentSpecsList.length > 0 ? window.currentSpecsList : ["Chính hãng 100%", "Bảo hành 24 tháng"]
    };

    state.products.unshift(newProd);
    saveLocalData();

    renderProducts();
    renderAdminProductsTable();

    var form = document.getElementById("admin-product-form");
    if (form) form.reset();
    var imgPreview = document.getElementById("ap-image-preview-container");
    if (imgPreview) { imgPreview.innerHTML = ""; imgPreview.style.display = "none"; }
    var vidPreview = document.getElementById("ap-video-preview-container");
    if (vidPreview) { vidPreview.innerHTML = ""; vidPreview.style.display = "none"; }
    window.currentSpecsList = [];
    renderSpecsChips();

    window.closeAdminModalNow();
    alert("🎉 CHÚC MỪNG! Đã đăng sản phẩm '" + title + "' thành công lên Đám mây!");
    return false;
  };

  window.saveStoreSettingsDirectly = function(e) {
    if (e) e.preventDefault();

    var sName = (document.getElementById("as-storename") || {}).value || "LETHOCCELLPHONE'S";
    var hotline = (document.getElementById("as-hotline") || {}).value || "0934338765";
    var zalo = (document.getElementById("as-zalo") || {}).value || "0934338765";
    var address = (document.getElementById("as-address") || {}).value || "TP. Hồ Chí Minh";
    var password = (document.getElementById("as-password") || {}).value || "admin";
    var credVis = (document.getElementById("as-cred-visible") || {}).value || "show";

    var c1t = (document.getElementById("as-cred-title-1") || {}).value || "100% Chính Hãng";
    var c1d = (document.getElementById("as-cred-desc-1") || {}).value || "Cam kết hoàn tiền gấp 10 lần...";
    var c2t = (document.getElementById("as-cred-title-2") || {}).value || "Bảo Hành 12 Tháng";
    var c2d = (document.getElementById("as-cred-desc-2") || {}).value || "Chính sách bảo hành 12 tháng...";
    var c3t = (document.getElementById("as-cred-title-3") || {}).value || "Giao hàng toàn quốc";
    var c3d = (document.getElementById("as-cred-desc-3") || {}).value || "Giao hàng toàn quốc qua các hệ thống...";
    var c4t = (document.getElementById("as-cred-title-4") || {}).value || "Hỗ Trợ Kỹ Thuật 24/7";
    var c4d = (document.getElementById("as-cred-desc-4") || {}).value || "Đội ngũ kỹ thuật tư vấn...";

    var heroTag = (document.getElementById("as-hero-tag") || {}).value || "⚡ Trải nghiệm Không gian Công nghệ Hiện đại";
    var heroTitle = (document.getElementById("as-hero-title") || {}).value || "Nơi trải nghiệm Công nghệ<br><span>Mua sắm và Tận hưởng</span>";
    var heroDesc = (document.getElementById("as-hero-desc") || {}).value || "Khám phá không gian công nghệ đỉnh cao...";
    var heroImage = (document.getElementById("as-hero-image") || {}).value || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";

    state.settings = {
      storeName: sName, hotline: hotline, zalo: zalo, address: address, password: password, credVisible: credVis,
      cred1T: c1t, cred1D: c1d, cred2T: c2t, cred2D: c2d, cred3T: c3t, cred3D: c3d, cred4T: c4t, cred4D: c4d,
      heroTag: heroTag, heroTitle: heroTitle, heroDesc: heroDesc, heroImage: heroImage
    };

    saveLocalData();
    applySettings();
    window.closeAdminModalNow();
    alert("🎉 CHÚC MỪNG! Đã lưu Cấu Hình Cửa Hàng thành công!");
    return false;
  };

  window.saveTestimonialFormDirectly = function(e) {
    if (e) e.preventDefault();

    var name = (document.getElementById("at-name") || {}).value;
    var role = (document.getElementById("at-role") || {}).value || "Khách hàng";
    var rating = parseInt((document.getElementById("at-rating") || {}).value || "5", 10);
    var text = (document.getElementById("at-text") || {}).value;

    if (!name || !text) {
      alert("⚠️ Vui lòng nhập Họ tên khách hàng và Nội dung nhận xét!");
      return false;
    }

    var colors = ["var(--accent-blue)", "var(--accent-emerald)", "var(--accent-amber)", "var(--accent-purple)", "var(--accent-pink)"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];

    var words = name.trim().split(" ");
    var avatar = words.length > 1 ? (words[0][0] + words[words.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();

    var newTest = {
      id: "test-" + Date.now(),
      name: name,
      role: role,
      rating: rating,
      text: text,
      avatar: avatar,
      color: randomColor
    };

    state.testimonials.unshift(newTest);
    saveLocalData();

    renderTestimonials();
    renderAdminTestimonialsTable();

    var form = document.getElementById("admin-testimonial-form");
    if (form) form.reset();
    window.toggleTestimonialFormDirectly();

    alert("🎉 CHÚC MỪNG! Đã đăng Nhận Xét Khách Hàng mới thành công!");
    return false;
  };

  window.toggleTestimonialFormDirectly = function() {
    var wrapper = document.getElementById("testimonial-form-wrapper");
    if (wrapper) {
      wrapper.style.display = wrapper.style.display === "none" ? "block" : "none";
    }
  };

  window.deleteTestimonialDirectly = function(idx) {
    if (confirm("Bạn có chắc chắn muốn xóa nhận xét này?")) {
      state.testimonials.splice(idx, 1);
      saveLocalData();
      renderTestimonials();
      renderAdminTestimonialsTable();
    }
  };

  window.deleteProductDirectly = function(idx) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      state.products.splice(idx, 1);
      saveLocalData();
      renderProducts();
      renderAdminProductsTable();
      alert("✅ Đã xóa sản phẩm thành công!");
    }
  };

  window.openProductDetailDirectly = function(id) {
    var p = state.products.find(function(item) { return item.id === id; });
    if (!p) return;

    var modal = document.getElementById("product-detail-modal");
    if (!modal) return;

    // Populate data
    var storeName = (state.settings && state.settings.storeName) ? state.settings.storeName : "LETHOCCELLPHONE'S";
    var hotline = (state.settings && state.settings.hotline) ? state.settings.hotline : "0934338765";
    var zalo = (state.settings && state.settings.zalo) ? state.settings.zalo : "0934338765";

    var brandEl = document.getElementById("pd-logo-brand");
    if (brandEl) brandEl.innerHTML = storeName.toUpperCase() + '<span>.</span>';

    var hotlineValEl = document.getElementById("pd-header-hotline-val");
    if (hotlineValEl) hotlineValEl.textContent = "📞 Hotline: " + hotline;

    var badgeEl = document.getElementById("pd-badge-tag-val");
    if (badgeEl) {
      if (p.badge) {
        badgeEl.textContent = p.badge;
        badgeEl.style.display = "inline-block";
      } else {
        badgeEl.style.display = "none";
      }
    }

    var titleEl = document.getElementById("pd-title-val");
    if (titleEl) titleEl.textContent = p.title;

    var priceEl = document.getElementById("pd-price-val");
    if (priceEl) priceEl.textContent = formatVND(p.price);

    var mainImg = document.getElementById("pd-main-img");
    if (mainImg) {
      mainImg.src = p.image || SVG_FALLBACK;
      mainImg.onerror = function() { this.src = SVG_FALLBACK; };
    }

    // Video embedding
    var videoContainer = document.getElementById("pd-video-container");
    if (videoContainer) {
      videoContainer.innerHTML = "";
      if (p.video) {
        videoContainer.style.display = "block";
        var isYoutube = p.video.length === 11 || p.video.indexOf("youtube.com") > -1 || p.video.indexOf("youtu.be") > -1;
        if (isYoutube) {
          var ytid = p.video;
          if (ytid.indexOf("v=") > -1) {
            ytid = ytid.split("v=")[1].split("&")[0];
          } else if (ytid.indexOf("youtu.be/") > -1) {
            ytid = ytid.split("youtu.be/")[1].split("?")[0];
          }
          videoContainer.innerHTML = '<iframe src="https://www.youtube.com/embed/' + ytid + '?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        } else {
          videoContainer.innerHTML = '<video src="' + p.video + '" autoplay loop muted controls playsinline style="width:100%; height:100%; object-fit:cover;"></video>';
        }
      } else {
        videoContainer.style.display = "none";
      }
    }

    // Gifts
    var giftsContainer = document.getElementById("pd-gifts-box-container");
    var giftsVal = document.getElementById("pd-gifts-val");
    if (giftsContainer && giftsVal) {
      if (p.gifts) {
        giftsVal.textContent = p.gifts;
        giftsContainer.style.display = "block";
      } else {
        giftsContainer.style.display = "none";
      }
    }

    // Clean hotline/zalo numbers for URL
    var cleanHotline = hotline.replace(/\s+/g, "");
    var cleanZalo = zalo.replace(/\s+/g, "");

    // CTAs Zalo & Call
    var zaloCta = document.getElementById("pd-zalo-cta");
    if (zaloCta) {
      zaloCta.href = "https://zalo.me/" + cleanZalo;
    }

    var phoneCta = document.getElementById("pd-phone-cta");
    if (phoneCta) {
      phoneCta.href = "tel:" + cleanHotline;
      var ctaSpan = phoneCta.querySelector("span") || phoneCta;
      ctaSpan.innerHTML = '<i class="fa-solid fa-phone-flip"></i> GỌI NGAY: ' + hotline;
    }

    // Specs list
    var specsValEl = document.getElementById("pd-specs-list-val");
    if (specsValEl) {
      specsValEl.innerHTML = "";
      var specs = p.specs || ["Chính hãng 100%", "Bảo hành 24 tháng"];
      specs.forEach(function(spec) {
        var li = document.createElement("li");
        li.innerHTML = '<i class="fa-solid fa-circle-info" style="color: var(--accent-cyan);"></i> ' + spec;
        specsValEl.appendChild(li);
      });
    }

    // Mobile sticky bar setup
    var stickyPhone = document.getElementById("sticky-phone-btn");
    if (stickyPhone) {
      stickyPhone.href = "tel:" + cleanHotline;
    }

    var stickyZalo = document.getElementById("sticky-zalo-btn");
    if (stickyZalo) {
      stickyZalo.href = "https://zalo.me/" + cleanZalo;
    }

    // Open modal
    modal.classList.add("active");
    document.body.classList.add("product-detail-modal-active");
  };

  window.closeProductDetailModalDirectly = function() {
    var modal = document.getElementById("product-detail-modal");
    if (modal) modal.classList.remove("active");
    
    // Stop video playback by clearing innerHTML
    var videoContainer = document.getElementById("pd-video-container");
    if (videoContainer) videoContainer.innerHTML = "";

    document.body.classList.remove("product-detail-modal-active");
  };

  window.setBannerWidthDirectly = function(mode) {
    var heroBox = document.querySelector(".hero-box");
    if (heroBox) {
      if (mode === "50%") heroBox.style.maxWidth = "50%";
      else if (mode === "65%") heroBox.style.maxWidth = "65%";
      else heroBox.style.maxWidth = "100%";
      heroBox.style.margin = "0 auto";
    }
  };

  window.toggleOrderFormDirectly = function() {
    var wrapper = document.getElementById("order-form-wrapper");
    if (!wrapper) return;
    if (wrapper.style.display === "none") {
      wrapper.style.display = "block";
    } else {
      wrapper.style.display = "none";
      var form = document.getElementById("admin-order-form");
      if (form) form.reset();
    }
  };

  window.saveOrderFormDirectly = function(e) {
    if (e) e.preventDefault();
    var name = (document.getElementById("ao-name") || {}).value;
    var phone = (document.getElementById("ao-phone") || {}).value;
    var address = (document.getElementById("ao-address") || {}).value;
    var products = (document.getElementById("ao-products") || {}).value;
    var totalVal = (document.getElementById("ao-total") || {}).value || "0";

    if (!name || !phone || !address || !products) {
      alert("⚠️ Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return false;
    }

    var total = parseInt(totalVal.toString().replace(/\D/g, ""), 10) || 0;

    var newOrder = {
      id: "order-" + Date.now(),
      name: name,
      phone: phone,
      address: address,
      products: products,
      total: total,
      dateStr: new Date().toLocaleString("vi-VN")
    };

    state.orders.unshift(newOrder);
    saveLocalData();
    renderAdminOrdersTable();

    window.toggleOrderFormDirectly();
    alert("🎉 Đã thêm thông tin khách chờ mua hàng thành công!");
    return false;
  };

  window.deleteOrderDirectly = function(idx) {
    if (confirm("Bạn có chắc chắn muốn xóa thông tin khách chờ mua hàng này?")) {
      state.orders.splice(idx, 1);
      saveLocalData();
      renderAdminOrdersTable();
      alert("✅ Đã xóa thông tin thành công!");
    }
  };

  function renderAdminOrdersTable() {
    var tbody = document.getElementById("admin-orders-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (!state.orders || state.orders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="padding: 2rem; text-align: center; color: var(--text-muted);">Chưa có khách chờ mua hàng nào trong danh sách.</td></tr>';
      return;
    }

    state.orders.forEach(function(o, idx) {
      var tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid var(--border-glass)";
      tr.innerHTML = 
        '<td style="padding: 0.75rem; font-size: 0.8rem; color: var(--text-muted);">' + (o.dateStr || "Vừa xong") + '</td>' +
        '<td style="padding: 0.75rem; font-weight: 700;">' + o.name + '</td>' +
        '<td style="padding: 0.75rem; font-weight: 700; color: var(--accent-cyan);">' + o.phone + '</td>' +
        '<td style="padding: 0.75rem; font-size: 0.85rem; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + o.address + '">' + o.address + '</td>' +
        '<td style="padding: 0.75rem; font-size: 0.85rem; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + o.products + '">' + o.products + '</td>' +
        '<td style="padding: 0.75rem; font-weight: 700; color: var(--accent-emerald);">' + formatVND(o.total) + '</td>' +
        '<td style="padding: 0.75rem; text-align: center;">' +
          '<button class="btn btn-secondary" onclick="deleteOrderDirectly(' + idx + ')" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; color: #f87171; border-color: #f87171;">Xóa</button>' +
        '</td>';
      tbody.appendChild(tr);
    });
  }

  function setupEvents() {
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        window.closeAdminModalNow();
        window.closeCheckoutModalDirectly();
        var drawer = document.getElementById("cart-drawer-overlay");
        if (drawer) drawer.classList.remove("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);

})();
