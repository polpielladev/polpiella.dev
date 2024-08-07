export interface SpeakingEngagement {
  eventName: string
  image?: string
  startDate: Date
  endDate: Date
  link: string
  title: string
  description: string
  slides?: string
}

export const speakingEngagements: SpeakingEngagement[] = [
  {
    eventName: 'SwiftLeeds',
    image: '/assets/conferences/swiftleeds.webp',
    startDate: new Date('2023-10-09'),
    endDate: new Date('2023-10-10'),
    link: 'https://swiftleeds.co.uk/',
    title: 'Delightful Swift CLI applications',
    slides: 'https://speakerdeck.com/player/09370784ab234fdf91678dcda0978065',
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
    slides: 'https://speakerdeck.com/player/5a4fa7bae9854fd281cb361041c769d2'
  },
  {
    eventName: 'NSBarcelona',
    image: '/assets/conferences/nsbarcelona.webp',
    startDate: new Date('2023-05-18'),
    endDate: new Date('2023-05-18'),
    link: 'https://www.meetup.com/nsbarcelona/',
    title: 'Delightful UX for Swift CLI applications',
    description: '',
    slides: 'https://speakerdeck.com/player/7c5b4f8dae014d1bb792c159b44bda3e'
  },
  {
    eventName: 'Swift Heroes',
    image: '/assets/conferences/swiftheroes.webp',
    startDate: new Date('2023-05-04'),
    endDate: new Date('2023-05-05'),
    link: 'https://swiftheroes.com/2023/',
    title: 'Making developer tools with Swift',
    description: '',
    slides: 'https://speakerdeck.com/player/2d1477649d124deaa1a9db6e5857e68f'
  },
  {
    eventName: 'NYSwifty',
    image: '/assets/conferences/nyswifty.webp',
    startDate: new Date('2023-04-18'),
    endDate: new Date('2023-04-19'),
    link: 'https://nyswifty.com/',
    title: 'Getting started with Xcode Cloud',
    description: '',
    slides: 'https://speakerdeck.com/player/f487181e20a34cb7bbe5300df06a90e6'
  },
  {
    eventName: 'NSManchester',
    image: '/assets/conferences/nsmcr.webp',
    startDate: new Date('2023-02-06'),
    endDate: new Date('2023-02-06'),
    link: 'https://www.meetup.com/nsmanchester/',
    title: 'Serverless Swift: A URL shortener',
    description: '',
    slides: 'https://speakerdeck.com/player/0a0bf9558fb34649bb47d70c186e5f79'
  },
  {
    eventName: 'Arc remote engineering job fair LatAm',
    image: '/assets/conferences/arc.webp',
    startDate: new Date('2022-11-17'),
    endDate: new Date('2022-11-17'),
    link: 'https://arc.dev/',
    title: 'Exploring the power of Swift beyond app development',
    description: '',
    slides: 'https://speakerdeck.com/player/2fdc68028a9746ea9948f78e0d139572'
  },
  {
    eventName: 'Mobile DevOps Summit by Bitrise',
    image: '/assets/conferences/mobile-devops-summit.webp',
    startDate: new Date('2022-11-10'),
    endDate: new Date('2022-11-10'),
    link: 'https://summit.bitrise.io/',
    title: 'Getting ahead of the game: Avoid release day drama!',
    description: '',
    slides: 'https://speakerdeck.com/player/669e5eb1d34448799ed26dfd64352390'
  },
  {
    eventName: 'Do iOS Amsterdam',
    image: '/assets/conferences/doios.webp',
    startDate: new Date('2022-11-09'),
    endDate: new Date('2022-11-09'),
    link: 'https://do-ios.com/',
    title: 'Fantastic Swift tools and where to find them',
    description: '',
    slides: 'https://speakerdeck.com/player/a48ab1eebcb14c729590d3de18ff277b'
  },
  {
    eventName: 'NSManchester',
    image: '/assets/conferences/nsmcr.webp',
    startDate: new Date('2022-07-04'),
    endDate: new Date('2022-07-04'),
    link: 'https://www.meetup.com/nsmanchester/',
    title: 'Code generation using Swift Package plugins',
    description: '',
    slides: 'https://speakerdeck.com/player/ccb590db5bda4c3c983a8f8396c59c7a'
  },
]
