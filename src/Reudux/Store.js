import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./Reducer";
import thunk from "redux-thunk";

const middlewares = [thunk];

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;
