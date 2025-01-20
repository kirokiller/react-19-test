// 注意：使用 suspense 进行数据获取的方式
// 取决于与其配合使用的框架。
// 缓存逻辑通常会在框架内部处理。

import { Album } from "./type";

const cache = new Map();

export function fetchData(url: string): Promise<Album[]> {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url: string) {
  if (url.startsWith("/search?q=")) {
    return await getSearchResults(url.slice("/search?q=".length));
  } else {
    throw Error("Not implemented");
  }
}

async function getSearchResults(query: string) {
  // 添加一个假延迟来让等待更加明显。
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const allAlbums = [
    {
      id: 13,
      title: "Let It Be",
      year: 1970,
    },
    {
      id: 12,
      title: "Abbey Road",
      year: 1969,
    },
    {
      id: 11,
      title: "Yellow Submarine",
      year: 1969,
    },
    {
      id: 10,
      title: "The Beatles",
      year: 1968,
    },
    {
      id: 9,
      title: "Magical Mystery Tour",
      year: 1967,
    },
    {
      id: 8,
      title: "Sgt. Pepper's Lonely Hearts Club Band",
      year: 1967,
    },
    {
      id: 7,
      title: "Revolver",
      year: 1966,
    },
    {
      id: 6,
      title: "Rubber Soul",
      year: 1965,
    },
    {
      id: 5,
      title: "Help!",
      year: 1965,
    },
    {
      id: 4,
      title: "Beatles For Sale",
      year: 1964,
    },
    {
      id: 3,
      title: "A Hard Day's Night",
      year: 1964,
    },
    {
      id: 2,
      title: "With The Beatles",
      year: 1963,
    },
    {
      id: 1,
      title: "Please Please Me",
      year: 1963,
    },
  ];

  const lowerQuery = query.trim().toLowerCase();
  return allAlbums.filter((album) => {
    const lowerTitle = album.title.toLowerCase();
    return lowerTitle.startsWith(lowerQuery) || lowerTitle.indexOf(" " + lowerQuery) !== -1;
  });
}
