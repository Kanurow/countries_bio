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



let api2 = document.getElementById("get-api").addEventListener('click', () => {
    fetch('https://countriesnow.space/api/v0.1/countries/states')
    .then((response) => response.json())
    .then((file) => {
        let output = '<p>Countries Summary Data</p>';

        for (let i = 0; i < file.data.length; i++) {
            for (let j = 0; j < file.data[i].states.length; j++) {
                let stateName = JSON.stringify(file.data[i].states[j].name)
                let stateCode = JSON.stringify(file.data[i].states[j].state_code)

                output += `
                <ul>
                    <li>Country : ${file.data[i].name} </li>
                    <li>ISO2 : ${file.data[i].iso2} </li>
                    <li>ISO3 : ${file.data[i].iso3} </li>
                    <li>State Name : ${stateName} </li>
                    <li>State Code : ${stateCode} </li>
                </ul>
            `
            }   

            }


        document.getElementById('output').innerHTML = output
    })
});
