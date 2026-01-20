import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section className="bg-slate-50">
      {/* ===== BANNER ===== */}
      <div
        className="h-64 md:h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/banner2.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Contact Us
          </h1>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* ===== LEFT: CONTACT INFO ===== */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              Get in Touch
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Gaibandha Central Hospital & Digital Pathology is dedicated to
              delivering trusted healthcare services with modern facilities
              and experienced medical professionals. We are always ready to
              serve you.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1" />
                <p className="text-slate-700">
                  Bus Terminal – Khanakh Shorif Road,  
                  <br />
                  Uttara, Gaibandha
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-primary" />
                <p className="text-slate-700">
                  +880 1339-873131 <br />
                  +880 1339-873132 <br />
                  +880 1712-228740
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-primary" />
                <p className="text-slate-700">
                  info.gch19@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-primary" />
                <p className="text-slate-700">
                  24/7 Emergency & Diagnostic Services Available
                </p>
              </div>
            </div>
          </div>

          {/* ===== RIGHT: EMERGENCY CARD ===== */}
          <div className="bg-white rounded-xl shadow-md p-8 border">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              Emergency Contact
            </h3>

            <p className="text-slate-600 mb-6">
              For urgent or life-threatening medical situations, contact our
              emergency department immediately.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-sm text-red-600 uppercase font-medium">
                Emergency Hotline
              </p>
              <p className="text-3xl font-bold text-red-700 mt-2">
                +880 1339-873131
              </p>
            </div>
          </div>
        </div>

        {/* ===== MAP ===== */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Our Location
          </h2>

          <div className="w-full h-80 rounded-xl overflow-hidden border">
            <iframe
              title="Gaibandha Central Hospital Location"
              src="https://www.google.com/maps?q=25.33003,89.53116&z=17&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
