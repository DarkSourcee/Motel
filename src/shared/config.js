const getApiUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '192.168.0.3') {
      return {
        url: 'http://192.168.0.3:1011/info',
        urlCaixa: 'http://192.168.0.3:1011/caixaatual',
        urlBloquear: 'http://192.168.0.3:1011/BloquearSuite'
      };
    } else {
      return {
        url: 'http://lebaronmotel.ddns.net:1011/info',
        urlCaixa: 'http://lebaronmotel.ddns.net:1011/caixaatual',
        urlBloquear: 'http://lebaronmotel.ddns.net:1011/BloquearSuite'
      };
    }
  };
  
  export default getApiUrl;