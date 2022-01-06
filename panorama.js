// Panorama extension, https://github.com/GiovanniSalmeri/yellow-panorama

"use strict";
document.addEventListener("DOMContentLoaded", function() {
    /**
     * @fileoverview dragscroll - scroll area by dragging
     * @version 0.0.8
     * 
     * @license MIT, see http://github.com/asvd/dragscroll
     * @copyright 2015 asvd <heliosframework@gmail.com> 
     */
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define(['exports'], factory);
        } else if (typeof exports !== 'undefined') {
            factory(exports);
        } else {
            factory((root.dragscroll = {}));
        }
    }(this, function (exports) {
        var _window = window;
        var _document = document;
        var mousemove = 'mousemove';
        var mouseup = 'mouseup';
        var mousedown = 'mousedown';
        var EventListener = 'EventListener';
        var addEventListener = 'add'+EventListener;
        var removeEventListener = 'remove'+EventListener;
        var newScrollX, newScrollY;

        var dragged = [];
        var reset = function(i, el) {
            for (i = 0; i < dragged.length;) {
                el = dragged[i++];
                el = el.container || el;
                el[removeEventListener](mousedown, el.md, 0);
                _window[removeEventListener](mouseup, el.mu, 0);
                _window[removeEventListener](mousemove, el.mm, 0);
            }

            // cloning into array since HTMLCollection is updated dynamically
            dragged = [].slice.call(_document.getElementsByClassName('panorama-sliding'));
            for (i = 0; i < dragged.length;) {
                (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                    (cont = el.container || el)[addEventListener](
                        mousedown,
                        cont.md = function(e) {
                            if (!el.hasAttribute('nochilddrag') ||
                                _document.elementFromPoint(
                                    e.pageX, e.pageY
                                ) == cont
                            ) {
                                pushed = 1;
                                lastClientX = e.clientX;
                                lastClientY = e.clientY;

                                e.preventDefault();
                            }
                        }, 0
                    );

                    _window[addEventListener](
                        mouseup, cont.mu = function() {pushed = 0;}, 0
                    );

                    _window[addEventListener](
                        mousemove,
                        cont.mm = function(e) {
                            if (pushed) {
                                (scroller = el.scroller||el).scrollLeft -=
                                    newScrollX = (- lastClientX + (lastClientX=e.clientX));
                                scroller.scrollTop -=
                                    newScrollY = (- lastClientY + (lastClientY=e.clientY));
                                if (el == _document.body) {
                                    (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                    scroller.scrollTop -= newScrollY;
                                }
                            }
                        }, 0
                    );
                 })(dragged[i++]);
            }
        }

          
        if (_document.readyState == 'complete') {
            reset();
        } else {
            _window[addEventListener]('load', reset, 0);
        }

        exports.reset = reset;
    }));

    // init
    var panorama = document.getElementsByClassName("panorama");
    for (var i = 0; i < panorama.length; i++) {
        var sliding = panorama[i].firstElementChild;
        var panoramaImage = sliding.firstElementChild;
        panorama[i].children[1].addEventListener("click", function(e) {
            var sliding = e.currentTarget.parentElement.firstElementChild;
            var pos = (sliding.firstElementChild.width - sliding.offsetWidth) * (sliding.firstElementChild.dataset.start / 100);
            if ('scrollBehavior' in document.documentElement.style) {
                sliding.scrollTo({left: pos, behavior: "smooth"}); // smooth does not work in webkit
            } else { // Safari
                sliding.scrollLeft = pos;
            }
        });
        if (panoramaImage.complete) {
            panoramaImage.style.width = (panoramaImage.naturalWidth / 10) + "%"; // supposes a max width of 1000px
            sliding.scrollLeft = (panoramaImage.width - sliding.offsetWidth) * (panoramaImage.dataset.start / 100);
        } else { // webkit, sometimes...
            panoramaImage.onload = function() {
                this.style.width = (this.naturalWidth / 10) + "%";
                this.parentElement.scrollLeft = (this.width - this.parentElement.offsetWidth) * (this.dataset.start / 100);
            }
        }
    }
});
