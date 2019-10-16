$(function () {
    // global
    var windowHeight = $(window).outerHeight(true),
    body = $('body'),
    overlay = $('.sp-block--overlay');

    Onload();

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




    var swiper4 = new Swiper('.sp-object--slider', {
        slidesPerView: 3,
        // freeMode: true,
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
        catalogMenu();
        initChosen();
        initSearch();

    }

    function initChosen() {
        if (!$('.sp-select')) return;

        $(".sp-select").chosen({
            placeholder_text_single: "Select an option",
            no_results_text: "Oops, nothing found!",
            disable_search_threshold: 10
        });
    }


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
            console.log($(window).outerWidth());
            if ( $(window).outerWidth() > 1350 ) {
                $('.js-scroll').scrollSections();
            }
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

        var swiper3 = new Swiper('.tabs__caption', {
            slidesPerView: 'auto',
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });



        $('.tabs__caption').on('click', '.tabs__li:not(.active)', function() {
            $(this)
                .closest('.sp-tabs').find('.tabs__li').removeClass('active')
                .closest('div.sp-tabs').find('div.tabs__content').removeClass('active').eq($(this).closest('.swiper-slide').index()).addClass('active');
            $(this)
                .addClass('active')
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


    ymaps.ready(['projection.LambertConformalConic']).then(function init() {

        // Создаем проекцию Ламберта.
        var LAMBERT_PROJECTION = new ymaps.projection.LambertConformalConic();

        // Создаем карту.
        var map = new ymaps.Map('ya-map', {
            center: [65, 100],
            zoom: 3,
            type: null,
            controls: ['zoomControl']
        }, {
            minZoom: 1,
            // Задаем проекцию Ламберта.
            projection: LAMBERT_PROJECTION
        });
        map.controls.get('zoomControl').options.set({size: 'small'});

        // Добавляем фон.
        var pane = new ymaps.pane.StaticPane(map, {
            zIndex: 100, css: {
                width: '100%', height: '100%', backgroundColor: '#F5F3F3'
            }
        });
        map.panes.append('greyBackground', pane);

        // Загружаем и добавляем регионы России на карту.
        ymaps.borders.load('RU', {
            lang: 'ru'
        }).then(function (result) {
            regions = new ymaps.GeoObjectCollection(null, {
                fillColor: '#e5dac6',
                strokeColor: '#e5dac6',
                hasHint: false,
                cursor: 'default'
            });
            for (var i = 0; i < result.features.length; i++) {
                regions.add(new ymaps.GeoObject(result.features[i]));
            }

            map.geoObjects.add(regions);
        });



        var places = [
            {
                'lat':'55.72218176576286',
                'lng':'37.58569467028812',
                'dealer':true,
                'title':'г. Балашиха, ул. Советская, д. 56, первый этаж',
                'content':'<h4 style="margin-right:20px;"><a href="/contacts/g_balashiha_pr_lenina_d_10a.html">г. Балашиха, ул. Советская, д. 56, первый этаж</a></h4><p>Тел.: <b class="format-phone" data-phone="74956658050">74956658050</b><br/><b class="format-phone" data-phone="79250046777">79250046777</b></p><p>Эл. почта: <a href="mailto: s.kalugin@cdek.ru "> s.kalugin@cdek.ru </a></p><p>Режим работы:<br />Пн-Пт – с 10:00 до 19:00<br />\r\nСб – с 10:00 до 16:00</p>'
            },
            {
                'lat':'54.660232238738836',
                'lng':'56.21095406970218',
                'title':'г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;',
                'content':'<h4 style="margin-right:20px;"><a href="/contacts/g_vidnoe_ul_donbasskaya_d_2.html">г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;</a></h4><p>Тел.: <b class="format-phone" data-phone="79160705658">79160705658</b></p><p>Эл. почта: <a href="mailto:a.lundin@cdek.ru">a.lundin@cdek.ru</a></p><p>Режим работы:<br />Пн-Пт – с 10:00 до 19:00<br />\r\nСб – с 10:00 до 16:00<br />\r\nВс – выходной день </p>'
            },
            {
                'lat':'67.51927129018448',
                'lng':'63.99305093249515',
                'dealer':true,
                'title':'г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;',
                'content':'<h4 style="margin-right:20px;"><a href="/contacts/g_vidnoe_ul_donbasskaya_d_2.html">г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;</a></h4><p>Тел.: <b class="format-phone" data-phone="79160705658">79160705658</b></p><p>Эл. почта: <a href="mailto:a.lundin@cdek.ru">a.lundin@cdek.ru</a></p><p>Режим работы:<br />Пн-Пт – с 10:00 до 19:00<br />\r\nСб – с 10:00 до 16:00<br />\r\nВс – выходной день </p>'
            },
            {
                'lat':'62.07873518307209',
                'lng':'129.94775521716312',
                'title':'г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;',
                'content':'<h4 style="margin-right:20px;"><a href="/contacts/g_vidnoe_ul_donbasskaya_d_2.html">г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;</a></h4><p>Тел.: <b class="format-phone" data-phone="79160705658">79160705658</b></p><p>Эл. почта: <a href="mailto:a.lundin@cdek.ru">a.lundin@cdek.ru</a></p><p>Режим работы:<br />Пн-Пт – с 10:00 до 19:00<br />\r\nСб – с 10:00 до 16:00<br />\r\nВс – выходной день </p>'
            },
            {
                'lat':'54.660232238738836',
                'lng':'56.21095406970218',
                'title':'г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;',
                'content':'<h4 style="margin-right:20px;"><a href="/contacts/g_vidnoe_ul_donbasskaya_d_2.html">г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;</a></h4><p>Тел.: <b class="format-phone" data-phone="79160705658">79160705658</b></p><p>Эл. почта: <a href="mailto:a.lundin@cdek.ru">a.lundin@cdek.ru</a></p><p>Режим работы:<br />Пн-Пт – с 10:00 до 19:00<br />\r\nСб – с 10:00 до 16:00<br />\r\nВс – выходной день </p>'
            },
            {
                'lat':'57.951759839898955',
                'lng':'102.69925820788578',
                'dealer':true,
                'title':'г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;',
                'content':'<h4 style="margin-right:20px;"><a href="/contacts/g_vidnoe_ul_donbasskaya_d_2.html">г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;</a></h4><p>Тел.: <b class="format-phone" data-phone="79160705658">79160705658</b></p><p>Эл. почта: <a href="mailto:a.lundin@cdek.ru">a.lundin@cdek.ru</a></p><p>Режим работы:<br />Пн-Пт – с 10:00 до 19:00<br />\r\nСб – с 10:00 до 16:00<br />\r\nВс – выходной день </p>'
            },
            {
                'lat':'66.6121957616279',
                'lng':'102.22203957995609',
                'title':'г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;',
                'content':'<h4 style="margin-right:20px;"><a href="/contacts/g_vidnoe_ul_donbasskaya_d_2.html">г. Видное, ул. Донбасская д. 2, оф. 3, БЦ &quot;ЮГ&quot;</a></h4><p>Тел.: <b class="format-phone" data-phone="79160705658">79160705658</b></p><p>Эл. почта: <a href="mailto:a.lundin@cdek.ru">a.lundin@cdek.ru</a></p><p>Режим работы:<br />Пн-Пт – с 10:00 до 19:00<br />\r\nСб – с 10:00 до 16:00<br />\r\nВс – выходной день </p>'
            },
        ];

        if (places.length > 0) {
            for (var i = 0; i < places.length; i++) {
                myPlacemark = new ymaps.Placemark([places[i].lat, places[i].lng], {
                    hintContent: places[i].title,
                    balloonContent: places[i].content
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: places[i].dealer ? 'img/icons/orange-mark.svg' : 'img/icons/green-mark.svg',
                    // Размеры метки.
                    iconImageSize: [30, 42],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-5, -38]

                });
                map.geoObjects.add(myPlacemark);
            }
        }


    });



    ymaps.modules.define('projection.LambertConformalConic', [
        'util.defineClass',
        'util.math.cycleRestrict',
        'coordSystem.geo',
        'meta'
    ], function (provide, defineClass, cycleRestrict, CoordSystemGeo, meta) {
        /**
         * @fileOverview
         * Равноугольная коническая проекция Ламберта.
         */

        var latLongOrder = meta.coordinatesOrder != 'longlat';

        /**
         * Создает равноугольную коническую проекцию Ламберта.
         *
         * @name projection.LambertConformalConic
         * @class Равноугольная коническая проекция Ламберта.
         * Учитывает параметр coordorder, заданный при подключении API.
         * @augments IProjection
         */
        function LambertConformalConic() {
            if (ymaps.meta.debug) {
                if (!center[0] || !center[1]) {
                    throw new Error("projection.LambertConformalConic: Некорректные значения параметра center.");
                }
            }

            this._degToRad = function (point) {
                return point * Math.PI / 180;
            };

            // Широта и долгота точки, которая служит началом координат в декартовой системе проекции.
            this._fi0 = this._degToRad(0);
            this._l0 = this._degToRad(-2);

            // Стандартные параллели.
            this._fi1 = this._degToRad(70);
            this._fi2 = this._degToRad(40);
        }

        defineClass(LambertConformalConic, {
            toGlobalPixels: function (point, zoom) {
                if (ymaps.meta.debug) {
                    if (!point) {
                        throw new Error("LambertConformalConic.toGlobalPixels: не передан параметр point");
                    }
                    if (typeof zoom == "undefined") {
                        throw new Error("LambertConformalConic.toGlobalPixels: не передан параметр zoom");
                    }
                }

                // Широта и долгота точки на поверхности Земли.
                var fi = this._degToRad(point[latLongOrder ? 0 : 1]);
                var l = this._degToRad(point[latLongOrder ? 1 : 0]);

                var n = (Math.log(Math.cos(this._fi1) / Math.cos(this._fi2))) / (Math.log(Math.tan(0.25 * Math.PI + 0.5 * this._fi2) / Math.tan(0.25 * Math.PI + 0.5 * this._fi1)));
                var F = (Math.cos(this._fi1) * Math.pow(Math.tan(0.25 * Math.PI + 0.5 * this._fi1), n)) / (n);
                var p = F * Math.pow(1 / Math.tan(0.25 * Math.PI + 0.5 * fi), n);
                var p0 = F * Math.pow(1 / Math.tan(0.25 * Math.PI + 0.5 * this._fi0), n);

                // Декартовы координаты той же точки на проекции.
                var x = p0 - p * Math.cos(n * (l - this._l0));
                var y = p * Math.sin(n * (l - this._l0));

                x = x * 128 * Math.pow(2, zoom);
                y = y * 128 * Math.pow(2, zoom);

                return [x, y];
            },
            // Если вам нужно переводить глобальные пиксельные координаты в широту и долготу, необходимо реализовать
            // метод fromGlobalPixels. Это может понадобиться, например, если вы захотите воспользоваться линейкой.
            fromGlobalPixels: function (point, zoom) {
                if (ymaps.meta.debug) {
                    console.log('projection.LambertConformalConic#fromGlobalPixels не имплементировано');
                }
                return [0, 0];
            },

            isCycled: function () {
                return [false, false];
            },

            getCoordSystem: function () {
                return CoordSystemGeo;
            }
        });

        provide(LambertConformalConic);
    });




});
