
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
document.addEventListener('DOMContentLoaded', function () {
	const salesTabs = document.querySelector('.sales-page .tabs');

	if (!salesTabs) return;

	const nav = salesTabs.querySelector('.tabs__nav');
	const buttons = salesTabs.querySelectorAll('.tabs__btn');
	const panes = salesTabs.querySelectorAll('.tabs__pane');

	if (!nav || !buttons.length || !panes.length) return;

	// Создаём select
	const select = document.createElement('select');
	select.className = 'tabs__select';

	buttons.forEach((button, index) => {
		const option = document.createElement('option');

		option.value = index;
		option.textContent = button.textContent.trim();

		if (button.classList.contains('active')) {
			option.selected = true;
		}

		select.appendChild(option);
	});

	// Добавляем select
	nav.parentNode.insertBefore(select, nav);

	// Переключение через select
	select.addEventListener('change', function () {
		const index = Number(this.value);

		buttons.forEach(button => {
			button.classList.remove('active', 'tabs__btn_active');
		});

		panes.forEach(pane => {
			pane.classList.remove('tabs__pane_show');
		});

		buttons[index].classList.add('active', 'tabs__btn_active');
		panes[index].classList.add('tabs__pane_show');
	});

	// Переключение обычных табов
	buttons.forEach((button, index) => {
		button.addEventListener('click', function (e) {
			e.preventDefault();

			buttons.forEach(btn => {
				btn.classList.remove('active', 'tabs__btn_active');
			});

			panes.forEach(pane => {
				pane.classList.remove('tabs__pane_show');
			});

			this.classList.add('active', 'tabs__btn_active');
			panes[index].classList.add('tabs__pane_show');

			select.value = index;
		});
	});

	// Адаптив
	function checkTabs() {
		if (window.innerWidth < 950) {
			select.style.display = 'block';
			nav.style.display = 'none';
		} else {
			select.style.display = 'none';
			nav.style.display = '';
		}
	}

	checkTabs();

	window.addEventListener('resize', checkTabs);
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
document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('.calc__btn').click(function (e) {
    e.preventDefault();
    $('#popup-calc').arcticmodal({
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

  const salesItems = document.querySelectorAll('.sales-main__item');

  salesItems.forEach(item => {

    const info = item.querySelector('.sales-main__info');
    const list = item.querySelector('ul');
    const items = item.querySelectorAll('ul li');

    if (!info || !list || !items.length) return;


    // =====================================================
    // ЕСЛИ ЭЛЕМЕНТОВ 3 ИЛИ МЕНЬШЕ
    // =====================================================

    if (items.length <= 3) {
      return;
    }


    // =====================================================
    // СОЗДАЁМ СТРЕЛКУ
    // =====================================================

    const arrow = document.createElement('span');

    arrow.classList.add('info__arrow');


    // Добавляем стрелку в конец блока
    info.appendChild(arrow);


    // =====================================================
    // ИЗНАЧАЛЬНО ПОКАЗЫВАЕМ ТОЛЬКО 3 ЭЛЕМЕНТА
    // =====================================================

    items.forEach((li, index) => {

      if (index >= 3) {
        li.style.display = 'none';
      }

    });


    // =====================================================
    // КЛИК ПО СТРЕЛКЕ
    // =====================================================

    arrow.addEventListener('click', () => {

      const isOpen = item.classList.contains('active');


      // ===================================================
      // ЗАКРЫВАЕМ ВСЕ ОСТАЛЬНЫЕ
      // ===================================================

      salesItems.forEach(otherItem => {

        if (otherItem === item) return;

        otherItem.classList.remove('active');

        const otherItems =
          otherItem.querySelectorAll('.sales-main__info ul li');

        const otherArrow =
          otherItem.querySelector('.info__arrow');


        otherItems.forEach((li, index) => {

          if (index >= 3) {
            li.style.display = 'none';
          } else {
            li.style.display = '';
          }

        });


        if (otherArrow) {
          otherArrow.classList.remove('active');
        }

      });


      // ===================================================
      // ТЕКУЩИЙ БЛОК
      // ===================================================

      if (isOpen) {

        // Закрываем
        item.classList.remove('active');
        arrow.classList.remove('active');

        items.forEach((li, index) => {

          if (index >= 3) {
            li.style.display = 'none';
          } else {
            li.style.display = '';
          }

        });

      } else {

        // Открываем
        item.classList.add('active');
        arrow.classList.add('active');

        items.forEach(li => {
          li.style.display = '';
        });

      }

    });

  });

});
document.addEventListener('DOMContentLoaded', () => {

  const reviewItems = document.querySelectorAll('.rev__item')

  const maxLines = 8


  reviewItems.forEach(item => {

    const text = item.querySelector('.rev__text')

    if (!text) return


    // =====================================================
    // ПРОВЕРЯЕМ, НУЖНО ЛИ РАСКРЫТИЕ
    // =====================================================

    const styles = getComputedStyle(text)
    const lineHeight = parseFloat(styles.lineHeight)

    if (!lineHeight) return

    const maxHeight = lineHeight * maxLines


    // Если текст помещается в 8 строк —
    // ничего не делаем
    if (text.scrollHeight <= maxHeight + 1) {
      return
    }


    // =====================================================
    // СОЗДАЁМ СТРЕЛКУ
    // =====================================================

    const arrow = document.createElement('span')

    arrow.classList.add('info__arrow')

    text.after(arrow)


    // =====================================================
    // ИЗНАЧАЛЬНОЕ СОСТОЯНИЕ
    // =====================================================

    text.classList.add('collapsed')


    // =====================================================
    // КЛИК ПО СТРЕЛКЕ
    // =====================================================

    arrow.addEventListener('click', () => {

      const isOpen = item.classList.contains('active')


      // ===================================================
      // ЗАКРЫВАЕМ ВСЕ ОСТАЛЬНЫЕ ОТЗЫВЫ
      // ===================================================

      reviewItems.forEach(otherItem => {

        if (otherItem === item) return


        const otherText =
          otherItem.querySelector('.rev__text')

        const otherArrow =
          otherItem.querySelector('.info__arrow')


        // Если у другого отзыва нет стрелки —
        // ничего не делаем
        if (!otherText || !otherArrow) return


        otherItem.classList.remove('active')

        otherArrow.classList.remove('active')

        otherText.classList.add('collapsed')

      })


      // ===================================================
      // ТЕКУЩИЙ ОТЗЫВ
      // ===================================================

      if (isOpen) {

        // Закрываем текущий
        item.classList.remove('active')

        arrow.classList.remove('active')

        text.classList.add('collapsed')

      } else {

        // Открываем текущий
        item.classList.add('active')

        arrow.classList.add('active')

        text.classList.remove('collapsed')

      }

    })

  })

})

document.addEventListener('DOMContentLoaded', () => {

  // =====================================================
  // ACCORDION
  // =====================================================

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

      // Первый таб — показываем первые 3 элемента
      if (isFirstTab) {

        items.forEach((li, index) => {
          if (index >= 3) {
            li.style.display = 'none';
          }
        });

      }

      // Остальные табы — скрываем весь список
      else {

        items.forEach(li => {
          li.style.display = 'none';
        });

      }


      // =================================================
      // ФУНКЦИЯ ЗАКРЫТИЯ ЭЛЕМЕНТА
      // =================================================

      function closeItem() {

        item.classList.remove('active');

        if (isFirstTab) {

          items.forEach((li, index) => {
            li.style.display =
              index < 3 ? '' : 'none';
          });

        } else {

          items.forEach(li => {
            li.style.display = 'none';
          });

        }

        const wrap = item.closest('.info__wrap');

        if (wrap) {

          const hasActive =
            wrap.querySelector('.info__item.active');

          wrap.classList.toggle(
            'has-active',
            !!hasActive
          );

        }

      }


      // =================================================
      // ФУНКЦИЯ ОТКРЫТИЯ ЭЛЕМЕНТА
      // =================================================

      function openItem() {

        const wrap = item.closest('.info__wrap');

        // Закрываем остальные блоки
        if (wrap) {

          const allItems =
            wrap.querySelectorAll('.info__item');

          allItems.forEach(otherItem => {

            if (otherItem !== item) {

              otherItem.classList.remove('active');

              const otherItems =
                otherItem.querySelectorAll('ul li');

              otherItems.forEach((li, index) => {

                if (isFirstTab && index < 3) {
                  li.style.display = '';
                } else {
                  li.style.display = 'none';
                }

              });

            }

          });

        }

        // Открываем текущий
        item.classList.add('active');

        items.forEach(li => {
          li.style.display = '';
        });

        if (wrap) {
          wrap.classList.add('has-active');
        }

      }


      // =================================================
      // КЛИК ПО СТРЕЛКЕ
      // =================================================

      arrow.addEventListener('click', event => {

        event.preventDefault();
        event.stopPropagation();

        const isOpen =
          item.classList.contains('active');

        if (isOpen) {
          closeItem();
        } else {
          openItem();
        }

      });


      // =================================================
      // КЛИК ПО ПУСТОМУ МЕСТУ ПОДЛОЖКИ
      // =================================================

      item.addEventListener('click', event => {

        // Работает только если блок уже открыт
        if (!item.classList.contains('active')) {
          return;
        }

        // Стрелку обрабатываем отдельно выше
        if (event.target.closest('.info__arrow')) {
          return;
        }

        // Клик по самому списку / его содержимому
        // ничего не закрывает
        if (event.target.closest('ul')) {
          return;
        }

        // Клик по ссылкам, кнопкам, input и т.д.
        // тоже ничего не закрывает
        if (
          event.target.closest(
            'a, button, input, textarea, select, label'
          )
        ) {
          return;
        }

        // Закрываем ТОЛЬКО если нажали
        // непосредственно на пустую область .info__item
        if (event.target === item) {
          closeItem();
        }

      });

    });

  });


  // =====================================================
  // УНИВЕРСАЛЬНЫЕ ФИЛЬТРЫ
  // =====================================================

  function initFilters(section) {

    if (!section) return;

    const filterButtons =
      section.querySelectorAll(
        '[data-filter]'
      );

    if (!filterButtons.length) return;

    const filterItems =
      section.querySelectorAll(
        '.info__item[data-category]'
      );

    if (!filterItems.length) return;


    // -----------------------------------------------
    // Применяем фильтр
    // -----------------------------------------------

    function applyFilter(filter) {

      filterItems.forEach(item => {

        // "all" — показываем всё
        if (filter === 'all') {

          item.style.display = '';

          return;
        }

        // Проверяем категорию элемента
        const category =
          item.dataset.category;

        if (category === filter) {

          item.style.display = '';

        } else {

          item.style.display = 'none';

        }

      });

    }


    // -----------------------------------------------
    // Кнопки фильтра
    // -----------------------------------------------

    filterButtons.forEach(button => {

      button.addEventListener('click', event => {

        event.preventDefault();

        // Убираем active со всех кнопок
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });

        // Добавляем active текущей
        button.classList.add('active');

        // Получаем значение фильтра
        const filter =
          button.dataset.filter || 'all';

        applyFilter(filter);

      });

    });


    // -----------------------------------------------
    // Инициализация
    // -----------------------------------------------

    const activeButton =
      section.querySelector(
        '[data-filter].active'
      );

    if (activeButton) {

      applyFilter(
        activeButton.dataset.filter || 'all'
      );

    }

  }


  // =====================================================
  // ФИЛЬТРЫ ПО СЕКЦИЯМ
  // =====================================================

  /*
   * Просто добавляешь сюда секции,
   * в которых есть [data-filter].
   */

  document
    .querySelectorAll(
      '[data-filter-section]'
    )
    .forEach(section => {

      initFilters(section);

    });


  // =====================================================
  // #PROG — ФИЛЬТР + ПОИСК
  // =====================================================

  const progSection =
    document.querySelector('#prog');

  if (progSection) {

    const filterButtons =
      progSection.querySelectorAll(
        '.prog__filters .btn'
      );

    const searchForm =
      progSection.querySelector(
        '.nav__search'
      );

    const searchInput =
      searchForm
        ? searchForm.querySelector(
            'input[type="search"]'
          )
        : null;

    const infoItems =
      progSection.querySelectorAll(
        '.info__item'
      );


    // -----------------------------------------------
    // Поиск
    // -----------------------------------------------

    function matchesSearch(item, query) {

      if (!query) {
        return true;
      }

      const text =
        item.textContent
          .trim()
          .toLowerCase();

      return text.includes(query);

    }


    // -----------------------------------------------
    // Активный фильтр
    // -----------------------------------------------

    function getActiveFilter() {

      const activeButton =
        progSection.querySelector(
          '.prog__filters .btn.active'
        );

      if (!activeButton) {
        return 'all';
      }

      // Если есть data-filter — используем его
      if (activeButton.dataset.filter) {
        return activeButton.dataset.filter;
      }

      // Сохраняем старую логику:
      // первая кнопка = все
      // вторая = direction
      const index =
        Array.from(filterButtons)
          .indexOf(activeButton);

      if (index === 0) {
        return 'all';
      }

      if (index === 1) {
        return 'direction';
      }

      return 'all';

    }


    // -----------------------------------------------
    // Применяем фильтр + поиск
    // -----------------------------------------------

    function applyProgFilter() {

      const activeFilter =
        getActiveFilter();

      const query =
        searchInput
          ? searchInput.value
              .trim()
              .toLowerCase()
          : '';


      infoItems.forEach(item => {

        let matchesFilter = true;


        // -------------------------------------------
        // Фильтр
        // -------------------------------------------

        if (activeFilter !== 'all') {

          matchesFilter =
            item.dataset.category ===
            activeFilter;

        }


        // -------------------------------------------
        // Поиск
        // -------------------------------------------

        const matchesSearch =
          matchesSearchText(
            item,
            query
          );


        // -------------------------------------------
        // Итог
        // -------------------------------------------

        if (
          matchesFilter &&
          matchesSearch
        ) {

          item.style.display = '';

        } else {

          item.style.display = 'none';

        }

      });

    }


    // Отдельная функция поиска,
    // чтобы не было конфликта имён
    function matchesSearchText(item, query) {

      if (!query) {
        return true;
      }

      const text =
        item.textContent
          .trim()
          .toLowerCase();

      return text.includes(query);

    }


    // -----------------------------------------------
    // Кнопки фильтра
    // -----------------------------------------------

    filterButtons.forEach(button => {

      button.addEventListener('click', event => {

        event.preventDefault();

        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });

        button.classList.add('active');

        applyProgFilter();

      });

    });


    // -----------------------------------------------
    // Поиск во время ввода
    // -----------------------------------------------

    if (searchInput) {

      searchInput.addEventListener(
        'input',
        applyProgFilter
      );

    }


    // -----------------------------------------------
    // Submit
    // -----------------------------------------------

    if (searchForm) {

      searchForm.addEventListener(
        'submit',
        event => {

          event.preventDefault();

          applyProgFilter();

        }
      );

    }

  }


  // =====================================================
  // #DIAGNOSTICS — ПОИСК
  // =====================================================

  const diagnosticsSection =
    document.querySelector('#diagnostics');

  if (diagnosticsSection) {

    const searchForms =
      diagnosticsSection.querySelectorAll(
        '.nav__search'
      );

    searchForms.forEach(searchForm => {

      const searchInput =
        searchForm.querySelector(
          'input[type="search"]'
        );

      if (!searchInput) return;


      const infoItems =
        diagnosticsSection.querySelectorAll(
          '.info__item'
        );


      // -----------------------------------------------
      // Поиск
      // -----------------------------------------------

      function applyDiagnosticsSearch() {

        const query =
          searchInput.value
            .trim()
            .toLowerCase();


        infoItems.forEach(item => {

          const text =
            item.textContent
              .trim()
              .toLowerCase();


          // Пустой поиск
          if (!query) {

            item.style.display = '';

            return;

          }


          // Есть совпадение
          if (text.includes(query)) {

            item.style.display = '';

          }

          // Нет совпадения
          else {

            item.style.display = 'none';

          }

        });

      }


      // -----------------------------------------------
      // Input
      // -----------------------------------------------

      searchInput.addEventListener(
        'input',
        applyDiagnosticsSearch
      );


      // -----------------------------------------------
      // Submit
      // -----------------------------------------------

      searchForm.addEventListener(
        'submit',
        event => {

          event.preventDefault();

          applyDiagnosticsSearch();

        }
      );

    });

  }

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
  const swiper17 = new Swiper('.swiper-lic', {
	slidesPerView: 'auto',
	spaceBetween: 10,

	navigation: {
		nextEl: '.swiper-lic-next',
		prevEl: '.swiper-lic-prev',
	},

	on: {
		init: function () {
		updateSwiperFade(this)
		},

		slideChange: function () {
		updateSwiperFade(this)
		},

		resize: function () {
		updateSwiperFade(this)
		}
	}
	})


	function updateSwiperFade(swiper) {

	const slider = swiper.el

	if (swiper.isEnd) {
		slider.classList.add('swiper-end')
	} else {
		slider.classList.remove('swiper-end')
	}
	}

  // ========================================
  // SWIPER 1
  // ========================================
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 0,

    pagination: {
      el: '.swiper-pagination1',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      992: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    }
  });


  // ========================================
  // SWIPER 2
  // ========================================
  const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 20,
      }
    }
  });


  // ========================================
  // SWIPER 3
  // ========================================
  const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 20,
      }
    }
  });


  // ========================================
  // SWIPER 4
  // ========================================
  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 20,
      }
    }
  });


  // ========================================
  // SWIPER 4 ДЛЯ ART-SALES
  // ========================================
  const swiper44 = new Swiper('.art-sales .swiper4', {
    slidesPerView: 4,
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 20,
      }
    }
  });

