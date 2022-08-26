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
        console.log(file)
        let firstHundredCountries = file.data.slice(0,100)
        let page_number = 1;
        let records_per_page = 10;
        let total_pages = Math.ceil(firstHundredCountries.length / records_per_page)
        // console.log(firstHundredCountries.length)
        
        // Display pagination button
        $.fn.DisplayPaginationButtons = function() {
            var button_text = '<a href="#" onClick="javascript:$.fn.prevPage();" >&laquo;</a>';
            var active = '';
            for (let i = 1; i <= total_pages; i++) {
                if (i == 1) {
                    active = ' active'
                } else {
                    active = ''
                }
                button_text = button_text + '<a href="#" id="page_index'+i+'" onClick="javascript:$.fn.changePageIndex('+i+');" class="'+active+'">'+(i)+'</a>'
                
            }
            button_text += '<a href="#" onClick="javascript:$.fn.nextPage();" >&raquo;</a>'
            $(".pagination-buttons").text('')
            $(".pagination-buttons").append(button_text)
        }
        
        





        // display dataset on card
        $.fn.displayTableData = function() {
            var start_index = (page_number - 1) * records_per_page;
            let end_index = start_index + records_per_page;

            let innerHTML = '';


            for (let i = start_index; i < end_index ; i++) {
                innerHTML += '<h3 id="country-name">'+ 'Country: ' + '<span >' + firstHundredCountries[i].name; + '</span>'+ '</h3>' +'br'
                innerHTML += '<p id="capstates">' + 'States : ' + '</p>' //add class here and style it
                for (let j = 0; j < firstHundredCountries[i].states.length; j++) {
                    innerHTML += '<p id="liststates">' + '<span>' + (file).data[i].states[j].name + ', ' + '</span>'+ '</p>' 
                    
                } 
            }


            $('.container').css('visibility', 'visible')
            $("#output").empty()
            $(".card-info #try").remove();
            
            $(".card-info").empty()
            $(".card-info").append(innerHTML);


            $(".page_index").removeClass('active')
            $("#page_index"+page_number).addClass('active')

             $(".pagination-details").text('Page '+(page_number))
           }



        $.fn.changePageIndex = function(index) {
            page_number = parseInt(index);
            $.fn.displayTableData(); 
        }

        $.fn.nextPage = function() {
            page_number++;
            $.fn.displayTableData(); 
        }
        $.fn.prevPage = function() {
            page_number--;
            $.fn.displayTableData(); 
        }

        $.fn.displayTableData();
        $.fn.DisplayPaginationButtons(); 
    } )

})

