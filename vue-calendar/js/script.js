Vue.component('list-of-days', {
    props: ['day'],
    template: `
        <div class="col-md-2" v-bind:class="{ 
            'weekend-day': day.isWeekend, 
            'next-month': day.isNotActiveMonth, 
            'today-day': day.isCurrentDay 
        }">{{day.numberDay}}</div>
    `,
});


var calendarApp = new Vue({
    el: "#calendar-page",
    data: {
        currentDay: new Date(),
        calendarArray: [],
    },
    computed: {
        selectedMonth: function(){
            return this.currentDay.getMonth();
        },
        selectedYear: function(){
            return this.currentDay.getFullYear();
        }
    },
    methods: {
        isNotActiveMonth(month) {
            if(month == this.selectedMonth) return false;
            return true;
        },
        isCurrentDay(year, month, day) {
            var currentDay = new Date();
            if (currentDay.getFullYear() == year && currentDay.getMonth() == month && currentDay.getDate() == day) {
                return true;
            } else {
                return false;
            }
        },
        isWeekend(year, month, day) {
            var date = new Date(year, month, day)
            if (date.getDay() == 0 || date.getDay() == 6) {
                return true;
            } else {
                return false;
            }
        },
        addDayInArray(day, year, month) {
            this.calendarArray.push({
                numberDay: day, 
                month: month, 
                year: year, 
                isNotActiveMonth: this.isNotActiveMonth(month),
                isCurrentDay: this.isCurrentDay(year, month, day), 
                isWeekend: this.isWeekend(year, month, day),
            });
        },
        calcMonth(){
            var selectedDate = new Date(this.selectedYear, this.selectedMonth, 1),
                daysInLastMonth = selectedDate.daysInMonth(this.selectedYear, this.selectedMonth-1),
                daysInCurrentMonth = selectedDate.daysInMonth(this.selectedYear, this.selectedMonth),
                viewDaysInLastMonth = daysInLastMonth - selectedDate.getDay()+1,
                numberNextMonth = 1;
    
            for(let i = viewDaysInLastMonth; i <= daysInLastMonth; i++) {
                this.addDayInArray(i, this.selectedYear, this.selectedMonth-1);
            }
            for(let i=1; i <= daysInCurrentMonth; i++ ){
                this.addDayInArray(i, this.selectedYear, this.selectedMonth);
            }
            for(let i=this.calendarArray.length; i < 42; i++){
                this.addDayInArray(numberNextMonth++, this.selectedYear, this.selectedMonth+1);
            }
            return this.calendarArray;
        }
    },
    created: function(){
        Date.prototype.daysInMonth = function(year, month) {
            var thisYear = year || this.getFullYear();
            var thisMonth = month || this.getMonth();
            return 33 - new Date(thisYear, thisMonth, 33).getDate();
        };
        this.calcMonth();
    }
    

});