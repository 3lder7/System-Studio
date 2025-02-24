//JS DE COMENTÁRIOS----------------------------------------------
function abrirFormComentario(button){//trabalhando com parentElement e nextElementSibling pra facilitar  uso de vários botões
    const comentarioForm = button.parentElement.nextElementSibling;
    if(comentarioForm.style.display === 'none'){
        comentarioForm.style.display = 'block';
    }else{
        comentarioForm.style.display = 'none';
    }//if else para mostrar e esconder o formulário de comentário ao clicar no botão
}


//JS DE POSTS/MODAL---------------------------------------------------
function abrirModal() {
    document.getElementById('modalPost').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalPost').style.display = 'none';
}

function criarPost() {
    var conteudo = document.getElementById('novoPostConteudo').value;
    if (conteudo) {
        // lógica para criar um novo post
        alert('Post criado: ' + conteudo);
        fecharModal();
    } else {
        alert('Por favor, digite o conteúdo do post.');
    }
}