import { Suspense, useState } from "react";
import TabButton from "./TabButton2";
import AboutTab from "./AboutTab";
import PostsTab from "./PostsTab";
import ContactTab from "./ContactTab";
import "./styles.css";

// 避免不必要的加载指示器(反例)
export default function App() {
  const [tab, setTab] = useState("about");

  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <TabButton isActive={tab === "about"} action={() => setTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} action={() => setTab("posts")}>
        Posts
      </TabButton>
      <TabButton isActive={tab === "contact"} action={() => setTab("contact")}>
        Contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </Suspense>
  );
}
