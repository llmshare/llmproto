export  class LoadFile {    
    constructor(
        public Load: ()=>void
    ){}

}
    export default function Load(){
            //const [file, setFile] = useState<File | null>(null);
            if(localStorage.getItem("file")){
            console.log("something changed");
            //console.log(x.type);
            //console.log(x.size);
            }
            else{
            console.log("load reached, state empty")
            }
            const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                    localStorage.setitem("file",e.target.files[0]);
                    console.log(e.target.files[0].name);
                    console.log(e.target.files[0].type);
                    console.log(e.target.files[0].size);
                    }
                //alert("something else happened");
            };
    return(
        /*<div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={onFileChange} />
      </div>*/
        <label>
        <input
          accept=".pdf"
          style={{ display: "none" }}
          multiple
          type="file"
          onChange={e => {localStorage.file ={e.target.files[0]};}}
        />
        <span>Load</span>
      </label>
    
  /*  <div>
        <label htmlFor="file">
            <button type="button" onClick={loadFile}>
                Load
            </button>        
        </label>
        <input id="file" type="file" onChange={onFileChange} />
        
    </div>)*/
    )   }