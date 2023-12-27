const userName = document.getElementById("name");
const userAge = document.getElementById("age");
const userEmail = document.getElementById("email");
const btn = document.getElementById("btn");
const form = document.getElementById("form");
const table = document.getElementById("table");

function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
}

function validate() {
    if (!userName.value) {
        userName.style.outlineColor = "red";
        userName.focus();
        return;
    }
    if (!userAge.value) {
        userAge.style.outlineColor = "red";
        userAge.focus();
        return;
    }
    if (!userEmail.value) {
        userEmail.style.outlineColor = "red";
        userEmail.focus();
        return;
    }
    if (!isValidEmail(userEmail.value)) {
        alert("Email noto'g'ri kiritilgan.Iltimos qaytadan kiriting.");
        userEmail.style.outlineColor = "red";
        userEmail.focus();
        userEmail.value = "";
    }
}

function createRow(user, index) {
    let strRow = `
        <tr>
            <td>${index+1}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>
                <span id="user-delete-${user.id}" class="delete">delete </span>
                <span id="user-update-${user.id}" class="update"> update</span>
            </td>
        </tr>`;
    table.innerHTML += strRow;
}

function saveLocalstorage() {
    let data = localStorage.getItem("users") ?
        JSON.parse(localStorage.getItem("users")) : [];

    let user = {};
    user.id = Date.now();
    user.name = userName.value;
    user.age = userAge.value;
    user.email = userEmail.value;
    data.push(user);
    localStorage.setItem("users", JSON.stringify(data));

    createRow(user, data.length - 1);

    form.reset();
}

btn.addEventListener("click", function() {
    validate();
    saveLocalstorage();
});

window.onload = function() {
    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (data.length) {
        data.forEach((user, index) => {
            createRow(user, index);
        });
    }

    let deleteButtons = document.querySelectorAll['span.delete'];
    if (deleteButtons.length) {
        deleteButtons.forEach(item => {
            item.addEventListener(click, function() {
                let confirmDelete = confirm("Rostdan ham ushbu ma'lumotni o'chirmoqchimisiz?");

                if (confirmDelete) {
                    let userId = item.id.substring(12);

                    data = data.filter(el => {
                        return el.id != userId;
                    });
                    localStorage.setItem('users', JSON.stringify(data));
                    window.location.reload();
                }
            })
        })
    }
};