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
        this.start = 540
        this.end = 1110
        this.timeslots = []
        for (let timeslot=this.start;timeslot<this.end;timeslot+=30){
            const timeNode = CE("div")
            timeNode.className = "timeslot"
            this.node.appendChild(timeNode)
        }
    }
    

}