# for1book

## How to save data in react

### Using cookies

```js
import cookies from js-cookie

// Save data
cookies.set("<name>", JSON.stringify(data))

// Get data
JSON.parse(cookies.get("<name>"))

// delete data
cookies.remove("<name>")
```

### Using local storage

```js
// Save data
localstorage.setItem(JSON.stringify("<name>"));

// Get data
JSON.parse(localstorage.getItem("<name>"));

//deleteData
localstorage.removeItem("<name>");
```

## How to route in react

### Using params(history, location)

```js
// Create a link...
const redirect = location.search.split("=")[1];

history.push(reditect);
```

### Use navigate

```js
import { useNavigate } from "react-router-dom";

navigate = useNavigate();
navigate("<link>");
```

## Use of {match, location, history}

```js
link = "/cart/:id?qty=12
const id = match.params.id
const qty = location.search ? Number(location.search.split('=')[1]) : 1
history.push("/location")

// To go back
history.go(-1)
```
