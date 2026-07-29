const DoctorProfile = () => {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">My Profile</h1>

        <p className="mt-2 text-[#5C6B73]">
          Update your personal and professional information.
        </p>
      </div>

      <form className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2 flex justify-center">
          <div className="flex flex-col items-center">
            <img
              src="https://placehold.co/150x150"
              alt="Doctor"
              className="h-36 w-36 rounded-full border-4 border-[#C2DFE3] object-cover"
            />

            <input
              type="file"
              className="mt-4 w-full rounded-xl border border-gray-300 p-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Dr. John Smith"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">Email</label>

          <input
            type="email"
            defaultValue="doctor@example.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">Phone</label>

          <input
            type="text"
            defaultValue="+91 9876543210"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Specialization
          </label>

          <input
            type="text"
            defaultValue="Cardiologist"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Qualification
          </label>

          <input
            type="text"
            defaultValue="MBBS, MD"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Experience
          </label>

          <input
            type="text"
            defaultValue="10 Years"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium text-[#253237]">
            Address
          </label>

          <textarea
            rows={4}
            defaultValue="123 Main Street, Chennai"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#253237] px-8 py-3 font-semibold text-white transition hover:bg-[#5C6B73]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
