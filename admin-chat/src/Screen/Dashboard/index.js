import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

//import components
import MenuSidebar from "../../Components/menu";
import Body from "../../Components/body";
import ItemTable from "../../Components/ItemTable";

import api from "../../services/api";

function DashboardScreen() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState("");
  const [ordenar, setOrdenar] = useState("");

  const [dashboard, setDashboard] = useState("active");
  const [titlePage, setTitlePage] = useState("Dashboard");
  const [users, setUsers] = useState([]);

  document.title = titlePage;
  document.body.id = "page-top";

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/");
      setUsers(response.data);
    }

    loadUsers();
  }, []);

  async function deleteItem(id) {
    const response = await api.post("/deleteMessage", {
      id,
    });
    alert("Deletado com Sucesso!");
    buscarAllMessages();
  }

  async function buscarData() {
    const response = await api.post("/filterMessages", {
      username,
      data,
      ordenar,
    });

    setUsername("");
    setData(null);
    setUsers(response.data);
    if (response.data.length > 0) {
      alert("Carregado com Sucesso!");
    } else {
      alert("Usuarios Não Econtrado!");
    }
    console.log(response.data);
  }

  async function buscarAllMessages() {
    const response = await api.post("/filterMessages", { all: true, ordenar });
    alert("Carregado com Sucesso!");
    setUsers(response.data);
  }

  return (
    <div id="wrapper">
      <MenuSidebar dashboard={dashboard} />

      <Body titlePage={titlePage}>
        <div className="col-sm-12 card shadow mb-4">
          <div className="container p-4">
            <div className="row">
              <div className="form-group col-md-4">
                <label htmlFor="usr">User Name:</label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="usr"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="usr">Data:</label>
                <input
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                  type="date"
                  className="form-control"
                  id="usr"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="sel1">Ordenar por:</label>
                <select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setOrdenar(e.target.value);
                  }}
                  className="form-control"
                  id="sel1"
                >
                  <option value={1}>Mais recentes</option>
                  <option value={-1}>Mais antigas</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <button
                  onClick={buscarData}
                  type="button"
                  className="btn btn-primary"
                >
                  Buscar
                </button>
              </div>
              <div className="form-group col-md-4">
                <button
                  onClick={buscarAllMessages}
                  type="button"
                  className="btn btn-info"
                >
                  Mostra Todos
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-hover table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User Name</th>
                    <th>Menssage</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="userslist">
                  {users.map((item, index) => {
                    return (
                      <ItemTable
                        deleteItem={deleteItem}
                        key={index}
                        item={item}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Body>
    </div>
  );
}

export default DashboardScreen;
