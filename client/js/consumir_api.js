var axiosConfig = {
    headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
}

function login(){
    var emailField = document.querySelector('#email');
    var passField = document.querySelector('#password');

    var email = emailField.value;
    var password = passField.value;
    
    axios.post('http://localhost:8080/aut', {
        email,
        password
    }).then(res => {
        var token = res.data.token;
        localStorage.setItem('token', token);

        axiosConfig.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        
        alert('Logado!');

        emailField.value = '';
        passField.value = '';
    }).catch(err => {
        alert('Login invalido!');
    });
}

function createGame(){
    var game = {
        title: document.querySelector('#title').value,
        category: document.querySelector('#category').value,
        year: document.querySelector('#year').value,
        price: document.querySelector('#price').value
    }

    axios.post('http://localhost:8080/games', game, axiosConfig).then(res => {
        if(res.status == 200){
            alert('Jogo cadastrado com sucesso!');
        }
    }).catch(err => {
        if(res.status != 200){
            alert('Nao foi possivel cadastrar o jogo!');
            console.log(err);
        }
    });
}

function deleteGame(item){
    var id = item.getAttribute('data-id');

    axios.delete('http://localhost:8080/game/' + id, axiosConfig).then(res => {
        alert('' + item.getAttribute('data-titulo') + ' Deletado com sucesso!');
    }).catch(error => {
        alert('Nao foi possivel deletar o jogo!');
    });
}

function formLoad(item){
    var id = item.getAttribute('data-id');
    var title = item.getAttribute('data-title');
    var category = item.getAttribute('data-category');
    var year = item.getAttribute('data-year');
    var price = item.getAttribute('data-price');

    document.querySelector('#editId').value = id;
    document.querySelector('#editTitle').value = title;
    document.querySelector('#editCategory').value = category;
    document.querySelector('#editYear').value = year;
    document.querySelector('#editPrice').value = price;
}

function updateGame(){
    var idField = document.querySelector('#editId');
    var title = document.querySelector('#editTitle');
    var category = document.querySelector('#editCategory');
    var year = document.querySelector('#editYear');
    var price = document.querySelector('#editPrice');

    var game = {
        title: title.value,
        category: category.value,
        year: year.value,
        price: price.value
    }

    var id = idField.value;

    axios.put('http://localhost:8080/game' + id, game, axiosConfig).then(res => {
        if(res.status){
            alert('Jogo atualizado com sucesso!');
        }
    }).catch(err => {
        if(res.status != 200){
            alert('Nao foi possivel atualizar!');
        }
    });
}

axios.get('http://localhost:8080/games', axiosConfig).then(res => {
    var games = res.data;
    var list = document.querySelector('#games');

    games.forEach(game => {
        var li = document.createElement('li');

        li.setAttribute('data-id', game.id);
        li.setAttribute('data-title', game.title);
        li.setAttribute('data-category', game.category);
        li.setAttribute('data-year', game.year);
        li.setAttribute('data-price', game.price);

        li.innerHTML = game.title + ' - ' + game.year + ' R$' + game.price;

        var deleteBtn = document.createElement('button');

        deleteBtn.innerHTML = 'Deletar';
        deleteBtn.addEventListener('click', function(){
            deleteGame(li);
        });

        var editBtn = document.createElement('button');
        
        editBtn.innerHTML = 'Editar';
        editBtn.addEventListener('click', function(){
            formLoad(li);
        });

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        list.appendChild(li);
    });
});