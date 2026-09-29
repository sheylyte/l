/* =========================================
   LARCK PARTY JAVASCRIPT
========================================= */


/* =========================================
   PARTY TABS
========================================= */

const partyTabs = document.querySelectorAll(".party-tab");

partyTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        partyTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

    });

});


/* =========================================
   SEARCH
========================================= */

const searchButton =
    document.getElementById("searchButton");

const searchPopup =
    document.getElementById("searchPopup");

const closeSearch =
    document.getElementById("closeSearch");

const partySearch =
    document.getElementById("partySearch");

const searchResult =
    document.getElementById("searchResult");


searchButton.addEventListener("click", function () {

    searchPopup.classList.add("show");

    setTimeout(function () {

        partySearch.focus();

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


partySearch.addEventListener("input", function () {

    const value =
        partySearch.value.trim();

    if (value === "") {

        searchResult.textContent =
            "Search for a party room.";

    } else {

        searchResult.textContent =
            "Searching LARCK for: " + value;

    }

});



/* =========================================
   COUNTRY POPUP
========================================= */

const countryDropdown =
    document.getElementById("countryDropdown");

const countryPopup =
    document.getElementById("countryPopup");

const closeCountry =
    document.getElementById("closeCountry");


countryDropdown.addEventListener("click", function () {

    countryPopup.classList.add("show");

});


closeCountry.addEventListener("click", function () {

    countryPopup.classList.remove("show");

});


countryPopup.addEventListener("click", function (event) {

    if (event.target === countryPopup) {

        countryPopup.classList.remove("show");

    }

});



/* =========================================
   COUNTRY SELECTION
========================================= */

const countryItems =
    document.querySelectorAll(
        ".country-item, .country-grid button"
    );


countryItems.forEach(function (country) {

    country.addEventListener("click", function () {

        const selected =
            country.textContent.trim();

        console.log(
            "Selected country:",
            selected
        );

        countryPopup.classList.remove("show");

    });

});


/* ALL COUNTRY */

const allCountry =
    document.getElementById("allCountry");


allCountry.addEventListener("click", function () {

    console.log(
        "Showing all LARCK party rooms."
    );

});



/* =========================================
   GAMES
========================================= */

const gamesBanner =
    document.getElementById("gamesBanner");


gamesBanner.addEventListener("click", function () {

    alert(
        "LARCK Games Center will open here."
    );

});



/* =========================================
   GIFT BUTTON
========================================= */

const giftButton =
    document.getElementById("giftButton");


giftButton.addEventListener("click", function () {

    alert(
        "LARCK Gift Center will open here."
    );

});



/* =========================================
   RANKING
========================================= */

const rankingButton =
    document.getElementById("rankingButton");


rankingButton.addEventListener("click", function () {

    alert(
        "LARCK Party Rankings will open here."
    );

});


/* =========================================
   REAL LARCK PARTY ROOMS
========================================= */

const roomsSection =
    document.querySelector(".rooms-section");

     function getCountryFlag(country) {

    const flags = {
        "Nigeria": "🇳🇬",
        "Ghana": "🇬🇭",
        "Kenya": "🇰🇪",
        "South Africa": "🇿🇦",
        "Ethiopia": "🇪🇹",
        "Philippines": "🇵🇭",
        "United Kingdom": "🇬🇧",
        "United States": "🇺🇸",
        "Canada": "🇨🇦",
        "India": "🇮🇳",
        "United Arab Emirates": "🇦🇪",
        "Germany": "🇩🇪",
        "France": "🇫🇷",
        "Italy": "🇮🇹",
        "Spain": "🇪🇸",
        "Australia": "🇦🇺"
    };

    return flags[country] || "🌍";
}


async function loadPartyRooms() {

    console.log("Loading real LARCK party rooms...");

    try {

        const {
            data: rooms,
            error
        } = await larckSupabase
            .from("rooms")
            .select(`
                id,
                created_at,
                name,
                room_id,
                label,
                background,
                is_locked,
                owner_id,
                profiles:owner_id (
                    username,
                    larck_id,
                    profile_picture,
                    country
                )
            `)
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(
                "REAL ROOMS ERROR:",
                error
            );

            return;
        }


        console.log(
            "REAL ROOMS FOUND:",
            rooms
        );


        /* =========================================
           REMOVE DEMO ROOM CARDS
        ========================================= */

        document
            .querySelectorAll(".room-card")
            .forEach(function (card) {

                card.remove();

            });


        /* =========================================
           NO ROOMS
        ========================================= */

        if (!rooms || rooms.length === 0) {

            const message =
                document.createElement("p");

            message.textContent =
                "No party rooms available yet.";

            message.style.textAlign =
                "center";

            message.style.padding =
                "30px";

            roomsSection.appendChild(
                message
            );

            return;
        }


        /* =========================================
           CREATE REAL CARDS
        ========================================= */

        rooms.forEach(function (room, index) {

            const profile =
                room.profiles;


            if (!profile) {

                console.log(
                    "No profile found for room:",
                    room
                );

                return;

            }


            const card =
                document.createElement("article");

            card.className =
                "room-card";


            card.dataset.roomId =
                room.id;


            card.dataset.room =
                room.name;


            /* =====================================
               IMAGE
            ===================================== */

            const image =
                document.createElement("div");

            const imageClasses = [
                "room-one",
                "room-two",
                "room-three",
                "room-four",
                "room-five"
            ];

            image.className =
                "room-image " +
                imageClasses[
                    index %
                    imageClasses.length
                ];


            const imageText =
    document.createElement("span");

imageText.className =
    "room-image-text";


if (
    profile.profile_picture &&
    profile.profile_picture.trim() !== ""
) {

    const ownerImage =
        document.createElement("img");

    ownerImage.src =
        profile.profile_picture;

    ownerImage.alt =
        profile.username || "LARCK User";

    ownerImage.style.width =
        "100%";

    ownerImage.style.height =
        "100%";

    ownerImage.style.objectFit =
        "cover";

    ownerImage.style.display =
        "block";

    image.appendChild(
        ownerImage
    );

} else {

    imageText.textContent =
        "🎙️";

    image.appendChild(
        imageText
    );

}

            /* =====================================
               INFORMATION
            ===================================== */

            const information =
                document.createElement("div");

            information.className =
                "room-information";


            const heading =
    document.createElement("h3");

const countryFlag =
    document.createElement("span");

countryFlag.textContent =
    getCountryFlag(profile.country);

countryFlag.style.marginRight =
    "6px";

heading.appendChild(
    countryFlag
);

heading.appendChild(
    document.createTextNode(room.name)
);

            const description =
                document.createElement("p");


            description.textContent =
                "Welcome to " +
                profile.username +
                "'s LARCK party...";


            /* =====================================
               BOTTOM
            ===================================== */

            const bottom =
                document.createElement("div");

            bottom.className =
                "room-bottom";


            const category =
                document.createElement("span");

            category.className =
                "room-category chatting";


            category.textContent =
                "💬 " +
                (room.label ||
                "Chatting");


            const users =
                document.createElement("div");

            users.className =
                "room-users";


            const avatar =
    document.createElement("div");

avatar.className =
    "mini-avatar";


if (profile.profile_picture) {

    const profileImage =
        document.createElement("img");

    profileImage.src =
        profile.profile_picture;

    profileImage.alt =
        profile.username || "LARCK User";

    profileImage.style.width =
        "100%";

    profileImage.style.height =
        "100%";

    profileImage.style.objectFit =
        "cover";

    profileImage.style.borderRadius =
        "50%";

    avatar.appendChild(
        profileImage
    );

} else {

    avatar.textContent =
        profile.username
            ? profile.username
                .charAt(0)
                .toUpperCase()
            : "L";

}
            const id =
                document.createElement("strong");


            id.textContent =
                room.room_id;


            users.appendChild(
                avatar
            );

            users.appendChild(
                id
            );


            bottom.appendChild(
                category
            );

            bottom.appendChild(
                users
            );


            information.appendChild(
                heading
            );

            information.appendChild(
                description
            );

            information.appendChild(
                bottom
            );


            card.appendChild(
                image
            );

            card.appendChild(
                information
            );


            roomsSection.appendChild(
                card
            );


            /* =====================================
               OPEN REAL ROOM
            ===================================== */

            card.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "page6.html?roomId=" +
                        encodeURIComponent(
                            room.id
                        ) +
                        "&room=" +
                        encodeURIComponent(
                            room.name
                        );

                }
            );

        });


    }

    catch (error) {

        console.error(
            "LOAD PARTY ROOMS ERROR:",
            error
        );

    }

}


/* =========================================
   LOAD REAL ROOMS
========================================= */




/* =========================================
   REFRESH ROOMS
========================================= */

const refreshRooms =
    document.getElementById("refreshRooms");


refreshRooms.addEventListener("click", function () {

    refreshRooms.style.transform =
        "rotate(360deg)";

    setTimeout(function () {

        refreshRooms.style.transform =
            "rotate(0deg)";

    }, 500);

});



/* =========================================
   CREATE REAL PARTY
========================================= */

const SUPABASE_URL =
    "https://hxtwdzvnqtxoutdetfoy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_hEot0ds6XIcLYo7Fj8xtUQ_0ICFxMBV";


const larckSupabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
    loadPartyRooms(); 


const createParty =
    document.getElementById("createParty");


createParty.addEventListener("click", async function () {

    try {

        /* =========================================
           CHECK CURRENT USER
        ========================================= */

        const {
            data: {
                user
            },
            error: userError
        } = await larckSupabase.auth.getUser();


        if (userError || !user) {

            alert(
                "Please log in to create a party."
            );

            window.location.href =
                "page1.html";

            return;
        }


        /* =========================================
           GET USER'S LARCK ID
        ========================================= */

        const {
            data: profile,
            error: profileError
        } = await larckSupabase
            .from("profiles")
            .select("larck_id, username")
            .eq("id", user.id)
            .single();


        if (profileError || !profile) {

            console.error(
                "Profile error:",
                profileError
            );

            alert(
                "Unable to find your LARCK profile."
            );

            return;
        }


        const larckId =
            profile.larck_id;


        /* =========================================
           MAKE SURE LARCK ID EXISTS
        ========================================= */

        if (!larckId) {

            alert(
                "Your LARCK ID could not be found."
            );

            return;
        }


        /* =========================================
           CHECK IF USER ALREADY HAS A ROOM
        ========================================= */

        const {
            data: existingRoom,
            error: existingRoomError
        } = await larckSupabase
            .from("rooms")
            .select("*")
            .eq("owner_id", user.id)
            .maybeSingle();


        if (existingRoomError) {

            console.error(
                "Existing room check error:",
                existingRoomError
            );

            alert(
                "Unable to check your party room."
            );

            return;
        }


        /* =========================================
           USER ALREADY HAS A ROOM
        ========================================= */

        if (existingRoom) {

            window.location.href =
                "page6.html?roomId=" +
                encodeURIComponent(existingRoom.id) +
                "&room=" +
                encodeURIComponent(existingRoom.name);

            return;
        }


        /* =========================================
           CREATE FIRST AND ONLY ROOM
           ROOM ID = USER LARCK ID
        ========================================= */

        const {
            data: room,
            error: roomError
        } = await larckSupabase
            .from("rooms")
            .insert({

                owner_id: user.id,

                name: profile.username + "Party",

                room_id: larckId,

                label: "Chatting",

                background: "",

                is_locked: false

            })
            .select()
            .single();


        /* =========================================
           HANDLE ROOM CREATION ERROR
        ========================================= */

        if (roomError) {

            console.error(
                "Create room error:",
                roomError
            );


            if (
                roomError.code === "23505"
            ) {

                alert(
                    "You already have a LARCK party room."
                );

                return;
            }


            alert(
                "Unable to create your party. Please try again."
            );

            return;
        }


        /* =========================================
           SUCCESS
        ========================================= */

        console.log(
            "REAL LARCK ROOM CREATED:",
            room
        );


        console.log(
            "ROOM ID:",
            room.room_id
        );


        /* =========================================
           OPEN REAL PARTY ROOM
        ========================================= */

        window.location.href =
            "page6.html?roomId=" +
            encodeURIComponent(room.id) +
            "&room=" +
            encodeURIComponent(room.name);

    }

    catch (error) {

        console.error(
            "Create party error:",
            error
        );

        alert(
            "Something went wrong while creating the party."
        );

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

/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            countryPopup.classList.remove("show");

            searchPopup.classList.remove("show");

        }

    }
);