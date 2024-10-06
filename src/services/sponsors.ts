const SPONSORS = {
    "revenuecat": {
        color: "#f2545b",
        images: {
            large: {
                darkModeImage: "/assets/sponsors/rc.png",
                lightModeImage: "/assets/sponsors/rc.png",
                aspectRatio: 1
            },
            small: {
                darkModeImage: "/assets/sponsors/rc.png",
                lightModeImage: "/assets/sponsors/rc.png",
                aspectRatio: 1
            }
        },
        title: "RevenueCat Paywalls",
        body: "Add paywalls to your iOS app's in one line of code! With RevenueCat Paywalls you can remotely configure and edit your entire paywall view without waiting on App Review.",
        url: "https://www.revenuecat.com/docs/tools/paywalls?utm_medium=sponsored&utm_source=polpiella.dev&utm_campaign=general_sponsorship&utm_content=revenuecat-paywalls-banner"
    },
    "helm": {
        color: "#4b9edb",
        images: {
            large: {
                darkModeImage: "/assets/sponsors/helm.webp",
                lightModeImage: "/assets/sponsors/helm.webp",
                aspectRatio: 1
            },
            small: {
                darkModeImage: "/assets/sponsors/helm.webp",
                lightModeImage: "/assets/sponsors/helm.webp",
                aspectRatio: 1
            }
        },
        title: "Build with Xcode, Ship with Helm.",
        body: "A native macOS app for App Store Connect that streamlines app updates and releases, making the process faster and easier.",
        url: "https://apps.apple.com/us/app/helm-for-app-store-connect/id6479357934?mt=12&pt=670995&ct=website"
    },
    "runwayRollbacks": {
        color: "#7C3AED",
        images: {
            large: {
                darkModeImage: "/assets/sponsors/runway-rollbacks.gif",
                lightModeImage: "/assets/sponsors/runway-rollbacks.gif",
                aspectRatio: 1
            },
            small: {
                darkModeImage: "/assets/sponsors/runway-rollbacks.gif",
                lightModeImage: "/assets/sponsors/runway-rollbacks.gif",
                aspectRatio: 1
            }
        },
        title: "Relax, you can roll back your mobile release",
        body: "No one is immune from shipping critical bugs to production, but Runway helps you limit the amount of havoc that can cause.",
        url: "https://get.runway.team/fix-rollbacks-for-mobile?utm_source=pol&utm_medium=blog&utm_campaign=julysponsors"
    },
    "runwayPileUp": {
        color: "#7C3AED",
        images: {
            large: {
                darkModeImage: "https://d2thv89fb05cma.cloudfront.net/polpiella.dev/images/sponsors/build-or-ship.png",
                lightModeImage: "https://d2thv89fb05cma.cloudfront.net/polpiella.dev/images/sponsors/build-or-ship.png",
                aspectRatio: 1
            },
            small: {
                darkModeImage: "https://d2thv89fb05cma.cloudfront.net/polpiella.dev/images/sponsors/build-or-ship.png",
                lightModeImage: "https://d2thv89fb05cma.cloudfront.net/polpiella.dev/images/sponsors/build-or-ship.png",
                aspectRatio: 1
            }
        },
        title: "Releases so easy your work will never pile up",
        body: "Runway handles the release coordination and busywork so you can focus on building great apps. You do the building, we'll do the shipping.",
        url: "https://get.runway.team/build-or-ship?utm_source=pol&utm_medium=blog&utm_campaign=septembersponsors"
    },
    "codemagic": {
        color: "#0051FF",
        images: {
            large: {
                darkModeImage: "/assets/sponsors/codemagic-wordmark-white.svg",
                lightModeImage: "/assets/sponsors/codemagic-wordmark-blue.svg",
                aspectRatio: 2
            },
            small: {
                darkModeImage: "/assets/sponsors/codemagic-star.svg",
                lightModeImage: "/assets/sponsors/codemagic-star.svg",
                aspectRatio: 1
            }
        },
        title: "Codemagic CI/CD for mobile teams",
        body: "What do you get when you put love for iOS and DevOps together? Answer: Codemagic CI/CD",
        url: "https://codemagic.io/start/?utm_source=polpielladev&utm_medium=advertisement&utm_campaign=codemagic"
    },
    "codemagicM2": {
        color: "#0051FF",
        images: {
            large: {
                darkModeImage: "/assets/sponsors/codemagic-wordmark-white.svg",
                lightModeImage: "/assets/sponsors/codemagic-wordmark-blue.svg",
                aspectRatio: 2
            },
            small: {
                darkModeImage: "/assets/sponsors/codemagic-star.svg",
                lightModeImage: "/assets/sponsors/codemagic-star.svg",
                aspectRatio: 1
            }
        },
        title: "Codemagic makes Apple M2 machines available, even on the free tier!",
        body: "Codemagic is the first CI/CD to make Apple M2 machines available to everyone (including the free tier!). This is a free upgrade from M1 machines with no price change.",
        url: "https://codemagic.io/start/?utm_source=polpielladev&utm_medium=advertisement&utm_campaign=codemagic"
    }
}

const SPONSORS_SCHEDULE = {
    "28": SPONSORS.revenuecat,
    "29": SPONSORS.runwayRollbacks,
    "30": SPONSORS.runwayRollbacks,
    "31": SPONSORS.codemagic,
    "32": SPONSORS.revenuecat,
    "33": SPONSORS.runwayRollbacks,
    "34": SPONSORS.runwayRollbacks,
    "35": SPONSORS.runwayRollbacks,
    "36": SPONSORS.codemagic,
    "37": SPONSORS.runwayRollbacks,
    "38": SPONSORS.runwayRollbacks,
    "39": SPONSORS.runwayPileUp,
    "40": SPONSORS.runwayPileUp,
    "41": SPONSORS.codemagicM2
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