class Todo {
    constructor() {
        var _this = this;
        _this.list = JSON.parse(localStorage.getItem('todo-list')) || [];
        _this.el = document.querySelector(".todo-wrap");
        _this.listItems = document.createElement('ul');
        _this.listItems.addEventListener("click", function(e){
            if( e && e.target && e.target.classList.contains("remove-task-button") ) {
                _this.removeTask(e.target.parentNode.dataset.index);
            }
        });
        _this.listItems.addEventListener("click", function(e){
            if( e && e.target && e.target.classList.contains("complite-task-checkbox") ) {
                _this.compliteTask(e.target.parentNode.querySelector(".complite-task-checkbox"), e.target.parentNode.dataset.index);
            }
        });
        _this.listItems.addEventListener("click", function(e){
            if( e && e.target && e.target.classList.contains("edit-task-button") ) {
                _this.editTask(e.target.parentNode, e.target.parentNode.dataset.index);
            }
        });
        _this.listItems.className = 'todo-list';
        _this.el.appendChild(_this.listItems);
        _this.buildList();
        _this.buildAddForm();
    }
    buildList() {
        this.listItems.innerHTML = this.list.map(function(val, index) {
            var oneElem = `
                <li data-index="${index}">
                    <input class="complite-task-checkbox" type="checkbox" ${val.taskComplite ? "checked" : "" } />
                    <span class="task-desc">${val.taskDesc}</span>
                    <button type="button" class="remove-task-button">&times;</button>
                    <button type="button" class="edit-task-button">edit</button>
                </li>
            `;
            return oneElem;
        }).join('');
    }
    addTask(desc, status) {
        var allItems = this.list,
            newItem = {
                'taskDesc': desc,
                'taskComplite': status
            };
        allItems.push(newItem);
        localStorage.setItem('todo-list', JSON.stringify(allItems));
        this.buildList();
    }
    removeTask(id) {
        var allItems = this.list;
        allItems.splice(id, 1);
        localStorage.setItem('todo-list', JSON.stringify(allItems));
        this.buildList();
    }
    editTask(element, id) {
        var allItems = this.list,
            elementDesc = element.querySelector(".task-desc"),
            elementButtEdit = element.querySelector(".edit-task-button");
        if ( "true" != element.dataset.edit ) {
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("value", elementDesc.textContent);
            input.className = "edit-text-field";
            element.insertBefore(input, element.children[1]);
            elementDesc.style.display = 'none';
            elementButtEdit.textContent = "Save";
            element.dataset.edit = 'true';
        } else {
            allItems[id].taskDesc = element.querySelector(".edit-text-field").value;
            elementDesc.textContent = element.querySelector(".edit-text-field").value;
            element.removeChild(element.querySelector(".edit-text-field"));
            elementDesc.style.display = '';
            elementButtEdit.textContent = "edit";
            element.dataset.edit = '';
            localStorage.setItem('todo-list', JSON.stringify(allItems));
        }
    }
    compliteTask(element, id) {
        var allItems = this.list;
        if ( element.checked ) {
            allItems[id].taskComplite = true;
        } else {
            allItems[id].taskComplite = false;
        }
        localStorage.setItem('todo-list', JSON.stringify(allItems));
    }
    buildAddForm() {
        var _this = this,
            addForm = document.createElement('div'),
            inputButton = document.createElement('input'),
            addButton = document.createElement('button');

        inputButton.className = "add-task-text";
        inputButton.setAttribute("type", "text");
        inputButton.setAttribute("placeholder", "What add in todo? Nothing");

        addButton.className = "add-task-button";
        addButton.setAttribute("type", "button");
        addButton.textContent = "+";

        addForm.className = 'add-form-line';
        addForm.appendChild(inputButton);
        addForm.appendChild(addButton);

        addButton.addEventListener("click",function(event){
            _this.addTask(inputButton.value, false);
            inputButton.value = "";
        });
        _this.el.prepend(addForm);
    }
}