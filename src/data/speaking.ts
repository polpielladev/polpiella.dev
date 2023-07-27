export interface SpeakingEngagement {
  eventName: string
  image?: string
  startDate: Date
  endDate: Date
  link: string
  title: string
  description: string
}

export const speakingEngagements: SpeakingEngagement[] = [
  {
    eventName: '❓ TBA ❓',
    startDate: new Date('December 2023'),
    endDate: new Date('December 2023'),
    link: '/speaking',
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
    startDate: new Date('2023-09-04'),
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
    link: 'https://www.meetup.com/nsbarcelona/',
    title: 'Delightful UX for Swift CLI applications',
    description: '',
  },
  {
    eventName: 'Swift Heroes',
    image: '/assets/conferences/swiftheroes.webp',
    startDate: new Date('2023-05-04'),
    endDate: new Date('2023-05-05'),
    link: 'https://swiftheroes.com/2023/',
    title: 'Making developer tools with Swift',
    description: '',
  },
  {
    eventName: 'NYSwifty',
    image: '/assets/conferences/nyswifty.webp',
    startDate: new Date('2023-04-18'),
    endDate: new Date('2023-04-19'),
    link: 'https://nyswifty.com/',
    title: 'Getting started with Xcode Cloud',
    description: '',
  },
  {
    eventName: 'NSManchester',
    image: '/assets/conferences/nsmcr.webp',
    startDate: new Date('2023-02-06'),
    endDate: new Date('2023-02-06'),
    link: 'https://www.meetup.com/nsmanchester/',
    title: 'Serverless Swift: A URL shortener',
    description: '',
  },
  {
    eventName: 'Arc remote engineering job fair LatAm',
    image: '/assets/conferences/arc.webp',
    startDate: new Date('2022-11-17'),
    endDate: new Date('2022-11-17'),
    link: 'https://arc.dev/',
    title: 'Exploring the power of Swift beyond app development',
    description: '',
  },
  {
    eventName: 'Mobile DevOps Summit by Bitrise',
    image: '/assets/conferences/mobile-devops-summit.webp',
    startDate: new Date('2022-11-10'),
    endDate: new Date('2022-11-10'),
    link: 'https://summit.bitrise.io/',
    title: 'Getting ahead of the game: Avoid release day drama!',
    description: '',
  },
  {
    eventName: 'Do iOS Amsterdam',
    image: '/assets/conferences/doios.webp',
    startDate: new Date('2022-11-09'),
    endDate: new Date('2022-11-09'),
    link: 'https://do-ios.com/',
    title: 'Fantastic Swift tools and where to find them',
    description: '',
  },
  {
    eventName: 'NSManchester',
    image: '/assets/conferences/nsmcr.webp',
    startDate: new Date('2022-07-04'),
    endDate: new Date('2022-07-04'),
    link: 'https://www.meetup.com/nsmanchester/',
    title: 'Code generation using Swift Package plugins',
    description: '',
  },
]
