export default function SaveAs({ }: { }) {    
    const onFileChange = () => {
 
        // Update the state
       // this.setState({ selectedFile: files[0] });
 
    };
    const loadFile = () => {
        alert("Saves current state");
        return;
    };
    return(
        <button type="button" onClick={loadFile}>
        SaveAs
      </button>)
   }
