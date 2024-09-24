import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import { AppProvider } from "./app-provider";
import { AppRoot } from "./routes/app/root";

const App = () => {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  );
};

export default App;
