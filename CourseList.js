import {Course} from "./Course.js"
import {Day} from "./Day.js"
function $(id){
    return document.getElementById(id);
}
function bind(func,that){
    return (function(){
        func.call(that)
    })
}
function CE(tag,text="",id="",className=""){
    const node =  document.createElement(tag)
    if (text)
        node.innerHTML = text
    if (id)
        node.id = id
    if (className)
        node.className = className
    return node
}
export class CourseList{
    constructor(){
        this.days = ["Mon","Tue","Wed","Thu","Fri"]
        this.node = $("coursesList")
        this.form = $("courseInputs")
        this.registeredCourse = []
        this.dayObj = []
        this.courses = JSON.parse(localStorage.getItem("courses"))||[]
        this.setCheckBox()
        this.setTimeslots()
        this.init()

        this.addBtn = $("add-Btn")
        this.resetBtn = $("reset-Btn")
        
        this.addBtn.addEventListener("click",bind(addBtnListener,this))
        this.resetBtn.addEventListener("click",bind(resetBtnListener,this))
    }
    setTimeslots(){
        this.days.forEach(day=>{
            $("timetable").appendChild(CE("div",day,day))
            this.dayObj.push(new Day(day))
        })
    }
    init(){
        this.courses.forEach(courseObj=>{
            const course = new Course(courseObj,this)
            this.node.appendChild(course.node)
            if (courseObj.registered)
                this.registeredCourse.push(courseObj)
        })
        for (let day of this.dayObj){
            day.refresh(this.registeredCourse)
        }
    }
    regCourse(node,courseObj){
        this.registeredCourse.push(courseObj)
        courseObj.registered = true
        node.style.backgroundColor = "grey"
        this.save()
        for (let day of this.dayObj){
            day.refresh(this.registeredCourse)
        }
    }
    dropCourse(node,courseObj){
        this.registeredCourse.splice(this.registeredCourse.indexOf(courseObj,1))
        courseObj.registered = false
        node.style.backgroundColor = "white"
        this.save()
        for (let day of this.dayObj){
            day.refresh(this.registeredCourse)
        }
    }
    addCourse(id,time){
        const courseObj = {id,time,registered:false}
        const course = new Course(courseObj,this)
        this.courses.push(courseObj)
        this.node.appendChild(course.node)
        this.save();
    }
    deleteCourse(node,obj){
        if (this.registeredCourse.indexOf(obj)!==-1)
            this.dropCourse(node,obj)
        this.node.removeChild(node);
        this.courses.splice(this.courses.indexOf(obj),1)
        this.save();
    }
    save(){
        localStorage.setItem("courses",JSON.stringify(this.courses))
    }
    
    setCheckBox(){
        for (let day of this.days){
            const dayNode = CE("input")
            dayNode.type = "checkbox"
            dayNode.className = "courseDay"
            dayNode.name = "courseDay"
            dayNode.value = day
            dayNode.addEventListener("change",checkBoxListener)

            const dayLabel = CE("label",day)

            const start = CE("input")
            start.type = "time";
            start.disabled= true
            start.id = day+"start"

            const end = CE("input")
            end.type = "time";
            end.disabled = true
            end.id = day+"end"

            const dayCB = CE("div")
            dayCB.appendChild(dayLabel)
            dayCB.appendChild(dayNode)
            dayCB.appendChild(start)
            dayCB.appendChild(end)
            $("daysSelect").appendChild(dayCB) 
        }
    }
}

function getDayTime(day){
    return {day:day,
            start : $(day+"start").value, 
            end : $(day+"end").value,}
}

function addBtnListener(){
    const id = this.form.courseID.value
    if (!id)
        return
    const time = []
    this.form.courseDay.forEach(dayCB => {
        if(dayCB.checked)
            time.push(getDayTime(dayCB.value))
    })
    if (time.length==0)
        return
    this.addCourse(id,time)
}

function resetBtnListener(){
    this.form.reset();
}

function checkBoxListener(event){
    const disable = !event.target.checked? true:false
    if (disable){   
        $(event.target.value+"start").value = ""
        $(event.target.value+"end").value = ""
    }
    $(event.target.value+"start").disabled = disable
    $(event.target.value+"end").disabled = disable
}

