
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {MantineProvider} from "@mantine/core";
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <Router>
        <Provider store={store}>
            <MantineProvider >
                    <App />
            </MantineProvider>
        </Provider>
    </Router>
)
