/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js
02. Nice Select Js
03. mobile menu Js
04. Sticky Header Js
05. offcanvas
06. filter
07. Common Js
08. back-to-top
09. magnificPopup img view
10. Counter Js
11. tp-booking-toggle
12. tp-multi-datepicker
13. E-commerce plus minus js
14. tp-booking-location-input
15. tp-filter-collapse
18. time-picker
19. tp-header-top-lang-toggle
20. tp-header-top-currency-toggle
21. tp-about-col-custom
22. typed-text
23. tp-header-top-lang-toggle
24. Wow Js
25. tp file upload drag effect
26. Password Toggle Js 
27. E-commerce plus minus js
****************************************************/

(function ($) {
	"use strict";

	var windowOn = $(window);
	////////////////////////////////////////////////////
	// 01. PreLoader Js
	windowOn.on('load', function () {
		$("#loading").fadeOut(500);
		wowAnimation();
	});

	// 02. Nice Select Js
	$('.tp-select').niceSelect();

	////////////////////////////////////////////////////
	// 03. mobile menu Js
    let tpMenuhtml = $('.tp-mobile-menu-active > ul').clone();
    let tpOffcanvasMenu = $('.tp-offcanvas-menu > nav');

    tpOffcanvasMenu.append(tpMenuhtml);

    if($(tpOffcanvasMenu).find('.sub-menu').length != 0){
      $(tpOffcanvasMenu).find('.sub-menu').parent().append('<button class="tp-sidemenu-close"><i class="fas fa-chevron-right"></i></button>');
    }
    
    let tpSideMenuToggle = $('button.tp-sidemenu-close');

    $(tpSideMenuToggle).on('click',function(){
        $(this).siblings('.sub-menu').slideToggle();
        $(this).parent().toggleClass('active');
    });

	///////////////////////////////////////////////////
	// 04. Sticky Header Js
	windowOn.on('scroll', function () {
		var scroll = windowOn.scrollTop();
		if (scroll < 400) {
			$("#header-sticky").removeClass("header-sticky");
		} else {
			$("#header-sticky").addClass("header-sticky");
		}
	});
	if ($('.tp-header-height').length > 0) {
		var headerHeight = document.querySelector(".tp-header-height");
		var setHeaderHeight = headerHeight.offsetHeight;
		$(".tp-header-height").each(function () {
			$(this).css({
				'height' : $(this).height()
			});
		});
	}


	////////////////////////////////////////////////////
	// 05. offcanvas

	$(".tp-header-toogle").on('click',function(){
        $(".tp-offcanvas").addClass("tp-offcanvas-open");
        $(".tp-offcanvas-overlay").addClass("tp-offcanvas-overlay-open");
    });

    $(".tp-offcanvas-close-button,.tp-offcanvas-overlay").on('click',function(){
        $(".tp-offcanvas").removeClass("tp-offcanvas-open");
        $(".tp-offcanvas-overlay").removeClass("tp-offcanvas-overlay-open");
    });

	////////////////////////////////////////////////////
	// 06. filter
	$(".filter-open-btn").on("click", function () {
		$(".tp-filter-offcanvas-area").addClass("offcanvas-opened");
		$(".tp-offcanvas-overlay").addClass("tp-offcanvas-overlay-open");
	});

	$(".filter-close-btn,.tp-offcanvas-overlay").on("click", function () {
		$(".tp-filter-offcanvas-area").removeClass("offcanvas-opened");
		$(".tp-offcanvas-overlay").removeClass("tp-offcanvas-overlay-open");
	});

	$(".filter-open-dropdown-btn").on("click", function () {
		$(".tp-filter-dropdown-area").toggleClass('filter-dropdown-opened');
	});

	$(".cartmini-open-btn").on("click", function () {
		$(".cartmini__area").addClass("cartmini-opened");
		$(".tp-offcanvas-overlay").addClass("tp-offcanvas-overlay-open");
	});
  
	$(".cartmini-close-btn,.tp-offcanvas-overlay").on("click", function () {
		$(".cartmini__area").removeClass("tp-offcanvas-overlay-open cartmini-opened");
		$(".tp-offcanvas-overlay").removeClass("tp-offcanvas-overlay-open");
	});

	////////////////////////////////////////////////////
	// 07. Common Js
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});


	////////////////////////////////////////////////////
	// 08. back-to-top
	function back_to_top() {
		var btn = $('#back_to_top');
		var btn_wrapper = $('.back-to-top-wrapper');

		windowOn.scroll(function () {
			if (windowOn.scrollTop() > 300) {
				btn_wrapper.addClass('back-to-top-btn-show');
			} else {
				btn_wrapper.removeClass('back-to-top-btn-show');
			}
		});

		btn.on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, '300');
		});
	}
	back_to_top();

	////////////////////////////////////////////////////
	// 9. magnificPopup img view
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	////////////////////////////////////////////////////
	// 10. Counter Js
	new PureCounter();
	new PureCounter({
		filesizing: true,
		selector: ".filesizecount",
		pulse: 2,
	});

	////////////////////////////////////////////////////
	// 11. tp-booking-toggle
	$('.tp-booking-toggle').on('click', function (e) {
		e.stopPropagation(); // Prevent event from bubbling up to document click handler
		let toggle = $(this); // Scope toggle to this click event
		let container = toggle.parent('.tp-booking-nohide');

		// Toggle active class and dropdown visibility for this specific element
		if (toggle.hasClass('active')) {
			toggle.removeClass('active');
			toggle.next('.tp-booking-toggle-active').removeClass('booking-open');
		} else {
			$('.tp-booking-toggle').removeClass('active');
			$('.tp-booking-toggle-active').removeClass('booking-open');
			toggle.addClass('active');
			toggle.next('.tp-booking-toggle-active').addClass('booking-open');
		}
	});

	$(document).on('click', function (e) {
		if (!$(e.target).closest('.tp-booking-nohide').length) {
			$('.tp-booking-toggle').removeClass('active');
			$('.tp-booking-toggle-active').removeClass('booking-open');
		}
	});

	////////////////////////////////////////////////////
	// 12. tp-multi-datepicker
	if ($(".tp-multi-datepicker").length) {
		$(".tp-multi-datepicker").each(function () {
			let self = $(this);
			self.daterangepicker({
				autoUpdateInput: false,
				minDate: moment()
			});
			self.on("apply.daterangepicker", function (ev, picker) {
				$(this).val(
				picker.startDate.format("D MMM YY") +
				" - " +
				picker.endDate.format("D MMM YY")
				);
			});
		});
	}

	//  tp-single-datepicker
	if ($(".tp-single-datepicker").length) {
		$(".tp-single-datepicker").each(function () {
			var $this = $(this);
			$this.daterangepicker({
				singleDatePicker: true,   // single date mode
				autoUpdateInput: false,
				minDate: moment(),
				locale: {
					format: "D MMM YY"
				}
			});
			$this.on("apply.daterangepicker", function (ev, picker) {
				$(this).val(picker.startDate.format("D MMM YY"));
			});
		});
	}

	///////////////////////////////////////////////////
	// 13. E-commerce plus minus js
	function tp_ecommerce() {
		$('.tp-dreckment,.tp-cart-minus').on('click', function () {
		  const $input = $(this).siblings('input');
		  let count = Number($input.val()) - 1;
		  $input.val(count < 1 ? 0 : count).change();
		});
	  
		$('.tp-increment,.tp-cart-plus').on('click', function () {
		  const $input = $(this).siblings('input');
		  $input.val(Number($input.val()) + 1).change();
		});

		$('.tp-color-variation-btn').on('click', function () {
		  $(this).addClass('active').siblings().removeClass('active');
		});

		//  tpReturnCustomerLoginForm //
		$('.tp-checkout-login-form-reveal-btn').on('click', function () {
			$('#tpReturnCustomerLoginForm').slideToggle(400);
		});
		
		//  Show Coupon Toggle Js //
		$('.tp-checkout-coupon-form-reveal-btn').on('click', function () {
		$('#tpCheckoutCouponForm').slideToggle(400);
		});
	
		// Create An Account Toggle Js //
		$('#cbox').on('click', function () {
			$('#cbox_info').slideToggle(900);
		});
	
		// Shipping Box Toggle Js //
		$('#ship-box').on('click', function () {
			$('#ship-box-info').slideToggle(1000);
		});

	}
	tp_ecommerce();
	
	// tp-checkout-payment-item
	$('.tp-checkout-payment-item label').on('click', function () {
		$(this).siblings('.tp-checkout-payment-desc').slideToggle(400);
	});

	///////////////////////////////////////////////////
	// 14. tp-booking-location-input
	if ($('#lineMarker').length) {
		function tp_tab_bg() {
			const $marker = $('#lineMarker');
			const $items  = $('.tp-booking-location-input');
			const $wrap   = $('.tp-marker-tab');

			function moveMarker($el) {
				const left  = ($el.offset().left - $wrap.offset().left) - 7;
				const width = $el.outerWidth() + 7;

				$marker.css({
					left: left + 'px',
					width: width + 'px',
					display: 'block'
				});
			}

			// initial active
			const $active = $items.filter('.active');
			if ($active.length) {
				moveMarker($active);
			}

			// click (ThemeForest standard)
			$items.on('click', function () {
				$items.removeClass('active');
				$(this).addClass('active');
				moveMarker($(this));
			});
		}
		tp_tab_bg();
	}

	///////////////////////////////////////////////////
	// 15. tp-filter-collapse
	$(".tp-filter-collapse").on("click", function () {
        var _parent = $(this).parents(".tp-filter-item");
        if (_parent.find(".box-collapse").css("display") == "none") {
            $(this).removeClass("collapsed-item");
            _parent.find(".box-collapse").slideDown();
        } else {
            $(this).addClass("collapsed-item");
            _parent.find(".box-collapse").slideUp();
        }
    });

	///////////////////////////////////////////////////
	// 16. item load more

	if ($('.load-more-content-3').length > 0) {
		$('.load-more-content-3').btnLoadmore2({
			showItem : 4,
			whenClickBtn : 2,
			textBtn : 'Show all reviews',
			classBtn : 'tp-filter-showmore-3 tp-btn text-decoration-none text-white'
		});
	}

	if ($('.read-more-wrapper').length > 0) {
		$('.read-more-wrapper').each(function () {
			var $wrapper = $(this);
			var $text = $wrapper.find('.load-more-content');
			var $btn = $wrapper.find('.toggle-btn');
			var collapsedHeight = 190;
			if ($text[0].scrollHeight <= collapsedHeight) {
				$btn.hide();
			}
			$text.css({
				height: collapsedHeight,
				overflow: 'hidden'
			});
			$btn.on('click', function () {
				if ($text.hasClass('active')) {
					$text.removeClass('active').css('height', collapsedHeight);
					$btn.text('Read More..');
				} else {
					$text.addClass('active').css('height', $text[0].scrollHeight);
					$btn.text('Read Less');
				}
			});
		});
	}

	///////////////////////////////////////////////////
	// 17. showlogin
	$('#showlogin').on('click', function () {
		$('#checkout-login').slideToggle(900);
	});


	///////////////////////////////////////////////////
	// 18. time-picker
	$('.time-picker').daterangepicker({
		singleDatePicker: true,
		timePicker: true,
		timePicker24Hour: true,
		timePickerSeconds: false,
		autoUpdateInput: false,
		locale: {
			format: 'HH:mm'
		}
	});
	$('.time-picker').on('show.daterangepicker', function (ev, picker) {
		picker.container.addClass('only-time-picker');
	});

	$('.time-picker').on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('HH:mm'));
	});

 	/////////////////////////////////////////////////////
  	// 19. tp-header-top-lang-toggle

	if ($("#tp-header-top-lang-toggle").length) {
		windowOn.on('click', function (e) {
			if ($("#tp-header-top-lang-toggle").has(e.target).length || $("#tp-header-top-lang-toggle")[0] === e.target) {
				$(".tp-header-top-lang ul").toggleClass("tp-header-top-list-open");
			} else {
				$(".tp-header-top-lang ul").removeClass("tp-header-top-list-open");
			}
		});
	}

 	/////////////////////////////////////////////////////
  	// 20. tp-header-top-currency-toggle
	if ($("#tp-header-top-currency-toggle").length) {
		windowOn.on('click', function (e) {
			if ($("#tp-header-top-currency-toggle").has(e.target).length || $("#tp-header-top-currency-toggle")[0] === e.target) {
				$(".tp-header-top-currency ul").toggleClass("tp-header-top-currency-list-open");
			} else {
				$(".tp-header-top-currency ul").removeClass("tp-header-top-currency-list-open");
			}
		});
	}

	///////////////////////////////////////////////////
	// 21. tp-about-col-custom
	$('.tp-about-col-custom').on('mouseenter', function () {
		$(this).addClass('active').siblings().removeClass('active');
	})

	///////////////////////////////////////////////////
	// 22. typed-text
	windowOn.on('load', function () {
		if ($('.typed-text').length && $('.typed-strings').length) {
			new Typed('.typed-text', {
				stringsElement: '.typed-strings',
				typeSpeed: 100,
				backSpeed: 40,
				loop: true
			});
		}
	});

 	/////////////////////////////////////////////////////
  	// 23. tp-header-top-lang-toggle
	if ($("#tp-header-login-btn").length) {
		windowOn.on('click', function (e) {
			if ($("#tp-header-login-btn").has(e.target).length || $("#tp-header-login-btn")[0] === e.target) {
				$(".tp-header-login ul").toggleClass("tp-header-top-list-open");
			} else {
				$(".tp-header-login ul").removeClass("tp-header-top-list-open");
			}
		});
	}

	////////////////////////////////////////////////////
	// 24. Wow Js

    function wowAnimation() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }

	////////////////////////////////////////////////////
	// 25. tp file upload drag effect
	if ($(".tp-upload-box").length) {
		$(".tp-upload-box").on("dragover", function () {
			$(this).addClass("drag-over");
		});

		$(".tp-upload-box").on("dragleave drop", function () {
			$(this).removeClass("drag-over");
		});
	}

	////////////////////////////////////////////////////
	// 26. Password Toggle Js 
	if ($('#password-show-toggle').length > 0) {
		var btn = document.getElementById('password-show-toggle');
		btn.addEventListener('click', function (e) {
			var inputType = document.getElementById('tp_password');
			var openEye = document.getElementById('open-eye');
			var closeEye = document.getElementById('close-eye');

			if (inputType.type === "password") {
				inputType.type = "text";
				openEye.style.display = 'block';
				closeEye.style.display = 'none';
			} else {
				inputType.type = "password";
				openEye.style.display = 'none';
				closeEye.style.display = 'block';
			}
		});
	}


})(jQuery);
/* --- GÜVENLİ KUR SİSTEMİ (PRELOADER DOSTU) --- */
setTimeout(function() {
    (function() {
        const symbols = { USD: '$', trY: '₺', EUR: '€', ruB: '₽' };
        let rates = { USD: 1, trY: 45.50, EUR: 0.862, ruB: 72.85 };

        function applyChanges(cur) {
            const rate = rates[cur] || 1;
            const symbol = symbols[cur] || '$';
            const tags = document.querySelectorAll('.price-tag');

            tags.forEach(tag => {
                const val = parseFloat(tag.getAttribute('data-usd'));
                if (!isNaN(val)) {
                    const formatted = (val * rate).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    tag.textContent = symbol + formatted;
                }
            });

            // Üstteki menü yazısını bozmadan güncelle
            const toggle = document.querySelector('.tp-header-top-currency-toggle');
            if (toggle) {
                const textNode = Array.from(toggle.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (textNode) textNode.textContent = " " + cur;
            }
        }

        function startCurrency() {
            const links = document.querySelectorAll('.tp-header-top-currency ul li a');
            if (links.length === 0) return;

            const saved = localStorage.getItem('userCurrency') || 'USD';

            links.forEach(link => {
                link.onclick = function(e) {
                    e.preventDefault();
                    const txt = this.textContent.toUpperCase();
                    let selected = "USD";
                    if (txt.includes("LIRA") || txt.includes("TURKISH")) selected = "trY";
                    else if (txt.includes("EURO")) selected = "EUR";
                    else if (txt.includes("ruB")) selected = "ruB";
                    
                    localStorage.setItem('userCurrency', selected);
                    applyChanges(selected);
                };
            });

            // Kurları sessizce arka planda çek
            fetch("https://open.er-api.com/v6/latest/USD")
                .then(r => r.json())
                .then(d => {
                    rates = d.rates;
                    applyChanges(saved);
                })
                .catch(() => applyChanges(saved));
        }

        startCurrency();
    })();
}, 1000); // 1000ms = 1 saniye gecikme ile başlar

/* --- SON --- */
/* --- EVRENSEL DİL VE KLASÖR ROTA SİSTEMİ (NİHAİ TAM SÜRÜM) --- */
(function() {
    const path = window.location.pathname;
    let pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    // Sayfa adından tüm dil eklerini temizleyip yalın adı buluyoruz
    let baseName = pageName.replace(/\.html/i, '')
                           .replace(/\.html/i, '')
                           .replace(/\.html/i, '')
                           .replace(/\.html/i, '');
    
    if (baseName.toLowerCase() === 'index' || baseName === '') {
        baseName = 'index';
    }

    // Vercel ve klasör yapısıyla tam uyumlu rota hedefleri
    const enTarget = baseName === 'index' ? 'en/index.html' : `/en/${baseName}.html`;
    const trTarget = baseName === 'index' ? '/index.html' : `/tr/${baseName.toLowerCase()}.html`;
    const ruTarget = baseName === 'index' ? '/ru/index.html' : `/ru/${baseName.toLowerCase()}-ru.html`;
    const arTarget = baseName === 'index' ? '/ar/index.html' : `/ar/${baseName.toLowerCase()}-ar.html`;

    // Aktif dil kontrolü (Kısaltma ve Tam İsimler)
    let currentLangShort = 'TR';
    let currentLangFull = 'Türkçe';
    if (pageName.toLowerCase().includes('-tr.html') || path.toLowerCase().includes('/tr/')) {
        currentLangShort = 'TR'; currentLangFull = 'Türkçe';
    } else if (pageName.toLowerCase().includes('-ru.html') || path.toLowerCase().includes('/ru/')) {

    }

    // 1. ADIM: EVRENSEL MOBİL MENÜ ENTEGRASYONU (TÜM DİLLERDE ÇALIŞIR)
    function injectLanguageIntoMobileMenu() {
        if (document.querySelector('.tq-mobile-lang-wrapper')) return; // Mükerrer eklemeyi önle

        let targetMenuLink = null;
        const allMobileLinks = document.querySelectorAll('a, span, div');
        
        // Menünün ilk sırasındaki elemanı dile göre yakalıyoruz (Destinations, Rotalarımız vb.)
        for (let el of allMobileLinks) {
            const txt = el.textContent.trim().toLowerCase();
            if (txt === 'destinations' || txt === 'rotalarımız' || txt === 'rotalarimiz' || txt === 'napravleniya' || txt === 'الوجهات') {
                targetMenuLink = el;
                break;
            }
        }

        // Eğer ilk menü elemanı bulunamazsa, Vip Transfer veya Search alanından referans alarak garantiye alıyoruz
        if (!targetMenuLink) {
            for (let el of allMobileLinks) {
                const txt = el.textContent.trim().toLowerCase();
                if (txt === 'vip transfer' || txt === 'best tours' || txt === 'popüler turlarımız') {
                    targetMenuLink = el;
                    break;
                }
            }
        }

        // Referans eleman bulunduysa üstüne turuncu butonları yerleştiriyoruz
        if (targetMenuLink) {
            const mobileLangHtml = `
            <div class="tq-mobile-lang-wrapper" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eeeeee; width: 100%; display: block; font-family: inherit;">
                <span style="font-weight: 600; font-size: 13px; text-transform: uppercase; color: #222222; display: block; margin-bottom: 10px;">Language</span>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <a href="${enTarget}" class="tq-m-link ${currentLangShort === 'EN' ? 'active' : ''}" style="padding: 6px 14px; background: #f5f5f5; border-radius: 4px; font-size: 12px; font-weight: bold; text-decoration: none !important; color: #222222 !important; display: inline-block; transition: all 0.2s;">EN</a>
                    <a href="${trTarget}" class="tq-m-link ${currentLangShort === 'TR' ? 'active' : ''}" style="padding: 6px 14px; background: #f5f5f5; border-radius: 4px; font-size: 12px; font-weight: bold; text-decoration: none !important; color: #222222 !important; display: inline-block; transition: all 0.2s;">TR</a>
                </div>
            </div>
            <style>
                .tq-m-link.active { background-color: #f52c36 !important; color: #ffffff !important; }
            </style>
            `;
            targetMenuLink.insertAdjacentHTML('beforebegin', mobileLangHtml);
        }
    }

    // 2. ADIM: MASAÜSTÜ MENÜYÜ VE DİL DEĞİŞİMLERİNİ DÜZELTEN FONKSİYON
    function fixDesktopMenuAndRoutes() {
        const allLinks = document.querySelectorAll('a:not(.tq-m-link)');
        
        allLinks.forEach(link => {
            const txt = link.textContent.trim().toLowerCase();
            
            // Masaüstü ana buton yazısını düzelt (Ok işaretini bozmadan)
            if (txt.includes('english') || txt.includes('türkçe') || txt.includes('русский') || txt.includes('العربية')) {
                if (!link.closest('ul')) { 
                    for (let node of link.childNodes) {
                        if (node.nodeType === Node.TEXT_NODE) {
                            let nodeTxt = node.textContent.trim().toLowerCase();
                            if (nodeTxt.includes('english') || nodeTxt.includes('türkçe') || nodeTxt.includes('русский') || nodeTxt.includes('العربية') || nodeTxt === '') {
                                node.textContent = currentLangFull + ' ';
                                break;
                            }
                        }
                    }
                }
            }

            // Açılır listedeki mükerrer dili "English" ile takas et
            if (currentLangShort !== 'EN' && link.closest('ul')) {
                if (
                    (currentLangShort === 'TR' && (txt === 'turkish' || txt === 'türkçe' || txt === 'tr')) ||
                    (currentLangShort === '' && (txt === '' || txt === '' || txt === 'ru')) ||
                    (currentLangShort === '' && (txt === '' || txt === '' || txt === 'ar'))
                ) {
                    link.textContent = 'English';
                    link.setAttribute('href', enTarget);
                    link.onclick = function(e) { e.preventDefault(); window.location.href = enTarget; };
                    return;
                }
            }

            // Genel link rotalarını sabitle
            if (link.onclick) return;
            if (txt === 'english' || txt === 'en') {
                link.setAttribute('href', enTarget);
                link.onclick = function(e) { e.preventDefault(); window.location.href = enTarget; };
            } else if (txt === 'türkçe' || txt === 'turkce' || txt === 'turkish' || txt === 'tr') {
                link.setAttribute('href', trTarget);
                link.onclick = function(e) { e.preventDefault(); window.location.href = trTarget; };
            } else if (txt === '' || txt === '' || txt === '') {
                link.setAttribute('href', ruTarget);
                link.onclick = function(e) { e.preventDefault(); window.location.href = ruTarget; };
            } else if (txt === '' || txt === '' || txt === '') {
                link.setAttribute('href', arTarget);
                link.onclick = function(e) { e.preventDefault(); window.location.href = arTarget; };
            }
        });
    }

    function runLanguageSystem() {
        injectLanguageIntoMobileMenu();
        fixDesktopMenuAndRoutes();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runLanguageSystem);
    } else {
        runLanguageSystem();
    }
    
    // Hafif ve güvenli zamanlayıcılar (Asla takılı kalmaz)
    setTimeout(runLanguageSystem, 200);
    setTimeout(runLanguageSystem, 600);
    setTimeout(runLanguageSystem, 1500);
    setTimeout(runLanguageSystem, 3000); 
})();

