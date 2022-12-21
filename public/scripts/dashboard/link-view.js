
var date_scope = "day";
var analytics_allow_bots = false;

var analytics_link_clicks_chart;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const ANALYTICS_DESKTOP_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
const ANALYTICS_MOBILE_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`;
const ANALYTICS_TABLET_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`;
const ANALYTICS_BOT_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>`;

const ANALYTICS_QUESTION_ICON = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
const NO_DATA_AVAILABLE = `
<div style="transform: translate(-50%, -50%);" class="text-sm font-semibold absolute top-1/2 left-1/2 flex items-center justify-center">
    No data available!
</div>
`;

const filterByDate = (schema, name) => {
    let today = new Date();

    let lastMonthEnd = new Date(today.getFullYear(), today.getMonth()+1);
    let lastMonthStart = new Date(lastMonthEnd.getFullYear(), lastMonthEnd.getMonth()-1);

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

    if (unified.length === 0) {
        DEVICES_CONTAINER.innerHTML = NO_DATA_AVAILABLE;
        return;
    }

    let total = 0;

    // get the amount
    for (const element of unified) {
        let val = element.value;

        if (val === "BOT" && (!analytics_allow_bots)) {
            continue;
        }

        total += element.amount;
    }

    let sorted = unified.sort((a,b) => b.amount - a.amount);
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
                    ${element.amount} <span class="ml-1 text-xs font-semibold">(${Math.round(percentage)}%)</span>
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

    if (unified.length === 0) {
        REFERERS_CONTAINER.innerHTML = NO_DATA_AVAILABLE;
        return;
    }

    let total = 0;
    for (const element of unified) {
        let val = element.value;

        if (val === "BOT" && (!analytics_allow_bots)) {
            continue;
        }

        total += element.amount;
    }

    let sorted = unified.sort((a,b) => b.amount - a.amount);
    for (const element of sorted) {
        let val = element.value;
        let percentage = (element.amount / total) * 100;

        REFERERS_CONTAINER.innerHTML += `
        <div class="box-row">
            <div style="width: ${percentage}%;" class="z-0 h-full absolute rounded bg-yellow-100 opacity-40">
            </div>
            <div class="z-10 px-3">
                <div>${val.charAt(0) + val.toLowerCase().slice(1)}</div>
            </div>
            <div class="z-10 px-3 p-2">
                ${element.amount} <span class="ml-1 text-xs font-semibold">(${Math.round(percentage)}%)</span>
            </div>
        </div>
        `;
    }
}

function updateLinkViews() {

    if (typeof analytics_link_clicks_chart !== "undefined") {
        analytics_link_clicks_chart.destroy();
    }

    let el = document.getElementById("link-click-chart");
    let labels = [];

    let timestamps = [];
    let graph_data = [];

    let total_clicks = 0;

    if (date_scope === "day") {
        var d = new Date(),
        h = d.getHours();

        for (var i = 0; i < 24; ++i) {
            if (h-i < 0) { continue; }
            else if (i % 3 !== 0) { continue; }

            labels.unshift({t: h-i, c: 0});
        }

        const elements = filterByDate(window.link_analytics.clicks, date_scope);

        for (const element of elements) {
            let t = element.timestamp;
            let hour = new Date(t).getHours();
            let remainder = hour % 3;

            labels.find(x => (x.t === (hour-remainder)) || ((x.t+3) > (hour-remainder))).c += 1;
            total_clicks += 1;
        }

        for (const data of labels) {
            timestamps.push((data.t.toString().length < 2 ? ("0" + data.t.toString()) : (data.t)) + ":00");
            graph_data.push(data.c);
        }
    } else if (date_scope === "week") {
        var date = new Date(),
        d = date.getDay();

        for (var i = 0; i < 7; ++i) {
            let d = new Date();
            d.setDate(d.getDate()-i);

            labels.unshift({t: d, c: 0});
        }

        const elements = filterByDate(window.link_analytics.clicks, date_scope);

        for (const element of elements) {
            let t = element.timestamp;
            let day = new Date(t).getDay();


            labels.find(x => x.t.getDay() === day).c += 1;
            total_clicks += 1;
        }

        for (const data of labels) {
            timestamps.push((data.t.getDate().toString().length < 2 ? ("0" + data.t.getDate().toString()) : (data.t.getDate())) + " of " + (monthNames[new Date().getMonth()]));
            graph_data.push(data.c);
        }
    }  else if (date_scope === "month") {

        for (var i = 0; i < 30; ++i) {
            if (i % 3 !== 0) { continue; }

            let d = new Date();
            d.setDate(d.getDate()-i);

            labels.unshift({t: d, c: 0});
        }

        const elements = filterByDate(window.link_analytics.clicks, date_scope);
        console.log(elements)

        for (const element of elements) {
            let t = element.timestamp;
            let day = new Date(t).getDate();
            let remainder = day % 3;

            labels.find(x => (x.t.getDate() === (day-remainder))).c += 1;
            total_clicks += 1;
        }

        for (const data of labels) {
            timestamps.push((data.t.getDate().toString().length < 2 ? ("0" + data.t.getDate().toString()) : (data.t.getDate())) + " " + (monthNames[new Date(data.t).getMonth()]));
            graph_data.push(data.c);
        }
    }

    var gradient = el.getContext("2d").createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(71,87,193, .2)');
    gradient.addColorStop(1, 'rgba(71,87,193,0)');

    const data = {
        labels: timestamps,
        datasets: [{
          axis: 'y',
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          borderColor: "#4757C1",
          pointStyle: false,
          label: false,
          data: graph_data,

          fill: true,
          step: true,
          scaleShowValues: true,

          pointStrokeColor : "#ff6c23",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#ff6c23",

          backgroundColor: gradient,
          borderColor: [
            '#4757C1'
          ],
          borderWidth: 4
        }]
      };

    analytics_link_clicks_chart = new window.Chart(el, {
        type: 'line',
        data: data,
        options: {

            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                y: {
                    stacked: true,
                    grid: {
                        color: getComputedStyle(document.documentElement)
                            .getPropertyValue('--primary-color')
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {if (value % 1 === 0) {return value;}},
                    },

                    suggestedMax: 10
                },
                x : {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        autoSkip: true,
                        padding: 10,
                        fontSize: 10
                    },
                },
            },
        }
    });

    document.getElementById("total-amount-of-clicks").innerHTML = total_clicks;
}

function updateAllAnalytics() {
    updateLinkViews();
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
    for (const button of document.querySelectorAll("#link-view .box:has(#devices) .button-selection > div")) {
        if (button === e.target) {
            page = button.innerText.toLowerCase();
        }

        button.classList.remove("active");
    }

    e.target.classList.add("active");
    updateDevices(page);
}

function changeDateScope(e, scope) {
    date_scope = scope;

    for (const button of document.querySelectorAll("#link-view > div:first-child > .button-selection > div")) {
        button.classList.remove("active");
    }

    e.target.classList.add("active");
    updateAllAnalytics();
}

(function () {
    updateAllAnalytics();
})()
