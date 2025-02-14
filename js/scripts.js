function abrirFormComentario(button){//trabalhando com parentElement e nextElementSibling pra facilitar  uso de vários botões
    const comentarioForm = button.parentElement.nextElementSibling;
    if(comentarioForm.style.display === 'none'){
        comentarioForm.style.display = 'block';
    }else{
        comentarioForm.style.display = 'none';
    }//if else para mostrar e esconder o formulário de comentário ao clicar no botão
}