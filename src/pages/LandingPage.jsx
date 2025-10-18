import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/AnimatedBackground'

export default function LandingPage() {
  return (
    <div className="relative">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
