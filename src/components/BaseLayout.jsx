import Header from './Header'
import Footer from './Footer'
import Head from './Head'

export default function BaseLayout({ title, description, imageURL, children }) {
  return (
    <html lang="en">
      <Head description={description} title={title} imageURL={imageURL} />
      <body className="flex min-h-screen flex-col justify-between dark:bg-gray-900">
        <Header />
        <main className="flex flex-auto">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
