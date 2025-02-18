import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/client.json");
      const users = await response.json();

      const userFound = users.find(
        (u) => u.user === user && u.password === password
      );

      setLoading(false);

      if (userFound) {
        // se tiver logado pega pelo ddns
        await localStorage.setItem("ddns", userFound.ddns);
        navigate("/");
      } else {
        Swal.fire({
            title: 'Erro!',
            text: 'Credenciais inválidas',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao conectar com o arquivo',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-md-4">
          <form className="form-signin text-center" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Entrar no Sistema</h1>
            {error && <p className="text-danger small">{error}</p>}
            <label htmlFor="inputUser" className="sr-only">Usuário</label>
            <input
              type="text"
              id="inputUser"
              className="form-control mb-2"
              placeholder="Informe seu usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              autoFocus
            />
            <label htmlFor="inputPassword" className="sr-only">Senha</label>
            <input
              type="password"
              id="inputPassword"
              className="form-control mb-3"
              placeholder="Informe sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </button>
            <p className="mt-3 mb-3 text-muted">2025© MVA Development & Tech Consultancy LTDA</p>
          </form>
        </div>
      </div>
    </div>
  );
}