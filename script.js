function validateForm() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var state = document.getElementById('name').value;
    var country = document.getElementById('name').value;
    var location = document.getElementById('location').value;

    if (name == "") {
        alert('Name is required');
        return false;
    }

    if (age == "") {
        alert('Age is required');
        return false;
    } else if (age < 1) {
        alert('Age must not be zero or less than zero');
        return false;
    }

    if (state == "") {
        alert('State is required');
        return false;
    }

    if (country == "") {
        alert('Country is required');
        return false;
    }

    if (location == "") {
        alert('Location is required');
        return false;
    }

    return true;
}

// function to show data
function showData() {
    var peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    var html = "";
    peopleList.forEach((element, index) => {
        html += `<tr>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.state}</td>
            <td>${element.country}</td>
            <td>${element.location}</td>
            <td><button onclick="deleteData(${index})" class="btn btn-danger">Delete</button><button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button></td>
        </tr>`
    });

    document.querySelector('#crudTable tbody').innerHTML = html;
}

// loads all data from local storage when document or page loaded
window.onload = showData();

// function to add data to localstorage
function AddData() {
    // if form is validated
    if (validateForm() == true) {
        var name = document.getElementById('name').value;
        var age = document.getElementById('age').value;
        var state = document.getElementById('state').value;
        var country = document.getElementById('country').value;
        var location = document.getElementById('location').value;

        var peopleList;
        if (localStorage.getItem('peopleList') == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem('peopleList'));
        }

        peopleList.push({
            name: name,
            age: age,
            state: state,
            country: country,
            location: location,
        });

        localStorage.setItem('peopleList', JSON.stringify(peopleList));
        showData();
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('state').value = '';
        document.getElementById('country').value = '';
        document.getElementById('location').value = '';
    }
}

// function to delete data from localstorage
function deleteData(index) {
    var peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    peopleList.splice(index, 1);
    localStorage.setItem('peopleList', JSON.stringify(peopleList));
    showData();
}

// function to update/edit data in localstorage
function updateData(index) {
    // submit button will hide and update button will show for updating of data in localstorage
    document.getElementById('submit').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    var peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    document.getElementById('name').value = peopleList[index].name;
    document.getElementById('age').value = peopleList[index].age;
    document.getElementById('state').value = peopleList[index].state;
    document.getElementById('country').value = peopleList[index].country;
    document.getElementById('location').value = peopleList[index].location;

    document.querySelector('#update').onclick = () => {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById('name').value;
            peopleList[index].age = document.getElementById('age').value;
            peopleList[index].state = document.getElementById('state').value;
            peopleList[index].country = document.getElementById('country').value;
            peopleList[index].location = document.getElementById('location').value;

            localStorage.setItem('peopleList', JSON.stringify(peopleList));

            showData();

            document.getElementById('name').value = '';
            document.getElementById('age').value = '';
            document.getElementById('state').value = '';
            document.getElementById('country').value = '';
            document.getElementById('location').value = '';
            
            // update button will hide and submit button will show 
            document.getElementById('submit').style.display = ' block';
            document.getElementById('update').style.display = 'none';
        }
    }
}