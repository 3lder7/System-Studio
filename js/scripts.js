function abrirFormComentario(button){//trabalhando com parentElement e nextElementSibling pra facilitar  uso de vários botões
    const comentarioForm = button.parentElement.nextElementSibling;
    if(comentarioForm.style.display === 'none'){
        comentarioForm.style.display = 'block';
    }else{
        comentarioForm.style.display = 'none';
    }//if else para mostrar e esconder o formulário de comentário ao clicar no botão
}

function enviarComentario(button) {
    const comentarioForm = button.parentElement;
    const textarea = comentarioForm.querySelector('textarea');
    const comentarioTexto = textarea.value.trim();

    if (comentarioTexto !== '') {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('comentario');
        comentarioDiv.textContent = comentarioTexto;

        const post = comentarioForm.parentElement;
        post.insertBefore(comentarioDiv, comentarioForm);

        textarea.value = '';
        comentarioForm.style.display = 'none';
    } else {
        alert('Por favor, digite um comentário.');
    }
}//função para enviar o comentário digitado no formulário para a div de comentários