import { Stethoscope } from "lucide-react";

const ServiceCard = ({ service }) => {
  return (
    <div className="group bg-white rounded-xl p-6 shadow
                    hover:shadow-lg transition
                    hover:-translate-y-1">

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center
                      rounded-full bg-blue-100 text-blue-600
                      mb-4 group-hover:scale-110 transition">
        <Stethoscope size={24} />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-slate-800">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 mt-2">
        {service.description}
      </p>

      {/* Optional price */}
      {service.price && (
        <p className="mt-3 font-medium text-blue-600">
          ৳ {service.price}
        </p>
      )}
    </div>
  );
};

export default ServiceCard;