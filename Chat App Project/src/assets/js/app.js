
/********* Alert common js *********/

// alert dismissible
if (document.querySelectorAll('.alert-dismissible')) {
  var alertDismiss = document.querySelectorAll('.alert-dismissible');

  Array.from(alertDismiss).forEach(function (item) {
    item.querySelector(".alert-close").addEventListener('click', function () {
      item.classList.add('hidden');
    });
  });
}



/********* dropdown common js *********/
var dropdownElem = document.querySelectorAll('.dropdown');
var dropupElem = document.querySelectorAll('.dropup');
var dropStartElem = document.querySelectorAll('.dropstart');
var dropendElem = document.querySelectorAll('.dropend');
var isShowDropMenu = false;
var isMenuInside = false;
// dropdown event
dropdownEvent(dropdownElem, 'bottom-start');
// dropup event
dropdownEvent(dropupElem, 'top-start');
// dropstart event
dropdownEvent(dropStartElem, 'left-start');
// dropend event
dropdownEvent(dropendElem, 'right-start');

function dropdownEvent(elem, place) {
  Array.from(elem).forEach(function (item) {
    item.querySelectorAll(".dropdown-toggle").forEach(function (subitem) {
      subitem.addEventListener("click", function (event) {
        subitem.classList.toggle("show");
        var popper = Popper.createPopper(subitem, item.querySelector(".dropdown-menu"), {
          placement: place
        });

        if (subitem.classList.contains("show") != true) {
          item.querySelector(".dropdown-menu").classList.remove("block")
          item.querySelector(".dropdown-menu").classList.add("hidden")
        } else {
          dismissDropdownMenu()
          item.querySelector(".dropdown-menu").classList.add("block")
          item.querySelector(".dropdown-menu").classList.remove("hidden")
          if (item.querySelector(".dropdown-menu").classList.contains("block")) {
            subitem.classList.add("show")
          } else {
            subitem.classList.remove("show")
          }
          event.stopPropagation();
        }

        isMenuInside = false;
      });
    });
  });
}

function dismissDropdownMenu() {
  Array.from(document.querySelectorAll(".dropdown-menu")).forEach(function (item) {
    item.classList.remove("block")
    item.classList.add("hidden")
  });
  Array.from(document.querySelectorAll(".dropdown-toggle")).forEach(function (item) {
    item.classList.remove("show")
  });
  isShowDropMenu = false;
}

// dropdown form
Array.from(document.querySelectorAll(".dropdown-menu")).forEach(function (item) {
  if (item.querySelectorAll("form")) {
    Array.from(item.querySelectorAll("form")).forEach(function (subitem) {
      subitem.addEventListener("click", function (event) {
        if (!isShowDropMenu) {
          isShowDropMenu = true;
        }
      })
    });
  }
});

// data-tw-auto-close
Array.from(document.querySelectorAll(".dropdown-toggle")).forEach(function (item) {
  var elem = item.parentElement
  if (item.getAttribute('data-tw-auto-close') == 'outside') {
    elem.querySelector(".dropdown-menu").addEventListener("click", function () {
      if (!isShowDropMenu) {
        isShowDropMenu = true;
      }
    });
  } else if (item.getAttribute('data-tw-auto-close') == 'inside') {
    item.addEventListener("click", function () {
      isShowDropMenu = true;
      isMenuInside = true;
    });
    elem.querySelector(".dropdown-menu").addEventListener("click", function () {
      isShowDropMenu = false;
      isMenuInside = false;
    });
  }
});

window.addEventListener('click', function (e) {
  if (!isShowDropMenu && !isMenuInside) {
    dismissDropdownMenu();
  }
  isShowDropMenu = false;
});



// Handler that uses various data-* attributes to trigger
// specific actions, mimicing bootstraps attributes
const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

window.addEventListener('click', (ev) => {
  const elm = ev.target;
  if (triggers.includes(elm)) {
    const selector = elm.getAttribute('data-target');
    collapse(selector, 'toggle');
  }
}, false);


const fnmap = {
  'toggle': 'toggle',
  'show': 'add',
  'hide': 'remove'
};
const collapse = (selector, cmd) => {
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach(target => {
    target.classList[fnmap[cmd]]('show');
  });
}


/********* modal common js *********/
// openModal
var modalTrigger = document.querySelectorAll('[data-tw-toggle="modal"]');
var isModalShow = false;
Array.from(modalTrigger).forEach(function (item) {
  item.addEventListener("click", function () {
    var target = this.getAttribute('data-tw-target').substr(1);
    var modalWindow = document.getElementById(target);

    if (modalWindow.classList.contains("hidden")) {
      modalWindow.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      modalWindow.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
    isModalShow = false;

    if (item.getAttribute('data-tw-backdrop') == 'static') {
      isModalShow = true;
    }
  });
});

// closeButton
var closeButton = document.querySelectorAll('[data-tw-dismiss="modal"]');
Array.from(closeButton).forEach(function (subElem) {
  subElem.addEventListener("click", function () {

    var modalWindow = subElem.closest(".modal");
    if (modalWindow.classList.contains("hidden")) {
      modalWindow.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      modalWindow.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });
});


// 
// tabs
// 

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and content
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to the clicked button and corresponding content
    button.classList.add('active');
    tabContents[index].classList.add('active');
  });
});


