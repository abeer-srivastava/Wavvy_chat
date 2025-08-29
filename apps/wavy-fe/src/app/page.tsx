"use client"
import { useState, useEffect } from 'react';
import {  Users, Shield, Zap, ArrowRight, Star, Play } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const router=useRouter()
  const handleSignupbutton=()=>{
    router.replace("/signup")
  }

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate active feature
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    
    // Simulate live message count

    return () => {
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: Users,
      title: "Smart Group Rooms",
      description: "Create unlimited rooms with intelligent organization. Invite members, set permissions, and manage conversations effortlessly.",
      highlight: "Unlimited Rooms"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Messages delivered instantly with our optimized real-time infrastructure. Experience zero-lag communication.",
      highlight: "Sub-100ms Latency"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "End-to-end encryption ensures your conversations remain private. Your data, your control.",
      highlight: "256-bit Encryption"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground transition-colors duration-300">
      {/* Navbar */}
      <Navbar />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-border rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-main/30 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-main/10 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-8 md:px-16 lg:px-24 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className={`md:w-1/2 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>

          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Chat Smarter 
            <br />
            with <span className="text-main relative">
              Wavy Chat
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-main/30 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Connect instantly with your friends, classmates, or team members in 
            dedicated rooms. Real-time group messaging made simple, fast, and secure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="group px-8 py-4 bg-main text-main-foreground font-semibold rounded-2xl shadow-shadow hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button >
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-main fill-current" />
              ))}
            </div>
            <span>4.9/5 from 2,000+ reviews</span>
          </div>
        </div>

        <div className={`md:w-1/2 flex justify-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          {/* Interactive Chat Preview */}
          <div className="w-full max-w-md">
            <div className="bg-secondary-background border border-border rounded-3xl p-6 shadow-shadow">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-main rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-main-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Study Group</h4>
                    <p className="text-sm text-muted-foreground">5 members online</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              {/* Messages */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="bg-background border border-border rounded-2xl px-4 py-2 max-w-[200px]">
                    <p className="text-sm">Ready for tomorrow s exam? 📚</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-main text-main-foreground rounded-2xl px-4 py-2 max-w-[200px]">
                    <p className="text-sm">Yes! Just finished chapter 5 ✨</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex-shrink-0"></div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
                  <div className="bg-background border border-border rounded-2xl px-4 py-2 max-w-[200px]">
                    <p className="text-sm">Great! Lets review together 🤝</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
     

      {/* Features Section */}
      <section className="px-8 md:px-16 lg:px-24 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Why Choose <span className="text-main">Wavy Chat?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for modern teams and communities who demand more from their communication tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-background border-2 rounded-3xl shadow-shadow hover:shadow-lg transition-all duration-500 cursor-pointer ${
                activeFeature === index 
                  ? 'border-main bg-main/5 scale-105' 
                  : 'border-border hover:border-main/50'
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              {/* Highlight Badge */}
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 bg-main text-main-foreground text-xs font-bold rounded-full">
                  {feature.highlight}
                </span>
              </div>
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                activeFeature === index ? 'bg-main text-main-foreground' : 'bg-main/10 text-main'
              }`}>
                <feature.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-main transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 md:px-16 lg:px-24 py-20 bg-secondary-background">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-6">Loved by Teams Everywhere</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Chen",
              role: "Product Manager",
              content: "Wavy Chat transformed how our remote team communicates. The room organization is brilliant!",
              rating: 5
            },
            {
              name: "Michael Rodriguez",
              role: "Student",
              content: "Perfect for study groups! The real-time messaging keeps everyone engaged and on track.",
              rating: 5
            },
            {
              name: "Emily Johnson",
              role: "Startup Founder",
              content: "Security and speed in one package. Exactly what our growing team needed.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} className="p-6 bg-background border border-border rounded-2xl shadow-shadow">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-main fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">`{testimonial.content}`</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-8 md:px-16 lg:px-24 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          Ready to Start the <span className="text-main">Conversation?</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join thousands of teams already using Wavy Chat to transform their communication
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button  onClick={handleSignupbutton}>
            Start Chatting Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Free forever • No credit card required • Setup in 30 seconds
        </p>
      </section>

      {/* Footer */}
     <Footer></Footer>
    </div>
  );
}