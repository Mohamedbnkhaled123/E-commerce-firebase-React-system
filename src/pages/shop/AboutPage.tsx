import { Sparkles, Heart, Award, Users } from 'lucide-react';

export const AboutPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-velora-dark sm:text-5xl">
                    About Velora Bags
                </h1>
                <p className="mt-4 text-lg text-velora-text max-w-3xl mx-auto">
                    Discover the story behind Egypt's premier destination for premium, modest fashion accessories.
                </p>
            </div>

            {/* Brand Story */}
            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-serif font-bold text-velora-dark">Our Story</h2>
                    <p className="text-velora-text leading-relaxed">
                        Velora Bags was born from a passion for combining timeless elegance with contemporary modest fashion.
                        We believe that every woman deserves accessories that reflect her grace, sophistication, and values.
                    </p>
                    <p className="text-velora-text leading-relaxed">
                        Based in Egypt, we carefully curate and craft each piece to ensure it meets the highest standards
                        of quality and design. Our collections celebrate femininity while honoring modesty, offering pieces
                        that seamlessly blend into the modern woman's wardrobe.
                    </p>
                    <p className="text-velora-text leading-relaxed">
                        From classic leather totes to elegant evening bags, every Velora piece is designed to be more than
                        just an accessory—it's a statement of refined taste and timeless beauty.
                    </p>
                </div>
                <div className="relative">
                    <div className="aspect-square rounded-2xl bg-velora-gradient overflow-hidden shadow-2xl">
                        <img
                            src="/hero-bag.png"
                            alt="Velora Bags Collection"
                            className="h-full w-full object-contain p-8"
                        />
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="mt-24">
                <h2 className="text-3xl font-serif font-bold text-velora-dark text-center mb-12">
                    Our Values
                </h2>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="text-center p-6 rounded-xl bg-velora-bg border border-velora-muted">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-velora text-white mb-4">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-velora-dark mb-2">
                            Premium Quality
                        </h3>
                        <p className="text-sm text-velora-text">
                            We source the finest materials and employ skilled craftsmanship to ensure every piece is exceptional.
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-xl bg-velora-bg border border-velora-muted">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-velora text-white mb-4">
                            <Heart className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-velora-dark mb-2">
                            Modest Elegance
                        </h3>
                        <p className="text-sm text-velora-text">
                            Our designs celebrate modesty without compromising on style, offering sophisticated options for the modern woman.
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-xl bg-velora-bg border border-velora-muted">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-velora text-white mb-4">
                            <Award className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-velora-dark mb-2">
                            Timeless Design
                        </h3>
                        <p className="text-sm text-velora-text">
                            We create pieces that transcend trends, designed to be cherished for years to come.
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-xl bg-velora-bg border border-velora-muted">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-velora text-white mb-4">
                            <Users className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-velora-dark mb-2">
                            Customer Care
                        </h3>
                        <p className="text-sm text-velora-text">
                            Your satisfaction is our priority. We're dedicated to providing exceptional service and support.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="mt-24 bg-velora-gradient rounded-2xl p-12 text-center text-white shadow-xl">
                <h2 className="text-3xl font-serif font-bold mb-6">Our Mission</h2>
                <p className="text-lg leading-relaxed max-w-3xl mx-auto text-white/90">
                    To empower women with elegant, high-quality accessories that honor their values while
                    enhancing their personal style. We strive to be Egypt's leading destination for premium
                    modest fashion, offering pieces that inspire confidence and grace.
                </p>
            </div>

            {/* Contact CTA */}
            <div className="mt-24 text-center">
                <h2 className="text-2xl font-serif font-bold text-velora-dark mb-4">
                    Get in Touch
                </h2>
                <p className="text-velora-text mb-8 max-w-2xl mx-auto">
                    Have questions or want to learn more about our collections? We'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://wa.me/201061187098"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-velora px-6 py-3 font-semibold text-white hover:bg-velora-dark transition-colors shadow-sm"
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        WhatsApp Us
                    </a>
                    <a
                        href="https://www.instagram.com/bags_velora?igsh=MWwzeXhvaTZxcjRtYQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border-2 border-velora px-6 py-3 font-semibold text-velora hover:bg-velora-bg transition-colors"
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Follow on Instagram
                    </a>
                </div>
            </div>
        </div>
    );
};
