/*
  - Construa uma aplicação de conversão de moedas. O HTML e CSS são os que você
    está vendo no browser;
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento, 
    concentre-se em executar o que descreverei abaixo;
    - Quando a página for carregada: 
      - Popule os <select> com tags <option> que contém as moedas que podem ser
        convertidas. "BRL" para real brasileiro, "EUR" para euro, "USD" para 
        dollar dos Estados Unidos, etc.
      - O option selecionado por padrão no 1º <select> deve ser "USD" e o option
        no 2º <select> deve ser "BRL";
      - O parágrafo com data-js="converted-value" deve exibir o resultado da 
        conversão de 1 USD para 1 BRL;
      - Quando um novo número for inserido no input com 
        data-js="currency-one-times", o parágrafo do item acima deve atualizar 
        seu valor;
      - O parágrafo com data-js="conversion-precision" deve conter a conversão 
        apenas x1. Exemplo: 1 USD = 5.0615 BRL;
      - O conteúdo do parágrafo do item acima deve ser atualizado à cada 
        mudança nos selects;
      - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
        cada mudança nos selects e/ou no input com data-js="currency-one-times";
      - Para que o valor contido no parágrafo do item acima não tenha mais de 
        dois dígitos após o ponto, você pode usar o método toFixed: 
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    - Para obter as moedas com os valores já convertidos, use a Exchange rate 
      API: https://www.exchangerate-api.com/;
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
*/

/* Pegando os selects (referencias) que são a conversão de BR para USD de inicio*/

const currencyOneEL = document.querySelector('[data-js="currency-one"]');
 /*data-js acessa o elemento js no caso o select*/
const currencyTwoEl = document.querySelector('[data-js = "currency-two"]');
const currenciesEl = document.querySelector('[data-js="currencies-container"]')
const timesCurrencyOneEl = document.querySelector('[data-js="currency-one-times"]')

/* Popular os selects com as informações das moedas para isso está sendo utilizado uma APi*/

const url =
  "https://v6.exchangerate-api.com/v6/400c6b2549090ecb8d7ff11d/latest/USD"; /*chave da API*/

/*  Tratando todos os Erros da API de acordo com a documentação, poderia fazer generico mais assim o erro fica mais expecifico */
const getErrorMessage = (errorType) =>
  ({
    "unsupported-code": "A moeda não existe em nossa banco de dados.",
    "malformed-request": "Seu request precisa seguir à estrutura",
    "invalid-key": "A chave API não é valida",
    "quota-reached":
      "Sua conta alcançou o limite de requests permitidos em seu plano atual",
  }[errorType] ||
  "Não foi possivel obter as  informações"); /* Se não for nenhuma dessas informações de erro ele exibe essa mensagem generica*/

/* Tratameto de Erros com try catch*/
const fetchExchangeRate = async () => {
  /* a função async espera uma ação ser finalizada  para executar outra*/

  try {
    const response = await fetch(
      url
    ); /*Se utiliza fecth para buscar dados de outro lugar nessa caso na API*. await = enquanto a requisição não
     chegar nehuem codigo é executado */

    /* Tratamento de erro caso a internet caia*/
    if (!response.ok) {
      throw new Error(
        "Sua conexão falhou. Não foi possivel obter asinformações"
      );
    }

    const exchangeRateData =
      await response.json(); /*obtem as informações da API em json*/

    if (exchangeRateData.result === "error") {
      /*Se der um erro eu consigo criar minha propria mensagem*/
      throw new Error(getErrorMessage(exchangeRateData["error-type"]));
    }
  } catch (err) {
    /* criando uma div para personalizar o alert */
    const div = document.createElement("div");
    const button = document.createElement("button");

    div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')

        button.classList.add('btn-close')
        button.setAttribute('type', 'button')
        button.setAttribute('aria-label', 'Close')

        button.addEventListener('click', () => {
            div.remove();
        })

        div.appendChild(button)

        currenciesEl.insertAdjacentElement('afterend', div)
  }
};

/*Preenchendo os selects com as moedas*/
const init = async () => {
  const exchangeRateData =  await fetchExchangeRate()
 
  const getOptions = selectedCurrency => Object.keys(internalExchageRate.conversion_rates)
    .map(currency => `<option ${currency === selectedCurrency ? 'selected': ''} >${currency}</option>`)
    .join('')

    currencyOneEL.innerHTML = getOptions('USD');
    currencyTwoEl.innerHTML = getOptions('BRL');
  
  convertedValeuEl.textContent = `BRL:${internalExchageRate.conversion_rates.BRL.toFixed(2)}`
  valeuPrecisionEl.textContent = `1 USD = ${internalExchageRate.conversion_rates.BRL} BRL`
  
  
}


init()

