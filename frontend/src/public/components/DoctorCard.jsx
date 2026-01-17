const DoctorCard = ({ doctor }) => {
  return (
    <div
      className="
        bg-white rounded-xl shadow
        hover:shadow-lg transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* Image */}
      <div className="h-44 bg-slate-100 rounded-t-xl flex items-center justify-center">
        <img
          src={doctor.photo || "/images/doctors/doctor-icon.png"}
          alt={doctor.name}
          className="h-full object-contain p-4"
        />
      </div>

      {/* Info */}
      <div className="p-4 text-center space-y-2">
        <h3 className="font-semibold text-lg text-slate-800">
          {doctor.name}
        </h3>

        <p className="text-sm font-medium text-blue-600">
          {doctor.department}
        </p>

        {doctor.specialization?.length > 0 && (
          <p className="text-xs text-slate-600">
            {doctor.specialization.join(", ")}
          </p>
        )}

        {/* Visiting Info */}
        {(doctor.visitingSchedule?.days ||
          doctor.visitingSchedule?.time) && (
          <div className="mt-3 space-y-1 text-xs">
            {doctor.visitingSchedule?.days && (
              <div className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Days: {doctor.visitingSchedule.days}
              </div>
            )}
            {doctor.visitingSchedule?.time && (
              <div className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-1">
                Time: {doctor.visitingSchedule.time}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;