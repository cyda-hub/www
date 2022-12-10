
window.addEventListener("click", (e) => {
    let dropdowns = document.getElementsByClassName("dropdown");

    if ((!e.target.classList.contains("dropdown")) && (!e.target.classList.contains("link-dropdown"))) {
        for (const dropdown of dropdowns) {
            dropdown.checked = false
        }
    }
})
