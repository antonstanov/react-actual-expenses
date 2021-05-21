import {combineReducers} from "redux";
import {homePageReducer} from "./homePageReducer";

export const rootReducer = combineReducers({
  homePageData: homePageReducer
})
