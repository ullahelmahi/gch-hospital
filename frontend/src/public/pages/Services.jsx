import { useEffect, useState } from "react";
import API from "../../services/api";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await API.get("/services");
        setServices(data);
      } catch (error) {
        console.error("Failed to load services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">
            Our Services
          </h1>
          <p className="mt-3 text-slate-600">
            Comprehensive medical services for your healthcare needs
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-slate-500">
            Loading services...
          </p>
        )}

        {/* Services Grid */}
        {!loading && services.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && services.length === 0 && (
          <p className="text-center text-slate-500">
            No services available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default Services;