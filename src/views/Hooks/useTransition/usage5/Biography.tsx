import { use } from "react";
import { fetchData } from "./data";

export default function Biography({ artistId }: { artistId: string }) {
  const bio = use(fetchData(`/${artistId}/bio`)) as string;
  return (
    <section>
      <p className="bio">{bio}</p>
    </section>
  );
}
