function Footer() {
  return (
    <footer className="bg-gray-900 py-8 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-xl font-bold">ClinicCare</h2>

        <p className="mt-2 text-gray-400">
          Providing quality healthcare with experienced doctors and modern
          medical facilities.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} ClinicCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
