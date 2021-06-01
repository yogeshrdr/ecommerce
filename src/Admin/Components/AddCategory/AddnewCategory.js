import React, { useState, useEffect } from 'react';
import './AddnewCategory.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {db} from '../../../Database/firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';


const style = makeStyles({
    button: {
      color: 'white',
      backgroundColor: '#48BEF0',
    }
  });

function AddnewCategory() {

    const classes = style();
    
    const [category, setcategory] = useState("");
    const [createcategory, setcreatecategory] = useState(false);

    const [dbstate, setdbstate] = useState([{}]);
    const[subcategorystate, setsubcategorystate] = useState([{subcategoryname : "", taginput: "" , subcategorycomponent : []}])
    const [subcategoryindex, setsubcategoryindex] = useState(-1);
    
    useEffect(() =>{
        db.collection('AdminController').doc("Category").onSnapshot(snap => (
            setdbstate(snap.data()?.category)
        ))
    }, [])


    const handleclicksubcategory = (i) =>{
        setcategory(dbstate[i].category)
        const list = dbstate[i].subcategory
        setsubcategoryindex(i);
        setsubcategorystate(list)
    }
    
   

    const handleclick = (k) =>{
       if(k===false && category!=="" )
        {   if(dbstate !== undefined){
            dbstate.push({category: category, subcategory: []});
            setsubcategoryindex(dbstate.length-1);
        } else {
                setdbstate([{category: category, subcategory: []}])
                setsubcategoryindex(0);
        }
        
        }else{
            setsubcategorystate([])
            setsubcategoryindex(-1)
        }
        setcreatecategory(k);
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...subcategorystate];
        list[index][name] = value;
        setsubcategorystate(list);
};

const handleRemoveClick = index => {
    const list = [...subcategorystate];
    list.splice(index, 1);
    setsubcategorystate(list);
};


const handleAddClick = () => {
    setsubcategorystate([...subcategorystate, {subcategoryname : "", subcategorycomponent : []}]);
};

const inputKeyDown = (e, index) => {
    const val = e.target.value;

    if (e.key === 'Enter' && val) 
    {   const list = [...subcategorystate];
        if(list[index]["subcategorycomponent"].find(tag => tag.toLowerCase() === val.toLowerCase())){
            return;
        }
        list[index]["subcategorycomponent"] = [...list[index]["subcategorycomponent"], val];
        console.log(list[index]["subcategorycomponent"])
        console.log(list)
        list[index]["taginput"] = "";
        setsubcategorystate(list)
        console.log(subcategorystate)
    } 
}

const removeTag = (i,j) => {
    const list = [...subcategorystate];
    list[i]["subcategorycomponent"].splice(j, 1);
    setsubcategorystate(list)
}

const handleSubmit = (e) => {
    dbstate[subcategoryindex].subcategory = subcategorystate;
    db.collection('AdminController').doc("Category").set({category : dbstate});
    setcategory("");
}

    return (
        <div className="AddnewCategory">
            <div className="spacing">
                Add and Modify Category
            </div>
            <div className="newCategory">
                <div className="AllCategory">
                    <div className="Components">
                        {dbstate?.map((d,i)=> (
                        <button key={i} onClick={() => handleclicksubcategory(i)} className="categorybutton">{d.category}</button>
                        ))}

                    </div>
                    {createcategory === true?
                            (<TextField id="outlined-basic" variant="outlined" className="catinput" value={category} placeholder="Enter Category" onChange={e => setcategory(e.target.value)}/>)
                            : 
                            (<div></div>)
                    }

                    <div className="Addnew">
                        <button  onClick={() => handleclick(!createcategory)}>
                            <div><AddCircleOutlineIcon/></div>
                            {createcategory === true?
                            (<div>Add</div>)
                            : 
                            (<div>Create New</div>)}
                        </button>
                    </div>
                </div >
                <div className="ModifyCategory">
                    <div className="ModifyCategoryContent">
                        {category !== "" ? (
                        <div className="ModifyCategoryContentBox">
                            <div className="ModifyCategoryContentcategory">{category}</div>
                            <div className="ModifyCategoryContentSubcategory">
                            {subcategorystate.map((x, i) => {

                                return (
                                    <div key={i} className="caterogytype">
                                        <div className="subcatdiv">
                                        <TextField id="standard-basic" label="Enter subcategory title" name="subcategoryname" 
                                            value={x.subcategoryname} 
                                            onChange={e => handleInputChange(e, i)} 
                                            required
                                        />

                                        <div className="btn-box">
                                            { <button className="subcatbtn" onClick={() => handleRemoveClick(i)}><DeleteIcon/></button>}
                                        </div>
                                        </div>
                        
                                        <div className="lastype">
                                            <div className="subcateogrycomponent">
                                                {x.subcategorycomponent.map((d,j)=> (
                                                    <div className="subcateogrycomponentcontent"key={j} 
                                                        onClick={() => {removeTag(i,j);}}>

                                                        {d}
                                                        <button className="suncompobutton" type="button"  >x</button>
                                                    </div>))}
                                            </div>

                                            <TextField id="outlined-basic" label="Enter sub component" variant="outlined"  type="text"  name="taginput"  
                                                value={x.taginput}
                                                onChange={e => handleInputChange(e, i)} 
                                                onKeyDown={e=> inputKeyDown(e, i)} 
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            <button className="subbutton" onClick={handleAddClick}>
                                <div><AddCircleOutlineIcon/></div>
                                <div>Add New SubCateory</div>
                            </button>

                            <Button variant="contained" color="primary" className={classes.button} type="submit" onClick={handleSubmit}>Submit</Button>
                            </div>
                        </div>) :
                        (<div></div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddnewCategory
