const AddDoctor = () => {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">Add New Doctor</h1>

        <p className="mt-2 text-[#5C6B73]">
          Fill in the doctor's information below.
        </p>
      </div>

      <form className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Dr. John Smith"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">Email</label>

          <input
            type="email"
            placeholder="doctor@example.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Specialization
          </label>

          <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]">
            <option>Cardiologist</option>
            <option>Dermatologist</option>
            <option>Neurologist</option>
            <option>Orthopedic</option>
            <option>Pediatrician</option>
            <option>General Physician</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Experience
          </label>

          <input
            type="text"
            placeholder="10 Years"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Qualification
          </label>

          <input
            type="text"
            placeholder="MBBS, MD"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium text-[#253237]">
            Address
          </label>

          <textarea
            rows={4}
            placeholder="Doctor's Address"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Profile Photo
          </label>

          <input
            type="file"
            className="w-full rounded-xl border border-gray-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Password
          </label>

          <input
            type="password"
            placeholder="Temporary Password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-4">
          <button
            type="button"
            className="rounded-xl border border-[#253237] px-8 py-3 font-semibold text-[#253237]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[#253237] px-8 py-3 font-semibold text-white transition hover:bg-[#5C6B73]"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
