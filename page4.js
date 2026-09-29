/* =========================================
   LARCK MESSAGE JAVASCRIPT
========================================= */


/* =========================================
   SEARCH
========================================= */

const searchButton =
    document.getElementById("searchButton");

const searchPopup =
    document.getElementById("searchPopup");

const closeSearch =
    document.getElementById("closeSearch");

const messageSearch =
    document.getElementById("messageSearch");

const searchMessage =
    document.getElementById("searchMessage");


searchButton.addEventListener("click", function () {

    searchPopup.classList.add("show");

    setTimeout(function () {

        messageSearch.focus();

    }, 100);

});


closeSearch.addEventListener("click", function () {

    searchPopup.classList.remove("show");

});


searchPopup.addEventListener("click", function (event) {

    if (event.target === searchPopup) {

        searchPopup.classList.remove("show");

    }

});


messageSearch.addEventListener("input", function () {

    const value =
        messageSearch.value.trim();

    if (value === "") {

        searchMessage.textContent =
            "Search for a friend or conversation.";

    } else {

        searchMessage.textContent =
            "Searching LARCK messages for: " +
            value;

    }

});



/* =========================================
   SYSTEM
========================================= */

const systemShortcut =
    document.getElementById("systemShortcut");

const systemPopup =
    document.getElementById("systemPopup");

const closeSystem =
    document.getElementById("closeSystem");


systemShortcut.addEventListener("click", function () {

    systemPopup.classList.add("show");

});


closeSystem.addEventListener("click", function () {

    systemPopup.classList.remove("show");

});


systemPopup.addEventListener("click", function (event) {

    if (event.target === systemPopup) {

        systemPopup.classList.remove("show");

    }

});



/* =========================================
   LARCK TEAM
========================================= */

const teamShortcut =
    document.getElementById("teamShortcut");

const teamPopup =
    document.getElementById("teamPopup");

const closeTeam =
    document.getElementById("closeTeam");


teamShortcut.addEventListener("click", function () {

    teamPopup.classList.add("show");

});


closeTeam.addEventListener("click", function () {

    teamPopup.classList.remove("show");

});


teamPopup.addEventListener("click", function (event) {

    if (event.target === teamPopup) {

        teamPopup.classList.remove("show");

    }

});



/* =========================================
   ACTIVITY
========================================= */

const activityShortcut =
    document.getElementById("activityShortcut");

const activityPopup =
    document.getElementById("activityPopup");

const closeActivity =
    document.getElementById("closeActivity");


activityShortcut.addEventListener("click", function () {

    activityPopup.classList.add("show");

});


closeActivity.addEventListener("click", function () {

    activityPopup.classList.remove("show");

});


activityPopup.addEventListener("click", function (event) {

    if (event.target === activityPopup) {

        activityPopup.classList.remove("show");

    }

});



/* =========================================
   NOTIFICATION BUTTON
========================================= */

const notificationButton =
    document.getElementById("notificationButton");


notificationButton.addEventListener("click", function () {

    systemPopup.classList.add("show");

});



/* =========================================
   LARCK PAGE NAVIGATION
========================================= */

const bottomNavItems =
    document.querySelectorAll(".bottom-nav-item");


bottomNavItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const page =
            item.dataset.page;


        if (page === "home") {

            window.location.href = "page2.html";

        }

        else if (page === "party") {

            window.location.href = "page3.html";

        }

        else if (page === "message") {

            window.location.href = "page4.html";

        }

        else if (page === "me") {

            window.location.href = "page5.html";

        }

    });

});

/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            searchPopup.classList.remove("show");

            systemPopup.classList.remove("show");

            teamPopup.classList.remove("show");

            activityPopup.classList.remove("show");

        }

    }
);