var month, day;
month = prompt("Month (1-12)",);
day = prompt("Day (1-7)",);

function Calendar(element, month, dayWeek){
    const days = [31,28,31,30,31,30,31,31,30,31,30,31];

    let sMonth = ''
    if(month == 1)
        sMonth = '<h2>January</h2>'
        else if(month == 2)
            sMonth = '<h3>February</h3>'
        else if(month ==3)
            sMonth = '<h2>March</h2>'
        else if(month == 4)
            sMonth = '<h3>April</h3>'
        else if(month == 5)
            sMonth = '<h2>May</h2>'
        else if(month == 6)
            sMonth = '<h3>June</h3>'
        else if(month == 7)
            sMonth = '<h2>July</h2>'
        else if(month == 8)
            sMonth = '<h3>August</h3>'
        else if(month == 9)
            sMonth = '<h2>September</h2>'
        else if(month == 10)
            sMonth = '<h3>October</h3>'
        else if(month == 11)
            sMonth = '<h2>November</h2>'
        else if(month == 12)
            sMonth ='<h3>December</h3>'
        else{
            sMonth = 'Invalid Input'
        }

    let table = `<table><tr><td colspan = "7" align = "center" id = "month">${sMonth}</tr></td><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>`
    let count = 1
    let calDays = 1
    let weekCount = 0

    if(month > 12 || dayWeek > 7){
        element.innerHTML = ("<h1>Invalid Input</h1>")
    }else if(month == 0 || dayWeek == 0)
        element.innerHTML = ("<h1>Invalid Input</h1>")
        else{
            if(days[month-1] == 31){
                if(dayWeek >= 6){
                    for(let i = 0; i < 42; i++){
                        if(weekCount == 0){
                            table += '<tr>'
                        }
                        if(count <= dayWeek - 1) {
                            table += "<td></td>"
                            count++
                        }
                        else if (calDays > days[month - 1])
                        table += "<td></td>"
                        else{
                            if (calDays <= days[month - 1]) {
                                table += `<td>${calDays}</td>`
                                calDays++
                            }else
                            table += "<td></td>"
                        }
                        if (weekCount == 6) {
                            table += '</tr>'
                            weekCount = 0
                        }else{
                            weekCount++
                        }
                    }
                }
                else{
                    for(let i = 0; i < 35; i++){
                        if(weekCount == 0){
                            table += '<tr>'
                        }
                        if (count <= dayWeek - 1) {
                            table += "<td></td>"
                            count++
                        }
                        else if (calDays > days[month - 1])
                            table += "<td></td>"
                        else{
                            if (calDays <= days[month - 1]) {
                                table += `<td>${calDays}</td>`
                                calDays++
                            }else
                                table += "<td></td>"
                        }
                        if (weekCount == 6) {
                            table += '</tr>'
                            weekCount = 0
                        }else{
                            weekCount++
                        }
                    }
                }
            }else if(days[month-1] == 28){
                if(dayWeek >= 2){
                    for (let i = 0; i < 35; i++){
                        if(weekCount == 0) {
                            table += '<tr>'
                        }
                        if(count <= dayWeek - 1) {
                            table += "<td></td>"
                            count++
                        }
                        else if (calDays > days[month - 1])
                            table += "<td></td>"
                        else{
                            if (calDays <= days[month - 1]) {
                                table += `<td>${calDays}</td>`
                                calDays++
                            }else
                                table += "<td></td>"
                        }
                        if (weekCount == 6) {
                            table += '</tr>'
                            weekCount = 0
                        }
                        else{
                            weekCount++
                        }
                    }
                }else{
                    for (let i = 0; i < 28; i++){
                        if (weekCount == 0){
                            table += '<tr>'
                        }
                        if (count <= dayWeek - 1) {
                            table += "<td></td>"
                            count++
                        }
                        else if (calDays > days[month - 1])
                            table += "<td></td>"
                        else{
                            if (calDays <= days[month - 1]) {
                                table += `<td>${calDays}</td>`
                                calDays++
                            }else
                                table += "<td></td>"
                        }
                        if (weekCount == 6) {
                            table += '</tr>'
                            weekCount = 0
                        }
                        else{
                            weekCount++
                        }
                    }
                }
            }else if(days[month-1] == 30){
                if(dayWeek > 6){
                    for(let i = 0; i < 42; i++){
                        if (weekCount == 0) {
                            table += '<tr>'
                        }
                        if (count <= dayWeek - 1) {
                            table += "<td></td>"
                            count++
                        }
                        else if (calDays > days[month - 1])
                            table += "<td></td>"
                        else{
                            if(calDays <= days[month - 1]) {
                                table += `<td>${calDays}</td>`
                                calDays++
                            }
                            else
                                table += "<td></td>"
                        }
                        if (weekCount == 6) {
                            table += '</tr>'
                            weekCount = 0
                        }else {
                            weekCount++
                        }
                    }
                }else{
                    for(let i = 0; i < 35; i++){
                        if (weekCount == 0) {
                            table += '<tr>'
                        }
                        if (count <= dayWeek - 1) {
                            table += "<td></td>"
                            count++
                        }
                        else if (calDays > days[month - 1])
                            table += "<td></td>"
                            else {
                                if (calDays <= days[month - 1]) {
                                    table += `<td>${calDays}</td>`
                                    calDays++
                                }
                                else
                                    table += "<td></td>"
                                }
                            if (weekCount == 6) {
                        table += '</tr>'
                        weekCount = 0
                        }
                    else{
                        weekCount++
                    }
                }
            }
        }
        table += '</table>'
        element.innerHTML = table;
    }
}

Calendar(main, month, day);