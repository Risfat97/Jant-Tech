(function(){
    const closeDropdown = (btnDropdown) => {
        let iconeSpan = btnDropdown.firstElementChild;
        iconeSpan.textContent = "menu";
        let dropdown = document.querySelector('.dropdown-container');
        dropdown.classList.remove('d-block');
        dropdown.classList.add('d-none');
    };

    const openDropdown = (btnDropdown) => {
        let iconeSpan = btnDropdown.firstElementChild;
        iconeSpan.textContent = "close";
        let dropdown = document.querySelector('.dropdown-container');
        dropdown.classList.remove('d-none');
        dropdown.classList.add('d-block');
    };

    const showError = (domElement) => {
        if(domElement.classList.length === 4 && domElement.classList[3] === 'd-none')
            domElement.classList.remove('d-none');
    }

    const hideError = (domElement) => {
        if(domElement.classList.length !== 4)
            domElement.classList.add('d-none');
    }

    const checkFormContact = () => {
        if(inputName.value.length < 2){
            showError(errName);
            return false;
        }
        else
            hideError(errName);

        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!pattern.test(inputMail.value)){
            showError(errMail);
            return false;
        }
        else 
            hideError(errMail);

        if(inputMsg.value.length < 1){
            showError(errMsg);
            return false;
        }
        else
            hideError(errMsg);

        return true;
    };

    const sendMail = () => {
        let name = inputName.value.trim(),
            mail = inputMail.value.trim(),
            msg = inputMsg.value.trim();
        fetch('/mailer.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name, 
                mail: mail,
                msg: msg
            })
        })
        .then(response => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch(function (err){
            console.log(err);
        });

        inputName.value = '';
        inputMail.value = '';
        inputMsg.value = '';
    };

    var btnMenu = document.querySelector('a.btn-menu');
    var inputName = document.querySelector('input[name="name"'),
        errName = document.querySelector('small.err-name'),
        inputMail = document.querySelector('input[name="mail"'),
        errMail = document.querySelector('small.err-mail'),
        inputMsg = document.querySelector('textarea[name="msg"'),
        errMsg = document.querySelector('small.err-msg'),
        formContact = document.getElementById('formContact');
    
    if(btnMenu){
        let iconeSpan = btnMenu.firstElementChild;
        let links = document.querySelectorAll(".dropdown-container > li");
        btnMenu.addEventListener('click', (e) => {
            if(iconeSpan.textContent === "menu"){
                openDropdown(btnMenu);
            } else{
                closeDropdown(btnMenu);
            }
        });

        links.forEach((link) => {
            link.addEventListener('click', function(){
                closeDropdown(btnMenu);
            });
        });
    }

    formContact.addEventListener('submit', (e) => {
        e.preventDefault();
        if(checkFormContact())
            sendMail();
    })
})();