const cardContainerDocument = document.getElementById("project-cards")


const cardLinks  = cardContainerDocument.getElementsByTagName("button")

Array.from(cardLinks).forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault(); // Prevent default link behavior
        const dialogId = link.getAttribute("data-dialog-id");
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.showModal();
        }
    })
})


const closeButtons = cardContainerDocument.querySelectorAll(".close-dialog");
closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest("dialog").close();
    });
});



const dialogs = cardContainerDocument.querySelectorAll("dialog");
dialogs.forEach(dialog => {
    // Prevent background scroll when dialog opens
    dialog.addEventListener("show", () => {
        document.body.style.overflow = "hidden";
    });

    // Allow scrolling again when dialog closes
    dialog.addEventListener("close", () => {
        document.body.style.overflow = "";
    });

    // Close on backdrop click
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });
});