import Header from './Header'
import Footer from './Footer'
import Head from './Head'

export default function BaseLayout({ title, description, imageURL, children }) {
  return (
    <html lang="en">
      <Head description={description} title={title} imageURL={imageURL} />
      <body class="dark:bg-gray-900 min-h-screen flex flex-col justify-between">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}