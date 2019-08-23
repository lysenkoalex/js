Vue.component('list-of-days', {
    props: ['day', 'todos'],
    template: `
        <div class="col-md-2 one-day-box" v-bind:class="{
            'weekend-day': day.isWeekend,
            'next-month': day.isNotActiveMonth,
            'today-day': day.isCurrentDay
        }">
          {{day.numberDay}}
          <todo-list v-for="item in items" :data="item"></todo-list>
          <a href="javascript:void(0)" class="addTaskButton"  data-toggle="modal" data-target="#myModal"><span>+</span></a>
        </div>
    `,
    computed: {
      items: function() {
        var item = this.todos[[this.day.numberDay, this.day.month, this.day.year].join('.')];
        if(item) return item;
      }
    }
});

Vue.component('todo-list', {
  props: ['data'],
  template: `
    <div>
      <div class="custom-checkbox"></div>
      <span>{{ data.text }}</span>
    </div>`,

});

Vue.component('add-task-popup', {
  props: [],
  template: `
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Modal title</h4>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  `,
});

Vue.component('calendar-nav', {
    props: ['date'],
    template: `
      <div>
        <button type="button" class="btn btn-default" @click="$emit(\'change-date\')">Today</button>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" @click="$emit(\'prev-month\')">
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
            </button>
            <button type="button" class="btn btn-default">{{currentMonth}}</button>
            <button type="button" class="btn btn-default" @click="$emit(\'next-month\')">
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
            </button>
        </div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" @click="$emit(\'prev-year\')">
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
            </button>
            <button type="button" class="btn btn-default">{{date.getFullYear()}}</button>
            <button type="button" class="btn btn-default" @click="$emit(\'next-year\')">
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
            </button>
        </div>
      </div>
    `,
    computed: {
      currentMonth: function(){
        var monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return monthArray[this.date.getMonth()];
      }
    },
});

var calendarApp = new Vue({
    el: "#calendar-page",
    data: {
        currentDay: new Date(),
    },
    computed: {
        calendarArray: function(){
          var calendarArr = [],
              selectedDate = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth(), 1),
              daysInLastMonth = this.daysInMonth(this.currentDay.getFullYear(), this.currentDay.getMonth()-1),
              daysInCurrentMonth = this.daysInMonth(this.currentDay.getFullYear(), this.currentDay.getMonth()),
              viewDaysInLastMonth = daysInLastMonth - selectedDate.getDay()+1,
              numberNextMonth = 1;

          for(let i = viewDaysInLastMonth; i <= daysInLastMonth; i++) {
              calendarArr.push(this.addDayInArray(this.currentDay.getFullYear(), this.currentDay.getMonth()-1, i));
          }
          for(let i=1; i <= daysInCurrentMonth; i++ ){
              calendarArr.push(this.addDayInArray(this.currentDay.getFullYear(), this.currentDay.getMonth(), i));
          }
          for(let i=calendarArr.length; i < 42; i++){
              calendarArr.push(this.addDayInArray(this.currentDay.getFullYear(), this.currentDay.getMonth()+1, numberNextMonth++));
          }
          return calendarArr;
        },
        todoList: function() {
          var todoListArr = JSON.parse(localStorage.getItem('taskList'));
          return todoListArr;
        }
    },
    methods: {
        daysInMonth(year, month) {
            return 33 - new Date(year, month, 33).getDate();
        },
        isNotActiveMonth(month) {
            if(month == this.currentDay.getMonth()) return false;
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
        addDayInArray(year, month, day) {
            return {
                numberDay: day,
                month: month,
                year: year,
                isNotActiveMonth: this.isNotActiveMonth(month),
                isCurrentDay: this.isCurrentDay(year, month, day),
                isWeekend: this.isWeekend(year, month, day),
            };
        },
        changeDate(year, month){
          var thisYear = year || new Date().getFullYear();
          var thisMonth = month || new Date().getMonth();
          this.currentDay = new Date(thisYear, thisMonth);
        },
        prevMonth(){
          this.currentDay.setMonth(this.currentDay.getMonth() - 1);
          this.currentDay = new Date(this.currentDay);
        },
        nextMonth(){
          this.currentDay.setMonth(this.currentDay.getMonth() + 1);
          this.currentDay = new Date(this.currentDay);
        },
        prevYear(){
          this.currentDay.setYear(this.currentDay.getFullYear() - 1);
          this.currentDay = new Date(this.currentDay);
        },
        nextYear(){
          this.currentDay.setYear(this.currentDay.getFullYear() + 1);
          this.currentDay = new Date(this.currentDay);
        },
    }
});
