
var date_scope = "day";
var analytics_allow_bots = false;

const ANALYTICS_DESKTOP_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
const ANALYTICS_MOBILE_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`;
const ANALYTICS_TABLET_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`;
const ANALYTICS_BOT_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>`;

const ANALYTICS_QUESTION_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

const filterByDate = (schema, name) => {
    let today = new Date();

    let lastYearStart = new Date(today.getFullYear()-1, 0, 1);
    let lastYearEnd = new Date(today.getFullYear(), 0, 1);

    let lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastMonthStart = new Date(lastMonthEnd.getFullYear(), lastMonthEnd.getMonth()-1, 1);

    let lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()-6);
    let lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);

    let lastDayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let lastDayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);


    let result = [];
    for (let d of schema) {
        if ((name === "day") && (d.timestamp >= lastDayStart.getTime() && d.timestamp < lastDayEnd.getTime())) {
            result.push(d);
        } else if ((name === "week") && (d.timestamp >= lastWeekStart.getTime() && d.timestamp < lastWeekEnd.getTime())) {
            result.push(d);
        } else if ((name === "month") && (d.timestamp >= lastMonthStart.getTime() && d.timestamp < lastMonthEnd.getTime())) {
            result.push(d);
        } else if ((name === "year") && (d.timestamp >= lastYearStart.getTime() && d.timestamp < lastYearEnd.getTime())) {
            result.push(d);
        }
    }

    return result;
}

const unifyGroups = (elements, key = "value") => {
    let result = [];

    for (const element of elements) {
        let index = result.findIndex(x => x[key] === element[key]);
        if (index === -1) {
            result.push({ value: element[key], amount: 1 });
        } else {
            result[index].amount++;
        }
    }

    return result
}

const unifyGroupsWithKey = (elements, key = "value") => {
    let result = [];

    for (const element of elements) {
        let index = result.findIndex(x => x.value === element.value[key]);
        if (index === -1) {
            result.push({ value: element.value[key], amount: 1 });
        } else {
            result[index].amount++;
        }
    }

    return result
}

function updateDevices (page = "devices") {
    const DEVICES_CONTAINER = document.getElementById("devices");
    DEVICES_CONTAINER.innerHTML = "";

    const elements = filterByDate(window.link_analytics.devices, date_scope);
    const unified = unifyGroupsWithKey(elements, page);

    let total = 0;
    console.log(unified)

    // get the amount
    for (const element of unified) {
        let val = element.value;

        if (val === "BOT" && (!analytics_allow_bots)) {
            continue;
        }

        total += element.amount;
    }

    let sorted = unified.sort((a,b) => b.amount - a.amount);
    console.log(sorted)
    for (const element of sorted) {
        let val = element.value;
        let percentage = (element.amount / total) * 100

        if (val === "BOT" && (!analytics_allow_bots)) {
            continue;
        }

        let icon = ANALYTICS_QUESTION_ICON;

        if (page === "devices") {
            if (val === "DESKTOP") {
                icon = ANALYTICS_DESKTOP_ICON;
            } else if (val === "PHONE") {
                icon = ANALYTICS_MOBILE_ICON;
            } else if (val === "TABLET") {
                icon = ANALYTICS_TABLET_ICON;
            } else if (val === "BOT") {
                icon = ANALYTICS_BOT_ICON;
            }
        } else if (page === "browsers") {
            if (val === "BOT") {
                icon = ANALYTICS_BOT_ICON;
            }
        } else if (page === "os") {
            if (val === "BOT") {
                icon = ANALYTICS_BOT_ICON;
            }
        }

        DEVICES_CONTAINER.innerHTML += `
            <div class="box-row">
                <div style="width: ${percentage}%;" class="z-0 h-full absolute rounded bg-blue-400 opacity-40">
                </div>
                <div class="z-10 px-3">
                    ${icon}
                    <div>${val.charAt(0) + val.toLowerCase().slice(1)}</div>
                </div>
                <div class="z-10 px-3 p-2">
                    ${element.amount}
                </div>
            </div>
        `;
    }
}

function updateReferers () {
    const REFERERS_CONTAINER = document.getElementById("referers");
    REFERERS_CONTAINER.innerHTML = "";

    const elements = filterByDate(window.link_analytics.referers, date_scope);
    const unified = unifyGroups(elements);

    for (const element of unified) {
        REFERERS_CONTAINER.innerHTML += `
            <div class="box-row">
                <div>
                    ${element.value}
                </div>
                <div>
                    ${element.amount}
                </div>
            </div>
        `;
    }
}

function updateAllAnalytics() {
    updateDevices();
    updateReferers();
}

function onDevicesAllowBotChange(e) {
    e.preventDefault();
    let page = "devices";

    for (const button of document.querySelectorAll("#link-view .box:has(#devices) .devices-selection > div")) {
        if (button.classList.contains("active")) {
            page = button.innerText.toLowerCase();
        }
    }

    analytics_allow_bots = e.currentTarget.checked;
    updateDevices(page);
}

function onDeviceSelectionClick(e) {
    e.preventDefault();
    let page = "devices";
    for (const button of document.querySelectorAll("#link-view .box:has(#devices) .devices-selection > div")) {
        if (button === e.target) {
            page = button.innerText.toLowerCase();
        }

        button.classList.remove("active");
    }

    e.target.classList.add("active");
    updateDevices(page);
}

(function () {
    updateAllAnalytics();
})()
