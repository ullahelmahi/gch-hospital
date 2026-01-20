import { X } from "lucide-react";

const DoctorModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl relative animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-red-600"
        >
          <X size={22} />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <img
              src={doctor.photo || "/images/doctors/doctor-icon.png"}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover border mb-4"
            />

            <h2 className="text-xl font-bold text-slate-800">
              {doctor.name}
            </h2>

            <p className="text-blue-600 font-medium">
              {doctor.department}
            </p>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            {doctor.specialization?.length > 0 && (
              <p>
                <strong>Specialization:</strong>{" "}
                {doctor.specialization.join(", ")}
              </p>
            )}

            {doctor.qualifications?.length > 0 && (
              <p>
                <strong>Qualifications:</strong>{" "}
                {doctor.qualifications.join(", ")}
              </p>
            )}

            {doctor.hospitalAffiliation && (
              <p>
                <strong>Affiliation:</strong>{" "}
                {doctor.hospitalAffiliation}
              </p>
            )}

            {doctor.visitingSchedule?.days && (
              <p>
                <strong>Visiting Days:</strong>{" "}
                {doctor.visitingSchedule.days}
              </p>
            )}

            {doctor.visitingSchedule?.time && (
              <p>
                <strong>Visiting Time:</strong>{" "}
                {doctor.visitingSchedule.time}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <a
              href="tel:+880 1339-873131"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Call for Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;