export interface SpeakingEngagement {
  eventName: string
  image: string
  startDate: Date
  endDate: Date
  link: string
  title: string
  description: string
}

export const speakingEngagements: SpeakingEngagement[] = [
  {
    eventName: '❓ TBA ❓',
    image: '',
    startDate: new Date('December 2023'),
    endDate: new Date('December 2023'),
    link: '',
    title: 'Details coming soon... 👀',
    description: '',
  },
  {
    eventName: 'SwiftLeeds',
    image: '/assets/conferences/swiftleeds.webp',
    startDate: new Date('2023-10-09'),
    endDate: new Date('2023-10-10'),
    link: 'https://swiftleeds.co.uk/',
    title: 'Delightful Swift CLI applications',
    description: '',
  },
  {
    eventName: 'iOS Dev UK',
    image: '/assets/conferences/iosdevuk.webp',
    startDate: new Date('2023-07-07'),
    endDate: new Date('2023-09-07'),
    link: 'https://www.iosdevuk.com/',
    title: 'Making developer tools with Swift',
    description:
      'Learn how you can make cross-platform real-world developer tool systems to accompany iOS and macOS applications using Swift.',
  },
  {
    eventName: 'NSBarcelona',
    image: '/assets/conferences/nsbarcelona.webp',
    startDate: new Date('2023-05-18'),
    endDate: new Date('2023-05-18'),
    link: 'https://www.iosdevuk.com/',
    title: 'Delightful UX for Swift CLI applications',
    description: '',
  },
  {
    eventName: 'Swift Heroes',
    image: '/assets/conferences/swift-heroes.webp',
    startDate: new Date('2023-05-04'),
    endDate: new Date('2023-05-05'),
    link: 'https://www.iosdevuk.com/',
    title: 'Making developer tools with Swift',
    description: '',
  },
  {
    eventName: 'NYSwifty',
    image: '/assets/conferences/nyswifty.webp',
    startDate: new Date('2023-04-18'),
    endDate: new Date('2023-04-19'),
    link: 'https://www.iosdevuk.com/',
    title: 'Getting started with Xcode Cloud',
    description: '',
  },
  {
    eventName: 'NSManchester',
    image: '/assets/conferences/nsmanchester.webp',
    startDate: new Date('2023-02-06'),
    endDate: new Date('2023-02-06'),
    link: 'https://www.iosdevuk.com/',
    title: 'Serverless Swift: A URL shortener',
    description: '',
  },
  {
    eventName: 'Arc remote engineering job fair LatAm',
    image: '/assets/conferences/arc.webp',
    startDate: new Date('2022-11-17'),
    endDate: new Date('2022-11-17'),
    link: 'https://www.iosdevuk.com/',
    title: 'Exploring the power of Swift beyond app development',
    description: '',
  },
  {
    eventName: 'Mobile DevOps Summit by Bitrise',
    image: '/assets/conferences/arc.webp',
    startDate: new Date('2022-11-10'),
    endDate: new Date('2022-11-10'),
    link: 'https://www.iosdevuk.com/',
    title: 'Getting ahead of the game: Avoid release day drama!',
    description: '',
  },
  {
    eventName: 'Do iOS Amsterdam',
    image: '/assets/conferences/do-ios.webp',
    startDate: new Date('2022-11-09'),
    endDate: new Date('2022-11-09'),
    link: 'https://www.iosdevuk.com/',
    title: 'Fantastic Swift tools and where to find them',
    description: '',
  },
  {
    eventName: 'NSManchester',
    image: '/assets/conferences/do-ios.webp',
    startDate: new Date('2022-07-04'),
    endDate: new Date('2022-07-04'),
    link: 'https://www.iosdevuk.com/',
    title: 'Code generation using Swift Package plugins',
    description: '',
  },
]
