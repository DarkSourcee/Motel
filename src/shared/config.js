const getApiUrl = () => {
    const ddns = localStorage.getItem("ddns");

    if (!ddns) return null;

    console.log(ddns)

    return {
      url: `http://${ddns}:1011/info`,
      urlCaixa: `http://${ddns}:1011/caixaatual`,
      urlBloquear: `http://${ddns}:1011/BloquearSuite`
    };
  };
  
  export default getApiUrl;