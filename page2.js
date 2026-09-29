/* =========================================
   LARCK HOME JAVASCRIPT
========================================= */


/* =========================================
   TOP TABS
========================================= */

const topTabs = document.querySelectorAll(".top-tab");

topTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        topTabs.forEach(function (item) {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        const selectedTab = tab.dataset.tab;

        console.log("Selected Home tab:", selectedTab);

    });

});


/* =========================================
   SEARCH
========================================= */

const searchButton = document.getElementById("searchButton");
const searchPopup = document.getElementById("searchPopup");
const closeSearchPopup = document.getElementById("closeSearchPopup");
const searchInput = document.getElementById("searchInput");
const searchMessage = document.getElementById("searchMessage");


searchButton.addEventListener("click", function () {

    searchPopup.classList.add("show");

    setTimeout(function () {
        searchInput.focus();
    }, 100);

});


closeSearchPopup.addEventListener("click", function () {

    searchPopup.classList.remove("show");

});


searchPopup.addEventListener("click", function (event) {

    if (event.target === searchPopup) {
        searchPopup.classList.remove("show");
    }

});


searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.trim();

    if (searchValue === "") {

        searchMessage.textContent =
            "Search for a party, host or room.";

    } else {

        searchMessage.textContent =
            "Searching LARCK for: " + searchValue;

    }

});


/* =========================================
   NOTIFICATIONS
========================================= */

const notificationButton =
    document.getElementById("notificationButton");

notificationButton.addEventListener("click", function () {

    alert("Your LARCK notifications will appear here.");

});


/* =========================================
   COUNTRY SELECTOR
========================================= */

const countryMoreButton =
    document.getElementById("countryMoreButton");

const countryPopup =
    document.getElementById("countryPopup");

const closeCountryPopup =
    document.getElementById("closeCountryPopup");

const allCountryButton =
    document.getElementById("allCountryButton");


countryMoreButton.addEventListener("click", function () {

    countryPopup.classList.add("show");

});


closeCountryPopup.addEventListener("click", function () {

    countryPopup.classList.remove("show");

});


countryPopup.addEventListener("click", function (event) {

    if (event.target === countryPopup) {
        countryPopup.classList.remove("show");
    }

});


/* =========================================
   COUNTRY BUTTONS
========================================= */

const countryButtons =
    document.querySelectorAll(
        ".country-button, .all-countries button"
    );


countryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCountry =
            button.textContent.trim();

        console.log(
            "Selected country:",
            selectedCountry
        );

        countryPopup.classList.remove("show");

        alert(
            selectedCountry +
            " selected."
        );

    });

});


allCountryButton.addEventListener("click", function () {

    alert("Showing parties from all countries.");

});


/* =========================================
   ACTIVITY
========================================= */

const activityButton =
    document.getElementById("activityButton");


activityButton.addEventListener("click", function () {

    alert(
        "LARCK Activity Center will open here."
    );

});


/* =========================================
   GAMES
========================================= */

const gamesButton =
    document.getElementById("gamesButton");


gamesButton.addEventListener("click", function () {

    alert(
        "LARCK Games Center will open here."
    );

});


/* =========================================
   JOIN PARTY
========================================= */

const joinButtons =
    document.querySelectorAll(".join-room");


joinButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.stopPropagation();

        const partyCard =
            button.closest(".home-party-card");

        const partyName =
            partyCard.querySelector("h3").textContent.trim();

        alert(
            "Opening " +
            partyName +
            " party room..."
        );

    });

});


/* =========================================
   PARTY CARDS
========================================= */

const partyCards =
    document.querySelectorAll(".home-party-card");


partyCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const partyName =
            card.querySelector("h3").textContent.trim();

        console.log(
            "Selected party:",
            partyName
        );

    });

});


/* =========================================
   SEE ALL
========================================= */

const popularSeeAll =
    document.getElementById("popularSeeAll");


popularSeeAll.addEventListener("click", function () {

    alert(
        "All popular parties will appear here."
    );

});


/* =========================================
   CREATE PARTY
========================================= */

const createPartyButton =
    document.getElementById("createPartyButton");


createPartyButton.addEventListener("click", function () {

    alert(
        "Create Party screen will open here."
    );

});



/* =========================================
   CLOSE POPUPS WITH ESCAPE
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        countryPopup.classList.remove("show");

        searchPopup.classList.remove("show");

    }

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
