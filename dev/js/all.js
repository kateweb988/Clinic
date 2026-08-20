
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs');
});
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('.a1').click(function (e) {
    e.preventDefault();
    $('#popup-call').arcticmodal({
    });
  });
  $('.a2, .link').click(function (e) {
    e.preventDefault();
    $('#popup-call2').arcticmodal({
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener('DOMContentLoaded', () => {
	const localItems = document.querySelectorAll('.local__item');

	if (!localItems.length) return;

	localItems.forEach(item => {
		const select = item.querySelector('.local__select');
		const dropdown = item.querySelector('.local__dropdown');
		const search = item.querySelector('.local__search input');
		const options = item.querySelectorAll('.local__option');
		const selectText = select.querySelector('span');

		// Открытие / закрытие селекта
		select.addEventListener('click', (e) => {
			e.stopPropagation();

			// Закрываем остальные селекты
			localItems.forEach(otherItem => {
				if (otherItem !== item) {
					otherItem.classList.remove('active');
				}
			});

			item.classList.toggle('active');

			// Фокус на поиск
			if (item.classList.contains('active')) {
				search.focus();
			}
		});

		// Поиск по списку
		search.addEventListener('input', () => {
			const value = search.value.toLowerCase().trim();

			options.forEach(option => {
				const text = option
					.querySelector('span')
					.textContent
					.toLowerCase();

				if (text.includes(value)) {
					option.style.display = 'flex';
				} else {
					option.style.display = 'none';
				}
			});
		});

		// Выбор radio-кнопки
		options.forEach(option => {
			const radio = option.querySelector('input');

			radio.addEventListener('change', () => {
				selectText.textContent = radio.value;

				// Закрываем dropdown после выбора
				item.classList.remove('active');

				// Очищаем поиск
				search.value = '';

				// Возвращаем все пункты
				options.forEach(option => {
					option.style.display = 'flex';
				});
			});
		});
	});

	// Закрытие при клике вне селектов
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.local__item')) {
			localItems.forEach(item => {
				item.classList.remove('active');
			});
		}
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.querySelector('.nav__search input');

	if (!searchInput) return;

	const changePlaceholder = () => {
		if (window.innerWidth <= 1300) {
			searchInput.placeholder = 'Поиск';
		} else {
			searchInput.placeholder = 'Найти врача, услугу, анализ или симптом';
		}
	};

	changePlaceholder();

	window.addEventListener('resize', changePlaceholder);
});
document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabs__pane');

	tabs.forEach(tab => {
		const isFirstTab = tab.classList.contains('info__tab--first');

		const infoItems = tab.querySelectorAll('.info__item');

		infoItems.forEach(item => {
			const list = item.querySelector('ul');
			const items = item.querySelectorAll('ul li');
			const arrow = item.querySelector('.info__arrow');

			if (!list || !items.length || !arrow) return;

			// Если элементов 3 или меньше — стрелка не нужна
			if (items.length <= 3) {
				arrow.style.display = 'none';
				return;
			}

			// Первый таб:
			// показываем первые 3, остальные скрываем
			if (isFirstTab) {
				items.forEach((li, index) => {
					if (index >= 3) {
						li.style.display = 'none';
					}
				});
			}

			// Остальные табы:
			// скрываем весь список
			else {
				items.forEach(li => {
					li.style.display = 'none';
				});
			}

			// Клик по стрелке
			arrow.addEventListener('click', () => {
				const isOpen = item.classList.toggle('active');

				if (isFirstTab) {
					// Первый таб:
					// первые 3 всегда видны,
					// остальные открываются
					items.forEach((li, index) => {
						if (index >= 3) {
							li.style.display = isOpen ? '' : 'none';
						}
					});
				} else {
					// Остальные табы:
					// открываем / закрываем весь список
					items.forEach(li => {
						li.style.display = isOpen ? '' : 'none';
					});
				}
			});
		});
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const selects = document.querySelectorAll('.nav__select');

	selects.forEach(select => {
		const dropdown = select.nextElementSibling;

		if (!dropdown || !dropdown.classList.contains('nav__dropdown')) return;

		select.addEventListener('click', (e) => {
			e.stopPropagation();

			// Закрываем остальные селекты
			selects.forEach(otherSelect => {
				if (otherSelect !== select) {
					otherSelect.classList.remove('active');

					const otherDropdown = otherSelect.nextElementSibling;

					if (otherDropdown) {
						otherDropdown.classList.remove('active');
					}
				}
			});

			// Открываем/закрываем текущий
			select.classList.toggle('active');
			dropdown.classList.toggle('active');
		});

		dropdown.querySelectorAll('.nav__option').forEach(option => {
			option.addEventListener('click', (e) => {
				e.stopPropagation();

				// Меняем текст выбранного значения
				select.childNodes[0].textContent = option.textContent.trim() + ' ';

				select.classList.remove('active');
				dropdown.classList.remove('active');
			});
		});
	});

	// Закрываем селекты при клике вне них
	document.addEventListener('click', () => {
		selects.forEach(select => {
			select.classList.remove('active');

			const dropdown = select.nextElementSibling;

			if (dropdown) {
				dropdown.classList.remove('active');
			}
		});
	});
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination1",
    },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 1
      }
    }
  });
  const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 4
      }
    }
  });
  const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3
      }
    }
  });
  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 4
      }
    }
  });

});
document.addEventListener('DOMContentLoaded', () => {

	const aboutContent = document.querySelector('.about__content');
	const aboutMore = document.querySelector('.about__more');

	if (!aboutContent || !aboutMore) return;

	aboutMore.addEventListener('click', () => {
		aboutContent.classList.toggle('active');
	});

});
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = GLightbox({
        selector: '.glightbox'
    });
});
document.addEventListener('DOMContentLoaded', () => {

	// ==========================================
	// SIDE MENU
	// ==========================================

	const sideMenu = document.querySelector('.side-menu');
	const sideMenuBtn = document.querySelector('.side-menu__btn');
	const sideMenuOverlay = document.querySelector('.side-menu__overlay');

	if (!sideMenu || !sideMenuBtn || !sideMenuOverlay) return;


	// ==========================================
	// Блокировка скролла
	// ==========================================

	let scrollPosition = 0;

	const lockScroll = () => {
		scrollPosition = window.scrollY;

		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollPosition}px`;
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.width = '100%';
	};


	const unlockScroll = () => {
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		document.body.style.right = '';
		document.body.style.width = '';

		window.scrollTo(0, scrollPosition);
	};


	// ==========================================
	// Открытие меню
	// ==========================================

	const openSideMenu = () => {

		sideMenu.classList.add('active');
		sideMenuBtn.classList.add('active');
		sideMenuOverlay.classList.add('active');

		sideMenuBtn.setAttribute('aria-label', 'Закрыть меню');

		// Блокируем прокрутку сайта
		lockScroll();
	};


	// ==========================================
	// Закрытие меню
	// ==========================================

	const closeSideMenu = () => {

		sideMenu.classList.remove('active');
		sideMenuBtn.classList.remove('active');
		sideMenuOverlay.classList.remove('active');

		sideMenuBtn.setAttribute('aria-label', 'Открыть меню');

		// Закрываем dropdown
		sideMenu
			.querySelectorAll('.side-menu__item.active')
			.forEach(item => {
				item.classList.remove('active');
			});

		// Возвращаем прокрутку сайта
		unlockScroll();
	};


	// ==========================================
	// Кнопка
	// ==========================================

	sideMenuBtn.addEventListener('click', (e) => {

		e.preventDefault();
		e.stopPropagation();

		if (sideMenu.classList.contains('active')) {
			closeSideMenu();
		} else {
			openSideMenu();
		}

	});


	// ==========================================
	// Overlay
	// ==========================================

	sideMenuOverlay.addEventListener('click', () => {
		closeSideMenu();
	});


	// ==========================================
	// Dropdown
	// ==========================================

	const sideMenuItems = sideMenu.querySelectorAll('.side-menu__item');

	sideMenuItems.forEach(item => {

		const link = item.querySelector('.side-menu__link');
		const dropdown = item.querySelector('.side-menu__dropdown');

		// Обычный пункт меню
		if (!link || !dropdown) return;


		link.addEventListener('click', (e) => {

			e.preventDefault();
			e.stopPropagation();


			// Закрываем остальные dropdown
			sideMenuItems.forEach(otherItem => {

				if (otherItem !== item) {
					otherItem.classList.remove('active');
				}

			});


			// Переключаем текущий dropdown
			item.classList.toggle('active');

		});

	});


	// ==========================================
	// ESC — закрытие меню
	// ==========================================

	document.addEventListener('keydown', (e) => {

		if (e.key === 'Escape') {

			if (sideMenu.classList.contains('active')) {
				closeSideMenu();
			}

		}

	});

});
document.addEventListener("DOMContentLoaded", () => {
  function initInfoDropdowns() {
      const items = document.querySelectorAll('.info__item');

      items.forEach((item) => {
          const list = item.querySelector('ul');

          if (!list) return;

          const li = list.querySelectorAll(':scope > li');

          // Добавляем стрелку
          const arrow = document.createElement('span');
          arrow.classList.add('info__arrow');

          item.appendChild(arrow);

          // Первый таб — показываем 3 пункта
          const firstPane = item.closest('.tabs__pane');

          if (firstPane === document.querySelector('.tabs__pane')) {
              if (li.length > 3) {
                  item.classList.add('has-more');

                  li.forEach((element, index) => {
                      if (index >= 3) {
                          element.style.display = 'none';
                      }
                  });
              }
          } 
          // Остальные табы — полностью скрываем
          else {
              item.classList.add('has-more');

              list.style.display = 'none';
          }

          arrow.addEventListener('click', () => {
              const isFirstPane =
                  firstPane === document.querySelector('.tabs__pane');

              item.classList.toggle('is-open');

              if (isFirstPane) {
                  li.forEach((element, index) => {
                      if (index >= 3) {
                          element.style.display =
                              item.classList.contains('is-open')
                                  ? ''
                                  : 'none';
                      }
                  });
              } else {
                  list.style.display =
                      item.classList.contains('is-open')
                          ? ''
                          : 'none';
              }
          });
      });
  }
});
// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

