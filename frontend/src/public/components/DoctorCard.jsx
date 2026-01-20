const DoctorCard = ({ doctor, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(doctor)}
      className="
        bg-white rounded-xl shadow cursor-pointer
        hover:shadow-lg transition-all duration-300
        hover:-translate-y-1
        active:scale-[0.98]
      "
    >
      {/* ===== IMAGE ===== */}
      <div className="h-44 bg-slate-100 rounded-t-xl flex items-center justify-center">
        <img
          src={doctor.photo || "/images/doctors/doctor-icon.png"}
          alt={doctor.name}
          className="h-full object-contain p-4"
        />
      </div>

      {/* ===== INFO ===== */}
      <div className="p-4 text-center space-y-2">
        {/* Name */}
        <h3 className="font-semibold text-lg text-slate-800">
          {doctor.name}
        </h3>

        {/* Department */}
        <p className="text-sm font-medium text-blue-600">
          {doctor.department}
        </p>

        {/* Specialization */}
        {doctor.specialization?.length > 0 && (
          <p className="text-xs text-slate-600">
            {doctor.specialization.join(", ")}
          </p>
        )}

        {/* Visiting Schedule */}
        {(doctor.visitingSchedule?.days ||
          doctor.visitingSchedule?.time) && (
          <div className="mt-3 space-y-1 text-xs">
            {doctor.visitingSchedule?.days && (
              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Days: {doctor.visitingSchedule.days}
              </span>
            )}

            {doctor.visitingSchedule?.time && (
              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-1">
                Time: {doctor.visitingSchedule.time}
              </span>
            )}
          </div>
        )}

        {/* Visiting Badge */}
        {doctor.isVisiting === false && (
          <div className="mt-2">
            <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
              Not Currently Visiting
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;