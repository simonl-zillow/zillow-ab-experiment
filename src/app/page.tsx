import Link from "next/link";
import { ZillowLogo } from "@/components/icons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F7F7F9] px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <ZillowLogo className="h-7" />
        </div>

        <h1 className="mb-2 text-center text-xl font-bold text-[#2A2A33]">
          Search Results — A/B Experiment
        </h1>
        <p className="mb-8 text-center text-sm text-[#585863]">
          Select a variant to view the Zillow Seattle search results page.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/a"
            className="flex items-center justify-center rounded-lg bg-[#006AFF] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0052CC]"
          >
            Variant A
          </Link>
          <Link
            href="/b"
            className="flex items-center justify-center rounded-lg border-2 border-[#006AFF] px-6 py-3 text-sm font-bold text-[#006AFF] transition-colors hover:bg-[#E6F0FF]"
          >
            Variant B
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-[#999]">
          Both variants clone zillow.com/seattle-wa/ with different treatments.
        </p>
      </div>
    </main>
  );
}
