import Container from "./Container";
import Logo from "./Logo";

function Footer() {
  const footerData = {
    logo: {
      text: "LOGO IPSUM",
      description:
        "Discover products designed with love to make life easier for moms and kids. We prioritize uncompromising quality, offering only the best for you and your little ones.",
    },
    quickLinks: {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Books", href: "/books" },
        { name: "Saved Books", href: "/saved-books" },
      ],
    },
    moreInfo: {
      title: "More Information",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Terms & Condition", href: "/terms-and-condition" },
        { name: "Privacy Policy", href: "/privacy-and-policy" },
      ],
    },
    contact: {
      title: "Contact us",
      phone: "+2475470473345",
      email: "null@gmail.com",
    },
  };

  return (
    <footer className="mt-20 lg:mt-40">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 py-6">
          {/* Logo and Description */}
          <div className="lg:w-2/5 xl:w-1/3 relative">
            <Logo className="absolute -translate-y-full" />
            <p className="text-sm text-gray-700 leading-relaxed mt-4 lg:mt-6 max-w-lg lg:max-w-none">
              {footerData.logo.description}
            </p>
          </div>

          {/* Links Sections Container */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-8">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-500">
                {footerData.quickLinks.title}
              </h3>
              <ul className="space-y-3">
                {footerData.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-700 hover:text-primary-600 transition-colors duration-200 text-sm block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-500">
                {footerData.moreInfo.title}
              </h3>
              <ul className="space-y-3">
                {footerData.moreInfo.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-700 hover:text-primary-600 transition-colors duration-200 text-sm block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-primary-500">
                {footerData.contact.title}
              </h3>
              <div className="space-y-3">
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors duration-200 text-sm py-1"
                >
                  <span className="break-all">{footerData.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-start space-x-3 text-gray-700 hover:text-primary-600 transition-colors duration-200 text-sm py-1"
                >
                  <span className="break-all">{footerData.contact.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 md:py-8 border-t border-purple-200 text-center">
          <span className="text-sm text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()} Logo Ipsum. All rights reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