function switchLanguage(lang) {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let baseName = currentPath.toLowerCase().replace('-en', '').replace('-ru', '').replace('-ar', '').replace('.html', '');
    if (baseName === '' || baseName === '/') baseName = 'index';

    if (lang === 'EN' || lang === 'en') {
        window.location.href = baseName === 'index' ? 'en/index.html' : `/tr/${baseName}.html`;
    } else if (lang === 'RU' || lang === 'ru') {
        window.location.href = baseName === 'index' ? '/ru/index.html' : `/ru/${baseName}.html`;
    } else if (lang === 'AR' || lang === 'ar') {
        window.location.href = baseName === 'index' ? '/ar/index.html' : `/ar/${baseName}.html`;
    } else {
        window.location.href = baseName === 'index' ? '/index.html' : `/${baseName}.html`;
    }
}

/* --- TOURQUAZ TRAVEL RADİKAL TEMİZLİKLİ MENÜ VE DİL SİSTEMİ --- */
(function() {
    const path = window.location.pathname;
    let pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    let baseName = pageName.replace(/\.html/i, '')
                           .replace(/\.html/i, '')
                           .replace(/\.html/i, '')
                           .replace(/\.html/i, '');
    
    if (baseName.toLowerCase() === 'index' || baseName === '') {
        baseName = 'index';
    }

    const trTarget = baseName === 'index' ? '/index.html' : `/${baseName}.html`;
    const enTarget = baseName === 'index' ? '/en/index.html' : `/en/${baseName.toLowerCase()}.html`;
    const ruTarget = baseName === 'index' ? '/ru/index.html' : `/ru/${baseName.toLowerCase()}.html`;
    const arTarget = baseName === 'index' ? '/ar/index-ar.html' : `/ar/${baseName.toLowerCase()}.html`;

    let currentLangShort = 'TR';
    let currentLangFull = 'Türkçe';
    let isEn = pageName.toLowerCase().includes('.html') || path.toLowerCase().includes('/en/');
    let isRu = pageName.toLowerCase().includes('.html') || path.toLowerCase().includes('/ru/');
    let isAr = pageName.toLowerCase().includes('.html') || path.toLowerCase().includes('/ar/');

    if (isTr) { currentLangShort = 'EN'; currentLangFull = 'English'; }
    else if (isRu) { currentLangShort = 'RU'; currentLangFull = 'Русский'; }
    else if (isAr) { currentLangShort = 'AR'; currentLangFull = 'العربية'; }

    // MENÜ ELEMANLARI
    let menuItems = [];
    if (isTr) {
        menuItems = [
            { text: '', href: '/tr/destinations.html' },
            { text: '', href: '/tr/best-tours.html' },
            { text: '', href: '/tr/blog.html' },
            { text: '', href: '/tr/vip-transfer.html' }
        ];
    } else if (isRu) {
        menuItems = [
            { text: 'Направления', href: '/ru/destinations.html' },
            { text: 'Лучшие Туры', href: '/ru/best-tours.html' },
            { text: 'Блог', href: '/ru/blog.html' },
            { text: 'Vip Трансфер', href: '/ru/vip-transfer.html' }
        ];
    } else if (isAr) {
        menuItems = [
            { text: 'الوجهات', href: '/ar/destinations-ar.html' },
            { text: 'أفضل الجولات', href: '/ar/best-tours-ar.html' },
            { text: 'مدونة', href: '/ar/blog-ar.html' },
            { text: 'VIP نقل', href: '/ar/vip-transfer-ar.html' }
        ];
        } else {
            menuItems = [
                { text: '', href: '/istanbul-city-tours' },
                { text: '', href: '/best-tours.html' },
                { text: '', href: '/blog.html' },
                { text: '', href: '/vip-transfer.html' }
            ];
        }

    function buildSystem() {
        
        if (document.querySelector('.tq-dynamic-menu-loaded')) return;

        const refElement = Array.from(document.querySelectorAll('a, span')).find(el => {
            const t = el.textContent.trim().toLowerCase();
            return t === 'destinations' || t === 'rotalarımız' || t === 'rotalarimiz' || t === 'napravleniya' || t === 'الوجهات';
        });

        if (!refElement) return;
        const menuContainer = refElement.parentElement;
        if (!menuContainer) return;

        // Temanın eski tüm linklerini temizle
        menuContainer.querySelectorAll('a:not(.tq-m-link)').forEach(link => link.remove());

        let htmlPayload = `
        <div class="tq-dynamic-menu-loaded" style="width:100%; display:block !important; opacity:1 !important; visibility:visible !important;">
            <div class="tq-mobile-lang-wrapper" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eeeeee; width: 100%; display: block; font-family: inherit;">
                <span style="font-weight: 600; font-size: 13px; text-transform: uppercase; color: #222222; display: block; margin-bottom: 10px;">Language / Dil</span>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <a href="${enTarget}" class="tq-m-link ${currentLangShort === 'EN' ? 'active' : ''}">EN</a>
                    <a href="${trTarget}" class="tq-m-link ${currentLangShort === 'TR' ? 'active' : ''}">TR</a>
                    <a href="${ruTarget}" class="tq-m-link ${currentLangShort === 'RU' ? 'active' : ''}">RU</a>
                    <a href="${arTarget}" class="tq-m-link ${currentLangShort === 'AR' ? 'active' : ''}">AR</a>
                </div>
            </div>
            <div class="tq-custom-menu-links">
        `;

        menuItems.forEach(item => {
            htmlPayload += `<a href="${item.href}" class="tq-custom-menu-item">${item.text}</a>`;
        });

        htmlPayload += `
            </div>
        </div>
        <style>
            .tq-m-link { padding: 6px 14px; background: #f5f5f5; border-radius: 4px; font-size: 12px; font-weight: bold; text-decoration: none !important; color: #222222 !important; display: inline-block; transition: all 0.2s; }
            .tq-m-link.active { background-color: #ff4a52 !important; color: #ffffff !important; }
            .tq-custom-menu-item { display: block !important; padding: 14px 20px !important; color: #222222 !important; font-size: 15px !important; font-weight: 500 !important; text-decoration: none !important; border-bottom: 1px solid #f5f5f5 !important; font-family: inherit !important; transition: all 0.2s ease-in-out !important; }
            .tq-custom-menu-item:hover { background-color: rgba(255, 74, 82, 0.04) !important; color: #ff4a52 !important; padding-left: 25px !important; }
            .tq-custom-menu-item:last-child { border-bottom: none !important; }

            /* ======================================================== */
            /* 🔥 RADİKAL ÇÖZÜM: BİZİM ÜRETMEDİĞİMİZ HER ŞEYİ KÖR ETMEK */
            /* ======================================================== */
            /* Mobil menü kapsayıcısının altındaki her şeyi gizle... */
            .mobile-menu *, 
            .mobile-nav *, 
            .navbar-collapse *, 
            .mean-nav * {
                display: none !important;
                background-image: none !important;
                background: none !important;
            }

            /* ...Sadece bizim şık yeni dinamik menü kutumuza ve içindeki elemanlara izin ver! */
            .tq-dynamic-menu-loaded,
            .tq-dynamic-menu-loaded *,
            .tq-mobile-lang-wrapper,
            .tq-mobile-lang-wrapper *,
            .tq-custom-menu-links,
            .tq-custom-menu-links * {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            /* Yan yana durması gereken dil butonlarının tasarımını koru */
            .tq-mobile-lang-wrapper div,
            .tq-m-link {
                display: inline-block !important;
            }
        </style>
        `;

        refElement.insertAdjacentHTML('beforebegin', htmlPayload);
        fixDesktopMenuAndRoutes();
    }

    function fixDesktopMenuAndRoutes() {
        const allLinks = document.querySelectorAll('a:not(.tq-m-link):not(.tq-custom-menu-item)');
        allLinks.forEach(link => {
            const txt = link.textContent.trim().toLowerCase();
            if (txt.includes('english') || txt.includes('türkçe') || txt.includes('русский') || txt.includes('العربية')) {
                if (!link.closest('ul')) { 
                    for (let node of link.childNodes) {
                        if (node.nodeType === Node.TEXT_NODE && (node.textContent.trim().toLowerCase().includes('english') || node.textContent.trim().toLowerCase().includes('türkçe') || node.textContent.trim().toLowerCase().includes('русский') || node.textContent.trim().toLowerCase().includes('العربية') || node.textContent.trim() === '')) {
                            node.textContent = currentLangFull + ' '; break;
                        }
                    }
                }
            }
            if (currentLangShort !== 'EN' && link.closest('ul')) {
                if ((currentLangShort === 'TR' && (txt === 'turkish' || txt === 'türkçe' || txt === 'tr')) || (currentLangShort === '' && (txt === '' || txt === '' || txt === '')) || (currentLangShort === '' && (txt === '' || txt === '' || txt === ''))) {
                    link.textContent = 'English'; link.setAttribute('href', enTarget);
                    link.onclick = function(e) { e.preventDefault(); window.location.href = enTarget; }; return;
                }
            }
            if (link.onclick) return;
            if (txt === 'english' || txt === 'en') { link.setAttribute('href', enTarget); link.onclick = function(e) { e.preventDefault(); window.location.href = enTarget; }; } 
            else if (txt === 'türkçe' || txt === 'turkce' || txt === 'turkish' || txt === 'tr') { link.setAttribute('href', trTarget); link.onclick = function(e) { e.preventDefault(); window.location.href = trTarget; }; } 
            else if (txt === '' || txt === '' || txt === '') { link.setAttribute('href', ruTarget); link.onclick = function(e) { e.preventDefault(); window.location.href = ruTarget; }; } 
            else if (txt === '' || txt === '' || txt === '') { link.setAttribute('href', arTarget); link.onclick = function(e) { e.preventDefault(); window.location.href = arTarget; }; }
        });
    }

    if (document.readyState === 'complete') {
        buildSystem();
    } else {
        window.addEventListener('load', buildSystem);
    }
})();

