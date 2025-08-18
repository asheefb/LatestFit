import React, { useState } from 'react';
import { 
  Ruler, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  ChevronUp,
  Users,
  BarChart3,
  FileText,
  Shield
} from 'lucide-react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Simulate scroll detection (in real app, you'd use scroll event listener)
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'New Measurement', href: '/measurements/new', icon: Ruler },
    { name: 'Customer List', href: '/customers', icon: Users },
    { name: 'Reports', href: '/reports', icon: FileText },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'User Guide', href: '/guide' },
    { name: 'Video Tutorials', href: '/tutorials' },
    { name: 'Contact Support', href: '/support' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Data Security', href: '/security' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="bg-white border-t-2 border-blue-500 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Ruler className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LatestFit
                </h3>
                <p className="text-xs text-gray-500">Professional Measurement Tool</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Streamline your measurement process with precision and efficiency. 
              {/* Built to make your brother's work easier and more organized. */}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>+91 96636 21754</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>kbashif51@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>Kolihal, Hunasagi, India</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Mon - Sun, 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a 
                    href={href}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          {/* <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Legal & Social */}
          <div>
            {/* <h4 className="font-semibold text-gray-900 mb-4">Legal</h4> */}
            {/* <ul className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    <Shield className="h-3 w-3" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul> */}

            {/* Social Media */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Connect With Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map(({ name, icon: Icon, href, color }) => (
                  <a
                    key={name}
                    href={href}
                    className={`p-2 bg-gray-100 rounded-lg text-gray-600 ${color} transition-all duration-200 hover:bg-gray-200 hover:scale-110`}
                    aria-label={name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App Statistics */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Measurements Taken</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">App Availability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>© 2025 LatestFit. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for your business</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last updated: Aug 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Gradient Bottom Border */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1"></div>
    </footer>
  );
}