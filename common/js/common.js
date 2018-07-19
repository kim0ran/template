/*--------------------------------------------------------------------
 common.js
----------------------------------------------------------------------*/

(function(window, undefined) {

  var App = {
    global: {},
    fn: {},
    ui: {},
    utils: {},
    views: {}
  };
  window.APP = App;

})(window);

(function(App, window, decument, undefined) {


/* global
------------------------------------------------------------*/

  App.global = {

  };


/* fn
------------------------------------------------------------*/

  App.fn = {

  };


/* ui
------------------------------------------------------------*/

  App.ui = {

  };


/* utils
------------------------------------------------------------*/

  App.utils = {

  };


/* views
------------------------------------------------------------*/

  /**
   * ページ
   */
  App.views.PageView = (function() {
    var constructor = function(el) {
      this.$el = {};
      this.$anchor = {};
      this.$imgBtn = {};
      this.isAnimate = false;
      this.scrollSpeed = 500;
      this.init(el);
      return this;
    };
    var proto = constructor.prototype;
    proto.init = function(el) {
      this.setEl(el);
      this.setEvents();
      return this;
    };
    proto.setEl = function(el) {
      this.$el = $(el);
      this.$anchor = this.$el.find('a[href^="#"]');
      this.$imgBtn = this.$el.find('.btn');
      return this;
    };
    proto.setEvents = function() {
      var that = this;
      this.$anchor.on('click', function(e) {
        e.preventDefault();
        if(!that.isAnimate) {
          that.smoothScroll($(this).attr('href'));
        }
        return false;
      });
      this.$imgBtn.hover(function() {
        that.imageRollover(this);
      }, function() {
        that.imageRollover(this);
      });
      $(window).on('scroll', function() {
        if(!that.isAnimate) {
          that.onScroll($(window).scrollTop());
          that.isAnimate = false;
        }
      });
      $(window).on('resize', function() {
        that.onResize();
      });
      return this;
    };
    proto.smoothScroll = function(href) {
      var $target = $(href === '#' || href === '' ? 'html' : href);
      if($target.length > 0) {
        var position = $target.offset().top;
        $('html, body').animate({
          scrollTop: position
        }, this.scrollSpeed, 'swing');
      }
      return this;
    };
    proto.imageRollover = function(that) {
      var $that = $(that);
      var imgSrc = $that.attr('src');
      var imgPath = imgSrc.split('/');
      var imgFile = imgPath[imgPath.length -1];
      $that.attr('src', (imgFile.indexOf('_on') == -1) ? imgSrc.replace(/(\.)(gif|jpg|png)/i, '_on$1$2') : imgSrc.replace(/(\_on)(.)(gif|jpg|png)/i, '$2$3'));
      return this;
    };
    proto.onScroll = function(scrollTop) {
      this.isAnimate = true;
      return this;
    };
    proto.onResize = function() {
      return this;
    };
    return constructor;
  })();

})(APP, window, document);
$(function() {

  $(window).load(function() {

    /* ページ */
    new App.views.PageView('#PageView');

  });

});