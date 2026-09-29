/* =========================================
   LARCK ME JAVASCRIPT
========================================= */


/* =========================================
   SUPABASE
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


/* =========================================
   CURRENT USER PROFILE
========================================= */

let currentProfile = null;


/* =========================================
   LOAD USER PROFILE
========================================= */

async function loadUserProfile() {

    try {

        /* GET CURRENT USER */

        const {
            data: {
                user
            },
            error: userError
        } = await larckSupabase.auth.getUser();


        if (userError || !user) {

            window.location.href = "page1.html";

            return;

        }


        /* GET PROFILE */

        const {
            data: profile,
            error: profileError
        } = await larckSupabase
            .from("profiles")
            .select(
                "username, larck_id, country, profile_picture"
            )
            .eq("id", user.id)
            .maybeSingle();


        if (profileError) {

            console.error(
                "Profile error:",
                profileError
            );

            alert(
                "Something went wrong while loading your profile."
            );

            return;

        }


        if (!profile) {

            console.error(
                "No profile found."
            );

            return;

        }


        /* =====================================
           SAVE PROFILE
        ====================================== */

        currentProfile = profile;


        /* =====================================
           USERNAME
        ====================================== */

        const usernameElement =
            document.getElementById("username");


        if (usernameElement) {

            usernameElement.textContent =
                profile.username || "LARCK User";

        }


        /* =====================================
           LARCK ID
        ====================================== */

        const profileId =
            document.getElementById("profileId");


        if (profileId) {

            profileId.textContent =
                "ID: " +
                (profile.larck_id || "--------");

        }


        /* =====================================
           COUNTRY FLAG
        ====================================== */

        const countryFlag =
            document.getElementById("countryFlag");


        if (countryFlag) {

            const country =
                String(profile.country || "")
                    .trim()
                    .toLowerCase();


            const flags = {

                "nigeria": "🇳🇬",
                "ghana": "🇬🇭",
                "kenya": "🇰🇪",
                "south africa": "🇿🇦",
                "ethiopia": "🇪🇹",
                "philippines": "🇵🇭",
                "united kingdom": "🇬🇧",
                "united states": "🇺🇸",
                "canada": "🇨🇦",
                "india": "🇮🇳",
                "united arab emirates": "🇦🇪",
                "germany": "🇩🇪",
                "france": "🇫🇷",
                "italy": "🇮🇹",
                "spain": "🇪🇸",
                "australia": "🇦🇺",

                "ng": "🇳🇬",
                "gh": "🇬🇭",
                "ke": "🇰🇪",
                "za": "🇿🇦",
                "et": "🇪🇹",
                "ph": "🇵🇭",
                "gb": "🇬🇧",
                "uk": "🇬🇧",
                "us": "🇺🇸",
                "usa": "🇺🇸",
                "ca": "🇨🇦",
                "in": "🇮🇳",
                "ae": "🇦🇪",
                "uae": "🇦🇪",
                "de": "🇩🇪",
                "fr": "🇫🇷",
                "it": "🇮🇹",
                "es": "🇪🇸",
                "au": "🇦🇺"

            };


            countryFlag.textContent =
                flags[country] || "🌍";

        }


        /* =====================================
           PROFILE AVATAR
        ====================================== */

        const avatar =
            document.getElementById("profileAvatar");


        if (avatar) {

            if (profile.profile_picture) {

                avatar.innerHTML =
                    `
                    <img
                        src="${profile.profile_picture}"
                        alt="Profile"
                        style="
                            width:100%;
                            height:100%;
                            object-fit:cover;
                            object-position:center;
                            border-radius:50%;
                            display:block;

                        "
                    >
                    `;

            } else {

                avatar.textContent =
                    getAvatarLetter(
                        profile.username
                    );

            }

        }


        /* =====================================
           SAVE CURRENT LARCK ID
        ====================================== */

        window.currentLarckId =
            profile.larck_id || "";


    } catch (error) {

        console.error(
            "ME page error:",
            error
        );

        alert(
            "Something went wrong while loading your profile."
        );

    }

}


/* =========================================
   AVATAR LETTER
========================================= */

