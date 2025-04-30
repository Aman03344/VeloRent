import { Car, Shield, Award, Clock, Users, Globe } from "lucide-react"
import { useEffect } from "react"
import teamImage from "../assets/teamImage.png"
import boyImage2 from "../assets/boy2.png"
import boyImage1 from "../assets/boyimage1.png"
import girlImage from "../assets/girl.png"


const About = () => {


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="pt-17 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About VeloRent</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We're on a mission to revolutionize the car rental experience with transparency, convenience, and
              exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2020, VeloRent began with a simple idea: make car rentals hassle-free. We noticed that
                traditional car rental services were often complicated, with hidden fees and lengthy paperwork.
              </p>
              <p className="text-gray-700 mb-4">
                Our founders, a team of tech enthusiasts and travel lovers, decided to create a platform that puts
                customer convenience first. We started with just 10 cars in Mumbai, and today we operate in over 20
                cities across India with a fleet of 500+ vehicles.
              </p>
              <p className="text-gray-700">
                What sets us apart is our commitment to transparency, quality, and customer satisfaction. Every car in
                our fleet undergoes rigorous maintenance checks, and our booking process is designed to be as simple as
                possible.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={teamImage}
                alt="VeloRent team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              At VeloRent, our values guide everything we do. They shape our culture, inform our decisions, and help us
              deliver the best possible experience to our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trust & Transparency</h3>
              <p className="text-gray-700">
                We believe in clear communication and no hidden fees. What you see is what you get, always.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Service</h3>
              <p className="text-gray-700">
                From our well-maintained vehicles to our responsive customer support, quality is at the heart of
                everything we do.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Convenience</h3>
              <p className="text-gray-700">
                We're constantly innovating to make the rental process faster, simpler, and more convenient for our
                customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose VeloRent</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We're not just another car rental service. Here's what makes us different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Car className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Diverse Fleet</h3>
                <p className="text-gray-700">
                  From economy cars to luxury SUVs, we have a wide range of well-maintained vehicles to suit every need
                  and budget.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Exceptional Support</h3>
                <p className="text-gray-700">
                  Our customer service team is available 24/7 to assist you with any questions or concerns.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive Insurance</h3>
                <p className="text-gray-700">
                  All our rentals come with comprehensive insurance coverage for your peace of mind.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nationwide Presence</h3>
                <p className="text-gray-700">
                  With locations in over 20 cities, we're available wherever your journey takes you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              The passionate individuals driving VeloRent's mission forward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "CEO & Co-Founder",
                image: boyImage1
              },
              {
                name: "Priya Patel",
                role: "COO & Co-Founder",
                image: girlImage
              },
              {
                name: "Vikram Singh",
                role: "CTO",
                image: boyImage2
              },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-[400px] object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience VeloRent?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who choose VeloRent for their travel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Browse Cars
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
