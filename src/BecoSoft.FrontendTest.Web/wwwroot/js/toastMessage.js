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
      $container = $('<div id="toast-container" class="d-flex flex-column"></div>').appendTo("body");
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
      class: "toast-message toast-message--" + type + " d-flex align-items-center justify-content-between bg-white rounded shadow-sm",
    });

    const $content = $("<span>", {
      class: "toast-message__text flex-grow-1 small",
      text: message,
    });

    const $close = $("<button>", {
      class: "toast-message__close border-0 bg-transparent text-muted ml-3 px-1 py-0",
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
