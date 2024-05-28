export const BITES_CATEGORIES = Object.freeze({
    "unit-testing": {
        emoji: "🧪",
        name: "Unit Testing",
        background: "bg-green-400/30",
        hoverColor: "bg-green-400/50",
        emojiBackground: "bg-green-600/30",
    },
    swiftui: {
        emoji: "👨‍🎨",
        name: "SwiftUI",
        background: "bg-gray-400/30",
        hoverColor: "bg-gray-400/90",
        emojiBackground: "bg-gray-600/30",
    },
    "xcode-cloud": {
        emoji: "🌩",
        name: "Xcode Cloud",
        background: "bg-blue-400/30",
        hoverColor: "bg-blue-400/90",
        emojiBackground: "bg-blue-600/30",
    },
    swift: {
        emoji: "🐦",
        name: "Swift",
        background: "bg-orange-400/30",
        hoverColor: "bg-orange-400/90",
        emojiBackground: "bg-orange-600/30",
    },
    "github-actions": {
        emoji: "🤖",
        name: "GitHub Actions",
        background: "bg-lime-400/30",
        hoverColor: "bg-lime-400/90",
        emojiBackground: "bg-lime-600/30",
    },
    "core-data": {
        emoji: "💾",
        name: "Core Data",
        background: "bg-purple-400/30",
        hoverColor: "bg-purple-400/90",
        emojiBackground: "bg-purple-600/30",
    },
    "app-store-connect-api": {
        emoji: "🔗",
        name: "App Store Connect API",
        background: "bg-cyan-400/30",
        hoverColor: "bg-cyan-400/90",
        emojiBackground: "bg-cyan-600/30",
    },
    cli: {
        emoji: "🖥",
        name: "Command Line",
        background: "bg-fuchsia-400/30",
        hoverColor: "bg-fuchsia-400/90",
        emojiBackground: "bg-fuchsia-600/30",
    },
    musickit: {
        emoji: "🎸",
        name: "MusicKit",
        background: "bg-pink-400/30",
        hoverColor: "bg-pink-400/90",
        emojiBackground: "bg-pink-600/30",
    },
    "swift-package-manager": {
        emoji: "📦",
        name: "Swift Package Manager",
        background: "bg-amber-400/30",
        hoverColor: "bg-amber-400/90",
        emojiBackground: "bg-amber-600/30",
    },
});

export const POST_CATEGORIES = Object.freeze({
    "app-kit": {
        name: "AppKit",
        description: "AppKit is a graphical user interface toolkit on macOS. It is the original macOS development framework, and provides the basic building blocks for application development.",
        color: "#fda4af"
    },
    "spm": {
        name: "Swift Package Manager",
        description: "The Swift Package Manager is a tool for managing the distribution of Swift code. It’s integrated with the Swift build system to automate the process of downloading, compiling, and linking dependencies.",
        color: "#f9a8d4"
    },
    "tools": {
        name: "Tools",
        description: "Tools and utilities to help you with your development workflow built using Swift.",
        color: "#f0abfc"
    },
    "asc": {
        name: "App Store Connect API",
        description: "Streamline your app development and distribution workflow using the App Store Connect API.",
        color: "#d8b4fe"
    },
    "swiftui": {
        name: "SwiftUI",
        description: "SwiftUI is a modern way to declare user interfaces for any Apple platform. Create beautiful, dynamic apps faster than ever before.",
        color: "#c4b5fd"
    },
    "testing": {
        name: "Testing",
        description: "Unit testing, UI testing, and performance testing your Swift code.",
        color: "#a5b4fc"
    },
    "server-side": {
        name: "Server-Side Swift",
        description: "Learn how to build server-side applications using Swift.",
        color: "#93c5fd"
    },
    "ci-cd": {
        name: "CI/CD",
        description: "Continuous Integration and Continuous Deployment for your Swift projects.",
        color: "#7dd3fc"

    },
    "github-actions": {
        name: "GitHub Actions",
        description: "Automate your workflow from idea to production using GitHub's CI/CD platform.",
        color: "#67e8f9"
    },
    "accessibility": {
        name: "Accessibility",
        description: "Make your apps accessible to everyone using SwiftUI and UIKit.",
        color: "#5eead4"
    },
    "uikit": {
        name: "UIKit",
        description: "UIKit is the framework you use to construct and manage a graphical, event-driven user interface for iOS or tvOS apps.",
        color: "#6ee7b7"
    },
    "swift-data": {
        name: "Swift Data",
        description: "How to handle persistence using Swift Data on your projects for Apple platforms.",
        color: "#86efac"
    },
    "core-data": {
        name: "Core Data",
        description: "How to handle persistence using Core Data on your projects for Apple platforms.",
        color: "#bef264"
    },
    "xcode-cloud": {
        name: "Xcode Cloud",
        description: "Automate your workflow from idea to production using Apple's CI/CD platform.",
        color: "#fde047"
    },
    "swift-6": {
        name: "Swift 6",
        description: "Here you can find all you need to know about to get ready for the Swift 6 language mode.",
        color: "#fcd34d"
    },
    "swift": {
        name: "Swift",
        description: "Swift is a powerful and intuitive programming language for macOS, iOS, watchOS, and tvOS.",
        color: "#fdba74"
    },
    "fastlane": {
        name: "Fastlane",
        description: "Fastlane is a tool that automates the building and releasing of iOS and Android apps.",
        color: "#fca5a5"
    },
    "ml": {
        name: "ML/AI",
        description: "Machine Learning and Core ML for your Swift projects.",
        color: "#d6d3d1"
    },
    "career": {
        name: "Career",
        description: "Tips and tricks to help you grow your career as an iOS developer.",
        color: "#e9d1d1"
    },
    "performance": {
        name: "Performance",
        description: "Optimize your Swift code for better performance.",
        color: "#cbd5e1"
    }
});

import { getCollection } from "astro:content";

export const getAllCategories = async () => {
    const posts = await getCollection("blog")    

    return posts.reduce((acc, post) => {
        if (post.data.tags) {
            post.data.tags.forEach((category) => {
                if (!acc.some(item => item.slug === category)) {
                    const categoryData = POST_CATEGORIES[category]
                    if (categoryData) {
                        acc.push({ ...categoryData, slug: category })
                    }
                }
            })
        }
        return acc
    }, [])
}
