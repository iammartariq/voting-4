import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Users, AlertCircle, CheckCircle, XCircle, Scale } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 mb-4 sm:mb-6">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Agreement to Terms */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Agreement to Terms</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              By accessing and using VoteOnline's online voting platform ("Service"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Service.
            </p>
          </section>

          {/* Eligibility */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Eligibility</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              To use our Service, you must meet the following requirements:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Be at least 18 years of age or the legal voting age in your jurisdiction</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Be a registered voter in good standing</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Provide accurate and complete registration information</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Have legal capacity to enter into binding agreements</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Not be prohibited from accessing the Service under applicable laws</span>
              </li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">User Responsibilities</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              As a user of VoteOnline, you agree to:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Maintain the confidentiality of your account credentials</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Notify us immediately of any unauthorized use of your account</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Provide accurate, current, and complete information during registration</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Use the Service only for lawful voting purposes</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Comply with all applicable local, state, and federal election laws</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Not attempt to manipulate, interfere with, or disrupt the voting process</span>
              </li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-destructive/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Prohibited Activities</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              You are strictly prohibited from:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>Voting more than once in any election</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>Impersonating another voter or providing false identification</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>Attempting to access accounts or votes of other users</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>Using automated systems, bots, or scripts to access the Service</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>Attempting to hack, breach, or circumvent security measures</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>Distributing malware or engaging in phishing activities</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>Harassing, threatening, or intimidating other users</span>
              </li>
            </ul>
          </section>

          {/* Voting Process */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Voting Process & Integrity</h2>
            </div>
            
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2 text-foreground">Vote Casting</h3>
                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
                  <li>All votes are cast anonymously and encrypted</li>
                  <li>Once submitted, votes cannot be changed or revoked</li>
                  <li>You will receive confirmation upon successful vote submission</li>
                  <li>Voting deadlines are strictly enforced</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2 text-foreground">Vote Verification</h3>
                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
                  <li>You can verify that your vote was recorded using your unique verification code</li>
                  <li>The verification process does not reveal your vote choice</li>
                  <li>All votes are auditable while maintaining voter anonymity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Intellectual Property</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The Service and its original content, features, and functionality are owned by VoteOnline and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of our intellectual property without explicit written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-warning/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-warning" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Limitation of Liability</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              To the maximum extent permitted by law, VoteOnline shall not be liable for:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Indirect, incidental, special, or consequential damages</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Loss of data, revenue, or profits</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Service interruptions or technical malfunctions</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Unauthorized access or alteration of your transmissions or data</span>
              </li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Changes to Terms</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after changes become effective constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Contact Information</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Email:</strong> legal@voteonline.com
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Phone:</strong> +92 (111) 123-4567
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Address:</strong> Election Commission, Islamabad, Pakistan
              </p>
            </div>
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

export default TermsOfService;
