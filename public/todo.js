'use strict';

var newTodayTask = document.getElementById("todayTaskInput");

document.getElementById("todaySubmit").addEventListener("click", function () {

  var newTodayValue = newTodayTask.value;
  var todayTaskItem = document.querySelector(".task-item1");
  
  todayTaskItem.textContent = newTodayValue;
  newTodayTask.value = "";
});