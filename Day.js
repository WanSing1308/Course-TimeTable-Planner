function $(id){
    return document.getElementById(id);
}
function CE(tag){
    return document.createElement(tag);
}

export class Day{
    constructor(day){
        this.day = day
        this.node = $(this.day)
        this.start = 570
        this.end = 1110
        this.timeslots = []
        for (let timeslot=this.start;timeslot<this.end;timeslot+=30){
            const timeNode = CE("div")
            timeNode.className = "timeslot"
            this.timeslots.push(timeNode)
            this.node.appendChild(timeNode)
            
        }
    }
    calTimeslotIndex(time){
        const temp = time.split(":")
        const minute = parseInt(temp[0])*60 +parseInt(temp[1])
        return (minute-this.start)/30
    }
    refresh(registeredCourse){
        this.reset();
        registeredCourse.forEach(courseObj=>{
            const time = courseObj.time
            time.forEach((t)=>{
                const {day,start,end} = t;
                if (day == this.day)
                    this.paint(start,end)
            })
        })
        
    }
    paint(start,end){
        for (let i = this.calTimeslotIndex(start); i<this.calTimeslotIndex(end); i++){
            this.timeslots[i].style.backgroundColor = "green"
        }
    }
    reset(){
        this.timeslots.forEach(timeslot=>{
            timeslot.style.backgroundColor = "white"
        })
    }
}