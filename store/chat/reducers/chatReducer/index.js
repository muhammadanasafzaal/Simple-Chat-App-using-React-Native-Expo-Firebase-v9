// import { CONSTANTS } from '../../actions/chatAction/';


const reducer = (state = {}, action) => {
    // console.log('reducer called ==>',action)
    switch(action.type){
        case 'UPDATE_MESSAGES': {
            return {...state, messages: action.data}
        }
        default: {
            return state
        }
    }
} 

export default reducer