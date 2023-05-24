export class Modal{

    state = {
        id:"",
        title:"",
        body:"",
        button
    }

    constructor(title,body,button){
        this.state.id ="modal"+ Math.floor(Math.random()*10000);
        this.state.title = title
        this.state.body = body
        this.state.button = button
        
        console.table(this.state);
    }

    onVisible(){
        return `
        
        <div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>

        `
    }
}
