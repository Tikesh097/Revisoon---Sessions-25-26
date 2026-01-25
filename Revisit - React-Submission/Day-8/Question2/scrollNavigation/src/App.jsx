import React, { useRef, useState, useEffect } from "react";

const ScrollNavigation = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  const activeRef = useRef("About");

  const [activeSection, setActiveSection] = useState("About");

  const sectionRefs = {
    About: aboutRef,
    Services: servicesRef,
    Portfolio: portfolioRef,
    Contact: contactRef,
  };

  const handleScrollTo = (section) => {
    sectionRefs[section].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const offsets = Object.keys(sectionRefs).map((key) => {
        return {
          section: key,
          offsetTop: sectionRefs[key].current.offsetTop,
        };
      });

      for (let i = offsets.length - 1; i >= 0; i--) {
        if (scrollPosition >= offsets[i].offsetTop - 100) {
          if (activeRef.current !== offsets[i].section) {
            activeRef.current = offsets[i].section;
            setActiveSection(offsets[i].section);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#d6a3a3ff",
          color: "white",
          padding: "10px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          zIndex: 100,
        }}
      >
        {Object.keys(sectionRefs).map((section) => (
          <span
            key={section}
            onClick={() => handleScrollTo(section)}
            style={{
              cursor: "pointer",
              padding: "5px 10px",
              borderBottom:
                activeSection === section
                  ? "3px solid black"
                  : "3px solid transparent",
            }}
          >
            {section}
          </span>
        ))}
      </nav>

      <div style={{ marginTop: "60px" }}>
        <section
          ref={aboutRef}
          style={{ height: "600px", padding: "20px", borderBottom: "1px solid" }}
        >
          <h2>About</h2>
          <p>Welcome to About Section</p>
        </section>

        <section
          ref={servicesRef}
          style={{ height: "600px", padding: "20px", borderBottom: "1px solid" }}
        >
          <h2>Services</h2>
          <p>Our Services Section</p>
        </section>

        <section
          ref={portfolioRef}
          style={{ height: "600px", padding: "20px", borderBottom: "1px solid" }}
        >
          <h2>Portfolio</h2>
          <p>Check our work here</p>
        </section>

        <section
          ref={contactRef}
          style={{ height: "600px", padding: "20px" }}
        >
          <h2>Contact</h2>
          <p>Contact Us Section</p>
        </section>
      </div>
    </>
  );
};

export default ScrollNavigation;
