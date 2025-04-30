"use client"

import { useEffect, useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccess(true)
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitSuccess(false)
            }, 5000)
        }, 1500)
    }

    return (
        <div className="pt-17 pb-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Have questions or need assistance? We're here to help. Reach out to our team through any of the channels
                            below.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                            {submitSuccess && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                    Thank you for your message! We'll get back to you shortly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-orange-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Location</h3>
                                        <p className="text-gray-700">
                                            VeloRent Headquarters
                                            <br />
                                            123 Business Park, Andheri East
                                            <br />
                                            Mumbai, Maharashtra 400069
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-orange-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone Numbers</h3>
                                        <p className="text-gray-700">
                                            Customer Support: +91 1800-123-4567
                                            <br />
                                            Bookings: +91 1800-987-6543
                                            <br />
                                            Corporate Inquiries: +91 22-4567-8901
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-orange-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Addresses</h3>
                                        <p className="text-gray-700">
                                            General Inquiries: info@velorent.com
                                            <br />
                                            Customer Support: support@velorent.com
                                            <br />
                                            Business Opportunities: business@velorent.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-orange-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                                        <p className="text-gray-700">
                                            Monday - Friday: 9:00 AM - 8:00 PM
                                            <br />
                                            Saturday: 9:00 AM - 6:00 PM
                                            <br />
                                            Sunday: 10:00 AM - 4:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us on the Map</h2>
                    <div className="h-96 bg-gray-200 rounded-xl overflow-hidden">
                        {/* In a real implementation, you would embed a Google Map or similar here */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <p className="text-gray-500">Map Placeholder - Google Maps would be embedded here</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-700 max-w-3xl mx-auto">
                            Find quick answers to common questions about our services below. If you don't see what you're looking for,
                            please contact us directly.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">How do I make a reservation?</h3>
                            <p className="text-gray-700">
                                You can make a reservation through our website, mobile app, or by calling our booking number. Simply
                                select your pickup and drop-off locations, dates, and choose your preferred vehicle.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">What documents do I need to rent a car?</h3>
                            <p className="text-gray-700">
                                You'll need a valid driver's license, a credit card in your name, and a government-issued ID.
                                International customers may need additional documentation.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Can I modify or cancel my reservation?</h3>
                            <p className="text-gray-700">
                                Yes, you can modify or cancel your reservation through your account or by contacting our customer
                                service. Please note that cancellation fees may apply depending on how close to the pickup time you
                                cancel.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Is insurance included in the rental price?</h3>
                            <p className="text-gray-700">
                                Basic insurance is included in all our rentals. Additional coverage options are available at the time of
                                booking for your peace of mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
