function Service() {
  this.fetchData = function () {
    return axios({
      url: "https://625d2b4a4c36c753577065b8.mockapi.io/api/users",
      method: "GET",
    });
  };

  this.addUserApi = function (user) {
    return axios({
      url: "https://625d2b4a4c36c753577065b8.mockapi.io/api/users",
      method: "POST",
      data: user,
    });
  };

  this.deleteUser = function (id) {
    return axios({
      url: `https://625d2b4a4c36c753577065b8.mockapi.io/api/users/${id}`,
      method: "DELETE",
    });
  };

  this.getUserById = function (id) {
    return axios({
      url: `https://625d2b4a4c36c753577065b8.mockapi.io/api/users/${id}`,
      method: "GET",
    });
  };

  this.updateUser = function (user) {
    return axios({
      url: `https://625d2b4a4c36c753577065b8.mockapi.io/api/users/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}
