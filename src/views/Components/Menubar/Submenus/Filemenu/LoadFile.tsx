export default function Load({ }: { }) {    
    const onFileChange = () => {
 
        // Update the state
       // this.setState({ selectedFile: files[0] });
 
    };
    const loadFile = () => {
        alert("TO ADD: file load function");
        return;
    };
    return(
        <button type="button" onClick={loadFile}>
        Load
      </button>)
   }