function switchLanguage(lang) {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let baseName = currentPath.toLowerCase().replace('-en', '').replace('-ru', '').replace('-ar', '').replace('.html', '');
    if (baseName === '' || baseName === '/') baseName = 'index';
    if (lang === 'EN' || lang === 'en') { window.location.href = baseName === 'index' ? 'index.html' : `/en/${baseName}.html`; } 
    else if (lang === 'RU' || lang === 'ru') { window.location.href = baseName === 'index' ? '/ru/index.html' : `/ru/${baseName}-ru.html`; } 
    else if (lang === 'AR' || lang === 'ar') { window.location.href = baseName === 'index' ? '/ar/index-ar.html' : `/ar/${baseName}-ar.html`; } 
    else { window.location.href = baseName === 'index' ? '/index.html' : `/${baseName}.html`; }
}

// ===================== MOBİL OFFCANVAS - SON DÜZELTME =====================
function fixMobileOffcanvasFinal() {
    setTimeout(() => {

        // 1. LOGO (İyi olduğu için koruyoruz)
        const logo = document.querySelector('.tp-offcanvas .logo img, .tp-offcanvas-logo img');
        if (logo) {
            logo.style.cssText = `
                width: 180px !important;
                height: auto !important;
            `;
        }

        // 2. KAPATMA KARE BUTONU - SAĞ ÜST KÖŞEYE OTURTMA
        const closeBtn = document.querySelector('.tp-offcanvas-close-button, .tp-offcanvas .close-button, .offcanvas-close');
        if (closeBtn) {
            closeBtn.style.cssText = `
                background: transparent !important;
                border: none !important;
                box-shadow: none !important;
                width: 50px !important;
                height: 50px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                position: absolute !important;
                top: 15px !important;
                right: 20px !important;
                z-index: 99 !important;
            `;
        }

        // 3. Üst Header Alanını Flex ile Düzenleme
        const headerArea = document.querySelector('.tp-offcanvas-header, .tp-offcanvas > div:first-child, .tp-offcanvas .tp-offcanvas-header');
        if (headerArea) {
            headerArea.style.cssText = `
                position: relative !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 15px 20px !important;
                background: transparent !important;
                width: 100% !important;
            `;
        }

    }, 600);
}

