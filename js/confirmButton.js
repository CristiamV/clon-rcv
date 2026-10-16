window.formSubmitting = false;

function preventDoubleSubmit(e){

    
    if(window.formSubmitting){
        e.preventDefault();
        return false;
    }

    window.formSubmitting = true;

    const btn = e.submitter;

    if(btn){
        btn.disabled = true;
        btn.innerHTML = "Procesando...";
    }

}