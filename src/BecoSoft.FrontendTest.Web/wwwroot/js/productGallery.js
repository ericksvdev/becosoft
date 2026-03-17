(function ($) {
  "use strict";

  function normalizeIndex(index, total) {
    if (total <= 0) return 0;
    if (index < 0) return total - 1;
    if (index >= total) return 0;
    return index;
  }

  $(function () {
    $("[data-product-gallery]").each(function () {
      const $gallery = $(this);
      const $images = $gallery.find("[data-gallery-image]");
      const $thumbButtons = $gallery.find("[data-gallery-thumb]");
      const $dots = $gallery.find("[data-gallery-dot]");

      if (!$images.length || !$thumbButtons.length) return;

      const total = $images.length;
      let currentIndex = 0;
      let touchStartX = 0;
      let touchEndX = 0;
      const SWIPE_THRESHOLD = 50;

      function render(index) {
        currentIndex = normalizeIndex(index, total);

        $images.addClass("d-none");
        $images.eq(currentIndex).removeClass("d-none");

        $thumbButtons.removeClass("is-active").attr("aria-pressed", "false");
        $thumbButtons
          .eq(currentIndex)
          .addClass("is-active")
          .attr("aria-pressed", "true");

        $dots.removeClass("is-active");
        $dots.eq(currentIndex).addClass("is-active");
      }

      // Thumbnail click
      $gallery.on("click", "[data-gallery-thumb]", function () {
        const selectedIndex = Number($(this).data("image-index"));
        if (!isNaN(selectedIndex)) render(selectedIndex);
      });

      // Arrow click
      $gallery.on("click", "[data-gallery-action]", function () {
        const action = $(this).data("gallery-action");
        render(action === "prev" ? currentIndex - 1 : currentIndex + 1);
      });

      // Keyboard navigation
      $gallery.on("keydown", function (e) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          render(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          render(currentIndex + 1);
        }
      });

      // Touch swipe
      $gallery.on("touchstart", function (e) {
        touchStartX = e.originalEvent.changedTouches[0].screenX;
      });

      $gallery.on("touchend", function (e) {
        touchEndX = e.originalEvent.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) >= SWIPE_THRESHOLD) {
          render(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        }
      });
    });
  });
})(jQuery);
