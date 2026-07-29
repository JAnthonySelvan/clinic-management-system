function Doctors() {
  const doctors = [
    {
      name: "Dr. Maya Kapoor",
      specialty: "Cardiology",
      description:
        "Expert in heart care and preventive cardiovascular treatments.",
    },
    {
      name: "Dr. Arjun Sen",
      specialty: "Pediatrics",
      description:
        "Compassionate pediatrician for children and family wellness.",
    },
    {
      name: "Dr. Neha Iyer",
      specialty: "Dermatology",
      description:
        "Skilled dermatologist focused on skin health and cosmetic care.",
    },
  ];

  return (
    <section className="bg-[#e0fbfc] py-20 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#5c6b73]">
            Our Medical Team
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[#253237] sm:text-5xl">
            Meet Our Doctors
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5c6b73]">
            Our experienced medical specialists are ready to support your health
            journey with compassion and expertise.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="rounded-[28px] border border-white bg-white p-8 shadow-lg"
            >
              <div className="mb-6 h-20 w-20 rounded-3xl bg-[#253237] text-white shadow-inner shadow-[#253237]/20 flex items-center justify-center text-2xl font-bold">
                {doctor.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h2 className="text-2xl font-semibold text-[#253237]">
                {doctor.name}
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-[#5c6b73]">
                {doctor.specialty}
              </p>
              <p className="mt-4 text-[#5c6b73]">{doctor.description}</p>
              <button className="mt-6 inline-flex rounded-full bg-[#253237] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5c6b73]">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doctors;
