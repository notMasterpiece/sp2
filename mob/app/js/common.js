$(function () {
    // global
    var height = $(window).outerHeight(true),
        body = $('body'),
        overlay = $('.sp-block--overlay');

    Onload();

    $('.fullpage section').height(height);


    // Onload
    function Onload() {
        headerMenu();
        initTabs();
        initChosen();
        ajaxFancybox();
        initSearch();

    }


    function initChosen() {
        $(".sp-select").chosen({
            placeholder_text_single: "Select an option",
            no_results_text: "Oops, nothing found!",
            disable_search_threshold: 10
        });
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


    function initSearch() {
        $('.header-middle--search').unbind('click').on('click', function() {
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

    function headerMenu() {

        $(".toggle-mnu").unbind('click').on('click', function() {
            $(this).toggleClass("on");
            $(".header-menu").slideToggle();
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
                .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
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

});