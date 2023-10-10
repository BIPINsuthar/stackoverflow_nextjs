import { JobCard } from "@/components/molecules/JobCard";

export default function Jobs() {
  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      <div>
        <JobCard />
      </div>
    </section>
  );
}
