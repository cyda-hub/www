
window.addEventListener("click", (e) => {
    console.log(e.target)
    let dropdowns = document.getElementsByClassName("dropdown");

    for (const dropdown of dropdowns) {
        if ((!e.target.classList.contains("dropdown")) && (!e.target.classList.contains("link-dropdown"))) {
            dropdown.checked = false
        }
    }
})
