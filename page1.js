const SUPABASE_URL = "https://hxtwdzvnqtxoutdetfoy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_hEot0ds6XIcLYo7Fj8xtUQ_0ICFxMBV";

const larckSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const googleSignInBtn = document.getElementById("googleSignInBtn");
const googlePopup = document.getElementById("googlePopup");
const closeGoogle = document.getElementById("closeGoogle");
const googleAccount = document.getElementById("googleAccount");


googleSignInBtn.addEventListener("click", function () {

    googlePopup.style.display = "flex";

});

closeGoogle.addEventListener("click", function () {

    googlePopup.style.display = "none";

});

googlePopup.addEventListener("click", function (event) {

    if (event.target === googlePopup) {

        googlePopup.style.display = "none";

    }

});

googleAccount.addEventListener("click", function () {

    googleAccount.style.backgroundColor = "#f1f3f4";

    setTimeout(function () {

        alert("Google account selected. Real Google authentication will be connected here.");

    }, 300);

});

const emailSignInBtn = document.querySelector(".email-btn");
const emailPopup = document.getElementById("emailPopup");
const closeEmail = document.getElementById("closeEmail");


// =========================
// EMAIL SIGN IN
// =========================

emailSignInBtn.addEventListener("click", function () {

    emailPopup.style.display = "flex";

});

closeEmail.addEventListener("click", function () {

    emailPopup.style.display = "none";

});

emailPopup.addEventListener("click", function (event) {

    if (event.target === emailPopup) {

        emailPopup.style.display = "none";

    }

});


// SHOW / HIDE PASSWORD

const passwordInput = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        showPassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        showPassword.textContent = "Show";

    }

});


// EMAIL LOGIN
// EMAIL LOGIN

const emailForm = document.getElementById("emailForm");

emailForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    if (email === "" || password === "") {

        alert("Please enter your email and password.");

        return;

    }


    try {

        const { data, error } =
            await larckSupabase.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {

            alert(error.message);

            return;

        }


        if (data.user) {

            const user = data.user;


            // CHECK IF USER ALREADY HAS A PROFILE

            const {
    data: existingProfile,
    error: profileLookupError
} = await larckSupabase
    .from("profiles")
    .select("id, larck_id, country")
    .eq("id", user.id)
    .maybeSingle();


            if (profileLookupError) {

                console.error("PROFILE ERROR",profileLookupError);

                alert(
                    profileLookupError.message
                );

                return;

            }


            // CREATE PROFILE IF IT DOES NOT EXIST

            if (!existingProfile) {

                const username =
                    user.user_metadata?.username ||
                    user.email?.split("@")[0] ||
                    "LARCK User";

                    const country = 
                        user.user_metadata?.country ||"";


                // GENERATE A 7-DIGIT LARCK ID

                let larckId = "";

                let idExists = true;


                while (idExists) {

                    const firstDigit =
                        Math.floor(Math.random() * 9) + 1;

                    const remainingDigits =
                        Math.floor(Math.random() * 1000000)
                            .toString()
                            .padStart(6, "0");


                    larckId =
                        firstDigit.toString() +
                        remainingDigits;


                    const { data: existingId } =
                        await larckSupabase
                            .from("profiles")
                            .select("id")
                            .eq("larck_id", larckId)
                            .maybeSingle();


                    idExists = !!existingId;

                }


                // CREATE PROFILE

                const {
                    error: profileInsertError
                } = await larckSupabase
                    .from("profiles")
                    .insert({

                        id: user.id,

                        username: username,

                        larck_id: larckId,

                        profile_picture: "",

                        country: country

                    });


                if (profileInsertError) {

                    console.error(profileInsertError);

                    alert(
                        "Your account logged in, but your LARCK profile could not be created."
                    );

                    return;

                }

            }


            // GIVE EXISTING PROFILE A LARCK ID

            if (
                existingProfile &&
                !existingProfile.larck_id
            ) {

                let larckId = "";

                let idExists = true;


                while (idExists) {

                    const firstDigit =
                        Math.floor(Math.random() * 9) + 1;

                    const remainingDigits =
                        Math.floor(Math.random() * 1000000)
                            .toString()
                            .padStart(6, "0");


                    larckId =
                        firstDigit.toString() +
                        remainingDigits;


                    const { data: existingId } =
                        await larckSupabase
                            .from("profiles")
                            .select("id")
                            .eq("larck_id", larckId)
                            .maybeSingle();


                    idExists = !!existingId;

                }


                const {
                    error: updateProfileError
                } = await larckSupabase
                    .from("profiles")
                    .update({

                        larck_id: larckId

                    })
                    .eq("id", user.id);


                if (updateProfileError) {

                    console.error(updateProfileError);

                    alert(
                        "Your account logged in, but your LARCK ID could not be created."
                    );

                    return;

                }

            }


            // GO TO LARCK HOME

            window.location.href = "page2.html";

        }

    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong. Please try again."
        );

    }

});

