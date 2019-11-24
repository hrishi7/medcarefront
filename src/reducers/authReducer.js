
    const initialState = {
        products: [],
        product:{},
    };
    export default function(state = initialState, action) {
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...state,
                    products:action.payload
                };
            case 'REGISTER':
                return {
                    ...state,
                    products:action.payload
                };
            case 'LOGOUT':
                return {
                    ...state,
                    products:action.payload
                };

            default:
                return state;
        }
    }
