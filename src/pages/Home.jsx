import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Vote, Shield, Users, TrendingUp, CheckCircle, Lock, ArrowRight, UserCircle, Flag } from "lucide-react";
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
      description: "Track election results transparently as they happen with live updates."
    },
    {
      icon: CheckCircle,
      title: "Verified System",
      description: "A fully transparent and auditable voting process you can trust."
    }
  ];

  const userTypes = [
    {
      icon: Vote,
      title: "Voters",
      description: "Cast your vote securely in local and national elections",
      loginLink: "/voter-login",
      registerLink: "/voter-register",
      color: "blue"
    },
    {
      icon: Flag,
      title: "Political Parties",
      description: "Manage candidates and track election performance",
      loginLink: "/party-login",
      registerLink: "/party-register",
      color: "purple"
    },
    {
      icon: UserCircle,
      title: "Administrators",
      description: "Oversee elections and manage the voting system",
      loginLink: "/admin-login",
      registerLink: null,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden bg-background border-b border-border/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now live for 2024 Elections
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Vote Smart. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Vote Online.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Your voice matters. Participate in secure, transparent democratic elections from the comfort of your home using our verified platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link to="/voter-register">
              <Button size="lg" className="min-w-[200px] h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Register to Vote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/voter-login">
              <Button size="lg" variant="outline" className="min-w-[200px] h-12 text-base hover:bg-secondary">
                Voter Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Types Section - NEW */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Access Your Portal</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose your role to access the appropriate dashboard and features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {userTypes.map((type, index) => {
              const Icon = type.icon;
              const colorClasses = {
                blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
                green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              };
              
              return (
                <Card key={index} className="border-2 shadow-lg hover:shadow-2xl transition-all duration-300 bg-background group">
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className={`bg-gradient-to-br ${colorClasses[type.color]} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-2xl mb-3 text-center">{type.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed text-center mb-6">
                      {type.description}
                    </p>
                    <div className="space-y-3">
                      <Link to={type.loginLink} className="block">
                        <Button variant="default" className="w-full">
                          Login
                        </Button>
                      </Link>
                      {type.registerLink && (
                        <Link to={type.registerLink} className="block">
                          <Button variant="outline" className="w-full">
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
      <section className="py-24 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Why Choose VoteOnline?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine cutting-edge security with user-friendly design to ensure every vote counts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-background">
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
            <div className="pt-8 md:pt-0">
              <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter">50K+</div>
              <div className="text-primary-foreground/80 font-medium">Registered Voters</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter">150+</div>
              <div className="text-primary-foreground/80 font-medium">Political Parties</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter">25+</div>
              <div className="text-primary-foreground/80 font-medium">Elections Conducted</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter">99.9%</div>
              <div className="text-primary-foreground/80 font-medium">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Simple steps to make your voice heard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-border -z-10"></div>

            <div className="text-center group">
              <div className="bg-background border-2 border-primary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                1
              </div>
              <h3 className="font-semibold text-xl mb-3">Register</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sign up securely using your verified National ID card number or party credentials.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-background border-2 border-primary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                2
              </div>
              <h3 className="font-semibold text-xl mb-3">Login & Participate</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access your secure dashboard to vote or manage your political party.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-background border-2 border-primary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                3
              </div>
              <h3 className="font-semibold text-xl mb-3">Track Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                View real-time election results and verify your voting history or party performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-secondary/30 border-t border-border">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="bg-background p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join thousands of citizens and political organizations who trust our platform for secure and transparent voting. Registration takes less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/voter-register">
                <Button size="lg" className="min-w-[180px] shadow-md">Get Started Today</Button>
             </Link>
             <Link to="/about">
                <Button size="lg" variant="outline" className="min-w-[180px]">Learn More</Button>
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;