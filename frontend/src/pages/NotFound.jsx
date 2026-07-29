import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#5c6b73]">
        404 error
      </p>
      <h1 className="mt-4 text-5xl font-bold text-[#253237]">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5c6b73]">
        The page you are looking for does not exist. Return to the homepage to
        continue browsing.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-[#253237] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5c6b73]"
      >
        Go Home
      </Link>
    </section>
  );
}

export default NotFound;
