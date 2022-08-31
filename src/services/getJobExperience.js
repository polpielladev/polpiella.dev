const JOB_EVENTS = [
  {
    title: 'Senior iOS Developer',
    image: '/assets/iplayer.svg',
    background: 'black',
    company: 'BBC iPlayer',
    description:
      'As a senior engineer I took more of a leading role in the architecture and drive of new features. I also started mentoring an engineer from a different team and got involved in leading a cross-product guild aimed at exploring how we could more effectively use SwiftUI across our products.',
    startDate: 'June 2022',
    endDate: 'Present',
  },
  {
    title: 'iOS Developer',
    image: '/assets/iplayer.svg',
    background: 'black',
    company: 'BBC iPlayer',
    description:
      'Worked in a team of iOS engineers focused on maintaining and developing new features for the iPlayer app, consumed by millions of monthly users in the UK. During my time here, I have worked in multiple modularisation projects and effectively dealing with legacy Objective-C code, as well as doing a lot of work to improve the CI systems and being part of the cross-product CI guild.',
    startDate: 'September 2021',
    endDate: 'June 2022',
  },
  {
    title: 'iOS Developer',
    image: '/assets/student-beans.png',
    background: '#8edae2',
    company: 'Student Beans',
    description:
      'Worked on a very fast-paced environment releasing new features and refactoring legacy code to bring it up to speed with our coding standards. I lead projects such as implementing a fully-fledged A/B testing and remote config system in our iOS client as welll as improving our CI pull requests pipelines to automate processes such as linting, inline warnings, etc.',
    startDate: 'April 2020',
    endDate: 'September 2021',
  },
  {
    title: 'iOS Developer',
    image: '/assets/midas.png',
    background: '#133e74',
    company: 'Music Tribe',
    description:
      'Worked on developing companion apps for music technology products such as mixing desks and audio interfaces. As well as developing a native iOS application using Swift, I worked on a React-based login flow that run within a Chromium embedded browser in a mixing console.',
    startDate: 'July 2018',
    endDate: 'April 2020',
  },
]

export default function getJobExperience() {
  return JOB_EVENTS
}
