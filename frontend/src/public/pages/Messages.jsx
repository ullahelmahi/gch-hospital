import { User, Users } from "lucide-react";

const Messages = () => {
  return (
    <section className="bg-slate-50">
      {/* ===== BANNER ===== */}
      <div
        className="h-64 md:h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Messages
          </h1>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-4 py-14 space-y-20">

        {/* ================= CHAIRMAN ================= */}
        <section className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1">
            <img
              src="/images/management/chairman.jpg"
              alt="Chairman"
              className="rounded-xl shadow-md w-full object-cover"
            />
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              Chairman’s Message
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Gaibandha Central Hospital & Digital Pathology was established
              with a clear vision to deliver ethical, affordable, and
              patient-centered healthcare to the people of Gaibandha and
              surrounding regions.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our focus remains on continuous improvement, modern medical
              infrastructure, and compassionate care. We believe that trust,
              transparency, and professionalism are the pillars of sustainable
              healthcare delivery.
            </p>

            <p className="mt-6 font-medium text-slate-800">
              — Chairman, GCH
            </p>
          </div>
        </section>

        {/* ================= MANAGING DIRECTOR ================= */}
        <section className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1 md:order-2">
            <img
              src="/images/management/md.jpeg"
              alt="Managing Director"
              className="rounded-xl shadow-md w-full object-cover"
            />
          </div>

          <div className="md:col-span-2 md:order-1">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              Managing Director’s Message
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              As the Managing Director, my responsibility is to ensure that
              clinical excellence and operational efficiency work hand in hand.
              Our hospital continues to invest in skilled professionals,
              advanced diagnostics, and patient safety systems.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We are committed to maintaining international standards of care
              while keeping services accessible to the local community. Our
              team works relentlessly to uphold quality, accountability, and
              medical integrity.
            </p>

            <p className="mt-6 font-medium text-slate-800">
              — Managing Director, GCH
            </p>
          </div>
        </section>

        {/* ================= BOARD & SHAREHOLDERS ================= */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-primary" />
            <h2 className="text-2xl font-semibold text-slate-800">
              Board of Trustees & Shareholders
            </h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-10 max-w-4xl">
            The Board of Trustees & Shareholders provides strategic direction,
            governance, and long-term oversight to ensure that Gaibandha Central
            Hospital operates with integrity, sustainability, and a strong
            commitment to public health.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* CARD */}
            {[
              { name: "Dr. A. Rahman", role: "Trustee" },
              { name: "Mr. M. Rashid Mondol", role: "Managing Partner" },
              { name: "Dr. S. Karim", role: "Board Member" },
            ].map((person, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-slate-100">
                  <img
                    src="/images/management/default.jpg"
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-slate-800">
                  {person.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </section>
  );
};

export default Messages;