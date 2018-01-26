import React, { Component } from  'react'

class Buttons extends Component {


    handleSelectAllClick

    handleDeselectAllClick


    handleDeleteSelected = () => {};





   render() {
       return (
           <div>
               <button>Select all</button>
               <button> Deselect all</button>
               <button onClick={this.handleDeleteSelected}
               >
                   Delete selected
               </button>

           </div>

       )
   }




}
export default Buttons