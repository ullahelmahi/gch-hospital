import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-slate-50">
      {/* ================= HERO BANNER ================= */}
      <div
        className="relative h-[320px] bg-cover bg-center"
        style={{ backgroundImage: "url(/images/banner.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <h1 className="text-4xl font-bold mb-2">About Us</h1>
            <p className="text-sm opacity-90">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              / About
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-4 gap-10">
        {/* ================= SIDEBAR ================= */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-slate-700 mb-4">
              About Navigation
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <a
                  href="#who-we-are"
                  className="block border-l-4 border-blue-600 pl-3 font-medium text-blue-700"
                >
                  Who We Are
                </a>
              </li>
              <li>
                <a
                  href="#mission"
                  className="block pl-4 hover:text-blue-600"
                >
                  Our Mission
                </a>
              </li>
              <li>
                <a
                  href="#backdrop"
                  className="block pl-4 hover:text-blue-600"
                >
                  Backdrop
                </a>
              </li>
              <li>
                <a
                  href="#vision"
                  className="block pl-4 hover:text-blue-600"
                >
                  Vision
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-slate-700 mb-2">
              Emergency Cases
            </h3>
            <p className="text-sm text-slate-600">
              24/7 Emergency Support
            </p>
            <p className="mt-2 font-semibold text-blue-700">
              📞 +880 1712-228740
            </p>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <div className="lg:col-span-3 space-y-14">
          {/* WHO WE ARE */}
          <section id="who-we-are">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Who We Are
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Gaibandha Central Hospital & Digital Pathology is a
              modern, patient-focused healthcare institution
              dedicated to delivering reliable and affordable
              medical services to the people of Gaibandha.
              Our hospital integrates experienced medical
              professionals with advanced diagnostic and treatment
              facilities to ensure accurate care and faster recovery.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We believe that quality healthcare should be accessible
              to everyone, and we continuously work to maintain
              high standards of medical ethics, safety, and
              professionalism.
            </p>
          </section>

          {/* OUR MISSION */}
          <section id="mission">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our mission is to provide comprehensive, compassionate,
              and affordable healthcare services by combining
              skilled medical professionals, modern technology,
              and ethical practices—ensuring every patient
              receives respectful and effective treatment.
            </p>
          </section>

          {/* BACKDROP */}
          <section id="backdrop">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Backdrop
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Established to meet the growing healthcare demands
              of Gaibandha, Gaibandha Central Hospital was founded
              with the goal of bridging the gap between modern
              medical facilities and local accessibility.
              Over time, the hospital has expanded its services
              to include specialist consultations, digital pathology,
              emergency care, and diagnostic support under one roof.
            </p>
          </section>

          {/* VISION */}
          <section id="vision">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Vision
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our vision is to become the most trusted and
              dependable healthcare provider in the region,
              recognized for clinical excellence, innovation,
              and patient satisfaction.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
              <li>✔ Patient-centered care</li>
              <li>✔ Ethical medical practices</li>
              <li>✔ Continuous improvement</li>
              <li>✔ Advanced diagnostics</li>
              <li>✔ Skilled professionals</li>
              <li>✔ Community responsibility</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;