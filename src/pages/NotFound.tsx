import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="h-screen flex items-center justify-center bg-duo-dark">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-duo-green-200 mb-4">404</h1>
        <p className="text-white text-xl mb-8">Seems you're lost!</p>
        <Link
          to="/"
          className="cta-btn inline-flex items-center justify-center text-duo-dark px-8"
        >
          Go Home
        </Link>
      </div>
    </section>
  )
}
