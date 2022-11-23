# Some important things to note

## useSelector and useDIspatch

```js
import { useDispatch, useSelector } from "react-redux";

const { loading, error, userInfo } = useSelector((state) => state.userLogin);

// Shiki ichi
const dispatch = useDispatch();
dispatch({ type: "USR_LOGIN_SUCC", payload: data });

// Shiki ni
dispatch(login(email, password))
export const login = (email,  password) => async(dispatch) => {...}
```
