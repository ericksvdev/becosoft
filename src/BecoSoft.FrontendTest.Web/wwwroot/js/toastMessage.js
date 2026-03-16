(function ($) {
  "use strict";

  const DEFAULTS = {
    duration: 3000,
    sticky: false,
  };

  let containerCreated = false;

  function ensureContainer() {
    if (!containerCreated) {
      $("body").append('<div id="toast-container"></div>');
      containerCreated = true;
    }

    return $("#toast-container");
  }

  function createToast(type, message, options) {
    const config = $.extend({}, DEFAULTS, options);

    const $container = ensureContainer();

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
      $toast.removeClass("toast-message--visible");

      $toast.one("transitionend", function () {
        $toast.remove();
        $(document).trigger("toastClosed", { type: type, message: message });
      });
    }

    $close.on("click", close);

    if (!config.sticky) {
      setTimeout(close, config.duration);
    }

    return $toast;
  }

  $.toastMessage = function (type, message, options) {
    return createToast(type, message, options);
  };
})(jQuery);
