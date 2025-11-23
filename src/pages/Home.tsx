import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Vote, Shield, Users, TrendingUp, CheckCircle, ArrowRight, UserCircle, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Voting",
      description: "Military-grade encryption ensures your vote is safe and confidential."
    },
    {
      icon: Users,
      title: "Easy Access",
      description: "Vote from anywhere, anytime using your verified National ID."
    },
    {
      icon: TrendingUp,
      title: "Real-time Results",
      description: "Track election results transparently as they happen."
    },
    {
      icon: CheckCircle,
      title: "Verified System",
      description: "Fully transparent and auditable voting process."
    }
  ];

  const userTypes = [
    {
      icon: Vote,
      title: "Voters",
      description: "Cast your vote securely in local and national elections",
      loginLink: "/voter-login",
      registerLink: "/voter-register",
    },
    {
      icon: Flag,
      title: "Political Parties",
      description: "Manage candidates and track election performance",
      loginLink: "/party-login",
      registerLink: "/party-register",
    },
    {
      icon: UserCircle,
      title: "Administrators",
      description: "Oversee elections and manage the voting system",
      loginLink: "/admin-login",
      registerLink: null,
    }
  ];

  const stats = [
    { value: "50,000+", label: "Registered Voters" },
    { value: "150+", label: "Political Parties" },
    { value: "25+", label: "Elections Conducted" },
    { value: "99.9%", label: "System Uptime" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden gradient-mesh">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Secure Online Voting for{" "}
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Democratic Elections
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              A transparent, accessible, and secure platform enabling citizens to participate in elections from anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/voter-register">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-200 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  Register to Vote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] font-medium hover:bg-secondary/80 transition-all duration-200">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Access Your Portal</h2>
            <p className="text-lg text-muted-foreground">
              Choose your role to access the appropriate dashboard
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {userTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={index} 
                  className="group border border-border/50 hover:border-primary/50 hover:shadow-hover transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    
                    <h3 className="font-bold text-xl mb-3 text-center text-foreground">{type.title}</h3>
                    <p className="text-muted-foreground text-sm text-center mb-6 leading-relaxed">
                      {type.description}
                    </p>
                    
                    <div className="space-y-2">
                      <Link to={type.loginLink} className="block">
                        <Button className="w-full font-medium bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                          Login
                        </Button>
                      </Link>
                      {type.registerLink && (
                        <Link to={type.registerLink} className="block">
                          <Button variant="outline" className="w-full font-medium hover:bg-secondary/80">
                            Register
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose VoteOnline?</h2>
            <p className="text-lg text-muted-foreground">
              Built with security, transparency, and accessibility in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group border border-border/50 hover:border-primary/50 hover:shadow-hover transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6 pb-6 px-5 text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to cast your vote</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Register", desc: "Create your secure account using verified credentials" },
              { step: "2", title: "Verify", desc: "Complete identity verification for secure access" },
              { step: "3", title: "Vote", desc: "Cast your vote and track results in real-time" }
            ].map((item, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="bg-gradient-to-br from-primary via-purple-600 to-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-primary/30">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Participate?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join thousands of citizens using VoteOnline for secure and transparent democratic participation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/voter-register">
              <Button size="lg" className="w-full sm:w-auto min-w-[180px] font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-200 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                Register Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[180px] font-medium hover:bg-background transition-all duration-200">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
