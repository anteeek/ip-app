import { QueryClient, QueryClientProvider } from "react-query";
import { IPLocator } from "./components/IPLocator/IPLocator";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IPLocator />
    </QueryClientProvider>
  );
}

export default App;