(function () {

  'use strict';

  function initModeSetting() {
    var body = document.body;
    var lightDarkBtn = document.querySelectorAll('.light-dark-mode');
    if (lightDarkBtn) {
      lightDarkBtn.forEach(function (item) {
        item.addEventListener('click', function (event) {
          if (body.hasAttribute("data-mode") && body.getAttribute("data-mode") == "dark") {
            body.setAttribute('data-mode', 'light');
            sessionStorage.setItem("data-layout-mode", "light");
          } else {
            body.setAttribute('data-mode', 'dark');
            sessionStorage.setItem("data-layout-mode", "dark");
          }
        });
      });
    }

    if (sessionStorage.getItem("data-layout-mode") && sessionStorage.getItem("data-layout-mode") == "light") {
      body.setAttribute('data-mode', 'light');
    } else if (sessionStorage.getItem("data-layout-mode") == "dark") {
      body.setAttribute('data-mode', 'dark');
    }
  }

  function init() {
    initModeSetting();
  }

  init();

})();


// ltr-rtl
var isChangeMode = document.getElementById("ltr-rtl");
if (isChangeMode) {
  isChangeMode.addEventListener("click", function (e) {
    var themeMode = document.documentElement.getAttribute("dir");
    if (themeMode == "ltr") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }

    swiperDir();
  });
}


// Swicher

function toggleSwitcher() {
  var i = document.getElementById('style-switcher');

  if (!i.classList.contains("show")) {
    i.classList.add("show")
  } else {
    i.classList.remove("show")
  }
};


// Light-dark
var isChangeMode = document.getElementById("mode");
if (isChangeMode) {
  isChangeMode.addEventListener("click", function (e) {
    var themeMode = document.documentElement.getAttribute("data-mode");
    if (themeMode == "light") {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.setAttribute("data-mode", "light");
    }
  });
}


// data-theme-color
document.querySelectorAll("#style-switcher li").forEach(function (item) {
  var layoutGetAttr = item.querySelector("a").getAttribute("data-color")
  if (sessionStorage.getItem("data-theme-color") && sessionStorage.getItem("data-theme-color") == layoutGetAttr) {
    document.documentElement.setAttribute('data-theme-color', layoutGetAttr);
  }
  if (document.documentElement.getAttribute('data-theme-color') == layoutGetAttr) {
    item.querySelector("a").classList.add("active");
  }
  item.querySelector("a").addEventListener("click", function () {
    sessionStorage.setItem("data-theme-color", layoutGetAttr);

    if (sessionStorage.getItem("data-theme-color") && sessionStorage.getItem("data-theme-color") == layoutGetAttr) {
      document.documentElement.setAttribute('data-theme-color', layoutGetAttr);
    }
    // link active
    var themecolorList = document.querySelector("#style-switcher li a.active");
    if (themecolorList) themecolorList.classList.remove("active");
    this.classList.add("active");
  })
})


// right sidebar tabs

const toggleBtn = document.getElementById('toggleButton');
const content = document.getElementById('content');
const profileSidebar = document.querySelector('.user-profile-sidebar');

toggleBtn.addEventListener('click', function () {
  if (content.style.display === 'none') {
    content.style.display = 'block';
  } else {
    content.style.display = 'none';
  }
});

var profileTabBtn = document.querySelectorAll('.profileTab');
if (profileTabBtn) {
  Array.from(profileTabBtn).forEach((element) => {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      if (profileSidebar) {
        if (profileSidebar.style.display === 'none') {
          profileSidebar.style.display = 'block';
        } else {
          profileSidebar.style.display = 'none';
        }
      }
    });
  })
}

// open chat box
if (document.querySelector(".chat-user-list")) {
  Array.from(document.querySelectorAll(".chat-user-list li")).forEach((item) => {
    item.addEventListener("click", () => {
      if (document.querySelector(".user-chat")) {
        document.querySelector(".user-chat").classList.add("user-chat-show");
      }
    })
  });
}

// close chat box
if (document.querySelector(".user-chat-remove")) {
  document.querySelector(".user-chat-remove").addEventListener('click', () => {
    if (document.querySelector(".user-chat")) {
      document.querySelector(".user-chat").classList.remove("user-chat-show");
    }
  })
}
