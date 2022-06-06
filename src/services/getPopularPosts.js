export default async function getPopularPosts() {
  const queryParameters = new URLSearchParams({
    entity: 'pageview',
    entity_id: import.meta.env.FATHOM_ENTITY_ID,
    aggregates: 'uniques',
    field_grouping: 'pathname',
    sort_by: 'uniques:desc',
    pathname: '/',
  })

  const url =
    'https://api.usefathom.com/v1/aggregations?' +
    queryParameters +
    '&' +
    'filters=%5B%0A%09%09%09%7B%0A%09%09%09%09%09%22property%22%3A%20%22pathname%22,%0A%09%09%09%09%09%22operator%22%3A%20%22is%20like%22,%0A%09%09%09%09%09%22value%22%3A%20%22%2F*-*%22%0A%09%09%09%7D%0A%5D'

  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + import.meta.env.FATHOM_BEARER_TOKEN,
    },
  })

  const posts = await response.json()

  const sortedPosts = []

  posts.forEach((post) => {
    const slug = post.pathname.replaceAll('/', '')
    const uniqueVisits = parseInt(post.uniques)
    const index = sortedPosts.findIndex((post) => post.slug == slug)

    if (sortedPosts[index]) {
      sortedPosts[index].uniques += uniqueVisits
    } else {
      sortedPosts.push({ uniques: uniqueVisits, slug })
    }
  })

  return sortedPosts
    .sort((postA, postB) => postB.uniques - postA.uniques)
    .slice(0, 3)
}
