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
          <a class="editTaskButton"  data-toggle="modal" data-target="#myModal" @click="$emit(\'change-select-date\', day)"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
        </div>
    `,
    computed: {
      items: function() {
        var item = this.todos[[this.day.numberDay, this.day.month, this.day.year].join('.')];
        if(item) return item;
      }
    },
});

Vue.component('todo-list', {
  props: ['data'],
  template: `
    <div>
      <div class="custom-checkbox" v-bind:class="{'done': data.status,}"></div>
      <span>{{ data.text }}</span>
    </div>`,

});

Vue.component('todo-list-popup', {
  props: ['data'],
  data: function(){
    return {
      isEdit: false,
      newText: '',
      newStatus: false
    }
  },
  template: `
    <div>
      <div class="custom-checkbox" v-bind:class="{'done': data.status,}" @click="changeStatus"></div>
      <span>{{ data.text }}</span>
    </div>`,
    methods: {
      changeStatus: function() {
        this.newStatus = this.data.status;
        if (this.newStatus) {
          this.newStatus = false
        } else {
          this.newStatus = true
        }
        this.$emit('status', this.newStatus);
      }
    }

});

Vue.component('add-task-popup', {
  props: ['date', 'todos'],
  data: function () {
    return {
      textNewTask: "",
    }
  },
  template: `
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Edit day: {{ headerTitle }}</h4>
        </div>
        <div class="modal-body">
          ...{{ date }}

            <div>
              <input type="text" name="" value="" v-model="textNewTask">
              <button type="button" name="button" @click="addTask">Add</button>
            </div>
            <todo-list-popup
              v-for="(item, index) in items"
              :data="item"
              @status = "changeStatus(index, $event)"
            ></todo-list-popup>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  `,
  computed: {
    headerTitle: function(){
      return [this.date.numberDay, this.date.month, this.date.year].join('.')
    },
    items: function() {
      var item = this.todos[[this.date.numberDay, this.date.month, this.date.year].join('.')];
      if(item) return item;
    }
  },
  methods: {
    addTask: function() {
      this.items.push({"text": this.textNewTask, "status": false });
      this.textNewTask = "";
    },
    editTask: function(index, val) {
      this.$set(this.items, index, Object.assign(this.items[index], {"text": val}));
    },
    changeStatus: function(index, val){

      // console.log(this.todoList[this.headerTitle][index].status);
      // calendarApp.todoList["22.7.2019"][0]
      console.log("asdfsadfs");
      //this.todos[this.headerTitle][index].status = val;
      Object.assign(this.todos[this.headerTitle][index], {"status": val});


    }
  }
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
        selectDate: "",
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
        changeSelectDate(date) {
          this.selectDate = date;
          console.log('Well Done');
        },
    }
});
