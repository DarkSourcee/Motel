const getApiUrl = () => {
    const ddns = localStorage.getItem("empresa");

    if (!ddns) return null;

    console.log(ddns)

    return {
      url: `http://${ddns}:1011/info`,
      urlCaixa: `http://${ddns}:1011/caixaatual`,
      urlBloquear: `http://localhost:3000/BloquearSuite`
    };
  };
  
  export default getApiUrl;