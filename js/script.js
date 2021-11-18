'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const btnAddTask = document.querySelector('.todo__input'),
        todoInput = document.querySelector('.todo__text'),
        todobtnSave = document.querySelector('.todo__save'),
        todoWrapper = document.querySelector('.todo__items');

    let tasks;
    /*  localStorage.removeItem('tasks'); */
    !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

    btnAddTask.addEventListener('click', () => {
        let task = todoInput.value;
        if (task === "") {
            return;
        } else {
            tasks.push(task);
            createList();
            updateLocal();

            todoInput.value = '';
        }
    });
    todobtnSave.addEventListener('click', () => {
        postData('http://localhost:3000/posts', JSON.stringify(tasks)).
        then(res => {
            console.log(res);
            console.log('Запрос отправлен');
        });
    });

    const updateLocal = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    function createList() {
        todoWrapper.innerHTML = "";
        tasks.forEach((task, i) => {
            todoWrapper.innerHTML += `<li class="todo__items-item">${i+1}.${task}
            <a><div class="plus"></div></a> 
            <div class="delete"></div>
        </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                tasks.splice(i, 1);
                updateLocal();
                createList();

            });
        });
    }
    createList();

    let btns = document.querySelectorAll('.plus');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'task.html';
        });



    });


    const postData = async(url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

});