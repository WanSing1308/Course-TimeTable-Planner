function CreateTextNode(tag,text){
    const node = CE(tag)
    node.innerHTML = text
    return node
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
function bind(func,that){
    return (function(event){
        func.call(that,event)
    })
}
export class Course{
    constructor(courseObj,container){
        this.container = container
        this.obj = courseObj
        this.id = courseObj.id
        this.time = courseObj.time
        this.registered = courseObj.registered
        this.createNode()
    }
    createNode(){
        this.node = CE("div","","","course")
        
        const selectBtn = CE("input")
        selectBtn.type="checkbox"
        selectBtn.addEventListener("change",bind(selectBtnListener,this))
        this.node.appendChild(selectBtn)

        if (this.registered){
            this.node.style.backgroundColor = "grey"
            selectBtn.checked = true
        }
            
        const idNode = CE("div",this.id)
        this.node.appendChild(idNode)

        this.time.forEach( t => {
            const {day,start,end} = t
            const timeNode = CE("div",`${day}:${start}-${end}`)
            this.node.appendChild(timeNode)
            
        });
        const deleteBtn = CE("button")
        deleteBtn.innerHTML = "delete"
        deleteBtn.addEventListener("click",bind(deleteBtnListener,this))
        
        this.node.appendChild(deleteBtn)    
    }

}
function selectBtnListener(event){
    if (event.target.checked)
        this.container.regCourse(this.node,this.obj)
    else
        this.container.dropCourse(this.node,this.obj)
    
        
}
function deleteBtnListener(event){
    this.container.deleteCourse(this.node,this.obj)
}
