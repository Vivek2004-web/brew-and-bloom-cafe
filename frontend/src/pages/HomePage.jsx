import HeroSection from '../components/home/HeroSection'
import FeaturedSection from '../components/home/FeaturedSection'
import AboutSection from '../components/home/AboutSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import SpecialOffersSection from '../components/home/SpecialOffersSection'
import GallerySection from '../components/home/GallerySection'
import NewsletterSection from '../components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <SpecialOffersSection />
      <TestimonialsSection />
      <GallerySection />
      <NewsletterSection />
    </div>
  )
}
