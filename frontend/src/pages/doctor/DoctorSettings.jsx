const DoctorSettings = () => {
  return (
    <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">Settings</h1>

        <p className="mt-2 text-[#5C6B73]">
          Manage your account settings and security.
        </p>
      </div>

      <form className="space-y-8">
        {/* Password Section */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-[#253237]">
            Change Password
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-[#253237]">
                Current Password
              </label>

              <input
                type="password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-[#253237]">
                New Password
              </label>

              <input
                type="password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-[#253237]">
                Confirm Password
              </label>

              <input
                type="password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-[#253237]">
            Notifications
          </h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              <span>Email Notifications</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              <span>Appointment Reminders</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Marketing Emails</span>
            </label>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#253237] px-8 py-3 font-semibold text-white transition hover:bg-[#5C6B73]"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorSettings;
