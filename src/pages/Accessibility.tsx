import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accessibility as AccessibilityIcon, Eye, Keyboard, Volume2, Monitor, Smartphone, Globe } from "lucide-react";

const Accessibility = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 mb-4 sm:mb-6">
            <AccessibilityIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            Accessibility Statement
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Commitment */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Our Commitment</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              VoteOnline is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure equal access to our online voting platform. We believe that voting is a fundamental right, and everyone should have equal opportunity to participate in the democratic process.
            </p>
          </section>

          {/* Standards Compliance */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Standards & Compliance</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Our platform strives to conform to the following accessibility standards:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">WCAG 2.1 Level AA:</strong> Web Content Accessibility Guidelines</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Section 508:</strong> Rehabilitation Act standards</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">ADA:</strong> Americans with Disabilities Act compliance</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">ARIA:</strong> Accessible Rich Internet Applications practices</span>
              </li>
            </ul>
          </section>

          {/* Visual Accessibility */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Visual Accessibility</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              We provide the following features for users with visual impairments:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Screen Reader Support:</strong> Full compatibility with JAWS, NVDA, and VoiceOver</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">High Contrast Mode:</strong> Enhanced contrast ratios for better readability</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Resizable Text:</strong> Text can be scaled up to 200% without loss of functionality</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Color Independence:</strong> Information is not conveyed by color alone</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Alternative Text:</strong> All images and graphics include descriptive alt text</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Focus Indicators:</strong> Clear visual indicators for keyboard navigation</span>
              </li>
            </ul>
          </section>

          {/* Keyboard Navigation */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Keyboard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Keyboard Navigation</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Our platform is fully navigable using only a keyboard. Key features include:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Tab Navigation:</strong> Logical tab order throughout the interface</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Skip Links:</strong> Quick navigation to main content areas</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Keyboard Shortcuts:</strong> Efficient shortcuts for common actions</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">No Keyboard Traps:</strong> Users can navigate away from any element</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Enter & Space Keys:</strong> All interactive elements respond to standard keys</span>
              </li>
            </ul>
          </section>

          {/* Audio & Captions */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Audio & Multimedia</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              For users with hearing impairments, we provide:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Captions:</strong> All video content includes synchronized captions</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Transcripts:</strong> Text transcripts available for audio content</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Visual Alerts:</strong> Visual alternatives for audio notifications</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Volume Controls:</strong> Adjustable audio levels for all sound elements</span>
              </li>
            </ul>
          </section>

          {/* Device Compatibility */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Device Compatibility</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              VoteOnline is accessible across multiple devices and platforms:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Responsive Design:</strong> Fully functional on desktop, tablet, and mobile devices</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Browser Support:</strong> Compatible with all modern browsers (Chrome, Firefox, Safari, Edge)</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Mobile Accessibility:</strong> Touch-friendly interface with appropriate touch targets</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Assistive Technology:</strong> Works with switch controls and other assistive devices</span>
              </li>
            </ul>
          </section>

          {/* Language Support */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Language & Content</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              We strive to make our content accessible to all users:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Plain Language:</strong> Clear, simple language throughout the platform</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Multiple Languages:</strong> Support for multiple languages and translations</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Consistent Layout:</strong> Predictable and consistent page structure</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Error Prevention:</strong> Clear instructions and error messages</span>
              </li>
            </ul>
          </section>

          {/* Testing & Feedback */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Ongoing Efforts</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              We continuously work to improve accessibility through:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Regular accessibility audits and testing</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>User testing with people who have disabilities</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Staff training on accessibility best practices</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Third-party accessibility reviews and certifications</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Incorporating user feedback into platform improvements</span>
              </li>
            </ul>
          </section>

          {/* Feedback & Support */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Feedback & Support</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              We welcome feedback on the accessibility of VoteOnline. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Email:</strong> accessibility@voteonline.com
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Phone:</strong> +92 (111) 123-4567
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">TTY:</strong> +92 (111) 123-4568
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Mail:</strong> Election Commission, Islamabad, Pakistan
              </p>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-4">
              We aim to respond to accessibility feedback within 2 business days and will work with you to resolve any issues.
            </p>
          </section>

          {/* Back to Home Link */}
          <div className="text-center pt-4 sm:pt-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm sm:text-base font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accessibility;
