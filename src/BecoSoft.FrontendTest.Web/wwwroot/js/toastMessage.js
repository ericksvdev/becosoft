(function ($) {
  "use strict";

  const VALID_TYPES = ["success", "error"];

  const DEFAULTS = {
    duration: 3000,
    sticky: false,
  };

  function ensureContainer() {
    let $container = $("#toast-container");

    if (!$container.length) {
      $container = $('<div id="toast-container"></div>').appendTo("body");
    }

    return $container;
  }

  function createToast(type, message, options) {
    const invalidType = VALID_TYPES.indexOf(type) === -1;
    if (invalidType) {
      type = "success";
    }

    const config = $.extend({}, DEFAULTS, options);
    const $container = ensureContainer();
    let closed = false;
    let autoCloseTimer = null;

    const $toast = $("<div>", {
      class: "toast-message toast-message--" + type,
    });

    const $content = $("<span>", {
      class: "toast-message__text",
      text: message,
    });

    const $close = $("<button>", {
      class: "toast-message__close",
      html: '<i class="fas fa-times"></i>',
      "aria-label": "Close",
    });

    $toast.append($content).append($close);
    $container.append($toast);

    $toast[0].offsetHeight;
    $toast.addClass("toast-message--visible");

    $(document).trigger("toastShown", {
      type: type,
      message: message,
      element: $toast,
    });

    function close() {
      if (closed) return;
      closed = true;

      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }

      $toast.removeClass("toast-message--visible");

      const fallback = setTimeout(remove, 400);

      $toast.one("transitionend", function () {
        clearTimeout(fallback);
        remove();
      });
    }

    function remove() {
      $toast.remove();
      $(document).trigger("toastClosed", { type: type, message: message });
    }

    $close.on("click", close);

    if (!config.sticky) {
      autoCloseTimer = setTimeout(close, config.duration);
    }

    return $toast;
  }

  $.toastMessage = function (type, message, options) {
    return createToast(type, message, options);
  };
})(jQuery);
