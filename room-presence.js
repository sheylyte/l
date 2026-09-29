(function () {

    const savedRoom =
    localStorage.getItem("larckActiveRoom");

const roomMinimized =
    localStorage.getItem("larckRoomMinimized");

if (
    !savedRoom ||
    roomMinimized !== "true"
) {
    return;
}

    let room;

    try {

        room =
            JSON.parse(savedRoom);

    } catch (error) {

        console.error(
            "Invalid saved LARCK room:",
            error
        );

        localStorage.removeItem(
            "larckActiveRoom"
        );

        return;
    }

    if (
        !room ||
        !room.roomId ||
        !room.roomName
    ) {
        return;
    }


    /*
     * Create floating room button
     */

    const floatingRoom =
        document.createElement("button");

    floatingRoom.id =
        "larckFloatingRoom";

    floatingRoom.type =
        "button";

    floatingRoom.setAttribute(
        "aria-label",
        "Return to Party Room"
    );

    floatingRoom.innerHTML = `
        <span class="floating-room-icon">
            🎧
        </span>
    `;


    /*
     * Add button to page
     */

    document.body.appendChild(
        floatingRoom
    );


    /*
     * Open Party Room
     */

    floatingRoom.addEventListener(
        "click",
        function () {

            const roomUrl =
                "page6.html?roomId=" +
                encodeURIComponent(
                    room.roomId
                ) +
                "&room=" +
                encodeURIComponent(
                    room.roomName
                );

            window.location.href =
                roomUrl;

        }
    );


    /*
     * Add floating button styling
     */

    const floatingStyle =
        document.createElement("style");

    floatingStyle.textContent = `

    #larckFloatingRoom {
        position: fixed;
        right: 18px;
        bottom: 85px;
        width: 58px;
        height: 58px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(
            135deg,
            #7b2cff,
            #4c1d95
        );
        box-shadow:
            0 6px 18px
            rgba(0, 0, 0, 0.30);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        cursor: pointer;
        padding: 0;
    }


    #larckFloatingRoom .floating-room-icon {
        display: inline-block;
        font-size: 25px;
        line-height: 1;
        animation: larckHeadphoneSpin 1.5s linear infinite;
        transform-origin: center center;
    }


    @keyframes larckHeadphoneSpin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }


    #larckFloatingRoom:active {
        transform: scale(0.94);
    }

`;
    

    document.head.appendChild(
        floatingStyle
    );

})();