function getAvatarLetter(username) {

    if (!username) {

        return "L";

    }


    return username
        .trim()
        .charAt(0)
        .toUpperCase();

}

/* =========================================
   PROFILE PICTURE UPLOAD
========================================= */

const profileAvatarContainer =
    document.getElementById(
        "profileAvatarContainer"
    );

const profilePictureInput =
    document.getElementById(
        "profilePictureInput"
    );


if (
    profileAvatarContainer &&
    profilePictureInput
) {

    /* OPEN PHONE GALLERY */

    profileAvatarContainer.addEventListener(
        "click",
        function () {

            profilePictureInput.click();

        }
    );


    /* WHEN USER SELECTS A PICTURE */

    profilePictureInput.addEventListener(
        "change",
        async function () {

            const file =
                profilePictureInput.files[0];


            if (!file) {

                return;

            }


            /* ONLY ALLOW IMAGES */

            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image."
                );

                return;

            }


            /* LIMIT FILE SIZE TO 5MB */

            if (file.size > 5 * 1024 * 1024) {

                alert(
                    "Please choose an image smaller than 5MB."
                );

                return;

            }


            try {

                /* GET CURRENT USER */

                const {
                    data: {
                        user
                    },
                    error: userError
                } =
                    await larckSupabase
                        .auth
                        .getUser();


                if (
                    userError ||
                    !user
                ) {

                    alert(
                        "Please log in again."
                    );

                    return;

                }


                /* CREATE UNIQUE FILE NAME */

                const fileExtension =
                    file.name
                        .split(".")
                        .pop()
                        .toLowerCase();


                const fileName =
                    user.id +
                    "_" +
                    Date.now() +
                    "." +
                    fileExtension;


                const filePath =
                    user.id +
                    "/" +
                    fileName;


                /* UPLOAD TO SUPABASE STORAGE */

                const {
                    error: uploadError
                } =
                    await larckSupabase
                        .storage
                        .from("profile-picture")
                        .upload(
                            filePath,
                            file,
                            {
                                cacheControl: "3600",
                                upsert: false
                            }
                        );


                if (uploadError) {

                    console.error(
                        "PROFILE PICTURE UPLOAD ERROR:",
                        uploadError
                    );

                    alert(
                        "Unable to upload your picture."
                    );

                    return;

                }


                /* GET PUBLIC URL */

                const {
                    data: publicUrlData
                } =
                    larckSupabase
                        .storage
                        .from("profile-picture")
                        .getPublicUrl(
                            filePath
                        );


                const profilePictureUrl =
                    publicUrlData.publicUrl;


                /* SAVE URL TO PROFILE */

                const {
                    error: updateError
                } =
                    await larckSupabase
                        .from("profiles")
                        .update({
                            profile_picture:
                                profilePictureUrl
                        })
                        .eq(
                            "id",
                            user.id
                        );


                if (updateError) {

                    console.error(
                        "PROFILE PICTURE DATABASE ERROR:",
                        updateError
                    );

                    alert(
                        "Picture uploaded, but your profile could not be updated."
                    );

                    return;

                }


                /* UPDATE CURRENT PROFILE */

                if (currentProfile) {

                    currentProfile.profile_picture =
                        profilePictureUrl;

                }


                /* SHOW NEW PROFILE PICTURE */

                const avatar =
                    document.getElementById(
                        "profileAvatar"
                    );


                if (avatar) {

                    avatar.innerHTML =
                        `
                        <img
                            src="${profilePictureUrl}"
                            alt="Profile"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                                border-radius:50%;
                                object-position:center;
                                display:block;
                            "
                        >
                        `;

                }


                alert(
                    "Profile picture updated successfully!"
                );


            } catch (error) {

                console.error(
                    "PROFILE PICTURE ERROR:",
                    error
                );

                alert(
                    "Something went wrong while uploading your picture."
                );

            }


            /* RESET INPUT */

            profilePictureInput.value = "";

        }
    );

}


/* =========================================
   COPY USER ID
========================================= */

const copyId =
    document.getElementById("copyId");


