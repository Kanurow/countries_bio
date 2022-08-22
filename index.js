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
    let serialNo = 0
    fetch('https://countriesnow.space/api/v0.1/countries/states')
    .then((response) => response.json())
    .then((file) => {
        // console.log(file)
        let firstHundredCountries = file.data.slice(0,100)
        let page_number = 1;
        let records_per_page = 5;
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
        
        





        // display table rows from json data
        $.fn.displayTableData = function() {
            var start_index = (page_number - 1) * records_per_page;
            let end_index = start_index + (records_per_page  - 1)
            end_index = (end_index >= firstHundredCountries.length ) ? firstHundredCountries.length - 1 : end_index;
            // $('#output').css('visibility', 'hidden');
            $('#output').css('visibility', 'hidden');
            $('#table').css('visibility', 'visible');
            let serialNo = 0
            let innerHTML = '';


            for (let i = start_index; i < end_index ; i++) {
                for (let j = 0; j < firstHundredCountries[i].states.length; j++) {
                    // let countryNum = 0
                    let stateName = JSON.stringify(file.data[i].states[j].name)
                    let stateCode = JSON.stringify(file.data[i].states[j].state_code)

                    serialNo++
              
                    innerHTML = innerHTML +  '<tr>' +
                        '<td>'+(serialNo)+'</td>'+
                        '<td>'+file.data[i].name+'</td>'+
                        '<td>'+file.data[i].iso2+'</td>'+
                        '<td>'+file.data[i].iso3+'</td>'+
                        '<td>'+stateName+'</td>'+
                        '<td>'+stateCode+'</td>'+

                    '</tr>';
                    
                }   
            }
            // console.log("Num = "+serialNo)
            $("table tbody tr").remove();
            $("table tbody").append(innerHTML);



            $(".page_index").removeClass('active')
            $("#page_index"+page_number).addClass('active')

             $(".pagination-details").text('Page '+(page_number))
           }




        // $("#table-size").change(function() {
        //     let tab_size = $(this).val();
        //     records_per_page = parseInt(tab_size)
        //     page_number = 1
        //     total_pages = Math.ceil(serialNo / records_per_page)
        //     console.log("changeTP :"+total_pages+ "Sn :"+serialNo+"Tabsize :"+tab_size)
            

        //     $.fn.DisplayPaginationButtons();
        //     $.fn.displayTableData();
        // })


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
