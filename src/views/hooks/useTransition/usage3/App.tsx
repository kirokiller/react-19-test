import { useState } from "react";
import TabButton from "./TabButton";
import AboutTab from "./AboutTab";
import PostsTab from "./PostsTab";
import ContactTab from "./ContactTab";
import "./styles.css";

// 在 transtion 期间显示待处理的视觉状态
export default function App() {
  const [tab, setTab] = useState("about");

  return (
    <>
      <TabButton isActive={tab === "about"} onClick={() => setTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => setTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton isActive={tab === "contact"} onClick={() => setTab("contact")}>
        Contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
}
