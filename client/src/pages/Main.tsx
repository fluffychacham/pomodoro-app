import { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { LOGIN, POMODORO } from "../Paths";
import { store } from "../stores/store";
import { Login } from "./Login";
import style from "./Main.module.scss";
import { Pomodoro } from "./Pomodoro";

const Main: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className={style.container}>
        <Switch>
          <Redirect path="/" to={POMODORO} exact />
          <Route path={POMODORO} component={Pomodoro} />
          <Route path={LOGIN} component={Login} />
        </Switch>
      </div>
    </Provider>
  );
};

export default Main;
