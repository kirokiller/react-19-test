function IndexPage({ navigate }: { navigate: (url: string) => void }) {
  return <button onClick={() => navigate("/the-beatles")}>Open The Beatles artist page</button>;
}

export default IndexPage;
