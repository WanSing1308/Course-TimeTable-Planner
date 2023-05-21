function CreateTextNode(tag,text){
    const node = CE(tag)
    node.innerHTML = text
    return node
}
function CE(tag){
    return document.createElement(tag)
}
export class Course{
    constructor(courseObj,container){
        this.container = container
        this.Obj = courseObj
        this.id = courseObj.id
        this.time = courseObj.time
        this.createNode()
    }
    createNode(){
        this.node = CE("div")
        this.node.className = "course"
        const idNode = CreateTextNode("div",this.id)
        this.node.appendChild(idNode)

        this.time.forEach( t => {
            const {day,start,end} = t
            const timeNode = CreateTextNode("div",`${day}:${start}-${end}`)
            this.node.appendChild(timeNode)
            
        });
        const deleteBtn = CE("button")
        deleteBtn.innerHTML = "delete"
        deleteBtn.addEventListener("click",()=>{this.container.deleteCourse(this.node,this.Obj)})
        
        this.node.appendChild(deleteBtn)
            
    }
}