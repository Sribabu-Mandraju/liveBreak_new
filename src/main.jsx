import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  </Provider>
);
