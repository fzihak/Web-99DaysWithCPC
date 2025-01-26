
// profile.init


// 
// accordion
// 
document.querySelectorAll('[data-tw-accordion="collapse"]').forEach(function (elem) {
    elem.querySelectorAll(".accordion-item").forEach(function (item) {
        item.querySelector(".accordion-header").addEventListener("click", function (event) {
            item.querySelector(".accordion-header").classList.toggle("active");

            if (item.querySelector(".accordion-header").classList.contains("active") != true) {
                item.querySelector(".accordion-body").classList.remove("block")
                item.querySelector(".accordion-body").classList.add("hidden")
            } else {
                dismissCollapse(elem)
                item.querySelector(".accordion-body").classList.add("block")
                item.querySelector(".accordion-body").classList.remove("hidden")
                if (item.querySelector(".accordion-body").classList.contains("block")) {
                    item.querySelector(".accordion-header").classList.add("active")
                } else {
                    item.querySelector(".accordion-header").classList.remove("active")
                }
                event.stopPropagation();
            }
        });
    });
});

function dismissCollapse(test) {
    Array.from(test.querySelectorAll(".accordion-body")).forEach(function (item) {
        item.classList.remove("block")
        item.classList.add("hidden")
    });
    Array.from(test.querySelectorAll(".accordion-header")).forEach(function (item) {
        item.classList.remove("active")
    });
}
