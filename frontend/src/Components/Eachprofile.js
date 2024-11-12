function Eachprofile(props) {
    return ( 
        
        <div className="pall"style={({width:"40%", margin:"10px"})}>
             <img
                src={props.imagurl}
                alt={props.originalName}
                style={{ width: "200px", height: "auto" }}
              />
            <div className="psec">
              <h4>Name:{props.title}</h4>
              <h4>Price:{props.cost}</h4>
              <p>Description:{props.descr}</p>
            </div>
        </div>
     );
}

export default Eachprofile;