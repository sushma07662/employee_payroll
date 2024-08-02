var script = document.createElement("SCRIPT");
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(script);
const redirect = () => {
    window.location.href = "../templates/form.html";

}
const setProfileImage = () => {
    let ele = document.getElementsByClassName("profile-input");
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            let val = ele[i].value;
            return val;
        }
    }
}
const setGender = () => {
    let ele = document.getElementsByClassName("gender-radio");
    if (ele[0].checked) {
        return ele[0].value;
    }
    return ele[1].value;
}
const setDepartment = () => {
    let res = [];
    let ele = document.getElementsByClassName("checkbox-input");
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            res.push(ele[i].value);
        }
    }
    return res;
}
const setSalary = () => {
    let ele = document.getElementById("salary");
    return ele.value;
}
const setDate = () => {
    let day = document.getElementById("day-select").value;
    let month = document.getElementById("month-select").value;
    let year = document.getElementById("year-select").value;
    return `${day}/${month}/${year}`;
}
const setNotes = () => {
    let notes = document.getElementById("textarea-input").value;
    return notes;
}
const Submit = () => {
    const name = document.getElementById("name-input").value;
    const profileImage = setProfileImage();
    const gender = setGender();
    const department = setDepartment();
    const salary = setSalary();
    const date = setDate();
    const notes = setNotes();
    const user = {
        name: name,
        profileImage: profileImage,
        gender: gender,
        department: department,
        salary: salary,
        startDate: date,
        notes: notes
    };
    console.log("submitted data"+user);
    const editedData=JSON.parse(localStorage.getItem("editdata"));
    if(editedData!=null){
        $.ajax({
            type:"PUT",
            url:`http://localhost:3000/users/${editedData.id}`,
            data:JSON.stringify(user),
            success:(res)=>{
                console.log(res.json())
                console.log("............")
            },
            error:(err)=>console.log(err)
    })
    localStorage.clear();
    }
    else{
        $.ajax({
            type:"POST",
            url:"http://localhost:3000/users",
            data:JSON.stringify(user),
            success:(res)=>{
                console.log(res.json())
            },
            error:(err)=>console.log(err)
    })
}
window.location.href="./index.html";

}

document.addEventListener("readystatechange",()=>{
    if(localStorage.getItem("editdata")!=null){
        const edited=JSON.parse(localStorage.getItem("editdata"));
        console.log("edited data",edited.name)
        const name=document.getElementById('name-input');
        name.value=edited.name;
        const profiles=document.getElementsByClassName("profile-input");
        for(let i=0;i<profiles.length;i++){
            if(profiles[i].value===edited.profileImage){
                profiles[i].checked=true;
            }
        }

        const genders=document.getElementsByClassName('gender-radio');
        for(let i=0;i<genders.length;i++){
            if(genders[i].value===edited.gender) genders[i].checked=true;
        }

        const departments=document.getElementsByClassName("checkbox-input");
        const hashed=new Set();
        for(let i in edited.department){
            hashed.add(edited.department[i]);
        }
        console.log(hashed)
        for(let i=0;i<departments.length;i++){
            if(hashed.has(departments[i].value)) departments[i].checked=true;
        }

        const salary=document.getElementById('salary');
        salary.value=edited.salary;
        let day = document.getElementById("day-select");
        let month = document.getElementById("month-select");
        let year = document.getElementById("year-select");
        const datearray=edited.startDate.split("/");
        day.value=datearray[0];
        month.value=datearray[1];
        year.value=datearray[2];
        const notes=document.getElementById("textarea-input");
        notes.value=edited.notes;
    }
})