// =========================
// RETRIEVE ACCOUNT
// =========================

const retrieveAccount = document.querySelector(".retrieve-account");

const retrievePopup = document.getElementById("retrievePopup");

const closeRetrieve = document.getElementById("closeRetrieve");

const backToSignin = document.getElementById("backToSignin");

const retrieveForm = document.getElementById("retrieveForm");

const retrieveMessage = document.getElementById("retrieveMessage");


// OPEN RETRIEVE ACCOUNT
retrieveAccount.addEventListener("click", function (event) {

    event.preventDefault();

    retrievePopup.style.display = "flex";

});


// CLOSE RETRIEVE ACCOUNT
closeRetrieve.addEventListener("click", function () {

    retrievePopup.style.display = "none";

});


// CLOSE BY CLICKING OUTSIDE
retrievePopup.addEventListener("click", function (event) {

    if (event.target === retrievePopup) {

        retrievePopup.style.display = "none";

    }

});


// BACK TO SIGN IN
backToSignin.addEventListener("click", function () {

    retrievePopup.style.display = "none";

});


// RETRIEVE ACCOUNT FORM
retrieveForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const contact =
        document.getElementById("retrieveContact").value.trim();


    // CHECK EMPTY FIELD
    if (contact === "") {

        retrieveMessage.textContent =
            "Please enter your email or phone number.";

        return;
    }


    // FRONT-END PROTOTYPE MESSAGE
    retrieveMessage.textContent =
        "If an account is connected to this information, a verification code will be sent shortly.";

});
// =========================
// USER SERVICE TERMS
// =========================

const termsLink = document.querySelector(".terms a");

const termsPopup = document.getElementById("termsPopup");

const closeTerms = document.getElementById("closeTerms");

const termsAccept = document.getElementById("termsAccept");


// OPEN TERMS
termsLink.addEventListener("click", function (event) {

    event.preventDefault();

    termsPopup.style.display = "flex";

});


// CLOSE TERMS
closeTerms.addEventListener("click", function () {

    termsPopup.style.display = "none";

});


// CLOSE BY CLICKING OUTSIDE
termsPopup.addEventListener("click", function (event) {

    if (event.target === termsPopup) {

        termsPopup.style.display = "none";

    }

});


// I UNDERSTAND
termsAccept.addEventListener("click", function () {

    termsPopup.style.display = "none";

});

// =========================
// ACCOUNT POPUP
// =========================

const accountButton =
    document.querySelector(".account-btn");

const accountPopup =
    document.getElementById("accountPopup");

const closeAccount =
    document.getElementById("closeAccount");


// OPEN ACCOUNT POPUP

if (accountButton && accountPopup) {

    accountButton.addEventListener("click", function(event) {

        event.preventDefault();

        accountPopup.style.display = "flex";

    });

}


// CLOSE ACCOUNT POPUP

if (closeAccount && accountPopup) {

    closeAccount.addEventListener("click", function() {

        accountPopup.style.display = "none";

    });

}


// CLOSE BY CLICKING OUTSIDE

if (accountPopup) {

    accountPopup.addEventListener("click", function(event) {

        if (event.target === accountPopup) {

            accountPopup.style.display = "none";

        }

    });

}


