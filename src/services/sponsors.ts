const SPONSORS = {
    "revenuecat": {
        color: "#f2545b",
        darkModeImage: "/assets/sponsors/rc.png",
        lightModeImage: "/assets/sponsors/rc.png",
        title: "RevenueCat Paywalls",
        body: "Add paywalls to your iOS app's in one line of code! With RevenueCat Paywalls you can remotely configure and edit your entire paywall view without waiting on App Review.",
        url: "https://www.revenuecat.com/docs/tools/paywalls?utm_medium=sponsored&utm_source=polpiella.dev&utm_campaign=general_sponsorship&utm_content=revenuecat-paywalls-banner"
    },
    "helm": {
        color: "#4b9edb",
        darkModeImage: "/assets/sponsors/helm.webp",
        lightModeImage: "/assets/sponsors/helm.webp",
        title: "Build with Xcode, Ship with Helm.",
        body: "A native macOS app for App Store Connect that streamlines app updates and releases, making the process faster and easier.",
        url: "https://apps.apple.com/us/app/helm-for-app-store-connect/id6479357934?mt=12&pt=670995&ct=website"
    }
}

const SPONSORS_SCHEDULE = {
    "28": SPONSORS.revenuecat,
    "32": SPONSORS.revenuecat,
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
  }

export const getSponsor = (day: Date) => {
    return SPONSORS_SCHEDULE[getWeekNumber(day)] || SPONSORS.helm;
}