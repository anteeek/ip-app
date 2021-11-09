import { QueryClient, QueryClientProvider } from "react-query";
import { IPLocator } from "./components/IPLocator/IPLocator";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <IPLocator />
    </QueryClientProvider>
  );
}

export default App;
