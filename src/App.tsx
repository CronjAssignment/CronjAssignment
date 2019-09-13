import React from "react";
import "./App.scss";
import Routes from "./routes/routes";
import ConfigureStore from "./redux/configureStore/configureStore";
import { Provider } from "react-redux";

const store = ConfigureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Routes />
        </header>
      </div>
    </Provider>
  );
};

export default App;
