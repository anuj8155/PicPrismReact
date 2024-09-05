import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import GsapTransition from "./components/GsapTransition";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          
          <GsapTransition />
          <Footer />  
                  {/* Add your footer here */}
        </BrowserRouter>
      </Provider>
    </>
  );
}
