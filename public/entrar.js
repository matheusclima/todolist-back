// Capturar o elementos
let inputNome = document.getElementById("regNome");
let inputEmail = document.getElementById("regEmail");
let inputSenha = document.getElementById("regSenha");
let inputConf = document.getElementById("regConf");
let formRegistrar = document.getElementById("form-registrar");

// 
const urlBase = '/api';

const registrarUsuario = async (dados) => {

    // 1 - Definir a URL para onde a req vai ser enviada 
    let url = `${urlBase}/auth/registrar`
    // 2 - Preparar as opções de envio 
    let options = {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type':'application/json'
        }
    }
    // 3 - Enviar os dados para o endereço de registro 
    let response = await fetch(url, options)
    
    // 4 - Tratar a resposta
    tratarResposta(response)

}

const tratarResposta = async (response) => {
    switch (response.status) {
        case 201:
            // Capturar o token respondido pelo servidor
            let content = await response.json()
            console.log(content)

            //Salvar o token (sessionStorage)
            sessionStorage.setItem('token', content.token)
            sessionStorage.setItem('usuario', JSON.stringify(content.usuario))

            // Carregar index.html
            alert('Usuário cadastrado com sucesso')
            location = 'index.html'
            break;
        
        case 409:
            alert('Email já cadastrado')
            break;

        case 422:
            alert('Senha preenchida incorretamente')
            break;

        default:
            alert(`Erro inesperado: ${response.status}`)
            break;
    }
}

// Listeners
const onFormRegistrarSubmit = (evt) => {
    evt.preventDefault();
    let dados = {
        nome: inputNome.value,
        email: inputEmail.value,
        senha: inputSenha.value,
        confirmacao: inputConf.value,
    }

    registrarUsuario(dados)
}

// Associando listeners
formRegistrar.addEventListener('submit', onFormRegistrarSubmit)