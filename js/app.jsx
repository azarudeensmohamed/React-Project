import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.css";
import { createRoot } from 'react-dom/client'
import App from "./Pages/App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
