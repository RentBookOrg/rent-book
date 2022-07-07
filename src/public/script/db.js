export const getBookLocationsFromDb = async () => fetch("http://147.182.205.177:5000/locations")

export const getBooksByLocation = async () => fetch(`http://147.182.205.177:5000/book/location?location_id=${window.localStorage.getItem("user_location_id")}`)

export const get_UserId = async (data) => fetch("http://147.182.205.177:5000/register",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(data)
}).then(res => res.json())

export const getUserBooks = async ()=> fetch(`http://147.182.205.177:5000/book/user?userId=${window.localStorage.getItem("user_id")}`)

export const getCategories = async (data) => fetch("http://147.182.205.177:5000/categories")

export const get_UserInfo = async (user_id) => fetch(`http://147.182.205.177:5000/user?user_id=${user_id}`)


export const getBooksById = async(id) => fetch(`http://147.182.205.177:5000/book/location?location_id=${id}`);


export const resend_verification = async(user_id) => fetch(`http://147.182.205.177:5000/resend/${user_id}`)

export let sendJSON = (data,link)=>{
  
  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = `http://147.182.205.177:5000/locations/${link}`;

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

      // Print received data from server
      console.log("SEND DATA")

    }
  };

  // Converting JSON data to string
  var data = JSON.stringify(data);

  // Sending data with the request
  xhr.send(data);
}

export let login = async() => fetch("http://147.182.205.177:5000/register").then(res => res.json())