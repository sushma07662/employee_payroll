var script = document.createElement("SCRIPT");
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(script);

var data = []
const getDetails = (data) => {
    const usertable = $("table");
    for (let i = 0; i < data.length; i++) {
        const component = `
        <tr>
    <td>
        <div class="profile">
            <img class="profile-icon" src="${data[i].profileImage}">
            <span>${data[i].name}</span> 
        </div>
    </td>
    <td class="female">${data[i].gender}</td>
    <td class="section">
        <span>Sales</span>
        <span>HR</span>
        <span>Finance</span>
    </td>
    <td class="price">
        &#8377 ${data[i].salary}
    </td>
    <td class="start-date">
    ${data[i].startDate}
    </td>
    <td class="icons">
        <span><img class="delete-icon" src="../assets/delete-black-18dp.svg" onclick="deleteRequest('${data[i].id}')"></span>
        <span><img class="edit-icon" src="../assets/create-black-18dp.svg" onclick="editRequest('${data[i].id}')"></span>
    </td>
</tr>`;
        usertable.append(component);
    }
}
const updateTable = (data) => {
    const usertable = $("table");
    usertable.empty();
    for (let i = 0; i < data.length; i++) {
        const component = `
        <tr>
    <td>
        <div class="profile">
            <img class="profile-icon" src="${data[i].profileImage}">
            <span>${data[i].name}</span> 
        </div>
    </td>
    <td class="female">${data[i].gender}</td>
    <td class="section">
        <span>Sales</span>
        <span>HR</span>
        <span>Finance</span>
    </td>
    <td class="price">
        &#8377 ${data[i].salary}
    </td>
    <td class="start-date">
    ${data[i].startDate}
    </td>
    <td class="icons">
        <span><img class="delete-icon" src="../assets/delete-black-18dp.svg" onclick="deleteRequest('${data[i].id}')"></span>
        <span><img class="edit-icon" src="../assets/create-black-18dp.svg"></span>
    </td>
</tr>`;
        usertable.append(component);
    }
}
$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
        success: (res) => {
            //console.log(res);
            data = res;
            getDetails(res);
        },
        error: (err) => { console.log(err) }
    })
})
const search = () => {
    const search_btn = document.getElementById("search-icon");
    const input = document.createElement('input');
    input.className = "extended-search";
    input.id = "extended-search";
    input.placeholder = "Enter name or gender to search";
    $('.search-icon-back').css({
        "width": "500px",
    })
    search_btn.parentNode.replaceChild(input, search_btn);
    const btn = document.createElement("button");
    btn.innerText = "search";
    btn.className = "search-btn";
    $('.search-icon-back').append(btn);
    $('.search-btn').on("click", () => {
        let val = document.getElementById("extended-search").value;
        if (val === "male" || val == "female") {
            const newdata = data.filter((i) => {
                return i.gender == val;
            })
            updateTable(newdata);
        }
        else {
            const newdata = data.filter((i) => {
                return i.name == val;
            })
            updateTable(newdata);
        }
    })
}

const  deleteRequest=(id)=>{
    console.log(id)
    $.ajax({
        url:`http://localhost:3000/users/${id}`,
        type:"DELETE",
        success:(res)=>{
            console.log(res)
        },
        error:(err)=>{
            console.log(err)
        }
    })
}

const editRequest=(id)=>{
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/users/${id}`,
        success: (res) => {
            console.log(res);
            localStorage.setItem("editdata",JSON.stringify(res));
            window.location.href="../templates/payrollForm.html";
        },
        error: (err) => { console.log(err) }
    })
    
}
