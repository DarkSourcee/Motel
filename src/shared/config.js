const getApiUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '192.168.15.12') {
      return {
        url: 'http://192.168.15.12:1011/info',
        urlCaixa: 'http://192.168.15.12:1011/caixaatual',
      };
    } else {
      return {
        url: 'http://sistemanumotel.ddns.net:1011/info',
        urlCaixa: 'http://sistemanumotel.ddns.net:1011/caixaatual',
      };
    }
  };
  
  export default getApiUrl;