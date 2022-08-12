let text = document.getElementById("get-text").addEventListener('click', () => {
    fetch('rowland.txt')
    .then((response) => response.text())
    .then((data) => {
        document.getElementById('output').textContent = data
    })
});


let json = document.getElementById("get-json").addEventListener('click', () => {
    fetch('rowland.json')
    .then((response) => response.json())
    .then((data) => { 
        let output = '<h2>Users</h2>';
        data.forEach((user) => {
            output+= `
                <ul>
                    <li>User ID: ${user.userid}</li>
                    <li >First Name: ${user.first_name}</li>
                    <li>Last Name: ${user.last_name}</li>
                    <li>Email: ${user.email}</li>
                    <li>Educational Qualification: ${user.highest_edu}</li>
                    <li>Course of Study: ${user.discipline}</li>
                    <li>Skills: ${user.skills}</li>
                    <li">Interest ${user.interest}</li>
                </ul>
            `
        });
        document.getElementById('output').innerHTML = output
    })
});

// let api1 = document.getElementById("get-api").addEventListener('click', () => {
//     fetch('https://countriesnow.space/api/v0.1/countries/states')
//     .then((external_data) => external_data.json())
//     .then((data) => {
//         let output = '<h2>Countries Summary Data</h2>';
//         data.forEach((country) => {
//             console.log(country)
//         })
//         document.getElementById('output').innerHTML = output
//     })
// });




let api2 = document.getElementById("get-api").addEventListener('click', () => {
    fetch('https://countriesnow.space/api/v0.1/countries/states')
    .then((response) => response.json())
    .then((file) => {
        let output = '<p>Countries Summary Data</p>';
        //console.log(data)
        console.log(file.data[0].name)
        file = JSON.parse(JSON.stringify(file));


/*        
        console.log("File")
        console.log(file)
        console.log("file.data  --------")
        console.log(file.data)
        console.log("file.data['0']*******")
        console.log(file.data[0])
        console.log("file.data[0].states======")
        console.log(file.data[0].states)
        console.log("file.data[0]['states'][0]//////")
        console.log(file.data[0]['states'][0])
        console.log("file.data[0]['states'][0].name")
        console.log(file.data[0]['states'][0].name)
        console.log("file.data[0]['states'][0].state_code")
        console.log(file.data[0]['states'][0].state_code)
        console.log(file.data.length)

*/      


        for (let i = 0; i < file.data.length; i++) {
            output += `
                <ul>
                    <li>Country Name: ${file.data[i].name}</li>
                    <li>Country ISO2: ${file.data[i].iso2}</li>
                    <li>Country ISO3: ${file.data[i].iso3}</li>
                    

                </ul>
            `          
        }
        document.getElementById('output').innerHTML = output
    })
});


// document.getElementById("addData").addEventListener('submit', addText) 

// function addText(e){
//     e.preventDefault();

//     let title = document.getElementById('title').value;
//     let textBody = document.getElementById('textBody').value;

//     fetch('rowland.txt', {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-type': 'application/json'

//         },
//         body: JSON.stringify({
//             title:title, body:textBody
//         })
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//     })
// }