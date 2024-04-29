import {LOGOUT} from "./AppTemplateActions";
import {LOGIN} from "../login/LoginPageActions";
import {SHOW_TERMS_MODAL, HIDE_TERMS_MODAL } from "./AppTemplateActions";

const initialState = {
    token: null,
    authenticated: false,
    termsModalVisible: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {...initialState};
        case LOGIN:
            return {
                ...state,
                token: action.token,
                authenticated: true
            };
            case SHOW_TERMS_MODAL:
                return {
                    ...state,
                    termsModalVisible: true
                };
            case HIDE_TERMS_MODAL:
                return {
                    ...state,
                    termsModalVisible: false
                };
        default:
            return state
    }
}
