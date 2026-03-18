function login() {
    let email = document.getElementById('email').value
    let senha = document.getElementById("senha").value
     
     if(email === "admin@email.com" && senha === "1234") {
        localStorage.setItem("logado", "true");
        window.location.href = "../pages/projetos.html"
     } else {
         alert("Email ou senha incorretos")
     }

}

function logout(){

    localStorage.removeItem("logado")
    window.location.href = "../auth/login.html"

}