// Çalıştırma komutları
$(".tp-header-toogle").on('click', fixMobileOffcanvasFinal);
$(window).on('load', fixMobileOffcanvasFinal);
setTimeout(fixMobileOffcanvasFinal, 1000);
// ===================== MOBİL OFFCANVAS - ÇARPI İŞARETİ + LOGO DÜZELTME =====================
function fixMobileOffcanvasFinal() {
    setTimeout(() => {

        // 1. LOGO BOYUTU (İstediğin gibi tutuyoruz)
        const logo = document.querySelector('.tp-offcanvas .logo img, .tp-offcanvas-logo img');
        if (logo) {
            logo.style.cssText = `
                width: 180px !important;
                height: auto !important;
            `;
        }

        // 2. KAPATMA BUTONU - ÇARPI İŞARETİ YAPMA
        const closeBtn = document.querySelector('.tp-offcanvas-close-button, .tp-offcanvas .close, .offcanvas-close');
        if (closeBtn) {
            closeBtn.innerHTML = `<i class="fas fa-times" style="font-size: 28px; color: #222;"></i>`;
            closeBtn.style.cssText = `
                background: transparent !important;
                border: none !important;
                width: 50px !important;
                height: 50px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                position: absolute !important;
                top: 15px !important;
                right: 15px !important;
                z-index: 100 !important;
                padding: 0 !important;
            `;
        }

        // 3. Üst header alanı temizleme
        const headerArea = document.querySelector('.tp-offcanvas-header, .tp-offcanvas > div:first-child');
        if (headerArea) {
            headerArea.style.cssText = `
                position: relative !important;
                padding: 15px 20px !important;
                background: transparent !important;
            `;
        }

    }, 700);
}

// Tetikleyiciler
$(".tp-header-toogle").on('click', fixMobileOffcanvasFinal);
$(window).on('load', fixMobileOffcanvasFinal);
setTimeout(fixMobileOffcanvasFinal, 1200);