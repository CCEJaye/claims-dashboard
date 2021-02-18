(function (Comps, $) {
    
    Comps.init = () => {
        $(".selectBtn").on("change", function() {
            const childCount = $(this).children("option").length;
            const selected = $(this).val();
            let value = "";
            if (!Array.isArray(selected)) {
                value = $(this).children(`option[value="` + selected + `"]`).html() || selected;
            } else if (selected.length === 1) {
                value = selected[0] === "none" ? "None" : selected[0];
            } else if (selected.length > 1) {
                value = selected.length + " selected";
            } else {
                value = "None";
            }
            $(this).attr("size", Math.min(childCount, 6));
            $(this).prop("disabled", childCount < 2).siblings("span").html(value);
            if (childCount < 2) {
                $(this).siblings("span, label").addClass("disabled");
            } else {
                $(this).siblings("span, label").removeClass("disabled");
            }
        });

        $(".selectBtn:not([multiple])").on("change", function() {
            $(this).trigger("blur");
        });

        $(".selectBtn").on("focus", function() {
            const fromTop = $(this).parent().offset().top - $(window).scrollTop() + $(this).parent().height();
            const fromBottom = $(window).height() - fromTop;
            if (fromTop < fromBottom) {
                $(this).addClass("flipY");
            } else {
                $(this).removeClass("flipY");
            }
        });

        $(".valueBtn[data-on][data-off]").on("click", function() {
            const isOn = $(this).data("is-on");
            $(this).children("span:last-of-type").html($(this).data(isOn ? "off" : "on"));
            $(this).data("is-on", !isOn);
        });
    }

}(window.Comps = window.Comps || {}, jQuery));