function abrirFormComentario(button){//trabalhando com parentElement e nextElementSibling pra facilitar  uso de vários botões
    const comentarioForm = button.parentElement.nextElementSibling;
    if(comentarioForm.style.display === 'none'){
        comentarioForm.style.display = 'block';
    }else{
        comentarioForm.style.display = 'none';
    }//if else para mostrar e esconder o formulário de comentário ao clicar no botão
}

function enviarComentario(button) {
    const comentarioForm = button.parentElement;//criação variável pra pegar o elemento pai do botão clicado
}//função para enviar o comentário digitado no formulário para a div de comentários