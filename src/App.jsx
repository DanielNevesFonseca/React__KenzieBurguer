import { HomePage } from "./pages/HomePage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css";
import "../src/styles/index.scss";
import { SkeletonTheme } from "react-loading-skeleton";
const App = () => {
  return (
    <>
      <SkeletonTheme baseColor="#828282" highlightColor="#525252">
        <HomePage />
        <ToastContainer autoClose={2 * 1000} position="bottom-right" />
      </SkeletonTheme>
    </>
  )
}

export default App;
