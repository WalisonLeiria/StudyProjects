import "./User.css";
import React from "react";
import axios from "axios";
import Main from "../template/Main/Main";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de Usuários!",
};

const baseUrl = "http://localhost:3001/users";
const initialState = {
  user: {
    name: "",
    email: "",
  },
  list: [],
};

export default class User extends React.Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data });
    })
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user;
    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user)
      .then(resp => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ user: initialState.user, list });
      })
  }

  getUpdatedList(user) {
    const list = this.state.list.filter(u => u.id !== user.id);
    list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.state.list.filter(u => u.id !== user);
      this.setState({ list });
    })
  }

  renderTable() {
    return (
      <table className="table md-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows() {
    return this.state.list.map(u => {
      return (
        <tr Key={u.id}>
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>
            <button className="btn btn-warning" onClick={e => this.load(u)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2" onClick={e => this.remove(u)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={e => this.updateField(e)}
                placeholder="Digite um nome..."/>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={e => this.updateField(e)}
                placeholder="Digite um email..."/>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
            <button className="btn btn-secundary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}
