import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const result = await axios.get('/api/current_user');
    dispatch({
        type: FETCH_USER,
        payload: result.data
    });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({
        type: FETCH_USER,
        payload: res.data
    });
}
// export const fetchUser = () => {
//     return function(dispatch){
//         axios
//         .get('/api/current_user')
//         .then(result => dispatch({
//             type: FETCH_USER,
//             payload: result
//         }));
//     };
// };