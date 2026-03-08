import { motion } from "framer-motion";
import "aos";

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      "data-aos"?: string;
      "data-aos-delay"?: string | number;
      "data-aos-duration"?: string | number;
      "data-aos-offset"?: string | number;
    }
  }
}

import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Activity,
  Send,
  Building,
  Users,
  Search,
  Lock,
  Instagram,
  X as XIcon,
  Linkedin,
  Facebook,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useJoinWaitlist } from "@/hooks/use-waitlist";
import { useState, useRef, useEffect } from "react";
import TiktokIcon from "@/components/icons/TiktokIcon";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function LandingPage() {
  const { mutate: joinWaitlist, isPending } = useJoinWaitlist();
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [iframeLoadCount, setIframeLoadCount] = useState(0);
  const feedbackSectionRef = useRef<HTMLElement>(null);

  // Handle Tenant Form iFrame load events to detect submission
  // Tenant form has 4 internal sections: initial view + 3 'Next' button clicks = 4 loads
  // 5th load event indicates successful form submission and redirect
  const handleTenantIFrameLoad = () => {
    const iframeElement = document.querySelector(
      'iframe[src*="1FAIpQLSdRF9X2uvIXTqsUIQ3ud1GaAlW8xsdE6PI63jvpiEK7H_vWkg"]'
    ) as HTMLIFrameElement | null;

    if (!iframeElement) return;

    setIframeLoadCount((prevCount) => {
      const newCount = prevCount + 1;
      // 5th load event indicates successful form submission
      if (newCount === 5 && iframeElement) {
        setIsSubmitted(true);
      }
      return newCount;
    });
  };

  // Scroll to Feedback Form when it becomes visible
  useEffect(() => {
    if (isSubmitted && feedbackSectionRef.current) {
      // Small delay to ensure DOM is fully rendered and CSS transitions are applied
      setTimeout(() => {
        const feedbackSection = feedbackSectionRef.current as HTMLElement | null;
        if (feedbackSection) {
          feedbackSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }
  }, [isSubmitted]);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      joinWaitlist({ email });
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        <div className="content-container h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="cursor-pointer inline-block">
            <img
              src="assets/RENTALEB.png"
              alt="Rentale Logo"
              className="w-27 h-28 object-contain"
              onError={(e) => {
                // Fallback to stylized 'R' if image fails to load
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling;
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            </a>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate">
            <a
              href="#how-it-works"
              className="hover:text-navy transition-colors"
            >
              How it Works
            </a>
            <a
              href="#whats-inside"
              className="hover:text-navy transition-colors"
            >
              Features
            </a>
            <a href="#faq" className="hover:text-navy transition-colors">
              FAQ
            </a>
          </div>
          <Button
          asChild
          className="bg-[#1E3A8A] hover:bg-[#1e3a8a]/90 text-white rounded-full 
             px-3 py-1 text-[10px] sm:text-xs md:text-sm md:px-6 
             font-poppins font-medium shadow-sm hover:shadow transition-all 
             whitespace-nowrap"
>
          <a href="#neutrality-notice">Create your Rentale Report</a>
          </Button>
        </div>
      </nav>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -z-10 opacity-70"></div>

          <div className="content-container text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-4xl mx-auto flex flex-col items-center bg-[transparent]"
            >
              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-6xl lg:text-7xl font-semibold text-navy leading-[1.1] mb-6 tracking-[-0.02em] font-poppins"
              >
                Trusted Rental Records for <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-blue-600">
                  Tenants & Landlords
                </span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-slate max-w-2xl mb-10 leading-relaxed font-inter"
              >
                Create and share a trusted rental performance report for landlords and tenants.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-[#1e3a8a]/90 text-white rounded-full 
              px-6 sm:px-8 h-auto min-h-[3.5rem] py-4 sm:py-0 
              text-[14px] sm:text-base font-poppins font-medium 
              shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5"
              >
            <a href="#neutrality-notice" className="flex items-center justify-center text-center">
            <span className="leading-tight">Create your Rentale Report</span>
            </a>
            </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 h-14 text-base font-poppins font-medium border-slate-200 text-navy hover:bg-slate-50 transition-all"
                >
                  <a href="#how-it-works">Learn More</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-24 bg-white/50 border-y border-slate-100"
        >
          <div className="content-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4 tracking-[-0.02em] font-poppins">
                How Rentale Works
              </h2>
              <p className="text-slate text-lg font-inter">
                A simple, secure process to establish and share your rental
                reputation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-slate-200 -z-10"></div>

              {[
                {
                  step: "01",
                  title: "Submit",
                  desc: "Complete a rental profile with your tenancy and rental information.",
                  icon: <Send className="w-6 h-6 text-[#1E3A8A]" />,
                },
                {
                  step: "02",
                  title: "Verify",
                  desc: "Information is securely verified and validated for accuracy.",
                  icon: <Search className="w-6 h-6 text-[#1E3A8A]" />,
                },
                {
                  step: "03",
                  title: "Rental Performance Report",
                  desc: "Receive and share your Rental Performance Report.",
                  icon: <ShieldCheck className="w-6 h-6 text-[#1E3A8A]" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center group"
                  data-aos="fade-up"
                  data-aos-delay={i * 200}
                >
                  <div className="w-24 h-24 bg-white rounded-full border-2 border-slate-100 flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300 relative z-10">
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                      {item.step}
                    </div>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3 tracking-[-0.02em] font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-slate leading-relaxed font-inter">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Inside Section */}
        <section id="whats-inside" className="py-24">
          <div className="content-container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4 tracking-[-0.02em] font-poppins">
                  What's Inside a Rentale Report
                </h2>
                <p className="text-slate text-lg font-inter">
                  Verified data that provides an in-depth summary of a tenants's rental background.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Rental Payment Reliability",
                  desc: "Historical data on payment patterns and overall consistency over time.",
                  icon: <CheckCircle2 className="w-7 h-7" />,
                },
                {
                  title: "Tenancy History Summary",
                  desc: "A verified timeline of past residences, duration of stays, and reason for moving when applicable.",
                  icon: <FileText className="w-7 h-7" />,
                },
                {
                  title: "Verification Status",
                  desc: "Cryptographically secured badges indicating which pieces of information have been 100% verified.",
                  icon: <ShieldCheck className="w-7 h-7" />,
                },
                {
                  title: "Neutral Performance Indicators",
                  desc: "Objective metrics like property care assessments and communication responsiveness.",
                  icon: <Activity className="w-7 h-7" />,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-delay={i * 150}
                >
                  <div className="w-14 h-14 bg-blue-50 text-[#1E3A8A] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3 tracking-[-0.02em] font-poppins">
                    {card.title}
                  </h3>
                  <p className="text-slate leading-relaxed font-inter">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neutrality Notice */}
        <section id="neutrality-notice" className="pt-24 pb-8">
          <div className="content-container">
            <div
              className="max-w-3xl mx-auto p-8 rounded-2xl bg-blue-50 border border-blue-100 text-center shadow-sm"
              data-aos="zoom-in"
              data-aos-duration="800"
            >
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3 font-poppins">
                Neutrality Notice
              </h3>
              <p className="text-[#1E3A8A] font-medium font-inter">
                Rentale is a neutral platform.
                We do not represent tenants, landlords, or property managers. <br />
                Our role is to provide verified rental performance reports based on submitted and verified information. <br />
                Rentale does not make rental decisions. 
                Instead, we provide standardized information that helps tenants, landlords, and property managers make more informed leasing decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Tenant Form Section */}
        <section id="tenant-form" className="pb-24 bg-[#F8FAFC]">
          <div className="content-container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4 tracking-[-0.02em] font-poppins">
               
                </h2>
                <p className="text-slate text-lg font-inter">
                 
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#334155]">
                <div className="h-2 bg-[#1E3A8A] w-full"></div>
                <div className="p-0 overflow-hidden relative">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdRF9X2uvIXTqsUIQ3ud1GaAlW8xsdE6PI63jvpiEK7H_vWkg/viewform?embedded=true"
                    className="w-full min-h-[800px] border-none"
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      display: "block",
                    }}
                    onLoad={handleTenantIFrameLoad}
                    title="Tenant Form"
                  >
                    Loading…
                  </iframe>
                </div>
                <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                  <div className="flex items-start space-x-3">
                    
                    <Label
                      htmlFor="confirm-genuine"
                      className="text-sm text-slate leading-relaxed font-inter cursor-pointer select-none"
                    >
                   
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section
          ref={feedbackSectionRef}
          id="feedback-form"
          className={`py-24 bg-[#0F172A] relative overflow-hidden transition-all duration-500 ${
            isSubmitted ? "opacity-100" : "opacity-0 invisible"
          }`}
          style={{
            pointerEvents: isSubmitted ? "auto" : "none",
          }}
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[#1E3A8A] opacity-[0.03] blur-[100px] pointer-events-none"></div>

          <div className="content-container relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[-0.02em] font-poppins">
            
                </h2>
                <p className="text-slate-400 text-lg font-inter">
                
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#334155]">
                <div className="h-2 bg-[#1E3A8A] w-full"></div>
                <div className="p-0 overflow-hidden relative">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSd_8g19U4CwaZLifnwPmGUDQv8uuVrF5EVJd8jjKuojhAb8Gg/viewform?embedded=true"
                    className="w-full min-h-[600px] border-none"
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      display: "block",
                    }}
                  >
                    Loading…
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
          <div className="content-container max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4 tracking-[-0.02em] font-poppins">
                Frequently Asked Questions
              </h2>
              <p className="text-slate text-lg font-inter">
                Answers to common questions about Rentale.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="border-slate-100 py-2"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <AccordionTrigger className="text-lg font-medium text-navy hover:text-[#1E3A8A] hover:no-underline transition-colors text-left font-poppins">
                  Is Rentale a listing platform?
                </AccordionTrigger>
                <AccordionContent className="text-slate text-base leading-relaxed font-inter">
                  No. Rentale is strictly a verification and reputation
                  platform. We don't list properties; we provide the trusted
                  data layer that helps tenants and landlords make better
                  decisions when using existing listing platforms or private
                  rentals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-slate-100 py-2"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <AccordionTrigger className="text-lg font-medium text-navy hover:text-[#1E3A8A] hover:no-underline transition-colors text-left font-poppins">
                  Who can use Rentale?
                </AccordionTrigger>
                <AccordionContent className="text-slate text-base leading-relaxed font-inter">
                  Tenants, landlords, and property managers.

                  Rentale helps tenants build verified rental performance reports they can share when applying for a home or apartment.

                  It also helps landlords and property managers review standardized rental performance reports so they can make more informed leasing decisions without solely relying on credit scores.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border-slate-100 py-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <AccordionTrigger className="text-lg font-medium text-navy hover:text-[#1E3A8A] hover:no-underline transition-colors text-left font-poppins">
                  Is my information secure?
                </AccordionTrigger>
                <AccordionContent className="text-slate text-base leading-relaxed font-inter">
                  Yes, data is securely handled and used only for verification purposes.
                  You have complete control over who sees your verified report. We never sell your personal data to third parties.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border-slate-100 py-2"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <AccordionTrigger className="text-lg font-medium text-navy hover:text-[#1E3A8A] hover:no-underline transition-colors text-left font-poppins">
                  Do I pay now?
                </AccordionTrigger>
                <AccordionContent className="text-slate text-base leading-relaxed font-inter">
                  No. This stage is submission and validation only.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border-slate-100 py-2"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <AccordionTrigger className="text-lg font-medium text-navy hover:text-[#1E3A8A] hover:no-underline transition-colors text-left font-poppins">
                  Why Rentale?
                </AccordionTrigger>
                <AccordionContent className="text-slate text-base leading-relaxed font-inter">
                  Rentale helps tenants and landlords create and share verified
                  rental performance reports that support safer, faster, and
                  more transparent rental decisions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-16 p-6 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate leading-relaxed font-inter">
              <p>
                <strong>Disclaimer:</strong> Rentale is a neutral Rental
                Report Platform currently operating in a pilot stage. Reports
                are informational and based on validated data.
              </p>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-[#0F172A] text-[#F8FAFC] border-slate-200 py-16">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <a href="/" className="cursor-pointer inline-block">
                  <img
                    src="assets/RENTALEW.png"
                    alt="Rentale Logo"
                    className="w-24 h-8 object-contain"
                  />
                </a>
              </div>
              <p className="text-slate text-sm leading-relaxed max-w-xs font-inter">
                The modern standard for rental trust.
                Verified rental performance reports for tenants and landlords.
              </p>
              <a
                href="mailto:hello@rentalehq.com"
                className="inline-block mt-4 text-[#2563EB] font-medium hover:underline text-sm font-inter"
              >
                hello@rentalehq.com
              </a>
            </div>

            <div>
              <h4 className="font-semibold text-navy mb-6 font-poppins">
                Platform
              </h4>
              <ul className="space-y-4 text-sm text-slate font-inter">
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#whats-inside"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#tenant-form"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Tenant Form
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-navy mb-6 font-poppins">
                Connect
              </h4>
              <div className="flex space-x-4 items-center">
                <a
                  href="https://x.com/rentalehq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] hover:shadow-sm transition-all duration-300"
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">X (Twitter)</span>
                </a>
                <a
                  href="https://www.instagram.com/rentalehq/"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] hover:shadow-sm transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@rentalehq?is_from_webapp=1&sender_device=pc"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] hover:shadow-sm transition-all duration-300"
                >
                  <TiktokIcon className="w-4 h-4" />
                  <span className="sr-only">TikTok</span>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCjQPwMzbV98OZb7ul29u7WQ"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] hover:shadow-sm transition-all duration-300"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate text-sm font-inter">
              © 2026 Rentale. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate font-inter">
              <Dialog>
                <DialogTrigger className="hover:text-[#2563EB] transition-colors">
                  Privacy Policy
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="font-poppins">
                      Privacy Policy
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-slate leading-relaxed font-inter space-y-4 overflow-y-auto pr-2">
                    <p>
                      1. Rentale ("we", "our", or "the platform") is committed
                      to protecting the privacy and security of users who
                      interact with our services during the pilot and validation
                      stage.
                    </p>
                    <p>
                      2. Information we collect: We may collect information
                      provided voluntarily by users, including name and contact
                      information, rental history details, landlord or tenant
                      information submitted for verification, documents or data
                      uploaded for validation, and feedback or usage
                      information.
                    </p>
                    <p>
                      3. How we use information: Information may be used to
                      generate rental performance reports, validate submitted
                      rental information, improve the platform and user experience,
                      and communicate with users about submissions or updates.
                    </p>
                    <p>
                      4. Data sharing: Rentale does not sell personal data.
                      Information may be shared only with user consent, for
                      verification purposes related to report generation, or
                      when required by applicable law.
                    </p>
                    <p>
                      5. Updates: This policy may be updated as Rentale evolves.
                      Continued use of the platform indicates acceptance of
                      updates.
                    </p>
                    <div className="pt-4 flex justify-end">
                    <DialogClose asChild>
                    <button className="px-4 py-2 bg-[#0F172A] text-[#F8FAFC] text-sm font-medium rounded-md transition-colors">
                    Close
                    </button>
                  </DialogClose>
                   </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className="hover:text-[#2563EB] transition-colors">
                  Terms of Use
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="font-poppins">
                      Terms of Use
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-slate leading-relaxed font-inter space-y-4 overflow-y-auto pr-2">
                    <p>
                      1. Platform purpose: Rentale provides a neutral rental
                      record and performance reporting system designed to
                      support transparency between tenants and landlords.
                    </p>
                    <p>
                      2. Pilot nature: Rentale is currently in a validation and
                      pilot stage. Features, processes, and outputs may change
                      as the platform evolves.
                    </p>
                    <p>
                      3. User responsibility: Users agree that information
                      submitted is accurate to the best of their knowledge, that
                      they have permission to provide shared information, and
                      that they will not misuse the platform for fraudulent
                      purposes.
                    </p>
                    <p>
                      4. Neutral platform: Rentale does not operate as a
                      property listing service, broker, leasing agent, or credit
                      bureau. Rentale provides informational reports based on
                      submitted and validated data.
                    </p>
                    <p>
                      5. Fees and pilot participation: During the landing-page
                      and pilot phase, participation is completely free.
                    </p>
                    <p>
                      6. Limitation of liability: Rentale is not responsible for
                      decisions made by tenants, landlords, or third parties
                      based on platform reports.
                    </p>
                    <p>
                      7. Modifications: Rentale may update, pause, or modify
                      services during the pilot phase as the product evolves.
                    </p>
                    <div className="pt-4 flex justify-end">
                    <DialogClose asChild>
                    <button className="px-4 py-2 bg-[#0F172A] text-[#F8FAFC] text-sm font-medium rounded-md transition-colors">
                    Close
                    </button>
                  </DialogClose>
                   </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className="hover:text-[#2563EB] transition-colors">
                  Disclaimer
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="font-poppins">
                      Disclaimer
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-slate leading-relaxed font-inter space-y-4 overflow-y-auto pr-2">
                    <p>
                      Rentale is a neutral rental record platform currently
                      operating in a pilot stage. <br /> Reports generated by
                      Rentale are informational and based on submitted and
                      validated data. <br /> Rentale does not guarantee
                      outcomes, approvals, or rental decisions and does not act
                      as a brokerage, credit reporting agency, or property
                      listing service.
                    </p>
                    <div className="pt-4 flex justify-end">
                    <DialogClose asChild>
                    <button className="px-4 py-2 bg-[#0F172A] text-[#F8FAFC] text-sm font-medium rounded-md transition-colors">
                    Close
                    </button>
                  </DialogClose>
                   </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