// =========================
// CREATE ACCOUNT POPUP
// =========================

const signupPopup =
    document.getElementById("signupPopup");

const closeSignup =
    document.getElementById("closeSignup");

const createAccountLinks =
    document.querySelectorAll(".open-signup");


// OPEN SIGNUP POPUP

createAccountLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        if (signupPopup) {

            signupPopup.style.display = "flex";

        }

    });

});


// CLOSE SIGNUP POPUP

if (closeSignup && signupPopup) {

    closeSignup.addEventListener("click", function() {

        signupPopup.style.display = "none";

    });

}


// CLOSE BY CLICKING OUTSIDE

if (signupPopup) {

    signupPopup.addEventListener("click", function(event) {

        if (event.target === signupPopup) {

            signupPopup.style.display = "none";

        }

    });

}


// =========================
// CREATE LARCK ACCOUNT
// =========================

const signupForm =
    document.getElementById("signupForm");

const signupMessage =
    document.getElementById("signupMessage");


if (signupForm) {

    signupForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        // GET FORM VALUES

        const username =
            document.getElementById("signupUsername")
                .value
                .trim();

        const email =
            document.getElementById("signupEmail")
                .value
                .trim();

        const password =
            document.getElementById("signupPassword")
                .value;

        const country =
            document.getElementById("signupCountry")
                .value;


        // CHECK REQUIRED FIELDS

        if (
            username === "" ||
            email === "" ||
            password === "" ||
            country === ""
        ) {

            signupMessage.textContent =
                "Please fill in all fields and select your country.";

            return;

        }


        // CHECK PASSWORD

        if (password.length < 6) {

            signupMessage.textContent =
                "Password must be at least 6 characters.";

            return;

        }


        // SHOW LOADING MESSAGE

        signupMessage.textContent =
            "Creating your LARCK account...";


        try {

            // =========================
            // CREATE SUPABASE ACCOUNT
            // =========================

            const { data, error } =
                await larckSupabase.auth.signUp({

                    email: email,

                    password: password,

                    options: {

                        data: {

                            username: username,

                            country: country

                        }

                    }

                });


            // CHECK SIGNUP ERROR

            if (error) {

                console.error(error);

                signupMessage.textContent =
                    error.message;

                return;

            }


            // =========================
            // CHECK USER
            // =========================

            const user = data.user;

            if (!user) {

                signupMessage.textContent =
                    "Account could not be created. Please try again.";

                return;

            }


            // =========================
            // GENERATE 7-DIGIT LARCK ID
            // =========================

            let larckId = null;

            let idExists = true;


            while (idExists) {

                const firstDigit =
                    Math.floor(Math.random() * 9) + 1;

                const remainingDigits =
                    Math.floor(Math.random() * 1000000)
                        .toString()
                        .padStart(6, "0");

                larckId =
                    firstDigit.toString() +
                    remainingDigits;


                const { data: existingId } =
                    await larckSupabase
                        .from("profiles")
                        .select("id")
                        .eq("larck_id", larckId)
                        .maybeSingle();


                idExists = !!existingId;

            }


            // =========================
            // CREATE PROFILE
            // =========================

            const { error: profileError } =
                await larckSupabase
                    .from("profiles")
                    .insert({

                        id: user.id,

                        username: username,

                        larck_id: larckId,

                        profile_picture: "",

                        country: country

                    });


            // CHECK PROFILE ERROR

            if (profileError) {

                console.error(profileError);

                signupMessage.textContent =
                    "Account created, but your LARCK profile could not be created.";

                return;

            }


            // =========================
            // ACCOUNT SUCCESS
            // =========================

            signupMessage.textContent =
                "Account created successfully!";


            signupForm.reset();


            // =========================
            // GO TO HOME PAGE
            // =========================

            setTimeout(function() {

                window.location.href =
                    "page2.html";

            }, 800);


        } catch (error) {

            console.error(error);

            signupMessage.textContent =
                "Something went wrong. Please try again.";

        }

    });

}