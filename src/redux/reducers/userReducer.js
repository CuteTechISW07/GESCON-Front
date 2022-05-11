import { ActionTypes } from "../constants/action-types";

const initialState = {
    id: null,
    mail: null,
    tipo_user: null,
    nombre: null,
    token: null,
    autenticado : false,
}

export const userReducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.USR_LOGIN:
            return {
                ...state,
                id: action.payload.id,
                mail: action.payload.mail,
                tipo_user: action.payload.tipo_user,
                nombre: action.payload.nombre,
                token: action.payload.token,
                autenticado : action.payload.autenticado
            }
        case ActionTypes.USR_LOGOUT:
            return {
                ...state,
                id: null,
                mail: null,
                tipo_user: null,
                nombre: null,
                token: null,
                autenticado: false
            }
        default:
            return state;
    }
}