
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename='/frontendVacancyPage'>
        <Provider store={store}>
            <MantineProvider >
                    <App />
            </MantineProvider>
        </Provider>
    </BrowserRouter>
)
