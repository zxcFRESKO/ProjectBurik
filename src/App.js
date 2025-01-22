import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Header from "./components/Header/Header";
import Page_One from "./components/Page_one/Page_one";
import Page_two from "./components/Page_two/Page_two";
import { queryClient } from "./api/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Header />
        <Page_One />
        <Page_two />
      </>
    </QueryClientProvider>
  );
}

export default App;
