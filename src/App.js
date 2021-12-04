import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Fetching from "./components/Fetching";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Fetching />
      </div>
    </QueryClientProvider>
  );
}

export default App;