if (copyId) {

    copyId.addEventListener(
        "click",
        function () {

            const userId =
                window.currentLarckId || "";


            if (!userId) {

                alert(
                    "Your LARCK ID is still loading."
                );

                return;

            }


            if (navigator.clipboard) {

                navigator.clipboard
                    .writeText(userId)

                    .then(function () {

                        alert(
                            "LARCK ID copied: " +
                            userId
                        );

                    })

                    .catch(function () {

                        alert(
                            "Your LARCK ID is: " +
                            userId
                        );

                    });

            } else {

                alert(
                    "Your LARCK ID is: " +
                    userId
                );

            }

        }
    );

}


/* =========================================
   PROFILE ARROW
========================================= */

const profileArrow =
    document.getElementById("profileArrow");


if (profileArrow) {

    profileArrow.addEventListener(
        "click",
        function () {

            alert(
                "LARCK profile page will open here."
            );

        }
    );

}


/* =========================================
   COINS
========================================= */

const coinsCard =
    document.getElementById("coinsCard");


if (coinsCard) {

    coinsCard.addEventListener(
        "click",
        function () {

            alert(
                "LARCK Coins page will open here."
            );

        }
    );

}


/* =========================================
   POINTS
========================================= */

const pointsCard =
    document.getElementById("pointsCard");


if (pointsCard) {

    pointsCard.addEventListener(
        "click",
        function () {

            alert(
                "LARCK Points page will open here."
            );

        }
    );

}


/* =========================================
   FEATURE BUTTONS
========================================= */

const featureItems =
    document.querySelectorAll(
        ".feature-item"
    );


featureItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const feature =
                    item.dataset.feature;


                if (feature === "level") {

                    alert("LARCK Level Center");

                }

                else if (feature === "store") {

                    alert("LARCK Store");

                }

                else if (feature === "dress") {

                    alert(
                        "LARCK Dress & Profile Items"
                    );

                }

                else if (feature === "host") {

                    alert("LARCK Host Center");

                }

                else if (feature === "recharge") {

                    alert("LARCK Coin Recharge");

                }

                else if (feature === "task") {

                    alert("LARCK Tasks");

                }

                else if (feature === "invite") {

                    alert(
                        "Invite friends to LARCK"
                    );

                }

            }
        );

    }
);


/* =========================================
   ACCOUNT MENU
========================================= */

const menuRows =
    document.querySelectorAll(
        ".menu-row"
    );


menuRows.forEach(
    function (row) {

        row.addEventListener(
            "click",
            function () {

                const menu =
                    row.dataset.menu;


                if (menu === "agent") {

                    alert(
                        "LARCK Agent Center"
                    );

                }

                else if (menu === "settings") {

                    alert(
                        "LARCK Settings"
                    );

                }

                else if (menu === "support") {

                    alert(
                        "LARCK Support"
                    );

                }

            }
        );

    }
);


/* =========================================
   LARCK PAGE NAVIGATION
========================================= */

const bottomNavItems =
    document.querySelectorAll(
        ".bottom-nav-item"
    );


bottomNavItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const page =
                    item.dataset.page;


                if (page === "home") {

                    window.location.href =
                        "page2.html";

                }

                else if (page === "party") {

                    window.location.href =
                        "page3.html";

                }

                else if (page === "message") {

                    window.location.href =
                        "page4.html";

                }

                else if (page === "me") {

                    window.location.href =
                        "page5.html";

                }

            }
        );

    }
);


/* =========================================
   START PROFILE LOADING
========================================= */

loadUserProfile();

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            const {
                data: { user }
            } = await larckSupabase.auth.getUser();

            if (user) {

                const { error } =
                    await larckSupabase
                    .from("room_members")
                    .delete()
                    .eq("user_id", user.id);

                if (error) {

                    console.error(
                        "Error removing user from room:",
                        error
                    );

                }

            }

            localStorage.removeItem(
                "larckActiveRoom"
            );

            localStorage.removeItem(
                "larckRoomMinimized"
            );

            const {
                error: signOutError
            } =
                await larckSupabase.auth.signOut();

            if (signOutError) {

                console.error(
                    "Logout error:",
                    signOutError
                );

                return;
            }

            window.location.href =
                "index.html";

        }
    );

}