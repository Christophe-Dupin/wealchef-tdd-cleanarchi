import {Action, applyMiddleware, combineReducers, createStore as createReduxStore, Store} from "redux";
import {cart} from "../corelogic/reducers/restaurantArticlesCart.reducer";
import {restaurant} from "../corelogic/reducers/restaurant.reducer";
import thunk, {ThunkAction, ThunkDispatch, ThunkMiddleware} from "redux-thunk";
import {Dependencies} from "./dependencies";
import {AppState} from "./appState.interface";

export const configureStore = (dependencies: Dependencies | null) => {
    return createReduxStore(
        combineReducers({
            cart,
            restaurant
        }), applyMiddleware(dependencies ?
            thunk.withExtraArgument(dependencies) as ThunkMiddleware<AppState, Action, Dependencies> :
            thunk));
};

export type ReduxStore = Store<AppState> & { dispatch: ThunkDispatch<AppState, Dependencies, Action> }

export type ThunkResult<R> = ThunkAction<R, AppState, Dependencies, Action>;
