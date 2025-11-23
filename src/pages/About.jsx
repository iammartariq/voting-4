import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Users, Lock, CheckCircle, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Encrypted",
      description: "Military-grade encryption protects every vote and ensures data integrity throughout the voting process."
    },
    {
      icon: Eye,
      title: "Transparent Process",
      description: "Open and verifiable voting system that maintains transparency while protecting voter privacy."
    },
    {
      icon: Users,
      title: "Accessible to All",
      description: "User-friendly interface designed to make voting accessible for citizens of all technical abilities."
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Your vote is completely anonymous and confidential, protected by advanced security measures."
    },
    {
      icon: CheckCircle,
      title: "Verified & Auditable",
      description: "Every vote is verified and the entire process is auditable to ensure election integrity."
    },
    {
      icon: Globe,
      title: "Vote from Anywhere",
      description: "Cast your vote from any location with internet access, making democracy more convenient."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section with Gradient */}
        <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540910419868-474945984c55?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              About VoteOnline
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto font-light leading-relaxed">
              Empowering democracy through secure, transparent, and accessible online voting technology.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Our Mission</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To revolutionize the democratic process by providing a secure, reliable, and user-friendly 
                online voting platform that makes participation in elections more accessible than ever before.
              </p>
            </div>

            <Card className="shadow-lg border-none bg-secondary/30">
              <CardContent className="pt-8 px-8 md:px-12">
                <p className="text-muted-foreground text-lg leading-loose mb-6">
                  VoteOnline was created with the vision of modernizing democratic participation for the digital age. 
                  We understand that traditional voting methods can present barriers to participation, whether through 
                  physical accessibility issues, time constraints, or geographical limitations.
                </p>
                <p className="text-muted-foreground text-lg leading-loose mb-6">
                  Our platform leverages cutting-edge security technology and user-centered design to ensure that 
                  every eligible voter can exercise their democratic right conveniently and securely. We believe 
                  that democracy thrives when participation is made easy and accessible to all.
                </p>
                <p className="text-muted-foreground text-lg leading-loose">
                  By combining blockchain technology, end-to-end encryption, and rigorous verification processes, 
                  we've created a system that is both highly secure and completely transparent, maintaining the 
                  integrity of the democratic process while protecting individual privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-secondary/30 border-y border-border">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose VoteOnline</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built on principles of security, transparency, and accessibility to ensure every voice is counted.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="group shadow-sm hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20">
                    <CardContent className="pt-8 pb-8 px-6">
                      <div className="bg-primary/5 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Icon className="h-7 w-7 text-primary group-hover:text-white" />
                      </div>
                      <h3 className="font-semibold text-xl mb-3 tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground">The pillars that support our platform.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Security First</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We employ the highest standards of cybersecurity to protect every vote. Our system uses 
                  multi-factor authentication and encryption.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Transparency</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our open and verifiable processes ensure that all stakeholders can trust the integrity of 
                  the voting system.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                    <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Inclusivity</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We're committed to making voting accessible to everyone, regardless of location, physical 
                  ability, or technical expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Be Part of the Future?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of citizens who are already using VoteOnline to make their voices heard.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;