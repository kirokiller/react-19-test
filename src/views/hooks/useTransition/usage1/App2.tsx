import { useState } from "react";
import TabButton from "./TabButton";
import AboutTab from "./AboutTab";
import PostsTab from "./PostsTab";
import ContactTab from "./ContactTab";
import "./styles.css";

// 在不使用 transition 的情况下更新当前选项卡
export default function App() {
  const [tab, setTab] = useState("about");

  function selectTab(nextTab: string) {
    setTab(nextTab);
  }

  return (
    <>
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton isActive={tab === "contact"} onClick={() => selectTab("contact")}>
        Contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
}
