export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7";
  this._table = "";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };

  this.login = async function (email, password, role) {
    const payload = {
      email: email,
      password: password,
      role: role,
    };

    const loginResult = await fetch(this._baseurl + "/v2/api/lambda/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
      },
      body: JSON.stringify(payload),
    });

    const jsonLogin = await loginResult.json();
    console.log(jsonLogin);

    if (loginResult.status === 401) {
      throw new Error(jsonLogin.message);
    }

    if (loginResult.status === 403) {
      throw new Error(jsonLogin.message);
    }

    localStorage.setItem("token", jsonLogin.token);

    return jsonLogin;
  };

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };

  this.callRestAPI = async function (payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    console.log(payload, method);

    switch (method) {
      case "GET":
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/GET`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        return jsonGet;

      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        console.log(payload);
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/video/${this._table}${method}`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonPaginate = await paginateResult.json();
        console.log;

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      default:
        break;
    }
  };

  this.check = async function (role) {
    const checkResult = await fetch(this._baseurl + "/v2/api/lambda/check", {
      method: "POST",
      headers: this.getHeader(),
      body: JSON.stringify({ role: role }),
    });

    const jsonCheck = await checkResult.json();

    if (checkResult.status === 401) {
      throw new Error(jsonCheck.message);
    }

    if (checkResult.status === 403) {
      throw new Error(jsonCheck.message);
    }

    return jsonCheck;
  };

  return this;
}
