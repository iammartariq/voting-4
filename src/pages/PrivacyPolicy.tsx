import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, Database, UserCheck, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 mb-4 sm:mb-6">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Introduction */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Introduction</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              VoteOnline ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online voting platform. Please read this policy carefully to understand our practices regarding your personal data.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Information We Collect</h2>
            </div>
            
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2 text-foreground">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
                  <li>Name, email address, and phone number</li>
                  <li>Government-issued identification numbers for voter verification</li>
                  <li>Date of birth and residential address</li>
                  <li>Authentication credentials (securely encrypted)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2 text-foreground">Voting Data</h3>
                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
                  <li>Your voting selections and participation records</li>
                  <li>Timestamps of voting activities</li>
                  <li>Device and browser information used during voting</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2 text-foreground">Technical Information</h3>
                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground pl-2">
                  <li>IP addresses and geolocation data</li>
                  <li>Browser type, operating system, and device identifiers</li>
                  <li>Usage patterns and interaction with our platform</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">How We Use Your Information</h2>
            </div>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To verify your identity and eligibility to vote</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To process and record your votes securely</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To prevent fraud and ensure election integrity</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To communicate important updates about elections</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To improve our platform's security and functionality</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To comply with legal obligations and regulations</span>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Data Security</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              We implement industry-leading security measures to protect your personal information and voting data:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>End-to-end encryption for all data transmission</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Multi-factor authentication for account access</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Regular security audits and penetration testing</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Blockchain technology for vote verification and immutability</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Secure data centers with 24/7 monitoring</span>
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Your Rights</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Access:</strong> Request a copy of your personal data</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Correction:</strong> Update inaccurate or incomplete information</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Deletion:</strong> Request deletion of your data (subject to legal requirements)</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Portability:</strong> Receive your data in a structured format</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Objection:</strong> Object to certain processing activities</span>
              </li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Contact Us</h2>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Email:</strong> privacy@voteonline.com
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

export default PrivacyPolicy;
