(function(){
    var closeDropdown = (btnDropdown) => {
        let iconeSpan = btnDropdown.firstElementChild;
        iconeSpan.textContent = "menu";
        let dropdown = document.querySelector('.dropdown-container');
        dropdown.classList.remove('d-block');
        dropdown.classList.add('d-none');
    }

    var openDropdown = (btnDropdown) => {
        let iconeSpan = btnDropdown.firstElementChild;
        iconeSpan.textContent = "close";
        let dropdown = document.querySelector('.dropdown-container');
        dropdown.classList.remove('d-none');
        dropdown.classList.add('d-block');
    }

    var btnMenu = document.querySelector('a.btn-menu');
    
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
})();