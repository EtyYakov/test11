import axios from 'axios';

axios.defaults.baseURL="http://localhost:5102";

export async function RegisterPost(user){
  return axios.post('/User/Register', 
    user
  )
  .then(function (response) {
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}

export async function EventPost(event){
  return await axios.post('/Event', 
    event
  )
  .then(function (response) {
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}

export async function EventDelete(userId){
  return await axios.delete(`/Event/${userId}`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
      return 0;
    });
  }

export async function EventGet(userId){
  return await axios.get(`/Event/${userId}`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
      return 0;
    });
  }

export async function LoginPost(user){
  return await axios.post('/User/Login', 
      user
    )
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
    });
  }