const swiper25 = new Swiper('.swiper-rev', {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 10,

  navigation: {
    nextEl: '.swiper-rev-next',
    prevEl: '.swiper-rev-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    992: {
      slidesPerView: document.querySelector('.doc-item') ? 2 : 3,
      spaceBetween: 20,
    },

    1300: {
      slidesPerView: 2,
      loop: true,
      spaceBetween: 20,
    }
  }
})
const swiper26 = new Swiper('.swiper-general', {
  slidesPerView: 3,
  spaceBetween: 25,

  navigation: {
    nextEl: '.swiper-general-next',
    prevEl: '.swiper-general-prev',
  },

  breakpoints: {
	0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    992: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1300: {
      slidesPerView: 3,
      spaceBetween: 25,
    }
  }
})

  // ========================================
  // CONTACTS SWIPERS
  // ========================================
  document.querySelectorAll('.swiper-contacts').forEach(function (slider) {

    const pagination = slider.querySelector('.pagination1');

    new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,

      pagination: {
        el: pagination,
        clickable: true,
      },

      speed: 500,

      grabCursor: true,
    });

  });

});
document.addEventListener('DOMContentLoaded', () => {

  // =====================================================
  // HEALING DAYS
  // =====================================================

  const healingDaysSwiper = new Swiper('.healing-days__slider', {

    slidesPerView: 8,
    spaceBetween: 21.5,

    breakpoints: {
      0: {
        slidesPerView: 6, 
		spaceBetween: 5,
      },
	  576: {
        slidesPerView: 8
      },
      768: {
        slidesPerView: 8
      }
    },

    navigation: {
      prevEl: '.healing-days__arrow_prev',
      nextEl: '.healing-days__arrow_next'
    }
  })

  const days = document.querySelectorAll('.healing-days__slide')

  days.forEach(day => {

    day.addEventListener('click', () => {

      days.forEach(item => {
        item.classList.remove('active')
      })

      day.classList.add('active')

    })

  })


  // =====================================================
  // TIME SLIDER
  // =====================================================

  const healingTimeSwiper = new Swiper('.healing-time__slider', {

    slidesPerView: 6,
    spaceBetween: 10,

    breakpoints: {
      0: {
        slidesPerView: 4
      },

      768: {
        slidesPerView: 6
      }
    },

    navigation: {
      prevEl: '.healing-time__arrow_prev',
      nextEl: '.healing-time__arrow_next'
    }
  })

  const times = document.querySelectorAll('.healing-time__slide')

  times.forEach(time => {

    time.addEventListener('click', () => {

      times.forEach(item => {
        item.classList.remove('active')
      })

      time.classList.add('active')

    })

  })

})
document.addEventListener('DOMContentLoaded', () => {

  const thanksItems = document.querySelectorAll('.thanks__item')

  thanksItems.forEach(item => {

    // =====================================================
    // DAYS SLIDER
    // =====================================================

    const daysSliderElement = item.querySelector('.thanks__days-slider')

    if (daysSliderElement) {

      const daysPrev = item.querySelector('.thanks__days-arrow_prev')
      const daysNext = item.querySelector('.thanks__days-arrow_next')
      const days = item.querySelectorAll('.thanks__day')

      const daysSlider = new Swiper(daysSliderElement, {
        slidesPerView: 7,
        spaceBetween: 13,

        slidesPerGroup: 1,

        navigation: {
          prevEl: daysPrev,
          nextEl: daysNext
        },

        observer: true,
        observeParents: true,
        observeSlideChildren: true,

        on: {
          init(swiper) {
            updateDaysSmoke(swiper)
            updateDaysArrows(swiper, daysPrev, daysNext)
          },

          slideChange(swiper) {
            updateDaysSmoke(swiper)
            updateDaysArrows(swiper, daysPrev, daysNext)
          },

          resize(swiper) {
            updateDaysSmoke(swiper)
            updateDaysArrows(swiper, daysPrev, daysNext)
          },

          update(swiper) {
            updateDaysSmoke(swiper)
            updateDaysArrows(swiper, daysPrev, daysNext)
          }
        }
      })

      days.forEach(day => {

        day.addEventListener('click', () => {

          days.forEach(item => {
            item.classList.remove('active')
          })

          day.classList.add('active')

        })

      })

    }


    // =====================================================
    // TIME SLIDER
    // =====================================================

    const timeSliderElement = item.querySelector('.thanks__time-slider')

    if (timeSliderElement) {

      const timePrev = item.querySelector('.thanks__time-arrow_prev')
      const timeNext = item.querySelector('.thanks__time-arrow_next')
      const timeItems = item.querySelectorAll('.thanks__time-item')

      const timeSlider = new Swiper(timeSliderElement, {
        slidesPerView: 6,
        spaceBetween: 10,

        slidesPerGroup: 1,

        navigation: {
          prevEl: timePrev,
          nextEl: timeNext
        },

        observer: true,
        observeParents: true,
        observeSlideChildren: true,

        on: {
          init(swiper) {
            updateTimeSmoke(swiper)
            updateTimeArrows(swiper, timePrev, timeNext)
          },

          slideChange(swiper) {
            updateTimeSmoke(swiper)
            updateTimeArrows(swiper, timePrev, timeNext)
          },

          resize(swiper) {
            updateTimeSmoke(swiper)
            updateTimeArrows(swiper, timePrev, timeNext)
          },

          update(swiper) {
            updateTimeSmoke(swiper)
            updateTimeArrows(swiper, timePrev, timeNext)
          }
        }
      })

      timeItems.forEach(time => {

        time.addEventListener('click', () => {

          timeItems.forEach(item => {
            item.classList.remove('active')
          })

          time.classList.add('active')

        })

      })

    }

  })


  // =====================================================
  // DAYS SMOKE
  // =====================================================

  function updateDaysSmoke(swiper) {

    swiper.slides.forEach(slide => {
      slide.classList.remove('smoke-left', 'smoke-right')
    })

    const firstVisibleIndex = swiper.activeIndex

    const lastVisibleIndex = Math.min(
      firstVisibleIndex + 6,
      swiper.slides.length - 1
    )

    const firstVisible = swiper.slides[firstVisibleIndex]
    const lastVisible = swiper.slides[lastVisibleIndex]

    if (firstVisible) {
      firstVisible.classList.add('smoke-left')
    }

    if (lastVisible && lastVisible !== firstVisible) {
      lastVisible.classList.add('smoke-right')
    }

  }


  // =====================================================
  // TIME SMOKE
  // =====================================================

  function updateTimeSmoke(swiper) {

    swiper.slides.forEach(slide => {
      slide.classList.remove('smoke-left', 'smoke-right')
    })

    const firstVisibleIndex = swiper.activeIndex

    const lastVisibleIndex = Math.min(
      firstVisibleIndex + 5,
      swiper.slides.length - 1
    )

    const firstVisible = swiper.slides[firstVisibleIndex]
    const lastVisible = swiper.slides[lastVisibleIndex]

    if (firstVisible) {
      firstVisible.classList.add('smoke-left')
    }

    if (lastVisible && lastVisible !== firstVisible) {
      lastVisible.classList.add('smoke-right')
    }

  }


  // =====================================================
  // ARROWS
  // =====================================================

  function updateDaysArrows(swiper, prev, next) {

    if (!prev || !next) return

    prev.style.opacity = swiper.isBeginning ? '0.3' : '1'
    next.style.opacity = swiper.isEnd ? '0.3' : '1'

  }


  function updateTimeArrows(swiper, prev, next) {

    if (!prev || !next) return

    prev.style.opacity = swiper.isBeginning ? '0.3' : '1'
    next.style.opacity = swiper.isEnd ? '0.3' : '1'

  }

})
document.addEventListener('DOMContentLoaded', () => {
  let patientSwiper = null
  let newsSwiper = null

  function initPatientSwiper() {
    const width = window.innerWidth

    if (width >= 767 && width < 1300) {
      if (!patientSwiper) {
        patientSwiper = new Swiper('.patient__row', {
          slidesPerView: 4,
          spaceBetween: 20,
          loop: false,

          navigation: {
            nextEl: '.patient__next',
            prevEl: '.patient__prev'
          }
        })
      }
    } else {
      if (patientSwiper) {
        patientSwiper.destroy(true, true)
        patientSwiper = null
      }
    }
  }


  function initNewsSwiper() {
    if (window.innerWidth < 1300) {
      if (!newsSwiper) {
        newsSwiper = new Swiper('.news-item__row', {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: false,

          breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          },

          navigation: {
            nextEl: '.news-item__next',
            prevEl: '.news-item__prev'
          }
        })
      }
    } else {
      if (newsSwiper) {
        newsSwiper.destroy(true, true)
        newsSwiper = null
      }
    }
  }


  function initSliders() {
    initPatientSwiper()
    initNewsSwiper()
  }


  initSliders()


  let resizeTimer

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)

    resizeTimer = setTimeout(() => {
      initSliders()
    }, 150)
  })
})
document.addEventListener('DOMContentLoaded', function () {

	const selects = document.querySelectorAll('.date-select');

	selects.forEach(select => {

		const head = select.querySelector('.date-select__head');
		const value = select.querySelector('.date-select__head span');
		const options = select.querySelectorAll('.date-select__option');

		head.addEventListener('click', function (e) {
			e.stopPropagation();

			// Закрываем остальные
			selects.forEach(item => {
				if (item !== select) {
					item.classList.remove('active');
				}
			});

			select.classList.toggle('active');
		});

		options.forEach(option => {
			option.addEventListener('click', function () {

				value.textContent = this.textContent;

				select.classList.remove('active');
			});
		});
	});

	// Закрытие при клике вне селекта
	document.addEventListener('click', function () {
		selects.forEach(select => {
			select.classList.remove('active');
		});
	});

});
document.addEventListener('DOMContentLoaded', function () {

	const videoButtons = document.querySelectorAll('.news-item__video');

	if (!videoButtons.length) return;

	videoButtons.forEach(button => {

		button.addEventListener('click', function (e) {
			e.preventDefault();

			const videoUrl = this.dataset.video;

			if (!videoUrl) return;

			// Получаем ID видео
			const videoId = videoUrl.match(
				/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
			);

			if (!videoId) return;

			// Создаём overlay
			const overlay = document.createElement('div');
			overlay.className = 'youtube-popup';

			overlay.innerHTML = `
				<div class="youtube-popup__content">
					<button class="youtube-popup__close" type="button">
						&times;
					</button>

					<iframe
						src="https://www.youtube.com/embed/${videoId[1]}?autoplay=1"
						title="YouTube video"
						frameborder="0"
						allow="autoplay; encrypted-media; picture-in-picture"
						allowfullscreen>
					</iframe>
				</div>
			`;

			document.body.appendChild(overlay);

			// Закрытие
			const close = overlay.querySelector('.youtube-popup__close');

			close.addEventListener('click', closePopup);

			overlay.addEventListener('click', function (e) {
				if (e.target === overlay) {
					closePopup();
				}
			});

			function closePopup() {
				overlay.remove();
			}
		});

	});

});
document.addEventListener('DOMContentLoaded', function () {

	const selects = document.querySelectorAll('.order__select');

	selects.forEach(select => {

		const head = select.querySelector('.order__select-head');
		const value = select.querySelector('.order__select-head span');
		const options = select.querySelectorAll('.order__select-option');

		head.addEventListener('click', function (e) {
			e.stopPropagation();

			selects.forEach(item => {
				if (item !== select) {
					item.classList.remove('is-open');
				}
			});

			select.classList.toggle('is-open');
		});

		options.forEach(option => {
			option.addEventListener('click', function (e) {
				e.stopPropagation();

				value.textContent = this.textContent;
				select.classList.remove('is-open');
			});
		});
	});

	document.addEventListener('click', function () {
		selects.forEach(select => {
			select.classList.remove('is-open');
		});
	});

});
document.addEventListener('DOMContentLoaded', () => {

	// ==========================================
	// NAV BOTTOM — ПОВЕДЕНИЕ ПРИ СКРОЛЛЕ
	// ==========================================

	const navBottom = document.querySelector('.nav__bottom');
	const sideMenu = document.querySelector('.side-menu');
	const sideMenuOverlay = document.querySelector('.side-menu__overlay');

	if (!navBottom) return;


	// ==========================================
	// STEP ДЛЯ SIDE MENU
	// ==========================================

	const updateSideMenuStep = () => {

		const isHideTop = navBottom.classList.contains('hide-top');

		if (sideMenu) {
			sideMenu.classList.toggle('step', isHideTop);
		}

		if (sideMenuOverlay) {
			sideMenuOverlay.classList.toggle('step', isHideTop);
		}

	};


	// ==========================================
	// СКРОЛЛ
	// ==========================================

	window.addEventListener('scroll', () => {

		// Если открыто мобильное меню —
		// не меняем положение nav__bottom
		if (sideMenu && sideMenu.classList.contains('active')) {
			return;
		}


		// Если мы в самом верху страницы
		if (window.scrollY <= 0) {

			navBottom.classList.remove('hide-top');

		} else {

			// В любом другом месте страницы
			navBottom.classList.add('hide-top');

		}


		// Обновляем step
		updateSideMenuStep();

	});


	// ==========================================
	// НАЧАЛЬНОЕ СОСТОЯНИЕ
	// ==========================================

	updateSideMenuStep();

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
	const navBottom = document.querySelector('.nav__bottom');

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
	// STEP ДЛЯ SIDE MENU
	// ==========================================

	const updateSideMenuStep = () => {

		if (!navBottom) return;

		const isHideTop = navBottom.classList.contains('hide-top');

		sideMenu.classList.toggle('step', isHideTop);
		sideMenuOverlay.classList.toggle('step', isHideTop);

	};


	// ==========================================
	// Открытие меню
	// ==========================================

	const openSideMenu = () => {

		// Запоминаем позицию страницы
		scrollPosition = window.scrollY;


		// Открываем меню
		sideMenu.classList.add('active');
		sideMenuBtn.classList.add('active');
		sideMenuOverlay.classList.add('active');


		sideMenuBtn.setAttribute(
			'aria-label',
			'Закрыть меню'
		);


		// Сохраняем состояние hide-top
		if (navBottom) {

			if (navBottom.classList.contains('hide-top')) {

				navBottom.dataset.wasHideTop = 'true';

			} else {

				navBottom.dataset.wasHideTop = 'false';

			}

		}


		// Добавляем step
		updateSideMenuStep();


		// Блокируем прокрутку
		lockScroll();

	};


	// ==========================================
	// Закрытие меню
	// ==========================================

	const closeSideMenu = () => {

		// Закрываем меню
		sideMenu.classList.remove('active');
		sideMenuBtn.classList.remove('active');
		sideMenuOverlay.classList.remove('active');


		sideMenuBtn.setAttribute(
			'aria-label',
			'Открыть меню'
		);


		// Закрываем все dropdown
		sideMenu
			.querySelectorAll('.side-menu__item.active')
			.forEach(item => {

				item.classList.remove('active');

			});


		// Возвращаем прокрутку
		unlockScroll();


		// ==========================================
		// Восстанавливаем hide-top
		// ==========================================

		if (navBottom) {

			if (navBottom.dataset.wasHideTop === 'true') {

				navBottom.classList.add('hide-top');

			} else {

				navBottom.classList.remove('hide-top');

			}

		}


		// Обновляем step
		updateSideMenuStep();


		// Удаляем временное состояние
		if (navBottom) {
			delete navBottom.dataset.wasHideTop;
		}

	};


	// ==========================================
	// Кнопка меню
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

	const sideMenuItems = sideMenu.querySelectorAll(
		'.side-menu__item'
	);


	sideMenuItems.forEach(item => {

		const link = item.querySelector(
			'.side-menu__link'
		);

		const dropdown = item.querySelector(
			'.side-menu__dropdown'
		);


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

		if (e.key !== 'Escape') return;


		if (sideMenu.classList.contains('active')) {

			closeSideMenu();

		}

	});


	// ==========================================
	// НАЧАЛЬНОЕ СОСТОЯНИЕ
	// ==========================================

	updateSideMenuStep();

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
document.addEventListener('DOMContentLoaded', () => {

  // =====================================================
  // HEALING FAQ
  // =====================================================

  const faqBlocks = document.querySelectorAll('.healing-item__block')

  faqBlocks.forEach(block => {

    const text = block.querySelector('small')

    if (!text) return

    // Изначально скрываем текст
    text.style.maxHeight = '0'
    text.style.overflow = 'hidden'
    text.style.marginTop = '0'
    text.style.transition = 'max-height 0.4s ease, margin-top 0.4s ease'

    block.addEventListener('click', () => {

      // Переключаем active
      block.classList.toggle('active')

      // Получаем фактическое состояние ПОСЛЕ переключения
      const isActive = block.classList.contains('active')

      if (isActive) {

        // Открываем
        text.style.maxHeight = text.scrollHeight + 'px'
        text.style.marginTop = '50px'

      } else {

        // Закрываем
        text.style.maxHeight = '0'
        text.style.marginTop = '0'

      }

      // =====================================================
      // HAS-ACTIVE У РОДИТЕЛЬСКОГО FAQ
      // =====================================================

      const faq = block.closest('.healing-item__faq')

      if (faq) {

        const hasActive = faq.querySelector(
          '.healing-item__block.active'
        )

        faq.classList.toggle(
          'has-active',
          !!hasActive
        )

      }

    })

  })

})
document.addEventListener('DOMContentLoaded', () => {

  const areas = document.querySelectorAll('.healing-item__area')

  areas.forEach(area => {

    const blocks = area.querySelectorAll('.prog-item__block')

    if (blocks.length <= 5) return


    // =====================================================
    // СКРЫВАЕМ ЭЛЕМЕНТЫ ПОСЛЕ ПЯТОГО
    // =====================================================

    blocks.forEach((block, index) => {

      if (index >= 5) {
        block.style.display = 'none'
      }

    })


    // =====================================================
    // СОЗДАЁМ КНОПКУ
    // =====================================================

    const button = document.createElement('button')

    button.type = 'button'
    button.classList.add('healing-item__more')
    button.textContent = 'Показать ещё'


    area.appendChild(button)


    // =====================================================
    // КЛИК ПО КНОПКЕ
    // =====================================================

    button.addEventListener('click', () => {

      const isOpen = area.classList.contains('active')


      if (isOpen) {

        // =================================================
        // СКРЫВАЕМ
        // =================================================

        blocks.forEach((block, index) => {

          if (index >= 5) {
            block.style.display = 'none'
          }

        })

        area.classList.remove('active')

        button.textContent = 'Показать ещё'

      } else {

        // =================================================
        // ПОКАЗЫВАЕМ
        // =================================================

        blocks.forEach((block, index) => {

          if (index >= 5) {
            block.style.display = ''
          }

        })

        area.classList.add('active')

        button.textContent = 'Скрыть'

      }

    })

  })

})
document.addEventListener('DOMContentLoaded', () => {

  const timeButtons = document.querySelectorAll('.order-healing__time a')
  const checkboxes = document.querySelectorAll('.order-healing__checkbox')

  if (!timeButtons.length || !checkboxes.length) return

  function showRange(range) {
    checkboxes.forEach(checkbox => {
      if (checkbox.dataset.range === range) {
        checkbox.style.display = ''
      } else {
        checkbox.style.display = 'none'
      }
    })
  }

  timeButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault()

      timeButtons.forEach(item => {
        item.classList.remove('active')
      })

      button.classList.add('active')

      showRange(button.dataset.time)
    })
  })

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {

      const area = checkbox.closest('.order-healing__area')

      if (!area) return

      const currentScroll = area.scrollLeft

      requestAnimationFrame(() => {
        area.scrollLeft = currentScroll
      })

    })
  })

  const activeButton = document.querySelector('.order-healing__time a.active')

  if (activeButton) {
    showRange(activeButton.dataset.time)
  }

})
document.addEventListener('DOMContentLoaded', () => {

  const specs = document.querySelectorAll('.doc-item__spec')

  specs.forEach(spec => {

    const items = spec.querySelectorAll('li')

    // Если 8 или меньше — кнопку не создаём
    if (items.length <= 8) return


    // =====================================================
    // СКРЫВАЕМ ЭЛЕМЕНТЫ ПОСЛЕ ВОСЬМОГО
    // =====================================================

    items.forEach((item, index) => {

      if (index >= 8) {
        item.style.display = 'none'
      }

    })


    // =====================================================
    // СОЗДАЁМ КНОПКУ
    // =====================================================

    const button = document.createElement('button')

    button.type = 'button'
    button.classList.add('healing-item__more')
    button.textContent = 'Развернуть'

    spec.appendChild(button)


    // =====================================================
    // КЛИК ПО КНОПКЕ
    // =====================================================

    button.addEventListener('click', () => {

      const isOpen = spec.classList.contains('active')


      if (isOpen) {

        // =================================================
        // СКРЫВАЕМ
        // =================================================

        items.forEach((item, index) => {

          if (index >= 8) {
            item.style.display = 'none'
          }

        })

        spec.classList.remove('active')

        button.textContent = 'Развернуть'


      } else {

        // =================================================
        // ПОКАЗЫВАЕМ
        // =================================================

        items.forEach((item, index) => {

          if (index >= 8) {
            item.style.display = ''
          }

        })

        spec.classList.add('active')

        button.textContent = 'Скрыть'

      }

    })

  })

})
document.addEventListener('DOMContentLoaded', () => {

  const links = document.querySelectorAll('.go_to')

  links.forEach(link => {

    link.addEventListener('click', event => {

      const href = link.getAttribute('href')

      if (!href || href === '#') return

      const target = document.querySelector(href)

      if (!target) return

      event.preventDefault()

      const offset = 110
      const targetPosition = target.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: targetPosition - offset,
        behavior: 'smooth'
      })

    })

  })

})
document.addEventListener('DOMContentLoaded', () => {

  const panes = document.querySelectorAll('.tabs__pane')
  const calcInfos = document.querySelectorAll('.calc__info')
  const calcDeleteButtons = document.querySelectorAll('.calc__delete')

  if (!panes.length) return


  function getTotalSelected() {

    let total = 0

    panes.forEach(pane => {
      total += pane.querySelectorAll('.calc__block.active').length
    })

    return total
  }


  function updateInfo() {

    const total = getTotalSelected()
    const totalSum = total * 10

    calcInfos.forEach(calcInfo => {

      const selectedNumber = calcInfo.querySelector('.calc__selected span')
      const sum = calcInfo.querySelector('.calc__sum span')

      if (!total) {
        calcInfo.style.display = 'none'
      } else {
        calcInfo.style.display = ''
      }

      if (selectedNumber) {
        selectedNumber.textContent = total
      }

      if (sum) {
        sum.textContent = `${totalSum} ₽`
      }

    })
  }


  function updateCurrentPane(pane) {

    const blocks = pane.querySelectorAll('.calc__block.active')
    const selectedList = pane.querySelector('.calc__selected-list')
    const clearButton = pane.querySelector('.calc__clear')

    if (selectedList && clearButton) {

      selectedList.innerHTML = ''

      blocks.forEach(block => {

        const calcItem = block.closest('.calc__item')
        const title = calcItem?.querySelector('h2')

        if (!title) return

        const selectedItem = document.createElement('button')

        selectedItem.type = 'button'
        selectedItem.classList.add('calc__selected-item')
        selectedItem.textContent = title.textContent.trim()

        selectedList.appendChild(selectedItem)

        selectedItem.addEventListener('click', () => {

          block.classList.remove('active')

          updateCurrentPane(pane)

        })

      })


      if (blocks.length) {
        selectedList.style.display = 'flex'
        clearButton.style.display = 'block'
      } else {
        selectedList.style.display = 'none'
        clearButton.style.display = 'none'
      }

    }

    updateInfo()
  }


  panes.forEach(pane => {

    const calcWrap = pane.querySelector('.calc__wrap')
    const searchForm = pane.querySelector('.nav__search')

    if (!calcWrap || !searchForm) return

    const calcBlocks = calcWrap.querySelectorAll('.calc__block')

    if (!calcBlocks.length) return


    const selectedList = document.createElement('div')

    selectedList.classList.add('calc__selected-list')
    selectedList.style.display = 'none'

    searchForm.before(selectedList)


    const clearButton = document.createElement('button')

    clearButton.type = 'button'
    clearButton.classList.add('calc__clear')
    clearButton.textContent = 'Очистить всё'

    clearButton.style.display = 'none'

    selectedList.after(clearButton)


    calcBlocks.forEach(block => {

      block.addEventListener('click', () => {

        if (block.classList.contains('active')) {
          block.classList.remove('active')
        } else {
          block.classList.add('active')
        }

        updateCurrentPane(pane)

      })

    })


    clearButton.addEventListener('click', () => {

      calcBlocks.forEach(block => {
        block.classList.remove('active')
      })

      updateCurrentPane(pane)

    })

  })


  calcDeleteButtons.forEach(calcDelete => {

    calcDelete.addEventListener('click', event => {

      event.preventDefault()

      panes.forEach(pane => {

        const calcBlocks = pane.querySelectorAll('.calc__block')

        calcBlocks.forEach(block => {
          block.classList.remove('active')
        })

        updateCurrentPane(pane)

      })

      updateInfo()

    })

  })


  panes.forEach(pane => {
    updateCurrentPane(pane)
  })

  updateInfo()

})
// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll("img.svg");

  svgImages.forEach((img, index) => {
    const imgURL = img.getAttribute("src");

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "image/svg+xml");
        const svg = xmlDoc.querySelector("svg");

        if (!svg) return;

        // Делаем все внутренние ID уникальными
        const idMap = {};

        svg.querySelectorAll("[id]").forEach(element => {
          const oldId = element.id;
          const newId = `${oldId}-${index}`;

          idMap[oldId] = newId;
          element.id = newId;
        });

        // Обновляем ссылки на изменённые ID
        svg.querySelectorAll("*").forEach(element => {
          Array.from(element.attributes).forEach(attr => {
            let value = attr.value;

            Object.entries(idMap).forEach(([oldId, newId]) => {
              value = value
                .replaceAll(`url(#${oldId})`, `url(#${newId})`)
                .replaceAll(`#${oldId}`, `#${newId}`);
            });

            element.setAttribute(attr.name, value);
          });
        });

        // Перенос ID самого img
        if (img.id) {
          svg.setAttribute("id", img.id);
        }

        // Перенос классов
        const classes = img.getAttribute("class");

        if (classes) {
          svg.setAttribute("class", `${classes} replaced-svg`);
        }

        svg.removeAttribute("xmlns:a");

        // Добавляем viewBox
        if (
          !svg.getAttribute("viewBox") &&
          svg.getAttribute("height") &&
          svg.getAttribute("width")
        ) {
          svg.setAttribute(
            "viewBox",
            `0 0 ${svg.getAttribute("width")} ${svg.getAttribute("height")}`
          );
        }

        img.replaceWith(svg);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});
