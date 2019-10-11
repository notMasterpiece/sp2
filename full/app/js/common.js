$(function () {
    // global
    var windowHeight = $(window).outerHeight(true),
    body = $('body'),
    overlay = $('.sp-block--overlay');

    Onload();

    $('section.js-scroll').height(windowHeight);


    var catalogImg = $('.catalog-info').data('img');
    if (catalogImg) {
        $('.catalog-info').append('<img class="catalog-info--img" src="'+ catalogImg +'" />')
    }






    var swiper = new Swiper('.square-slider', {
        slidesPerView: 'auto',
        freeMode: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    var swiper2 = new Swiper('.swiper-catalog-item', {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });



    // Onload
    function Onload() {

        headerMenu();
        initTabs();
        ajaxFancybox();
        initFullpage();
        catalogSlider();
        catalogMenu();
        initChosen();
        initSearch();

    }

    function initChosen() {
        $(".sp-select").chosen({
            placeholder_text_single: "Select an option",
            no_results_text: "Oops, nothing found!",
            disable_search_threshold: 10
        });
    }


    function catalogSlider() {
        // $('.catalog-item--slider').owlCarousel({
        //     items: 1,
        //     loop: true,
        //     nav:false,
        //     autoplay:true,
        //     autoplayTimeout: 10000,
        //     autoplaySpeed: 800,
        //     dots: true,
        // })
    }

    // function sixItemsSliders() {
    //     $('.square-slider').owlCarousel({
    //         items: 6,
    //         loop: false,
    //         nav:false,
    //         dots: false,
    //         margin: 20
    //     })
    // }


    function initSearch() {
        $('.show-search-form').unbind('click').on('click', function() {
            body.addClass('overlay');
            overlay.show();
            $('.search-form').addClass('search-form--open');
        });


        $('.search-form input').unbind('keypress').on('keypress', function() {
            $('.search-form--result').show();
        });

        $('.sp-block--overlay').unbind('click').on('click', function() {
            body.removeClass('overlay');
            overlay.hide();
            $('.search-form--result').hide(0, function () {
                $('.search-form').removeClass('search-form--open');
            });

        });

    }


    function catalogMenu() {
        var catalogList = $('.catalog-list');

        $('.change-catalog-view').unbind('click').on('click', function() {
            var view = $(this).data('view');

            if (view === 'row') {
                catalogList.addClass('catalog-list--row');
            } else {
                catalogList.removeClass('catalog-list--row');
            }
            $(this).addClass('active').siblings().removeClass('active');
        });
    }



    function initFullpage() {
       $('section.js-scroll').each(function () {
            if ($(this).outerHeight() < windowHeight) {
                $(this).height(windowHeight);
            }
       });

        if (window.location.pathname === '/') {
            $('.js-scroll').scrollSections();
        }

    }

    function headerMenu() {
        var searchBlock = $('.search-block');

        $('.header-middle--right').unbind('click').on('click', function() {
            searchBlock.show();
        });
        $('.search-block--close').unbind('click').on('click', function() {
            searchBlock.hide();
        });


        $('.second-level').unbind('mouseleave').on('mouseleave', function() {
            $(".toggle-mnu").removeClass("on");
        });

        $(".toggle-mnu").unbind('click').on('click', function() {
            $(this).toggleClass("on");
            return false;
        });

        $('.header-menu .has-child').unbind('click').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).toggleClass('active');
        })
    }

    function initTabs() {
        $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.sp-tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });
    }



    function ajaxFancybox() {
        if( $('.js-ajax') ) {
            $(".js-ajax").fancybox({
                type: "ajax",
                maxWidth    : 800,
                maxHeight   : 500,
                padding     : '0',
                width       : '100%',
                height      : '100%',
                afterShow: function() {},
                beforeClose: function () {}

            })
        }
    }




    // Группы объектов
    var groups = [
        {
            name: "Известные памятники",
            style: "islands#redIcon",
            items: [
                {
                    center: [55.755814, 37.617635],
                    name: "Москва",
                    descr: "это просто описание"
                },
                {
                    center: [59.939095, 30.315868],
                    name: "Санк-Петербург"
                },
                {
                    center: [55.798551, 49.106324],
                    name: "Казань"
                },
                {
                    center: [45.035566, 38.974711],
                    name: "Краснодар"
                },
                {
                    center: [54.707390, 20.507307],
                    name: "Калининград"
                },
                {
                    center: [43.115536, 131.885485],
                    name: "Владивосток"
                },
                {
                    center: [51.661535, 39.200287],
                    name: "Воронеж"
                },
                {
                    center: [62.028103, 129.732663],
                    name: "Якутск"
                },
                {
                    center: [51.768199, 55.096955],
                    name: "Оренбург"
                },
                {
                    center: [53.243325, 34.363731],
                    name: "Брянск"
                },
                {
                    center: [56.852593, 53.204843],
                    name: "Ижевск"
                },
                {
                    center: [53.195538, 50.101783],
                    name: "Самара"
                },
            ]},
    ];


    ymaps.ready(init);

    function init() {

        if (!$('.ya-map').length) return;

        // Создание экземпляра карты.
        var myMap = new ymaps.Map('ya-map', {
                center: [50.443705, 30.530946],
                zoom: 30,
                controls: ['smallMapDefaultSet'],
            }, {
                searchControlProvider: 'yandex#search'
            }),
            // Контейнер для меню.
            menu = $('<ul></ul>');

        for (var i = 0, l = groups.length; i < l; i++) {
            createMenuGroup(groups[i]);
        }

        function createMenuGroup (group) {
            // Пункт меню.
            var menuItem = $('<a href="#">' + group.name + '</a>'),
                // Коллекция для геообъектов группы.
                collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
                // Контейнер для подменю.
                submenu = $('<ul class="submenu"></ul>');

            // Добавляем коллекцию на карту.
            myMap.geoObjects.add(collection);
            // Добавляем подменю.
            menuItem
                .append(submenu)
                // Добавляем пункт в меню.
                .appendTo(menu)
                // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
                .find('a')
                .bind('click', function () {
                    if (collection.getParent()) {
                        myMap.geoObjects.remove(collection);
                        submenu.hide();
                    } else {
                        myMap.geoObjects.add(collection);
                        submenu.show();
                    }
                });
            for (var j = 0, m = group.items.length; j < m; j++) {
                createSubMenu(group.items[j], collection, submenu);
            }
        }

        function createSubMenu (item, collection, submenu) {
            // Пункт подменю.
            var submenuItem = $('<li><a href="#">' + item.name + item.descr + '</a></li>'),
                // Создаем метку.
                placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });

            // Добавляем метку в коллекцию.
            collection.add(placemark);
            // Добавляем пункт в подменю.
            submenuItem
                .appendTo(submenu)
                // При клике по пункту подменю открываем/закрываем баллун у метки.
                .find('a')
                .bind('click', function () {
                    if (!placemark.balloon.isOpen()) {
                        placemark.balloon.open();
                    } else {
                        placemark.balloon.close();
                    }
                    return false;
                });
        }

        // Добавляем меню в тэг BODY.
        // menu.appendTo($('body'));
        // Выставляем масштаб карты чтобы были видны все группы.
        myMap.setBounds(myMap.geoObjects.getBounds());
    }


});
