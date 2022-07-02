var inputData = document.querySelector('#inputTask');
var btnAddTask = document.querySelector('#btn-add');
var ulList = document.querySelector('#list');
var spans = document.getElementsByTagName('span');
let newDate = new Date()

function createTask() {
    var inputValue = inputData.value;

    //Проверка на пустое поле 

    if (inputData.value.trim() !== '') {

        var newLi = document.createElement('li');
        newLi.innerText = inputValue;

        var newSpan = document.createElement('span');
        newSpan.innerText = ' Delete ';

        newLi.append(newSpan);
        ulList.append(newLi);
        newLi.append(newDate.toLocaleDateString())//добавление даты
        counterPlus();

    } else {
        alert('Введите текст');
    }
    inputData.value = '';

    // removeTask();
}

//btnAddTask.onclick = createTask;

function removeTask() {
    for (let spanItem of spans) {
        spanItem.onclick = function () {
            spanItem.parentElement.remove();
            if (spanItem.parentElement.style.cssText = 'text-decoration: line-through;') {
                counterPlus()
            }
        }
    }
}

removeTask();

//Счётчик активных задач

let activeCounter = document.getElementById('active-counter')
let count = spans.length;

function counterPlus() {
    count++
    activeCounter.innerText = count
}

function counterMinus() {
    count--
    activeCounter.innerText = count

}


//Зачеркивание задачи при нажатии

let cross = document.getElementsByTagName('ul')

const crossOut = (event) => {

    if (event.target.style.cssText.length == 0 || event.target.style.cssText == 'text-decoration: none;') {
        event.target.style.cssText = 'text-decoration: line-through;'
        counterMinus()
    } else {
        event.target.style.cssText = 'text-decoration: none;'
        counterPlus()
    }

}

for (let i = 0; i < cross.length; i++) {
    cross[i].addEventListener('click', crossOut)
}

//Информация о себе 

let btnOpen = document.querySelector('#open-modal');
let modal = document.querySelector('#modal1');

btnOpen.addEventListener('click', function () {
    modal.classList.add('modal_open')
})



const getTodos = () => {
    fetch('https://todo-app274612651.herokuapp.com/api/post?id=1').then(
        res => res.json()
    ).then(
        data => {
            ulList.innerHTML = '';
            data.forEach(item => {
                ulList.innerHTML += `
                <li>${item.content} <span>Delete</span></li>
                `
            });
        }
    )
}

getTodos();

const postToso = () => {
    var inputValue = inputData.value;

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            {
                "title": "test",
                "content": inputValue,
                "user_id": 1
            }
        )
    };
    fetch('https://todo-app274612651.herokuapp.com/api/post', options).then(
        res => res.json()
    ).then(
        data => console.log(data)
    )
}

btnAddTask.addEventListener('click', postToso)

btnAddTask.addEventListener('click', createTask)


