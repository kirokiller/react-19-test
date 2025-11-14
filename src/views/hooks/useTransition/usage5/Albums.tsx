import { use } from "react";
import { Album, fetchData } from "./data.js";

export default function Albums({ artistId }: { artistId: string }) {
  const albums = use(fetchData(`/${artistId}/albums`)) as Album[];
  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
