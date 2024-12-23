import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId } = await params;

  const { name } = await getCabin(cabinId);

  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;

  const cabin = await getCabin(cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabinId);

  // Fetch all data in parallel
  //  const [ settings, bookedDates ] = await Promise.all([
  //      getCabin(cabinId),
  //      getSettings(),
  //      getBookedDatesByCabinId(cabinId),
  //   ]);

  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
